<script lang="ts" setup>
import { PanelProp } from '../define'

const props = defineProps<{ node: PanelProp }>()
</script>

<template>
  <div class="mpl-panel">
    <div class="mpl-header">
      <div class="mpl-title">
        {{ props.node.header.label }}
      </div>
      <div class="mpl-meta">
        slot node
      </div>
    </div>
    <div
      class="mpl-body"
      :class="[props.node.body.paddingSize]"
    >
      mpl pane body
    </div>
  </div>
</template>

<style lang="less" scoped>
  .mpl-panel {
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #000;
    box-shadow: 0px 0px 1px 1px var(--color-1) inset;
    .mpl-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      box-shadow: 0px -1px 0 0 var(--color-1) inset;
      padding: 0 10px;
      box-sizing: border-box;
      overflow: hidden;
      .mpl-title {
        height: 100%;
        display: inline-flex;
        align-items: center;
      }
    }
    .mpl-body {
      box-sizing: border-box;
      text-align: left;
      &.small {
        padding: 10px;
      }
      &.medium {
        padding: 15px;
      }
      &.large {
        padding: 20px;
      }
    }
  }
</style>
