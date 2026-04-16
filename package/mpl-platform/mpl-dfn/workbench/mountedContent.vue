<script setup lang="ts">
import { onMounted, provide, readonly, ref, onUnmounted, watch } from 'vue'
import {
  mapNodeSetting,
  initNode,
  VISIBLE_BTN_GROUP,
  ACTIVE_NODE,
  IS_DRAGGER,
  DRAG_START_NODE,
  WorkbenchRootNode,
} from '@mpl/node'
import { Node, NodePos } from '@mpl/typings'
import { platformFrame } from '../../core/util'
import { dragOverElement } from '../../core/dragOverElement'
import { useThrottleFn } from '@vueuse/core'
import ContextMenu from '@imengyu/vue3-context-menu'

const emits = defineEmits(['menu'])
const nodeList = ref<Node[]>([])
const activeNode = ref<Node | null>(null)
const isDragging = ref<boolean>(false)
const isInnerNodeDragging = ref<boolean>(false)
const isErrorDragging = ref<boolean>(false)
const isGlobalMask = ref<boolean>(false)
const defaultActiveMenu = ref<string>('')
const dragStartNode = ref<Node | null>(null)
const visibleNodeOutline = ref<boolean>(false)
const visibleGuildLine = ref<boolean>(true)
const visibleBtnGroup = ref<boolean>(false)
const canFocusActiveNode = ref<boolean>(false) // 某些情况需要聚焦选中节点

function closeContextmenu() {
  ContextMenu.closeContextMenu()
}

const closeContextmenuThrottle = useThrottleFn(closeContextmenu, 300)

onMounted(() => {
  window.addEventListener('wheel', closeContextmenuThrottle)
  window.addEventListener('resize', closeContextmenuThrottle)
  window.addEventListener('click', closeContextmenu)
})

onUnmounted(() => {
  window.removeEventListener('wheel', closeContextmenuThrottle)
  window.removeEventListener('resize', closeContextmenuThrottle)
  window.removeEventListener('click', closeContextmenu)
})

watch(() => visibleNodeOutline.value, (newVal) => {
  if (newVal) {
    document.body.classList.add('callout')
  } else {
    document.body.classList.remove('callout')
  }
})

// 聚焦可视区域-选中节点
function focusScrollIntoViewActiveNode() {
  if (canFocusActiveNode.value && activeNode.value) {
    setTimeout(() => {
      document.querySelector('.component-wrapper.target > .el-form-item')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }, 0);
  }
  canFocusActiveNode.value = false
}

onMounted(() => {
  window.addEventListener(
    'message',
    e => {
      const obj = e.data

      if (obj.type === 'UPDATE_ACTIVE_NODE') {
        activeNode.value = obj.payload.node ? JSON.parse(obj.payload.node) : null
        focusScrollIntoViewActiveNode()
      }

      if (obj.type === 'UPDATE_NODE_LIST') {
        nodeList.value = JSON.parse(obj.payload.nodeList)[0]!.mpl_children || []
      }

      if (obj.type === 'RESET_NODE_LIST') {
        activeNode.value = null
        dragStartNode.value = null
        isErrorDragging.value = false
        isInnerNodeDragging.value = false
        isDragging.value = false
        isGlobalMask.value = false
      }

      // 画板尺寸变化
      if (obj.type === 'CHANGE_WORKBENCH_SIZE') {
        console.log(obj.payload.size)
      }

      if (obj.type === 'UPDATE_ACTIVE_PAGE') emits('menu', obj.payload.id)

      if (obj.type === 'GUILD_LINE_STATUS_ACTION') {
        visibleGuildLine.value = obj.payload.visible || false
        if (visibleGuildLine.value) {
          document.body.classList.add('is-guild')
        } else {
          document.body.classList.remove('is-guild')
        }
      }

      if (obj.type === 'NODE_CALLOUT_LINE_STATUS') visibleNodeOutline.value = obj.payload.visible || false

      if (obj.type === 'VISIBLE_BTN_GROUP_ACTION') visibleBtnGroup.value = obj.payload.visible || false

      if (obj.type === 'PAGE_CHANGE') defaultActiveMenu.value = obj.payload.pageId

      // 开始拖动组件时，立即生成拖动组件的一系列数据。
      if (obj.type === 'DRAG_START_ELEMENT') {
        dragStartNode.value = initNode(obj.payload.tag)
        isErrorDragging.value = false
        isInnerNodeDragging.value = false
        ContextMenu.closeContextMenu()

        // 拖动组件为弹窗类型时, 增加全局遮罩层.保证弹框一直处于最外层.
        if (['mpl-dialog', 'mpl-drawer'].includes(obj.payload.tag)) {
          isGlobalMask.value = true
        }
        if (dragStartNode.value) {
          const { w, h, minH } = dragStartNode.value.pos.pc

          window.mplHighlightBlockSize = [`w-${w}`, `${h === 0 ? minH : `h-${h}`}`]
        }
      }

      // 结束拖动, 释放临时数据
      if (obj.type === 'DRAG_END_ELEMENT') {
        dragStartNode.value = null
        isErrorDragging.value = false
        isInnerNodeDragging.value = false
        isGlobalMask.value = false
        ContextMenu.closeContextMenu()
      }
    },
    false
  )
})

