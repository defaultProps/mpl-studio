<script lang="ts" setup>
import type { BaseAvatar } from '../define'

const el = defineModel<BaseAvatar>()
</script>

<template>
  <template v-if="el">
    123
  </template>
</template>
<style lang="less" scoped>
.mpl-form-item .mpl-content>button {
  margin-left: 5px;
}
</style>
