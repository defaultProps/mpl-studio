<script setup lang="ts">
import type { SliderFormProp } from '../../core/baseNode/slider//define'

const activeNode = defineModel<SliderFormProp & { slotPos: 'l' | 'r' }>()
</script>
<template>
  <template v-if="activeNode">
    滑块设置
  </template>
</template>