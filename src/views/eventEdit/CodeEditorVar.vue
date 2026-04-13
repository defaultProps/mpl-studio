<template>
  <div ref="editorRef" class="code-editor" />
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { EditorState } from "@codemirror/state"
import * as beautify from 'js-beautify'
import { beautifyCode } from '@mpl/const'
import { workbenchStore } from '@mpl/store'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import { getVariableNameAtPosition, defaultCodeMirrorExtensions } from '@mpl/libs'
import { searchNodeListVarsByFullPath } from '@mpl/node'
import { EditorView, WidgetType, ViewPlugin, Decoration } from '@codemirror/view'

const workbench = workbenchStore()
const editorRef = ref(null)
let editorView: EditorView | null = null
const codeStr = ref(workbench.pageVar)

watch(() => workbench.pageVar, newVal => {
  if (editorView && newVal !== editorView.state.doc.toString()) {
    codeStr.value = beautify.js(newVal, beautifyCode.js) || ''
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: codeStr.value
      }
    })
  }
})

class LineEndTipWidget extends WidgetType {
  text = ''
  constructor(text: string) {
    super()
    this.text = text
  }

  toDOM() {
    const dom = document.createElement('span')
    dom.classList.add('cm-tip-message')
    dom.textContent = this.text
    if (!this.text) {
      dom.classList.add('cm-tip-empty-text')
    }
    return dom
  }
}

const lineTipPlugin = ViewPlugin.fromClass(class {
  decorations = Decoration.none
  constructor(view: EditorView) {
    this.update(view)
  }
  async update(update: any) {
    if (!update.state.doc) return
    const { state } = update
    const headPos = state.selection.main.head
    const line = state.doc.lineAt(headPos)
    const obj = getVariableNameAtPosition(codeStr.value, line.number)

    let textTip = ''
    if (obj.fullPath?.indexOf('mpl.var.') >= 0) {
      textTip = searchNodeListVarsByFullPath(obj.fullPath, workbench.nodeList)
    }

    const widget = new LineEndTipWidget(textTip)
    const deco = Decoration.widget({
      side: 1,
      widget
    })
    this.decorations = Decoration.set([deco.range(line.to)])
  }
}, { decorations: v => v.decorations })

onMounted(() => {
  const state = EditorState.create({
    doc: beautify.js(codeStr.value, beautifyCode.js),
    extensions: defaultCodeMirrorExtensions([
      lineTipPlugin,
      EditorState.readOnly.of(true),
      EditorView.editable.of(false)
    ])
  })

  editorView = new EditorView({
    state,
    parent: editorRef.value!
  })
})


onMounted(() => {
  window.addEventListener('message', messageIDE)
  editorView?.destroy()
})

function messageIDE(event: MessageEvent<any>) {
  // 更新IDE-变量
  if (event.data.type === 'UPDATE_PAGE_VAR_IDE') {
    if (editorView) {
      codeStr.value = beautify.js(workbench.pageVar, beautifyCode.js) || ''
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: codeStr.value
        }
      })

    }
  }
}

// 校验变量代码是否正确
function validateVarCode(code: string): boolean {
  let isErrorCode = false
  try {
    let allMethods: string[] = []
    const ast = parse(code, { sourceType: 'script' })
    const astBody = ast.program.body

    if (astBody.length > 1) {
      isErrorCode = true
    }

    traverse(ast, {
      ObjectMethod(path: any) {
        const obj = generate(path.node, {}, code)
        allMethods.push(obj.code)
      }
    })
  } catch (err) {
    isErrorCode = true
  }
  return isErrorCode
}

// 脚本内容保存
async function saveCode() {
  // 更改事件名称 = 删除事件 + 增加页面级别事件.
  // 删除事件同步组件UI
  // 事件代码格式不正确时不保存同步代码.
  if (!editorView) return

  const code = editorView.state.doc.toString()
  let msg = ''

  const isErrorCode = validateVarCode(code)
  if (isErrorCode) {
    console.error('变量代码错误, 请检查')
    return
  }
  // todo
}

// 销毁
onUnmounted(() => {
  editorView?.destroy()
  window.removeEventListener('message', messageIDE)
})
</script>

<style lang="less" scoped>
.code-editor {
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: none;
}
</style>