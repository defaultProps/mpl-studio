<script setup lang="ts">
  import { nextTick, onMounted, ref, watch, onUnmounted } from 'vue'
  import * as monaco from 'monaco-editor'
  import { editor } from 'monaco-editor'
  import * as beautify from 'js-beautify'
  import { beautifyCode, monacoIDE, workbenchNodeCodeTest, ideFooterOptions, ideToolOptions } from '@mpl/const'
  import { mapNodeSetting } from "@mpl/node"
  import babelParser from '@babel/parser'
  import ToolsAPI from './toolPane/ToolsAPI.vue'
  import { workbenchStore, viewStore } from '@mpl/store'

  const store = workbenchStore()
  const coreView = viewStore()
  let monacoTemplateInstance: null | monaco.editor.IStandaloneCodeEditor = null
  let monacoVarsInstance: null | monaco.editor.IStandaloneCodeEditor = null
  const eventListCodeInstance: any = null
  const ideModel = ref<string>('template')
  const ideVarsModel = ref<string>('evtCode')

  watch(
    () => coreView.workbenchFooterToolSize,
    () => {
      nextTick(() => {
        monacoTemplateInstance?.layout()
        eventListCodeInstance?.layout()
      })
    }
  )

  // left ide
  onMounted(() => {
    const dom = document.getElementById('monacoNodeCodeToolPaneRef')
    const _temp = mapNodeSetting[store.activeNode?.tag || '']
    ideModel.value = 'template'

    if (dom && _temp) {
      monacoTemplateInstance = monaco.editor.create(
        dom,
        Object.assign(monacoIDE.html, {
          value: beautify.html(_temp.node.getTemplateCode(store.activeNode), beautifyCode.html)
        })
      )
    }
  })

  // right ide
  onMounted(() => {
    const dom = document.getElementById('monacoNodeCodePaneVarsRef')
    const _temp = mapNodeSetting[store.activeNode?.tag || '']
    ideVarsModel.value = 'evtCode'

    if (dom && _temp) {
      monacoVarsInstance = monaco.editor.create(
        dom,
        Object.assign(monacoIDE.js, {
          value: beautify.js(workbenchNodeCodeTest.evtCode, beautifyCode.js),
          readOnly: false
        })
      )
    }
  })

  // 卸载相关资源实例
  onUnmounted(() => {
    monacoTemplateInstance?.dispose()
    monacoVarsInstance?.dispose()
  })

  function changeIDEModel(val: string) {
    ideModel.value = val
    const _temp = mapNodeSetting[store.activeNode?.tag || '']
    if (monacoTemplateInstance && _temp) {
      if (val === 'template') {
        monacoTemplateInstance.setValue(
          beautify.html(_temp.node.getTemplateCode(store.activeNode), beautifyCode.html)
        )
        monaco.editor.setModelLanguage(monacoTemplateInstance.getModel() as editor.ITextModel, 'html')
      }
      else if (val === 'nodeVar') {
        monacoTemplateInstance.setValue(
          beautify.js(_temp.node.getNodeVar(store.activeNode), beautifyCode.js)
        )
        monaco.editor.setModelLanguage(monacoTemplateInstance.getModel() as editor.ITextModel, 'javascript')
      }
      else if (val === 'globalVar') {
        monacoTemplateInstance.setValue(
          beautify.js(workbenchNodeCodeTest.globalVars, beautifyCode.js)
        )
        monaco.editor.setModelLanguage(monacoTemplateInstance.getModel() as editor.ITextModel, 'javascript')
      }
      else if (val === 'globalMethod') {
        monacoTemplateInstance.setValue(
          beautify.js(workbenchNodeCodeTest.globalMethod, beautifyCode.js)
        )
        monaco.editor.setModelLanguage(monacoTemplateInstance.getModel() as editor.ITextModel, 'javascript')
      }
      monacoTemplateInstance.setScrollPosition({ scrollTop: 0, scrollLeft: 0 })
    }
  }

  function changeIDEVarsModel(val: string) {
    ideVarsModel.value = val
    if (monacoVarsInstance) {
      if (val === 'evtCode') {
        monacoVarsInstance.setValue(
          beautify.js(workbenchNodeCodeTest.evtCode, beautifyCode.js)
        )
        monaco.editor.setModelLanguage(monacoVarsInstance.getModel() as editor.ITextModel, 'javascript')
      }
      if (val === 'style') {
        monacoVarsInstance.setValue(
          beautify.css(workbenchNodeCodeTest.style, beautifyCode.css)
        )
        monaco.editor.setModelLanguage(monacoVarsInstance.getModel() as editor.ITextModel, 'less')
      }
      monacoVarsInstance.setScrollPosition({ scrollTop: 0, scrollLeft: 0 })
    }
  }

  function saveCode() {
    if (monacoVarsInstance) {
      if (ideVarsModel.value === 'evtCode') {
        babelParser.parse(monacoVarsInstance.getValue())
      }
    }
  }
