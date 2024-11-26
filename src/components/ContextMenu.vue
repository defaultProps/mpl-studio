<script setup lang="ts">
import mplStore from '@mpl/store'
import type { ContextMenu } from '@mpl/typings'

const coreView = mplStore.viewStore()
function contextmenuClick(item: ContextMenu): void {
  item.onclick?.()
}
</script>

<template>
  <div id="mplContextmenuTarget" class="mpl-contextmenu--container" :style="{
    display: coreView.context.display,
    top: `${coreView.context.top}px`,
    left: `${coreView.context.left}px`
  }" @mousewheel.stop @contextmenu.prevent>
    <div v-for="item in coreView.context.menu" :key="item.value" class="mpl-contextmenu-item"
      :class="{ disabled: item.disabled, divider: item.divider }" @click="contextmenuClick(item)">
      <div class="icon">
        <i class="mpl icon" :class="[item.icon]" />
      </div>
      <div class="label">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mpl-contextmenu--container {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  box-shadow: 0 0 4px 1px #000000b0;
  overflow: hidden;
  border-radius: 2px;
  z-index: 10000;
  background-color: var(--color-7);
  font-size: 12px;

  .mpl-contextmenu-item {
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    color: var(--color-2);

    &.divider {
      border-bottom: 1px solid var(--color-1);
    }

    &:not(.disabled):hover {
      background: #e6e6e6;
      color: var(--primary-color);
      cursor: default;
    }

    &.disabled {
      color: var(--color-1);
      cursor: not-allowed;
    }

    .label {
      width: 100px;
      text-indent: 10px;
      user-select: none;
    }
  }
}
</style>
