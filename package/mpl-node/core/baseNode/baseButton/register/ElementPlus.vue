<script setup lang="ts">
import type { ButtonProp } from '../define'
import SlotRenderNode from '../../../../components/SlotRenderNode.vue'

const el = defineModel<ButtonProp>()
</script>

<template>
  <template v-if="el">
    <SlotRenderNode :nodes="el.slotNodes.filter(v => v.pos === 'l')" />
    <el-button class="ml-5 mr-5">
      {{ el.title }}
    </el-button>
    <SlotRenderNode :nodes="el.slotNodes.filter(v => v.pos === 'r')" />
  </template>
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
