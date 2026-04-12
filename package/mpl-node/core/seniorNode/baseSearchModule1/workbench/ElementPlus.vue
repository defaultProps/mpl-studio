<script lang="ts" setup>
import { BaseSearchModule1Prop } from '../define'
import { inject, ref, markRaw } from 'vue'
import type { Fn, Fn1, Node } from '@mpl/typings'
import { useThrottleFn } from '@vueuse/core'
import { mapNodeSetting } from '../../../index'

const isDragoverBox = ref<boolean>(false)
const props = defineProps<{ node: BaseSearchModule1Prop & { mpl_children: Node[] } }>()
const { rowSpan, slotNodes } = props.node.seniorNode
const row = Math.ceil(slotNodes.length / rowSpan) * rowSpan
const dragPos = ref<number[]>([])
const dropNodePlus = inject<Fn>('dropNodePlus', () => { })
const isExpand = ref(true)
const dragover = inject<Fn1>('dragover')
function drop(i: number, j: number) {
  isDragoverBox.value = false
  dropNodePlus?.(props.node.cid, {
    tag: 'mpl-slot-box',
    pos: [i, j]
  })
  document.getElementById('highlightBlock')?.classList.add('is-hidden')
}
// todo 防抖
// 所有悬浮空间都关闭容器拖入的高亮样式
const dragoverBaseBox = useThrottleFn((el: DragEvent, i: number, j: number) => {
  if (getPos(i, j)) {
    return
  }
  isDragoverBox.value = true
  dragPos.value = [i, j]
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
}, 350)

function dragleave() {
  isDragoverBox.value = false
}

function getAsyncComponent(cid: string) {
  if (cid) {
    const resultNode: Node | undefined = props.node.mpl_children.find(v => v.cid === cid)

    return resultNode ? markRaw(mapNodeSetting[resultNode.tag]?.workbench['elementPlus']) : null
  }

  return null
}

function getAsyncNode(cid: string) {
  return props.node.mpl_children.find(v => v.cid === cid) || null
}

function getPos(i: number, j: number): string {
  return props.node.seniorNode.mapNode[`${i}-${j}`] || ''
}

function getColSpan(len = 1): number[] {
  return new Array(len).fill(1).map((_, i) => i + 1)
}
function getRowSpan(len = 1): number[] {
  return isExpand.value ? [1] : new Array(len).fill(1).map((_, i) => i + 1)
}
</script>

<template>
  <div class="mpl-searchModule1 mpl-no-pointer" :h="row * 50 + 'px'">
    <div class="search-content">
      <div class="mpl-slot-box" @drop.stop.prevent @dragover.stop.prevent @dragleave.prevent="dragleave">
        <el-form class="grid-layout-slot">
          <div v-for="i in getRowSpan(props.node.seniorNode.rowSpan)" class="slot-row">
            <div v-for="j in getColSpan(props.node.seniorNode.colSpan)" class="slot-col"
              :class="{ dragover: isDragoverBox && dragPos[0] === i && dragPos[1] === j, 'has-node': !!getPos(i, j) }"
              @dragleave.prevent="dragleave" @drop.stop.prevent="drop(i, j)"
              @dragover.stop.prevent="dragoverBaseBox($event, i, j)">
              <component :is="getAsyncComponent(getPos(i, j))"
                v-if="props.node.seniorNode.mapNode[`${i}-${j}`] && getAsyncNode(getPos(i, j))"
                :node="getAsyncNode(getPos(i, j))" />
            </div>
          </div>
        </el-form>
        <div v-if="props.node.visibleSlotBtn" class="footer-btn-group">
          <template v-for="btn in props.node.slotBtn" :key="btn.cid">
            <el-button v-if="btn.type === 'searchExpand'" :class="isExpand ? 'icon-arrow-down' : 'icon-arrow-up'"
              class=" icon" @click="isExpand = !isExpand" />
            <el-button v-else-if="btn.type === 'searchReset'">
              重置
            </el-button>
            <el-button v-else-if="btn.type === 'searchSubmit'" type="primary">
              {{ btn.title }}
            </el-button>
            <el-button v-else-if="btn.type === 'c'">
              {{ btn.title }}
            </el-button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.mpl-searchModule1 {
  width: 100%;
  height: 100%;
  min-height: fit-content;
  min-height: fit-content;
  overflow: hidden;
  text-align: left;
  outline: 1px solid #ccc;
  box-sizing: border-box;
  position: relative;
  border-radius: 3px;
  background: #f0f0f0;

  .mpl-slot-box {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    position: relative;
    font-size: 12px;

    .slot-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .slot-col {
        width: 100%;
        height: 43px;
        margin: 2px;
        outline: 1px dashed #ccc;

        &.has-node {
          cursor: no-drop;
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

  .search-content {
    width: 100%;
    height: 100%;
    min-height: fit-content;
    display: flex;
    flex-wrap: wrap;
    background: #fff;

    .slot-box {
      pointer-events: none;
      width: 25%;
      height: 48px;
      padding: 2px;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: center;

      .placeholder {
        width: 100%;
        font-size: 12px;
        text-align: center;
        outline: 1px dashed #ccc;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666;
        background: #fff;
      }
    }

    .footer-btn-group {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 5px;
      box-sizing: border-box;
      background: #fff;
      position: absolute;
      right: 1px;
      bottom: 1px;
      width: calc(33.333333333% - 2px);
      height: 45px;
      overflow: hidden;
      border-radius: 2px;
      outline: none;
      border: none;
    }
  }
}
</style>
