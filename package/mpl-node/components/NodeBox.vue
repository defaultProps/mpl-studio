<script lang="ts" setup>
import { inject, ref } from 'vue'
import type { Node } from '@mpl/typings'
import { useThrottleFn } from '@vueuse/core'
import { VISIBLE_BTN_GROUP } from '../libs'

const props = defineProps<{
  node: Node
  isDragging: boolean
  activeId: string
  isDraggingNode: boolean
  noPadding?: boolean
  isMobile?: boolean
}>()

const nodeClick = inject('nodeClick') as any
const nodeContextmenu = inject('nodeContextmenu') as any
const visibleBtnGroup = inject(VISIBLE_BTN_GROUP, ref(false))
const nodeDelete = inject('nodeDelete') as any
const nodeCopyRight = inject('nodeCopyRight') as any

function componentWrapperClassName() {
  const _className = {
    target: props.isDraggingNode,
    dragging: props.isDragging,
    'no-padding': props.noPadding,
    'pane-fit-h': props.node.tag === 'mpl-panel' && (props.node as any).body.autoHeight
  }

  return [props.isMobile ? 'w-24' : props.node.pos.pc.wType === '%' ? `w-${props.node.pos.pc.w}` : '', props.isMobile ? '' : `h-${props.node.pos.pc.h}`, _className]
}

function getStyleLen() {
  if (props.isMobile || props.node.pos.pc.wType === '%') {
    return ''
  }
  return { width: `${props.node.pos.pc.w}px` }
}

const dragover = useThrottleFn((el: DragEvent) => {
  if (el.dataTransfer) {
    el.dataTransfer.effectAllowed = 'move'
    el.dataTransfer.dropEffect = 'move'
  }
}, 200)

function nodeEdit(cid: string) {
  console.log(cid)
}

</script>

<template>
  <!-- 更换为grid-layout-plus插件 -->
  <div ref="currentRef" class="component-wrapper" :class="componentWrapperClassName()" :mpl-node-tag="props.node.tag"
    :style="getStyleLen()" @dragover="dragover($event)" @click.stop.prevent="nodeClick(props.node.cid)"
    @contextmenu.stop.prevent="nodeContextmenu($event, props.node)">
    <slot />
    <div v-if="props.isDraggingNode && visibleBtnGroup" class="component-tool-group-button" @contextmenu.stop.prevent
      @click.stop.prevent>
      <span v-if="props.node.field" class="field-span">{{ props.node.field }}</span>
      <div class="icon icon-setting1" title="编辑" @click="nodeEdit(props.node.cid)" />
      <div class="icon icon-xiangyoufuzhi" title="向右复制" @click="nodeCopyRight(props.node.cid)" />
      <div class="icon icon-qingkongshanchu" style="color: #c3002f;" title="删除" @click="nodeDelete(props.node.cid)" />
    </div>
  </div>
</template>

<style lang="less">
body.callout .component-wrapper[mpl-node-tag="mpl-slot-box"] tr td {
  outline: 1px dashed #cccccc5e;
}

body.callout .component-wrapper::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  z-index: 10;
  outline: 1px solid #1e1e1e;
  pointer-events: none;
  user-select: none;
}
</style>

<style lang="less" scoped>
.component-wrapper {
  position: relative;
  box-sizing: border-box;
  outline: 1px solid transparent;
  user-select: none;
  vertical-align: top;
  text-align: center;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;

  >span,
  >button {
    pointer-events: none;
  }

  .component-tool-group-button {
    position: absolute;
    bottom: -32px;
    right: 1px;
    display: none;
    font-size: 12px;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    padding: 3px;
    border: 1.5px solid var(--primary-color);
    border-top: 0;
    z-index: 100;

    .field-span {
      width: fit-content;
      max-width: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      line-height: 25px;
      font-size: 12px;
      color: #333;
    }

    div {

      width: 30px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }

  &.target {
    .component-tool-group-button {
      display: flex;
    }
  }

  .el-form-item {
    pointer-events: none;
  }

  &[mpl-node-tag='mpl-panel'] {
    padding: 0;
  }

  &.no-padding {
    padding: 0;
  }

  &.target {
    &::after {
      content: '';
      position: absolute;
      left: 1px;
      top: 1px;
      right: 1px;
      bottom: 1px;
      pointer-events: none;
      border: 1.5px solid var(--primary-color);
      z-index: 10;
    }

    >.header-box {
      display: flex;
      user-select: none;
    }
  }

  &.dragging {
    outline: 1px solid var(--primary-color);

    &.target::before {
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 100;
      background-size: 20px 20px;
      background-image: linear-gradient(45deg,
          #2f7f795c 0,
          #2f7f795c 25%,
          transparent 25%,
          transparent 50%,
          #2f7f795c 50%,
          #2f7f795c 75%,
          transparent 75%,
          transparent);
    }
  }

  &.active {
    z-index: 20;
  }
}
</style>
