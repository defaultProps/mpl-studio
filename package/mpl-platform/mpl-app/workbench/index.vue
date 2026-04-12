<script setup lang="ts">
import { onMounted, provide, readonly, ref } from 'vue'
import {
  ACTIVE_NODE,
  IS_DRAGGER,
  DRAG_START_NODE,
  initNode,
} from '@mpl/node'
import MPL from '@mpl/typings'
import { layoutWorkbenchSize, platformFrame } from '../../core/util'
import { dragOverElement } from '../../core/dragOverElement'

const emits = defineEmits(['menu'])
const isDragging = ref<boolean>(false)
const isInnerNodeDragging = ref<boolean>(false)
const isErrorDragging = ref<boolean>(false)
const isGlobalMask = ref<boolean>(false)
const defaultActiveMenu = ref<string>('')
const dragStartNode = ref<MPL.Node | null>(null)
const widthUnit = ref<number>(0)
const workbenchSpan = ref<number>(24)
const visibleGuildLine = ref<boolean>(true)
const visibleNodeOutline = ref<boolean>(false)
const visibleBtnGroup = ref<boolean>(false)
const activeNode = ref<MPL.Node | null>(null)
const nodeList = ref<MPL.Node[]>([])

onMounted(() => {
  window.addEventListener(
    'message',
    e => {
      const obj = e.data

      if (obj.type === 'UPDATE_ACTIVE_PAGE') emits('menu', obj.payload.id)


      if (obj.type === 'GUILD_LINE_STATUS_ACTION') visibleGuildLine.value = obj.payload.visible

      if (obj.type === 'NODE_CALLOUT_LINE_STATUS') visibleNodeOutline.value = obj.payload.visible || false

      if (obj.type === 'VISIBLE_BTN_GROUP_ACTION') visibleBtnGroup.value = obj.payload.visible || false

      if (obj.type === 'PAGE_CHANGE') defaultActiveMenu.value = obj.payload.pageId

      // 开始拖动组件时，立即生成拖动组件的一系列数据。
      if (obj.type === 'DRAG_START_ELEMENT') {
        dragStartNode.value = initNode(obj.payload.tag)
        isErrorDragging.value = false
        isInnerNodeDragging.value = false

        // 拖动组件为弹窗时。增加全局遮罩层
        if (['mpl-dialog', 'mpl-drawer'].includes(obj.payload.tag)) isGlobalMask.value = true

        if (dragStartNode.value) {
          const { h } = dragStartNode.value.pos.mobile

          window.mplHighlightBlockSize = [`w-24`, `${h}`]
          widthUnit.value = layoutWorkbenchSize(workbenchSpan.value)
        }
      }
      if (obj.type === 'CHANGE_PLATFORM') widthUnit.value = layoutWorkbenchSize(workbenchSpan.value)
    },
    false
  )
})

// 初始化画板 + 切换UI回画板时，画板状态重置或缓存中获取
onMounted(() => {
  visibleGuildLine.value = true
  visibleNodeOutline.value = true
  visibleBtnGroup.value = true
  dragStartNode.value = null
  isInnerNodeDragging.value = false
  isErrorDragging.value = false
  isGlobalMask.value = false
})

function nodeClick(cid: string, visible = false): MPL.Node | null {
  platformFrame.selectNodeByCid(cid)
  // 预先计算宽度，提高托拉拽流畅
  widthUnit.value = layoutWorkbenchSize(workbenchSpan.value)
  isErrorDragging.value = false
  isGlobalMask.value = false
  isInnerNodeDragging.value = false

  const _activeNode = nodeList.value.find(node => node.cid === cid) || null
  if (_activeNode) activeNode.value = _activeNode
  else activeNode.value = null

  return _activeNode
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
  }
}

function dragover(el: DragEvent) {
  if (el.dataTransfer) {
    el.dataTransfer.effectAllowed = 'move'
    el.dataTransfer.dropEffect = 'move'
  }

  // isInnerNodeDragging.value
  if (dragStartNode.value) {
    dragOverElement(el, dragStartNode.value.pos.mobile)
    isErrorDragging.value = false
  } else {
    isErrorDragging.value = true
  }
}

provide('dropNodePlus', dropNodePlus)
provide('nodeClick', nodeClick)
provide('nodeDelete', nodeDelete)
provide('dragover', dragover)
provide(ACTIVE_NODE, activeNode)
provide(IS_DRAGGER, readonly(isDragging))
provide(DRAG_START_NODE, dragStartNode)

function nodeDelete(cid: string) {
  platformFrame.deleteNode(cid)
}

// 仅仅需要更新外层node-list， 减少一次外层传递内层消息传递
function drop() {
  isErrorDragging.value = false
  isGlobalMask.value = false
  isInnerNodeDragging.value = false

  if (dragStartNode.value) {
    activeNode.value = dragStartNode.value
    window.mplHighlightBlockSize = [`w-24`, `${activeNode.value.pos.mobile.h}`]
    if (['mpl-drawer', 'mpl-dialog'].includes(activeNode.value.tag)) nodeList.value.unshift(activeNode.value)
    else nodeList.value.push(activeNode.value)

    nodeClick(dragStartNode.value.cid)
    dragStartNode.value = null

    // 关闭高亮定位组件
    if (window.draggingBlock) window.draggingBlock.style.display = 'none'
  }
}
</script>

<template>
  <div class="content-box">
    <div id="workbenchDragContainer" class="mounted-workbench-box mpl-scroll-none"
      :class="[{ 'mpl-guild': visibleGuildLine, callout: visibleNodeOutline, 'mpl-btn-group': visibleBtnGroup }]"
      @click="nodeClick('body')" @dragover.prevent="dragover($event)" @dragleave.prevent.stop @drop.stop="drop">
      <div v-show="isDragging" class="dragging-mask" />
      <div v-show="isErrorDragging" class="error-dragging-mask" />
      <div v-show="isGlobalMask" class="global-mask" />
      <van-form status-icon class="mpl-root-form">
        <div v-if="nodeList.length === 0" class="empty-box">
          <img src="@/assets/empty.svg" alt="">
          <span>无内容页面</span>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content-box {
  width: 100vw;
  height: 100vh;
  position: relative;

  #workbenchDragContainer.mounted-workbench-box {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
    background: #f8f8f8;

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
      font-size: 16px;
      display: contents;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      .empty-box {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 12px;
        color: #606266;

        img {
          width: 300px;
          height: auto;
        }
      }
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