</script>

<template>
  <div class="node-code-pane--container">
    <div class="left-box" :class="coreView.workbenchFooterIDESize">
      <div class="header-btn-group">
        <button v-for="item in ideFooterOptions" :key="item.value" class="mpl-btn mr-2"
                :class="[{ 'is-active': item.value === ideModel }]" @click="changeIDEModel(item.value)">
          {{ item.label }}
        </button>
      </div>
      <div id="monacoNodeCodeToolPaneRef" class="node-ide" />
    </div>
    <div class="sidebar-tool--box">
      <div v-for="item in ideToolOptions" :key="item.value" class="tool-btn" :title="item.label"
           :class="[{ active: item.value === ideVarsModel }]" @click="changeIDEVarsModel(item.value)">
        {{ item.label }}
      </div>
      <div style="flex: 1;"></div>
      <button v-if="coreView.workbenchFooterIDESize !== 'large'" class="mpl-btn icon icon-arrow-right-filling"
              @click="coreView.updateWorkbenchFooterIDESize('up')" />
      <button v-if="coreView.workbenchFooterIDESize !== 'small'" class="mpl-btn icon icon-arrow-left-filling"
              @click="coreView.updateWorkbenchFooterIDESize('down')" />
      <div class="btn-group">
        <button class="mpl-btn plus-btn">格式化&校验</button>
        <button class="mpl-btn plus-btn icon icon-check save-btn ml-2" @click="saveCode">保存</button>
      </div>
    </div>
    <div id="monacoNodeCodePaneVarsRef" class="variable-ide" />
    <ToolsAPI />
  </div>
</template>

<style lang="less" scoped>
  .node-code-pane--container {
    overflow: hidden auto;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    .left-box,
    .right-box {
      height: 100%;

      .node-ide {
        width: 100%;
        height: calc(100% - 30px);
        overflow: hidden;
      }

      .header-btn-group {
        width: 100%;
        background: var(--color-6);
        border-top: 1px solid #606266;
        box-sizing: border-box;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 0 3px;

        button {
          font-size: 12px;
          background: transparent;
          color: #ccc;

          &.is-active {
            color: var(--primary-color);
          }
        }
      }
    }

    .left-box {
      width: 330px;

      &.small {
        width: 330px;
      }

      &.medium {
        width: 430px;
      }

      &.large {
        width: 530px;
      }
    }

    .sidebar-tool--box {
      width: 26px;
      background: var(--color-6);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      height: 100%;
      border-right: 1px solid #4d4a4a;
      border-left: 1px solid #4d4a4a;
      box-sizing: border-box;
      position: relative;
      padding-bottom: 3px;
      box-sizing: border-box;

      .btn-group {
        position: absolute;
        z-index: 100;
        bottom: 20px;
        left: 35px;
        display: flex;
        width: 150px;

        .save-btn {
          background: #2f7f79;
          color: var(--color-7);
          border: 1px solid var(--primary-color);
          border-radius: 2px;
        }
      }

      .tool-btn {
        color: var(--color-1);
        cursor: default;
        text-orientation: sideways-right;
        writing-mode: tb-rl;
        padding: 10px 0;
        font-size: 12px;
        display: inline-block;
        width: 26px;
        line-height: 26px;
        transform: rotate(-180deg);
        user-select: none;

        &.active {
          color: #2f7f79;
          position: relative;
          font-weight: 600;
          background-color: #0000006b;

          &::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background-color: #2f7f79;
          }
        }
      }
    }

    .variable-ide {
      height: 100%;
      overflow: hidden;
      flex: 1;
    }
  }
</style>
