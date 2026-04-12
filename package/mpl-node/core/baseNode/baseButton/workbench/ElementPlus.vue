<script setup lang="ts">
import type { ButtonProp } from '../define'
import SlotRenderNode from '../../../../components/SlotRenderNode.vue'

const props = defineProps<{ node: ButtonProp }>()
</script>

<template>
  <SlotRenderNode :nodes="props.node.slotNodes.filter(v => v.pos === 'l')" />
  <el-button class="ml-5 mr-5">
    {{ props.node.title }}
  </el-button>
  <SlotRenderNode :nodes="props.node.slotNodes.filter(v => v.pos === 'r')" />
</template>
<style lang="less" scoped>
button.note-btn {
  height: 32px;
  line-height: 32px;
  user-select: none;

  &.mpl-primary-btn {
    position: relative;
    pointer-events: none;
    width: calc(100% - 10px);

    span {
      overflow: hidden;
    }
  }
}
</style>
