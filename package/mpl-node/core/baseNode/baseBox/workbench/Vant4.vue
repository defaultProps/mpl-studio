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
  <van-cell-group style="height: 300px">
    <div class="mpl-base-box" :class="{ dragover: isDragoverBox }" @dragleave.prevent="dragleave"
         @drop.stop.prevent="drop" @dragover.stop.prevent="dragoverBaseBox">
      <div v-show="visibleNote" class="mpl-btn--note mpl-note" mpl="note" />
      <RenderNodeList :node-list="props.node.mpl_children" ui="elementPlus" />
    </div>
  </van-cell-group>
</template>
