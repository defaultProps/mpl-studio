<script setup lang="ts">
import { mapNodeSetting } from '@mpl/node'
import { onMounted, ref, watch } from 'vue'
import type { Node } from '@mpl/typings'
import { mplIframePostMessage } from '@mpl/const'
import MaskLoading from './components/MaskLoading.vue'
import './platform-size.less'
import type { File } from '@mpl/typings'
import { workbenchStore, projectStore, viewStore } from '@mpl/store'
import { newCid, hasMultipleChildrenInCollapse } from '@mpl/libs'
import keymaster from 'keymaster'
import { platformFrame } from './core/util'

const workbench = workbenchStore()
const project = projectStore()
const view = viewStore()
const loading = ref<boolean>(true)
const noteIframe = ref(null)
const visibleNote = ref(workbench.visibleNote)
const noteIframeSrc = ref('/src/iframe/annotation/index.html')

// 初始化快捷键绑定
onMounted(() => {
  // 删除节点
  // keymaster('backspace', function () {
  //   platformFrame.deleteActiveNode()
  // });
  keymaster('delete', function () {
    platformFrame.deleteActiveNode()
  })
})

window.addEventListener(
  'message',
  e => {
    const { type, payload } = e.data

    if (type === 'DELETE_NODE_ACTION') {
      workbench.deleteNode(payload.cid)
    }

    else if (type === 'DELETE_ACTIVE_NODE_ACTION') {
      workbench.deleteActiveNode()
    }

    else if (type === 'UPDATE_NODE_PROP_MESSAGE') {
      workbench.updateNodeProp(payload.cid, payload.prop)
    }

    else if (type === 'COPY_ACTIVE_NODE_TO_RIGHT_NODE_ACTION') {
      //
    }
    else if (type === 'COPY_TO_RIGHT_NODE_ACTION') {
      workbench.copyActiveNodeToRightNode(payload.cid)
    }

    else if (type === 'MOVE_TO_LEFT_ACTION') {
      //
    }

    else if (type === 'MOVE_TO_RIGHT_ACTION') {
      //
    }

    else if (type === 'DELETE_COLLAPSE_OPTION_CONFIRM') {
      const result = hasMultipleChildrenInCollapse(workbench.nodeList, payload.cid, payload.paneValue)
      const workbenchFrame = window.frames.workbench

      if (workbenchFrame) {
        workbenchFrame.postMessage(
          {
            type: 'DELETE_COLLAPSE_OPTION_RECEIVE',
            payload: {
              isMultipleCollapseChildren: result
            }
          },
          '*'
        )
      }
    }

    else if (type === 'CLICK_MENU_ACTION') {
      let selectFile: File | null = null

      project.projectTree.forEach((p: any) => {
        p.children.forEach((file: any) => {
          if (file.id === payload.pageId) selectFile = file
        })
      })

      if (selectFile) project.updateActiveFile(selectFile, true)

      window.parent.document.body.click()
    }

    else if (type === 'DROP_NODE_ACTION') {
      const targetNode = mapNodeSetting[payload.tag]

      if (targetNode) {
        const cid = newCid()
        const newNode = targetNode.newNode(cid)
        workbench.addNode(newNode, payload.cid)

        console.log(newNode, payload.cid)
      }
    }

    else if (type === 'SELECT_LAYOUT_MESSAGE') {
      view.$patch({
        visibleLayoutDialog: true
      })
    }

    else if (type === 'DROP_COLLAPSE_NODE_ACTION') {
      const targetNode = mapNodeSetting[payload.tag]
      if (targetNode) {
        const cid = newCid()
        const newNode = targetNode.newNode(cid)

        let isFindNode = false
        function findTargetNode(nodes: Node[]) {
          if (isFindNode) {
            return
          }
          nodes.forEach((v, i) => {
            if (v.cid === payload.cid) {
              // paneId
              const targetNode: any = nodes[i]
              const pane = targetNode.itemList.find((v: any) => v.value === payload.paneId)

              if (pane) {
                pane.mpl_children.push(newNode)
              }

              // 新增新节点
              workbench.selectNodeByCid(cid)
              isFindNode = true
              return
            }
            if (Array.isArray(v.mpl_children)) {
              findTargetNode(v.mpl_children)
            }
          })
        }
        findTargetNode(workbench.nodeList)
      }
    }


    else if (type === 'DROP_SLOT_NODE_ACTION') {
      const targetNode = mapNodeSetting[payload.tag]

      if (targetNode) {
        const cid = newCid()
        const newNode = targetNode.newNode(cid)

        let isFindNode = false
        function findTargetNode(nodes: Node[]) {
          if (isFindNode) {
            return
          }
          nodes.forEach((v, i) => {
            if (v.cid === payload.cid) {
              let targetNode: any = nodes[i]
              const pos = `${payload.pos[0]}-${payload.pos[1]}`
              let index = Object.keys(targetNode.layoutMapNode).indexOf(pos)

              if (index >= 0) {
                // 存在则删除旧节点
                workbench.deleteNode(targetNode.layoutMapNode[pos])
                targetNode.layoutMapNode[pos] = cid
              } else {
                targetNode.layoutMapNode[pos] = cid
              }
              // 新增新节点
              workbench.addNode(newNode, payload.cid)
              isFindNode = true
              return
            }
            if (Array.isArray(v.mpl_children)) {
              findTargetNode(v.mpl_children)
            }
          })
        }
        findTargetNode(workbench.nodeList)
      }
    }

    else if (type === 'SELECT_NODE_BY_CID') {
      workbench.selectNodeByCid(payload.cid)
    }

    else if (type === 'UPDATE_NODE_LIST') {
      workbench.updateNodeList(JSON.parse(payload.nodeList))
    }

    else if (type === 'REMOVE_NODE') {
      workbench.deleteNode(JSON.parse(payload.nodeCid))
    }

    else if (type === 'INSERT_NODE_ACTION') {
      workbench.addNode(payload.node)
      // workbench.selectNodeByCid(payload.node.cid)
    }
  },
  false
)

