<script lang="ts" setup>
import * as beautify from 'js-beautify'
import { onMounted, ref, onUnmounted, watch } from 'vue'
import { beautifyCode } from '@mpl/const'
import { EditorView } from '@codemirror/view'
import { EditorState } from "@codemirror/state"
import { defaultCodeMirrorExtensions } from '@mpl/libs'

const editorRef = ref(null)
let editorView: EditorView | null = null
const props = defineProps<{ value: any }>()

watch(() => props.value, (newVal) => {
  if (!editorView) return
  editorView.dispatch({
    changes: {
      from: 0,
      to: editorView.state.doc.length,
      insert: beautify.js(JSON.stringify(newVal), beautifyCode.js)
    },
  })
})

onMounted(() => {
  console.log(props.value)
  const state = EditorState.create({
    doc: beautify.js(JSON.stringify(props.value), beautifyCode.js),
    extensions: defaultCodeMirrorExtensions()
  })

  editorView = new EditorView({
    state,
    parent: editorRef.value!
  })
})

onUnmounted(() => {
  editorView?.destroy()
})
</script>
<template>
  <div class="schema-box">
    <div ref="editorRef" class="code-editor" />
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
<style lang="less" scoped>
.auxiliary-button-group {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}

.schema-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .code-editor {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>