<script lang="ts" setup>
import * as beautify from 'js-beautify'
import { onMounted, ref, onUnmounted } from 'vue'
import { beautifyCode, monacoFormatter } from '@mpl/const'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'

const monacoSchemaRef = ref(null)
let monacoTemplateInstance: null | editor.IStandaloneCodeEditor = null

const props = defineProps<{ value: any }>()

onMounted(() => {
  if (!monacoSchemaRef.value) {
    return
  }

  monacoTemplateInstance = monacoEditor.editor.create(
    monacoSchemaRef.value,
    Object.assign(monacoFormatter.js, {
      language: 'json',
      value: beautify.js(JSON.stringify(props.value), beautifyCode.js)
    })
  )
})

onUnmounted(() => {
  monacoTemplateInstance?.dispose()
})
</script>
<template>
  <div ref="monacoSchemaRef" class="monaco-schema-box">
    <div class="auxiliary-button-group">
      <button type="button" class="mr-5">
        下载
      </button>
      <button type="button">
        导入
      </button>
    </div>
  </div>
</template>
<style lang="less">
.auxiliary-button-group {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  box-sizing: border-box;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}

.monaco-schema-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>