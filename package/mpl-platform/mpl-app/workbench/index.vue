<script setup lang="ts">
import { onMounted, provide, readonly, ref } from 'vue'
import mpl, { WorkbenchRootNode, rendererContextmenu, visibleContextmenu } from '@mpl/node'
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
const visibleNodeCalloutLine = ref<boolean>(false)
const visibleNote = ref<boolean>(true)
const activeNode = ref<MPL.Node | null>(null)
const nodeList = ref<MPL.Node[]>([])
const contextmenu = ref<{ visible: boolean, top: number, left: number }>({
  visible: false,
  top: 0,
  left: 0
})

const contextmenuList = ref<any[]>([])

onMounted(() => {
  window.addEventListener(
    'message',
    (e) => {
      const obj = e.data

      if (obj.type === 'UPDATE_ACTIVE_PAGE')
        emits('menu', obj.payload.id)

      if (obj.type === 'RENDER_NODE_LIST')
        nodeList.value = JSON.parse(obj.payload.nodeStr)

      if (obj.type === 'UPDATE_ACTIVE_NODE') {
        const newActiveNode = obj.payload.node
          ? JSON.parse(obj.payload.node)
          : ''

        if (newActiveNode) {
          nodeList.value = nodeList.value.map(node =>
            node.cid === newActiveNode.cid ? newActiveNode : node
          )
        }

        activeNode.value = newActiveNode
        if (['mpl-dialog', 'mpl-drawer'].includes(activeNode.value?.tag || ''))
          platformFrame.scrollIntoViewPopperNode()
      }

      if (obj.type === 'GUILD_LINE_STATUS_ACTION')
        visibleGuildLine.value = obj.payload.visible

      if (obj.type === 'NODE_CALLOUT_LINE_STATUS')
        visibleNodeCalloutLine.value = obj.payload.visible || false

      if (obj.type === 'VISIBLE_NOTE_ACTION')
        visibleNote.value = obj.payload.visible

      if (obj.type === 'PAGE_CHANGE')
        defaultActiveMenu.value = obj.payload.pageId

      // 开始拖动组件时，立即生成拖动组件的一系列数据。
      if (obj.type === 'DRAG_START_ELEMENT') {
        dragStartNode.value = mpl.initNode(obj.payload.tag)
        isErrorDragging.value = false
        isInnerNodeDragging.value = false

        // 拖动组件为弹窗时。增加全局遮罩层
        if (['mpl-dialog', 'mpl-drawer'].includes(obj.payload.tag))
          isGlobalMask.value = true

        if (dragStartNode.value) {
          const { h } = dragStartNode.value.pos.mobile

          window.mplHighlightBlockSize = [`w-24`, `${h}`]
          widthUnit.value = layoutWorkbenchSize(workbenchSpan.value)
        }
      }
      if (obj.type === 'CHANGE_PLATFORM')
        widthUnit.value = layoutWorkbenchSize(workbenchSpan.value)
    },
    false
  )
})

// 初始化画板 + 切换UI回画板时，画板状态重置或缓存中获取
onMounted(() => {
  const initObj: any = JSON.parse(
    localStorage.getItem('mplInitialWorkbenchView') || ''
  )

  visibleGuildLine.value = initObj.visibleGuildLine
  visibleNodeCalloutLine.value = initObj.visibleNodeCalloutLine
  visibleNote.value = initObj.visibleNote
  dragStartNode.value = null
  isInnerNodeDragging.value = false
  isErrorDragging.value = false
  isGlobalMask.value = false
})

function nodeContextmenu(e: MouseEvent, node: MPL.Node) {
  e.stopPropagation()

  const selectNode = mpl.mapNodeSetting[node.tag]

  if (selectNode) {
    contextmenuList.value = selectNode.node.getContextmenu(activeNode.value)
    const { top, left } = rendererContextmenu(e, contextmenuList.value)

    contextmenu.value = {
      visible: true,
      top,
      left
    }
    visibleContextmenu(true)
  }
}

function nodeClick(cid: string, visible = false): MPL.Node | null {
  platformFrame.selectNodeById(cid)
  // 预先计算宽度，提高托拉拽流畅
  widthUnit.value = layoutWorkbenchSize(workbenchSpan.value)
  isErrorDragging.value = false
  isGlobalMask.value = false
  isInnerNodeDragging.value = false

  const _activeNode = nodeList.value.find(node => node.cid === cid) || null
  if (_activeNode)
    activeNode.value = _activeNode
  else
    activeNode.value = null

  visibleContextmenu(visible)

  return _activeNode
}

// 新增插入节点
function dropNodePlus(cid: string) {
  platformFrame.dropNodePlus(cid, dragStartNode.value?.tag || null)
  document.getElementById('highlightBlock')?.remove()
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
  }
  else {
    isErrorDragging.value = true
  }
}

