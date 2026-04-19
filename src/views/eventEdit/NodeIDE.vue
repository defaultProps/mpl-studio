<script setup lang="ts">
import { ref } from 'vue'
import CodeEditorJs from './CodeEditorJs.vue'
import CodeEditorVar from './CodeEditorVar.vue'
import { workbenchStore } from '@mpl/store'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

interface CodeEditorJsAPI {
  saveCode(): { msg: string }
}

const isSaveLoading = ref(false)
const errorMsg = defineModel<string>('errorMsg', { default: '' })
const workbench = workbenchStore()
const editorJsRef = ref<CodeEditorJsAPI>()

function saveMethod() {
  if (workbench.ideModel === 'javascript') {
    const { msg } = editorJsRef.value!.saveCode()
    if (msg) {
      errorMsg.value = msg
    } else {
      errorMsg.value = ''
    }
  }
}

// 格式化代码
function formatCode() {
  //
}

</script>

<template>
  <div class="node-code-pane--container">
    <!-- 变量 -->
    <CodeEditorVar v-show="workbench.ideModel === 'var'" />
    <!-- 脚本 -->
    <CodeEditorJs v-show="workbench.ideModel === 'javascript'" ref="editorJsRef" />
    <!-- 保存按钮组 -->
    <div v-if="workbench.ideModel === 'javascript'" class="btn-group">
      <button class="validate-btn" type="button" @click="formatCode">
        格式化
      </button>
      <button class="save-btn" type="button" @click="saveMethod">
        <i v-if="isSaveLoading" class="icon icon-loading" />
        <i v-else-if="errorMsg" style="color:#c3002f" class="icon icon-close" />
        <i v-else class="icon icon-check" />
        保存
      </button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.node-code-pane--container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  flex: 1;

  .node-ide {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;

    .cm-editor {
      width: 100%;
      height: 100%;
    }
  }

  .btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 80px;
    bottom: 10px;
    z-index: 10;

    button {
      padding: 4px 10px;
      font-size: 14px;
      border-radius: var(--radius-4);
      cursor: pointer;

      +button {
        margin-left: 5px;
      }

      &.validate-btn {
        color: #1e1e1e;
        background: #fff;
        border: 1px solid #1e1e1e;
      }

      &.save-btn {
        color: #f0f0f0;
        background: #1e1e1e;
        border: 1px solid #1e1e1e;
      }

      &:hover {
        outline: 1px solid #1e1e1e;
      }
    }
  }
}
</style>