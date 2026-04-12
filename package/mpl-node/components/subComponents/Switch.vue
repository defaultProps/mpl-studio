<script setup lang="ts">
import type { SwitchFormProp } from '../../core/baseNode/switch/define'

const activeNode = defineModel<SwitchFormProp & { slotPos: 'l' | 'r' }>()
</script>
<template>
  <template v-if="activeNode">
    开关设置
  </template>
</template>