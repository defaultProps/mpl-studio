<template>
  <div ref="monacoRef" />
</template>

<script setup lang="ts">
import * as beautify from 'js-beautify'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { beautifyCode, monacoFormatter } from '@mpl/const'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'

const monacoRef = ref()
let monacoInstance: null | editor.IStandaloneCodeEditor = null

const modelValue = defineModel<string>({ default: '' })
watch(modelValue, (val) => {
  if (monacoInstance) {
    monacoInstance.setValue(beautify.js(val, beautifyCode.js))
  }
})

onUnmounted(() => {
  monacoInstance?.dispose()
})

onMounted(() => {
  monacoInstance = monacoEditor.editor.create(
    monacoRef.value,
    {
      ...monacoFormatter.js,
      lineNumbers: 'off',
      folding: false,
      value: beautify.js(modelValue.value, beautifyCode.js)
    }
  )
})
</script>
