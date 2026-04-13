<script setup lang="ts">
import * as beautify from 'js-beautify'
import { onMounted, onUnmounted, ref } from 'vue'
import { beautifyCode } from '@mpl/const'
import { viewStore } from '@mpl/store'
import { EditorView } from '@codemirror/view'
import { EditorState } from "@codemirror/state"
import { defaultCodeMirrorExtensions } from '@mpl/libs'

const modelValue = defineModel<string>({ default: '' })
const emit = defineEmits(['change', 'close'])
const editorRef = ref(null)
let editorView: EditorView | null = null

onUnmounted(() => {
  editorView?.destroy()
})

onMounted(() => {
  const state = EditorState.create({
    doc: beautify.js(modelValue.value, beautifyCode.js),
    extensions: defaultCodeMirrorExtensions()
  })

  editorView = new EditorView({
    state,
    parent: editorRef.value!
  })
})

function saveIDE() {
  emit('change', editorView!.state.doc.toString())
}

function cancelIDE() {
  viewStore().$patch({
    subBoxSettingModel: '',
    subBoxSettingModelId: ''
  })
}
</script>
<template>
  <div class="ide-json--box mpl-scroll-none">
    <div ref="editorRef" class="code-editor" />
    <!-- 全屏 -->
    <div class="icon-quanping1 icon full-btn" />
    <!-- 下载 -->
    <div class="mpl-btn mr-5 icon icon-xiazaidaoru download-btn" />
    <!-- 导入 -->
    <div class="icon-quanping1 icon full-btn" />

    <button type="button" class="save-btn" @click="saveIDE">
      保存
    </button>
    <button type="button" class="cancel-btn" @click="cancelIDE">
      取消
    </button>
  </div>
</template>

<style lang="less" scoped>
.ide-json--box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  > .code-editor {
    width: 100%;
    height: 100%;
  }

  > .full-btn {
    position: absolute;
    right: 20px;
    top: 10px;
    z-index: 100;
    font-size: 26px;
    color: #909399;

    &:hover {
      color: var(--primary-color);
    }
  }

  > .download-btn {
    position: absolute;
    right: 60px;
    top: 10px;
    z-index: 100;
    font-size: 26px;
    color: #909399;

    &:hover {
      color: var(--primary-color);
    }
  }

  > .save-btn {
    position: absolute;
    right: 20px;
    bottom: 10px;
    z-index: 100;
    cursor: pointer;
    padding: 5px 10px;
    font-size: 14px;
    background: var(--primary-color);
    color: #fff;
    border: 1px solid var(--primary-color);
    border-radius: 3px;
    &:hover {
      outline: 1px solid var(--primary-color)
    }
  }

  > .cancel-btn {
    position: absolute;
    right: 80px;
    bottom: 10px;
    z-index: 100;
    cursor: pointer;
    font-size: 14px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    &:hover {
      outline: 1px solid var(--primary-color)
    }
  }
}
</style>
