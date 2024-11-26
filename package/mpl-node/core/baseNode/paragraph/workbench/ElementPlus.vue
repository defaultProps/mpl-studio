<script lang="ts" setup>
import { Paragraph } from '../define'

const props = defineProps<{ node: Paragraph }>()
</script>

<template>
  <div class="mpl-paragraph">
    {{ props.node.label }}
  </div>
</template>

<style lang="less" scoped>
  .mpl-paragraph {
    width: 100%;
    height: 100%;
    user-select: none;
  }
</style>