provide('dropNodePlus', dropNodePlus)
provide('nodeClick', nodeClick)
provide('nodeContextmenu', nodeContextmenu)
provide('dragover', dragover)
provide(mpl.symbol.VISIBLE_NOTE, readonly(visibleNote))
provide(mpl.symbol.ACTIVE_NODE, activeNode)
provide(mpl.symbol.IS_DRAGGER, readonly(isDragging))
provide(mpl.symbol.DRAG_START_NODE, dragStartNode)

// 仅仅需要更新外层node-list， 减少一次外层传递内层消息传递
function drop() {
  isErrorDragging.value = false
  isGlobalMask.value = false
  isInnerNodeDragging.value = false


  if (dragStartNode.value) {
    activeNode.value = dragStartNode.value
    window.mplHighlightBlockSize = [
      `w-24`,
      `${activeNode.value.pos.mobile.h}`
    ]
    if (['mpl-drawer', 'mpl-dialog'].includes(activeNode.value.tag))
      nodeList.value.unshift(activeNode.value)
    else
      nodeList.value.push(activeNode.value)

    platformFrame.updateNodeList(nodeList.value)
    nodeClick(dragStartNode.value.cid)
    dragStartNode.value = null

    // 关闭高亮定位组件
    if (window.draggingBlock)
      window.draggingBlock.style.display = 'none'
  }
}
</script>

<template>
  <!-- 右键列表 -->
  <div id="contextmenuMounted" :style="{ top: `${contextmenu.top}px`, left: `${contextmenu.left}px` }">
    <div v-for="item in contextmenuList" :key="item.value" class="menu"
      :class="{ disabled: item.disabled, divider: item.divider }" @click.stop="item.onClick">
      <i class="mpl icon" :class="item.icon" />
      <span class="label">{{ item.label }}</span>
      <i v-if="item.children?.length" class="icon icon-arrow-right-filling" />
      <div v-if="Array.isArray(item.children)" class="sub-item--box">
        <div v-for="subItem in item.children" :key="subItem.label" class="menu">
          <i class="mpl icon" :class="subItem.icon" />
          <span class="label">{{ subItem.label }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="content-box">
    <div id="workbenchDragContainer" class="mounted-workbench-box mpl-scroll-none"
      :class="[{ guild: visibleGuildLine, callout: visibleNodeCalloutLine }]" @click="nodeClick('mpl-body-cid')"
      @dragover.prevent="dragover($event)" @dragleave.prevent.stop @drop.stop="drop">
      <div v-show="isDragging" class="dragging-mask" />
      <div v-show="isErrorDragging" class="error-dragging-mask" />
      <div v-show="isGlobalMask" class="global-mask" />
      <van-form status-icon class="mpl-root-form">
        <WorkbenchRootNode :node-list="mpl.api.formatNodeListToTree(nodeList)" ui="vant4" />
        <div v-if="nodeList.length === 0" class="empty-box">
          <img src="@/assets/empty.svg" alt="">
          <span>无内容页面</span>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
#contextmenuMounted {
  position: fixed;
  z-index: 10000;
  font-size: 12px;
  box-shadow: #000000b3 0px 3px 8px;
  color: #000;
  display: none;

  .sub-item--box {
    display: none;
    left: 250px;
    top: 0;
    position: absolute;
    box-shadow: #000000b3 0px 3px 8px;
    color: #000;
  }

  .menu {
    position: relative;
    background: var(--color-7);
    width: 220px;
    height: 30px;
    text-indent: 5px;
    color: #000;
    user-select: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    i {
      color: var(--primary-color);
    }

    &.divider {
      border-bottom: 1px solid var(--color-1);
    }

    &.disabled {
      color: var(--color-1);

      &:hover {
        background-color: var(--color-7);
        color: var(--color-1);
      }
    }

    &:hover {
      background-color: var(--color-1);

      .sub-item--box {
        display: block;
      }
    }

    >i {
      width: 20px;
      display: inline-block;
      color: #9e9e9e;
      font-size: 12px;
    }

    >span.label {
      flex: 1;
    }
  }
}

.content-box {
  width: 100vw;
  height: 100vh;
  position: relative;

  #workbenchDragContainer.mounted-workbench-box {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
    background-color: #f8f8f8;

    .dragging-mask {
      position: absolute;
      z-index: 10000;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: transparent;
    }

    >.mpl-root-form {
      width: 100%;
      height: 100%;
      padding: 1px;
      box-sizing: border-box;
      font-size: 16px;
      display: flow-root;
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
      background-color: transparent;
    }

    .error-dragging-mask {
      position: absolute;
      z-index: 10000;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #3332321a;
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

    &.guild {
      // background-size: calc(100% / 24) 12px;
      // background-position: -1px 0;
      // background-image: linear-gradient(90deg,
      //     #6062661c 0.1rem,
      //     rgba(0, 0, 0, 0) 0.1rem),
      //   linear-gradient(#6062661c 0.1rem, rgba(0, 0, 0, 0) 0.1rem);
      // box-shadow: -2px 0px 0px 0px #60626636 inset;
    }
  }
}
</style>
