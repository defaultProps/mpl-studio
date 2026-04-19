<template>
  <div ref="editorRef" class="code-editor" />
</template>

<script lang="ts" setup>
import {
  parseVueOptions,
  updateNodeListByMethodsCode,
  updateEventListByNodeList,
  removeMethodFromVueOptions,
  getJavascriptNameAtPosition,
  validateWithBabel
} from '@mpl/libs'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { workbenchStore } from '@mpl/store'
import * as beautify from 'js-beautify'
import { beautifyCode, monacoFormatter } from '@mpl/const'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api.js'

const workbench = workbenchStore()
const editorRef = ref(null)
const codeStr = ref(workbench.pageJs)
let monacoInstance: null | editor.IStandaloneCodeEditor = null

watch(() => workbench.pageJs, newVal => {
  if (monacoInstance) {
    codeStr.value = beautify.js(newVal, beautifyCode.js) || ''
    monacoInstance.setValue(codeStr.value)
  }
})

onUnmounted(() => {
  monacoInstance?.dispose()
})

onMounted(() => {
  monacoInstance = monacoEditor.editor.create(
    editorRef.value!,
    {
      ...monacoFormatter.js,
      lineNumbers: 'off',
      folding: false,
      readOnly: true,
      value: beautify.js(workbench.pageJs, beautifyCode.js)
    }
  )
})

onMounted(() => {
  window.addEventListener('message', messageIDE)
})

function messageIDE(event: MessageEvent<any>) {
  // 删除事件
  if (event.data.type === 'REMOVE_IDE_METHOD') {
    if (monacoInstance) {
      // 删除code中的，eventName方法
      const eventName = event.data.payload
      const oldCode = monacoInstance.getValue()
      const newCode = removeMethodFromVueOptions(oldCode, eventName)
      monacoInstance?.setValue(beautify.js(newCode, beautifyCode.js))
      workbench.pageJs = newCode
    }
  }

  // 外部更新脚本IDE模式
  else if (event.data.type === 'UPDATE_IDE_PAGE_JAVASCRIPT') {
    const { code = '', focusName = '' } = event.data.payload
    if (monacoInstance) {
      //只读模式只需要覆盖.
      if (!code) {
        monacoInstance.setValue(beautify.js(workbench.pageJs, beautifyCode.js) || '')
      }

      // focusName有值则聚焦到具体方法
      if (focusName) {
        focusOnMethod(focusName)
      }
    } else {
      workbench.ideModel = 'var'
    }
  }

  // 外部聚焦到脚本IDE模式
  else if (event.data.type === 'FOCUS_IDE_METHOD') {
    focusOnMethod(event.data.payload)
  }
}

function focusOnMethod(methodName: string) {
  if (!monacoInstance || !methodName) return;

  // 核心：把光标设置为【该行最后一列】
  monacoInstance.focus()

  return true;

}

// 脚本内容保存
function saveCode(): { msg: string } {
  // 更改事件名称 = 删除事件 + 增加页面级别事件.
  // 删除事件同步组件UI
  // 事件代码格式不正确时不保存同步代码.
  if (!monacoInstance) return { msg: '编辑器不存在' }

  const code = monacoInstance.getValue()
  let msg = ''

  // 校验js字符串的合法性
  const valid = validateWithBabel(code)
  if (!valid.isValid) {
    msg = valid.message
  }
  // 必须是 const mpl = {} 格式
  else if (code.trim().indexOf('const mpl = {') !== 0) {
    msg = '代码必须是 const mpl = {} 格式'
  }

  if (msg) return { msg }

  // 根据methodsCode的增加删除同步NodeList节点. 更新事件左侧目录节点.
  // 会更新画板. 优化为只更新画板一次
  const parsed = parseVueOptions(code)
  // 同步更新nodeList事件
  workbench.updateNodeList(updateNodeListByMethodsCode(workbench.nodeList, parsed))
  // 同步更新eventList事件列表
  workbench.updateEventList(updateEventListByNodeList(parsed, workbench.eventList))

  return { msg: '' }
}

defineExpose({
  saveCode
})

// 销毁
onUnmounted(() => {
  monacoInstance?.dispose()
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