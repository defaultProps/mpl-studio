import { parse, compileTemplate } from '@vue/compiler-sfc'
import {
  toDisplayString,
  mergeProps,
  createElementVNode,
  createTextVNode,
  openBlock,
  createElementBlock,
  resolveComponent,
  createBlock,
  withModifiers,
  createCommentVNode,
  withCtx,
  createVNode,
  renderList,
  Fragment,
  resolveDirective,
  withDirectives,
  normalizeStyle,
  vShow,
  vModelText,
  withKeys,
  normalizeClass,
  normalizeProps,
  h,
  defineComponent,
  defineAsyncComponent,
  reactive,
  shallowRef,
  watchEffect,
  computed,
  inject
} from 'vue'

// 返回动态组件对象 - 静态sfc vue3 codeString
export function compileSFC(sfcString = '', subComps = {}, metaProps: any = {}) {
  if (!sfcString) {
    return {}
  }

  const { descriptor } = parse(sfcString)
  let renderFn = null

  if (descriptor.template) {
    const templateResult = compileTemplate({
      source: descriptor.template.content,
      filename: 'component.vue',
      id: 'preview'
    })

    if (templateResult.errors.length) {
      console.error('Template compile error:', templateResult.errors)
      return
    }

    // 🔥 手动清理 code：移除 import 和 export
    const cleanedCode = templateResult.code
      .replace(/import\s+.*?"vue"[\r\n]*/g, '') // 移除所有 import
      .replace(/export\s+const\s+render\s*=\s*/, 'const render = ') // 替换 export const render
      .replace(/export function render/, 'function render') // 移除 export default
      .trim()

    // 👇 使用 new Function 执行 cleanedCode，得到 render 函数
    try {
      const fn = new Function(
        'Vue',
        '_mergeProps',
        '_toDisplayString',
        '_createElementVNode',
        '_createCommentVNode',
        '_openBlock',
        '_createElementBlock',
        '_createTextVNode',
        '_resolveComponent',
        '_createBlock',
        '_withModifiers',
        '_withCtx',
        '_createVNode',
        '_renderList',
        '_Fragment',
        '_resolveDirective',
        '_withDirectives',
        '_normalizeStyle',
        '_vShow',
        '_vModelText',
        '_withKeys',
        '_normalizeClass',
        '_normalizeProps',
        `${cleanedCode}; return render`
      )
      renderFn = fn(
        { h, reactive, computed },
        mergeProps,
        toDisplayString,
        createElementVNode,
        createCommentVNode,
        openBlock,
        createElementBlock,
        createTextVNode,
        resolveComponent,
        createBlock,
        withModifiers,
        withCtx,
        createVNode,
        renderList,
        Fragment,
        resolveDirective,
        withDirectives,
        normalizeStyle,
        vShow,
        vModelText,
        withKeys,
        normalizeClass,
        normalizeProps
      ) // 注入 Vue API
    } catch (error) {
      console.error('Render function execution error:', error)
    }
  }

  // 3. 提取 script 中的 export default 对象
  let componentOptions:any = {}

  if (!renderFn) {
    return componentOptions
  }

  const subComponentByPrefixName = {}
  Object.keys(subComps).forEach((key) => {
    subComponentByPrefixName[`child-component-${key.replace('child-component-', '')}`] = defineComponent(subComps[key])
    subComponentByPrefixName[key] = defineComponent(subComps[key])
    window[key.replace('child-component-', '')] = subComps[key]
  })

  // // 子组件挂载window上
  // Object.keys(subComps).forEach((key) => {
  //   window[key] = subComps[key]
  // })

  if (descriptor.script) {
    // 获取 script 内容
    let scriptContent = descriptor.script.content

    // 👇 STEP 1: 检测 mixins: [...] 并提取 mixin 名称
    const mixinMatch: any = scriptContent.match(/mixins\s*:\s*\[([^\]]+)\]/)
    const mixinParams: any = []
    const mixinArgs: any = []

    if (mixinMatch) {
      // 提取 mixin 名称，如 "CounterMixin, LoggerMixin"
      const mixinNames = mixinMatch[1]
        .split(',')
        .map((name) => name.trim())
        .filter((name) => name)

      // 替换源码中的 mixin 名称为参数名（避免作用域找不到）
      mixinNames.forEach((name, index) => {
        const paramName = `__mixin_${index}`
        scriptContent = scriptContent.replace(new RegExp(`\\b${name}\\b`, 'g'), paramName)
        mixinParams.push(paramName)
        mixinArgs.push(window[name.replace('window.', '')])
      })
    }

    // 用正则或字符串匹配提取 export default { ... }
    // 注意：这只是简化版，实际项目建议用 AST 解析（如 @babel/parser）
    const exportMatch = scriptContent.match(/export\s+default\s+({[\s\S]*})/)
    if (!exportMatch) {
      console.error('No export default found in script')
      return
    }

    try {
      // 👇 STEP 3: 动态执行，传入 mixin 参数
      const getOptions = new Function(
        'defineComponent',
        'defineAsyncComponent',
        ...mixinParams, // 注入 __mixin_0, __mixin_1, ...
        `return ${exportMatch[1]}`
      )

      componentOptions = getOptions(defineComponent, defineAsyncComponent, ...mixinArgs)
    } catch (err) {
      console.error('Script execute error:', err)
      return
    }
  }

  componentOptions.render = renderFn
  componentOptions.components = subComponentByPrefixName

  if (!componentOptions.props) {
    componentOptions.props = metaProps.props
  }

  // 4. 挂载style
  const styleCode = descriptor.styles.map((style) => style.content).join('\n')
  const styleNode = document.getElementById('lcs-style')
  if (styleNode) {
    styleNode.remove()
  }

  const newStyleNode = document.createElement('style')
  newStyleNode.setAttribute('id', 'lcs-style')
  newStyleNode.innerHTML = styleCode
  document.head.appendChild(newStyleNode)

  return componentOptions
}