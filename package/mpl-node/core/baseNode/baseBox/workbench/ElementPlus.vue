<script lang="ts" setup>
import { inject, ref } from 'vue'
import RenderNodeList from '../../../../components/RenderNodeList.vue'
import { DRAG_START_NODE, VISIBLE_NOTE } from '../../../../libs'

const props = defineProps<{ node: any }>()
const visibleNote = inject(VISIBLE_NOTE, ref(false))
const dropNodePlus = inject<any>('dropNodePlus')
const isDragoverBox = ref<boolean>(false)
const dragStartNode = inject(DRAG_START_NODE, ref(null))
const dragover = inject<any>('dragover')
function drop() {
  isDragoverBox.value = false
  dropNodePlus(props.node.cid)
}

// todo 防抖
// 所有悬浮空间都关闭容器拖入的高亮样式
function dragoverBaseBox(el: DragEvent) {
  isDragoverBox.value = !['mpl-dialog', 'mpl-drawer'].includes(dragStartNode.value?.tag || '')
  dragover(el)
}

function dragleave() {
  isDragoverBox.value = false
}
</script>

<template>
  <div
    class="mpl-base-box"
    :class="{ dragover: isDragoverBox }"
    @dragleave.prevent="dragleave"
    @drop.stop.prevent="drop"
    @dragover.stop.prevent="dragoverBaseBox"
  >
    <div
      v-show="visibleNote"
      class="mpl-btn--note mpl-note"
      mpl="note"
    />
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
    background-image: linear-gradient(
      45deg,
      #2f7f795c 0,
      #2f7f795c 25%,
      transparent 25%,
      transparent 50%,
      #2f7f795c 50%,
      #2f7f795c 75%,
      transparent 75%,
      transparent
    );
  }
}
</style>
