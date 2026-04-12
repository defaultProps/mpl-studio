<script lang="ts" setup>
import { inject, ref } from 'vue'
import RenderNodeList from '../../../../components/RenderNodeList.vue'
import { DRAG_START_NODE } from '../../../../libs'
import type { LoopBoxProp } from '../define'
import type { Fn, Node, Fn1 } from '@mpl/typings'

const props = defineProps<{ node: LoopBoxProp & { mpl_children: Node[] } }>()
const dropNodePlus = inject<Fn>('dropNodePlus', () => { })
const isDragoverBox = ref<boolean>(false)
const dragStartNode = inject(DRAG_START_NODE, ref(null))
const dragover = inject<Fn1>('dragover')
function drop() {
  isDragoverBox.value = false
  dropNodePlus(props.node.cid)
}

// todo 防抖
// 所有悬浮空间都关闭容器拖入的高亮样式
function dragoverBaseBox(el: DragEvent) {
  isDragoverBox.value = !['mpl-dialog', 'mpl-drawer'].includes(dragStartNode.value?.tag || '')
  dragover?.(el)
}

function dragleave() {
  isDragoverBox.value = false
}
</script>

<template>
  <div class="mpl-base-box" :class="{ dragover: isDragoverBox }" @dragleave.prevent="dragleave"
    @drop.stop.prevent="drop" @dragover.stop.prevent="dragoverBaseBox">
    <RenderNodeList :node-list="props.node.mpl_children" ui="elementPlus" />
  </div>
</template>

<style lang="less" scoped>
.mpl-base-box {
  width: 100%;
  height: 100%;
  text-align: left;
  overflow: auto;

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
</style>
