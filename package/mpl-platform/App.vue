<script setup lang="ts">
  import mpl from '@mpl/node'
  import { ref } from 'vue'
  import { mplIframePostMessage } from '@mpl/const'
  import MaskLoading from './components/MaskLoading.vue'
  import "./platform-size.less"
  import type { File } from '@mpl/typings'
  import { workbenchStore, projectStore } from '@mpl/store'
  import { newCid } from "@mpl/const";

  const workbench = workbenchStore()
  const project = projectStore()
  const loading = ref<boolean>(true)

  window.addEventListener(
    'message',
    (e) => {
      const { type, payload } = e.data

      if (type === 'DELETE_NODE_ACTION')
        workbench.deleteNode(payload.cid)

      if (type === 'CLICK_MENU_ACTION') {
        let selectFile: File | null = null

        project.projectTree.forEach((p: any) => {
          p.children.forEach((file: any) => {
            if (file.id === payload.pageId)
              selectFile = file
          })
        })

        if (selectFile)
          project.updateActiveFile(selectFile, true)

        window.parent.document.body.click()
      }

      if (type === 'DROP_NODE_ACTION') {
        const targetNode = mpl.mapNodeSetting[payload.tag]

        if (targetNode) {
          const newNode = targetNode.newNode(newCid())
          workbench.addNode(newNode, payload.cid)
          mplIframePostMessage.workbench.updateWorkbenchNodeList(workbench.nodeList)
        }
      }

      if (type === 'SCROLL_TOP_WORKBENCH')
        document.querySelector('#workbenchIframeScroll')?.scroll(0, 0)

      if (type === 'SELECT_NODE_BY_CID')
        workbench.selectNodeById(payload.cid)

      if (type === 'UPDATE_NODE_LIST') {
        workbench.nodeList = JSON.parse(payload.nodeList)
        console.log(workbench.nodeList, JSON.parse(payload.nodeList))
      }
    },
    false
  )

  function loadIframe() {
    loading.value = false
    mplIframePostMessage.workbench.initPlatformMenu(project.projectTree)
    project.updateActiveFile(project.activeFile, false)
  }

</script>
<template>
  <MaskLoading v-if="loading" />

  <!-- 草稿 -->
  <iframe v-if="workbench.visibleDraft" src="/src/iframe/draft/index.html" name="draftIframe" @load="loadIframe"
          frameBorder="0" />

  <!-- mpl 标准桌面应用中台 -->
  <iframe id="workbench" v-if="workbench.activePlatform.includes('MPL-DFN')"
          src="/package/mpl-platform/mpl-dfn/workbench/index.html" name="workbench" @load="loadIframe" />

  <!-- mpl 标准大屏展示平台 -->
  <iframe v-if="workbench.activePlatform.includes('MPL-LPT')" id="workbench"
          src="/package/mpl-platform/mpl-sms/index.html" name="workbench" @load="loadIframe" />
  <!-- mpl 标准移动端平台 -->
  <iframe v-if="workbench.activePlatform.includes('MPL-MHS')" id="workbench"
          sandbox="allow-same-origin allow-forms allow-downloads-without-user-activation allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts"
          seamless src="/package/mpl-platform/mpl-app/workbench/index.html" name="workbench" @load="loadIframe" />

  <!-- 注解 -->
  <iframe v-if="workbench.visibleNote" src="/src/iframe/annotation/index.html" name="annotationIframe"
          @load="loadIframe" frameBorder="0" />

  <!-- 评论 -->
  <iframe v-if="workbench.visibleComment" src="/src/iframe/comment/index.html" name="commentIframe" @load="loadIframe"
          frameBorder="0" />

  <!-- 事件流 -->
  <iframe v-if="workbench.visibleEventFlow" src="/src/iframe/eventFlow/index.html" name="eventFlowIframe"
          @load="loadIframe" frameBorder="0" />
</template>

<style lang="less" scoped>
  iframe {
    background-color: var(--color-7);
    box-shadow: 0 0 0 1px #b1b3b8;
    border: none;

    +iframe {
      margin-left: 20px;
    }
  }
</style>