onMounted(() => {
  visibleNodeOutline.value = true
  visibleBtnGroup.value = false
  dragStartNode.value = null
  isInnerNodeDragging.value = false
  isErrorDragging.value = false
  isGlobalMask.value = false
})

// 组件展示-右键菜单
// 后期替换为浏览器扩展支持右键, 保证右键能够全屏展示.
function nodeContextmenu(event: MouseEvent, node: Node) {
  const selectNode = mapNodeSetting[node.tag]
  platformFrame.selectNodeByCid(node.cid)

  if (selectNode) {

    ContextMenu.showContextMenu({
      x: event.x,
      y: event.y,
      items: [
        {
          label: '复制',
          icon: 'icon icon-document-copy',
          disabled: false,
        },
        {
          label: '向下复制',
          icon: 'icon icon-document-copy',
          disabled: false,
          onClick: () => {
            nodeCopyToRight(node.cid)
          }
        },
        {
          label: '剪切',
          icon: 'icon icon-jianqie2',
          disabled: false
        },
        {
          label: '往前移位',
          icon: 'icon icon-double-arrow-left',
          disabled: false,
          onClick: () => {
            nodeMoveLeftAction(node.cid)
          }
        },
        {
          label: '往后移位',
          icon: 'icon icon-double-arro-right',
          disabled: false,
          onClick: () => {
            platformFrame.moveRightNode(node.cid)
            canFocusActiveNode.value = true
          }
        },

        {
          label: '更多',
          icon: 'icon icon-more',
          disabled: false,
          children: [
            {
              label: '注解',
              icon: 'icon icon-pin2',
              disabled: false,
              onClick: () => {
                console.log('注解')
              }
            },
            {
              label: '格式化组件',
              icon: 'icon icon-refresh',
              disabled: false
            },
            {
              label: '移入草稿',
              icon: 'icon icon-refresh',
              disabled: false
            },
            {
              label: '替换',
              icon: 'icon icon-d-caret',
              disabled: false,
              children: [
                {
                  label: '基础输入框',
                  icon: 'icon icon-d-caret',
                  disabled: false
                },
                {
                  label: '密码输入框',
                  icon: 'icon icon-d-caret',
                  disabled: false
                },
                {
                  label: '单选框',
                  icon: 'icon icon-d-caret',
                  disabled: false
                },
                {
                  label: '多选框',
                  icon: 'icon icon-d-caret',
                  disabled: false
                },
                {
                  label: '下拉选择',
                  icon: 'icon icon-d-caret',
                  disabled: false
                },
                {
                  label: '时间选择',
                  icon: 'icon icon-d-caret',
                  disabled: false
                },
                {
                  label: '日期选择',
                  icon: 'icon icon-d-caret',
                  disabled: false
                },
                {
                  label: '日期范围选择',
                  icon: 'icon icon-d-caret',
                  disabled: false
                },
                {
                  label: '更多控件',
                  icon: 'icon icon-d-caret',
                  disabled: false
                }
              ]
            },
          ]
        },
        {
          label: '删除',
          icon: 'icon icon-close1',
          disabled: false,
          onClick: () => {
            nodeDelete(node.cid)
          }
        }
      ]
    });
  }
}

function nodeDelete(cid: string) {
  platformFrame.deleteNode(cid)
}

function nodeCopyToRight(cid: string) {
  platformFrame.copyToRightNode(cid)
  canFocusActiveNode.value = true
}

function nodeMoveLeftAction(cid: string) {
  platformFrame.moveLeftNode(cid)
  canFocusActiveNode.value = true
}

function nodeClick(cid: string) {
  isErrorDragging.value = false
  isGlobalMask.value = false
  isInnerNodeDragging.value = false
  ContextMenu.closeContextMenu()
  platformFrame.selectNodeByCid(cid)
}

// 新增插入节点
function dropNodePlus(cid: string) {
  document.getElementById('highlightBlock')?.remove()

  if (dragStartNode.value) {
    window.parent.postMessage({
      type: 'DROP_NODE_ACTION',
      payload: {
        cid,
        tag: dragStartNode.value.tag
      }
    })
    dragStartNode.value = null
  }
}

function dragover(el: DragEvent, pos?: NodePos) {
  if (el.dataTransfer) {
    el.dataTransfer.effectAllowed = 'move'
    el.dataTransfer.dropEffect = 'move'
  }

  if (dragStartNode.value) {
    dragOverElement(el, pos || dragStartNode.value.pos.pc)
    isErrorDragging.value = false
  } else {
    isErrorDragging.value = true
  }
}

function updateNodeProp(cid: string, prop: any) {
  platformFrame.updateNodePropMessage(cid, prop)
}