function loadIframe() {
  loading.value = false
  mplIframePostMessage.workbench.initPlatformMenu(project.projectTree)
  mplIframePostMessage.workbench.updateNodeListWorkbench(workbench.nodeList)
}

watch(() => workbench.visibleNote, (newVal) => {
  const iframe: any = noteIframe.value;
  if (!iframe) return;

  if (newVal) {
    visibleNote.value = true
    noteIframeSrc.value = '/src/iframe/annotation/index.html';

  } else {
    // 关键步骤 1: 清空 src，停止加载
    iframe.value.src = 'about:blank';
    // 关键步骤 2: 尝试清理内部文档内容 (仅限同域，跨域会报错)
    const contentWindow = iframe.contentWindow;
    if (contentWindow) {
      contentWindow.document.write('');
      contentWindow.document.close();
      contentWindow.close(); // 关闭窗口对象，释放内存
    }
    visibleNote.value = false
  }
})
</script>
<template>
  <MaskLoading v-if="loading" />

  <!-- 草稿 -->
  <iframe v-if="workbench.visibleDraft" src="/src/iframe/draft/index.html" name="draftIframe" frameBorder="0"
    @load="loadIframe" />

  <!-- mpl 标准桌面应用中台 -->
  <iframe v-if="workbench.activePlatform.includes('MPL-DFN')" id="workbench"
    :class="`size_${workbench.workbenchSize.replace('*', 'x')}`"
    src="/package/mpl-platform/mpl-dfn/workbench/index.html" name="workbench" @load="loadIframe" />

  <!-- mpl 标准大屏展示平台 -->
  <!-- <iframe v-if="workbench.activePlatform.includes('MPL-LPT')" id="workbench"
    src="/package/mpl-platform/mpl-sms/index.html" name="workbench" @load="loadIframe" /> -->
  <!-- mpl 标准移动端平台 -->
  <!-- <iframe v-if="workbench.activePlatform.includes('MPL-MHS')" id="workbench"
    sandbox="allow-same-origin allow-forms allow-downloads-without-user-activation allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts"
    seamless src="/package/mpl-platform/mpl-app/workbench/index.html" name="workbench" @load="loadIframe" /> -->
  <!-- 注解/评论 -->
  <iframe v-if="visibleNote" ref="noteIframe" :src="noteIframeSrc" name="annotationIframe" frameBorder="0"
    @load="loadIframe" />
</template>

<style lang="less" scoped>
iframe {
  background: #fff;
  box-shadow: 0 0 0 1px #b1b3b8;
  border: none;
  // margin: 350px;

  +iframe {
    margin-left: 20px;
  }
}
</style>
