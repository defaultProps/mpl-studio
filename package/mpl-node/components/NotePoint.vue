<template>
  <div class="mpl-note" mpl="note"></div>
</template>
<script lang="ts" setup>
// 注解节点。显示注解信息。
</script>
<style lang="less">
.mpl-note[mpl="note"] {
  position: absolute;
  top: 1px;
  right: 1px;
  z-index: 10;
  background: var(--primary-color);
  padding: 0px 3px;
  min-width: 12px;
  color: var(--color-7);
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  transform: scale(0.75);
  transform-origin: right top;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>