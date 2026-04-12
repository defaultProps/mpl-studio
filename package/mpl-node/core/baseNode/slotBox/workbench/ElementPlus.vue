<script lang="ts" setup>
import { inject, ref, markRaw } from 'vue'
import {  ACTIVE_NODE } from '../../../../libs'
import type { SlotBoxProp } from '../define'
import type { Fn, Fn1, Node } from '@mpl/typings'
import { mapNodeSetting } from '../../../index'
import { useThrottleFn } from '@vueuse/core'

const nodeClick = inject<any>('nodeClick')
const props = defineProps<{ node: SlotBoxProp & { mpl_children: Node[] } }>()
const dragPos = ref<number[]>([])
const dropNodeSlotPlus = inject<Fn>('dropNodeSlotPlus', () => { })
const isDragoverBox = ref<boolean>(false)
const currentNode = inject(ACTIVE_NODE, ref(null))
const dragover = inject<Fn1>('dragover')
const nodeClickSlotNode = inject<any>('nodeClickSlotNode')

function drop(row: number, col: number) {
  isDragoverBox.value = false
  dropNodeSlotPlus(props.node.cid, [row, col])
}

function getAsyncNode(cid: string) {
  return props.node.mpl_children.find(v => v.cid === cid) || null
}

function shadowRowComponent(row: number, col: number) {
  const renderNode = getAsyncNode(getPos(row, col))

  if (renderNode) {
    const v = mapNodeSetting[renderNode.tag]
    return v ? markRaw(v.workbench.elementPlus) : null
  }
  return null
}

// todo 防抖
// 所有悬浮空间都关闭容器拖入的高亮样式
const dragoverBaseBox = useThrottleFn((el: DragEvent, row: number, col: number) => {
  if (getPos(row, col)) {
    return
  }
  isDragoverBox.value = true
  dragPos.value = [row, col]
  dragover?.(el, {
    w: 24,
    h: 44,
    wType: '%',
    hType: 'px',
    minH: 0,
    maxH: 0,
    type: 'wh',
    mod: 'slot'
  })
}, 200)

function dragleave() {
  isDragoverBox.value = false
}

function getPos(row: number, col: number): string {
  return props.node.layoutMapNode[`${row}-${col}`] || ''
}

function clickSlotNode(row: number, col: number) {
  const childId = getPos(row, col)

  if (currentNode.value?.cid === childId) {
    return
  }

  if (childId) {
    nodeClickSlotNode(props.node.cid, '')
    nodeClick(childId)
  } else {
    // 点击空白插槽节点, 便捷插入节点
    nodeClickSlotNode(props.node.cid, [row, col])
  }
}

</script>

<template>
  <div class="mpl-slot-box" :style="{ backgroundColor: props.node.bgColor }" @drop.stop.prevent
    @dragleave.prevent="dragleave">
    <table>
      <tr v-for="row in props.node.layoutRow">
        <td v-for="col in props.node.layoutRow" :class="{
          dragover: isDragoverBox && dragPos[0] === row && dragPos[1] === col,
          'has-node': !!getPos(row, col),
          target: currentNode?.cid === getPos(row, col),
          'has-focus-slot': currentNode && currentNode.cid === props.node.cid && Array.isArray(props.node.selectNodePos) && props.node.selectNodePos[0] === row && props.node.selectNodePos[1] === col && !(props.node.layoutMapNode[`${row}-${col}`] && getAsyncNode(getPos(row, col)))
        }">
          <div class="mpl-slot-box-node" @dragleave.prevent="dragleave" @drop.stop.prevent="drop(row, col)"
            @dragover.stop.prevent="dragoverBaseBox($event, row, col)" @click.stop="clickSlotNode(row, col)">
            <component :is="shadowRowComponent(row, col)"
              v-if="props.node.layoutMapNode[`${row}-${col}`] && getAsyncNode(getPos(row, col))"
              :node="getAsyncNode(getPos(row, col))" />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="less" scoped>
.mpl-slot-box {
  width: 100%;
  height: 100%;
  text-align: left;
  overflow: auto;

  >table {
    border-collapse: collapse;
    width: 100%;

    >tr {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      >td {
        width: 100%;
        height: 48px;
        box-sizing: border-box;
        outline: none;
        font-size: 12px;
        overflow: hidden;

        .mpl-slot-box-node {
          width: 100%;
          height: 100%;
          user-select: none;
          overflow: hidden;
        }

        &.has-node {
          font-size: 12px;
          user-select: none;
        }

        &.target {
          position: relative;
          user-select: default;

          &::after {
            user-select: none;
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            border: 1.5px solid var(--primary-color);
            z-index: 100;
          }
        }

        &.has-focus-slot {
          position: relative;

          &::after {
            user-select: none;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            border: 2px solid #1e1e1e;
            z-index: 100;
            background-size: 12px 12px;
            background-position: -1px 0;
            background-image: linear-gradient(90deg, #6062661c 0.1rem, rgba(0, 0, 0, 0) 0.1rem), linear-gradient(#6062661c 0.1rem, rgba(0, 0, 0, 0) 0.1rem);
            content: '双击左侧控件插入';
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1e1e1e61;
            font-size: 12px;
          }
        }

        &.dragover {
          background-size: 10px 10px;
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
    }
  }
}
</style>
