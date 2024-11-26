<script lang="ts" setup>
  const props = defineProps<{
    splice?: boolean
    copy?: boolean
    close?: boolean
    lock?: boolean
    collapse?: boolean
  }>()
</script>
<template>
  <div class="btn-group">
    <button v-if="props.collapse" @click.stop class="mpl-btn mr-2 mini-btn icon-xiala-copy icon" title="流程展开/关闭" />
    <button v-if="props.lock" @click.stop class="mpl-btn mr-2 mini-btn icon-unlock icon" title="流程锁定/解锁" />
    <button v-if="props.splice" @click.stop class="mpl-btn mr-2 mini-btn icon-jurassic_refresh1 icon" title="流程替换" />
    <button v-if="props.copy" @click.stop class="mpl-btn mr-2 mini-btn icon-copy-document icon" title="流程向下复制" />
    <button @click.stop class="mpl-btn del-btn mini-btn icon-close icon" title="流程删除" />
  </div>
</template>
<style lang="less" scoped>
  .btn-group {
    display: flex;
  }
</style>