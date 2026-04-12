<script lang="ts" setup>
import * as beautify from 'js-beautify'
import { onMounted, ref, onUnmounted, watch } from 'vue'
import { beautifyCode, monacoFormatter } from '@mpl/const'
import { workbenchStore } from '@mpl/store'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'

const monacoSchemaRef = ref(null)
let monacoTemplateInstance: null | editor.IStandaloneCodeEditor = null

const workbench = workbenchStore()

watch(() => workbench.activeNode, (activeNode) => {
  const beautifyCodeValue = beautify.js(JSON.stringify(activeNode || {}), beautifyCode.js)
  monacoTemplateInstance?.setValue(beautifyCodeValue)
})

onMounted(() => {
  if (!monacoSchemaRef.value) {
    return
  }

  monacoTemplateInstance = monacoEditor.editor.create(
    monacoSchemaRef.value,
    Object.assign(monacoFormatter.js, {
      value: beautify.js(JSON.stringify({}), beautifyCode.js)
    })
  )
})

onUnmounted(() => {
  monacoTemplateInstance?.dispose()
})
</script>
<template>
  <div class="stash-node-pane--container">
    <div class="auxiliary-button-group">
      <button class="mpl-btn mr-5">
        下载
      </button>
      <button class="mpl-btn">
        导入
      </button>
    </div>
    <div ref="monacoSchemaRef" class="monaco-schema-box" />
  </div>
</template>

<style lang="less" scoped>
.stash-node-pane--container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;

  .auxiliary-button-group {
    position: absolute;
    z-index: 10;
    left: 20px;
    top: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .monaco-schema-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