// 插槽容器增加组件
function dropNodeSlotPlus(cid: string, pos: [number, number]) {
  if (dragStartNode.value) {
    document.getElementById('highlightBlock')?.remove()
    window.parent.postMessage({
      type: 'DROP_SLOT_NODE_ACTION',
      payload: {
        cid,
        tag: dragStartNode.value.tag,
        pos
      }
    })
    dragStartNode.value = null
  }
}

// 折叠面板增加组件
function dropNodeCollapsePlus(cid: string, paneId: string) {
  if (dragStartNode.value) {
    document.getElementById('highlightBlock')?.remove()
    window.parent.postMessage({
      type: 'DROP_COLLAPSE_NODE_ACTION',
      payload: {
        cid,
        paneId,
        tag: dragStartNode.value.tag
      }
    })
    dragStartNode.value = null
  }
}

// 插槽组件点击插槽节点
function nodeClickSlotNode(cid: string, position: [number, number]) {
  nodeClick(cid)
  updateNodeProp(cid, { selectNodePos: position })
}

function selectLayout(cid: string) {
  platformFrame.selectLayoutMessage(cid)
}

// 向右复制
function nodeCopyRight(cid: string) {
  platformFrame.copyToRightNode(cid)
  canFocusActiveNode.value = true
}

provide('dropNodePlus', dropNodePlus)
provide('dropNodeSlotPlus', dropNodeSlotPlus)
provide('dropNodeCollapsePlus', dropNodeCollapsePlus)
provide('nodeClick', nodeClick)
provide('nodeDelete', nodeDelete)
provide('nodeContextmenu', nodeContextmenu)
provide('dragover', dragover)
provide('nodeCopyRight', nodeCopyRight)
provide('nodeCopyToRight', nodeCopyToRight)
provide('updateNodeProp', updateNodeProp)
provide('nodeClickSlotNode', nodeClickSlotNode)
provide('selectLayout', selectLayout)

// provider ref
provide(ACTIVE_NODE, activeNode)
provide(IS_DRAGGER, readonly(isDragging))
provide(DRAG_START_NODE, dragStartNode)
provide(VISIBLE_BTN_GROUP, readonly(visibleBtnGroup))

function drop() {
  isErrorDragging.value = false
  isGlobalMask.value = false
  isInnerNodeDragging.value = false

  if (dragStartNode.value) {
    activeNode.value = dragStartNode.value
    window.mplHighlightBlockSize = [`w-${activeNode.value.pos.pc.w}`, `h-${activeNode.value.pos.pc.h}`]
    const messageNode = JSON.parse(JSON.stringify(dragStartNode.value))

    window.parent.postMessage({
      type: 'INSERT_NODE_ACTION',
      payload: {
        node: messageNode,
        pid: '',
        meta: {}
      }
    }, '*')

    dragStartNode.value = null

    // 关闭高亮定位组件
    document.getElementById('highlightBlock')?.classList.add('is-hidden')
  }
}

function dragleave() {
  isErrorDragging.value = false
  isInnerNodeDragging.value = false
  isDragging.value = false
  isGlobalMask.value = false
  let dom = document.getElementById('highlightBlock')

  if (dom) {
    dom.style.cssText = `display: none;`
    dom.setAttribute('class', '')
  }
}
</script>

<template>
  <div class="content-box">
    <div id="workbenchDragContainer" class="mounted-workbench-box mpl-guild mpl-scroll-none" @click="nodeClick('body')"
      @dragover.prevent="dragover($event)" @dragleave.prevent="dragleave" @drop.stop.prevent="drop">
      <div v-show="isDragging" class="dragging-mask" />
      <div v-show="isErrorDragging" class="error-dragging-mask" />
      <div v-show="isGlobalMask" class="global-mask" />
      <el-form status-icon class="mpl-root-form" label-width="auto">
        <WorkbenchRootNode :node-list="nodeList" ui="elementPlus" />
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content-box {
  position: relative;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  display: flow-root;
  flex: 1;
  width: 100%;
  text-align: left;

  #workbenchDragContainer.mounted-workbench-box {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
    // background: #fff;

    // overflow: auto;
    &::-webkit-scrollbar {
      width: 20px;
      height: 20px;
    }



    .dragging-mask {
      position: absolute;
      z-index: 10000;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: transparent;
    }

    >.mpl-root-form {
      width: 100%;
      height: 100%;
      padding: 1px;
      box-sizing: border-box;
      font-size: 0;
      display: contents;
      overflow: auto;
    }

    .global-mask {
      position: absolute;
      z-index: 10000;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-position: center;
      pointer-events: unset;
      background: transparent;
    }

    .error-dragging-mask {
      position: absolute;
      z-index: 10000;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #3332321a;
      display: flex;
      justify-content: center;
      align-items: center;
      background-position: center;

      span {
        position: relative;
        top: 22%;
        color: var(--primary-color);
        font-weight: 600;
      }
    }

  }


}
</style>
