<script lang="ts" setup>
import { inject, ref } from 'vue'
import RenderNodeList from '../../../../components/RenderNodeList.vue'
import type { BaseBoxProp } from '../define'
import type { Fn, Fn1, Node } from '@mpl/typings'

const props = defineProps<{ node: BaseBoxProp & { mpl_children: Node[] } }>()
const dropNodePlus = inject<Fn>('dropNodePlus', () => { })
const isDragoverBox = ref<boolean>(false)
const dragover = inject<Fn1>('dragover') as any

function drop() {
  isDragoverBox.value = false
  dropNodePlus(props.node.cid)
}

function dragleave() {
  isDragoverBox.value = false
}
</script>

<template>
  <div class="mpl-base-box" :class="{ dragover: isDragoverBox }" :style="{ backgroundColor: props.node.bgColor }"
    @dragleave.prevent="dragleave" @drop.stop.prevent="drop" @dragover.stop.prevent="dragover($event)">
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
