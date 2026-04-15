<script setup lang="ts">
import * as beautify from 'js-beautify'
import { onMounted, onUnmounted } from 'vue'
import { beautifyCode, monacoFormatter } from '@mpl/const'
import { viewStore } from '@mpl/store'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'

const modelValue = defineModel<string>({ default: '' })
const emit = defineEmits(['change', 'close'])

let monacoInstance: null | editor.IStandaloneCodeEditor = null

onUnmounted(() => {
  monacoInstance?.dispose()
})

onMounted(() => {
  const dom = document.getElementById('IDE_JSON')

  if (dom) {
    monacoInstance = monacoEditor.editor.create(
      dom,
      Object.assign(monacoFormatter.js, {
        value: beautify.js(modelValue.value, beautifyCode.js),
        readOnly: false,
        fontSize: 13
      })
    )
  }
})

function saveIDE() {
  emit('change', monacoInstance?.getValue())
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
    <div id="IDE_JSON" />
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

  #IDE_JSON {
    width: 100%;
    height: 100%;
  }

  .full-btn {
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

  .download-btn {
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

  .save-btn {
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

  .cancel-btn {
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
