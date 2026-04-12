<script lang="ts" setup>
import { inject, ref } from 'vue'
import type { BaseAvatar } from '../define'
import type { Fn, Fn1 } from '@mpl/typings'

const props = defineProps<{ node: BaseAvatar }>()
const dropNodePlus = inject<Fn>('dropNodePlus')
const isDragoverBox = ref<boolean>(false)
const dragover = inject<Fn1>('dragover') as any
function drop() {
  isDragoverBox.value = false
  dropNodePlus?.(props.node.cid)
}

function dragleave() {
  isDragoverBox.value = false
}
</script>

<template>
  <van-cell-group style="height: 300px">
    <div class="mpl-base-box" :class="{ dragover: isDragoverBox }" @dragleave.prevent="dragleave"
      @drop.stop.prevent="drop" @dragover.stop.prevent="dragover($event)">123
    </div>
  </van-cell-group>
</template>
