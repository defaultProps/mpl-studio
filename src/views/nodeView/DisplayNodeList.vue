<script setup lang="ts">
import mplStore from '@mpl/store'
import { getBaseComponentList } from '@/utils/constant'

const coreView = mplStore.viewStore()

const allBaseNodeList = getBaseComponentList()
  .map(v => v.children)
  .reduce((a, b) => a.concat(b))
</script>

<template>
  <nav class="mpl-display-node-menu mpl-scroll-none">
    <div class="display-node-title">
      相关模板
      <button class="mpl-btn icon icon-close" @click="coreView.visibleDisplayNodeBox = false" />
    </div>
    <div
      v-for="node in allBaseNodeList"
      :key="node.value"
      class="display-node-block"
    >
      <img
        src="https://tse4-mm.cn.bing.net/th/id/OIP-C.oBM9JQK5Uz98UaTHFEUonQHaEo?w=311&h=194&c=7&r=0&o=5&dpr=1.5&pid=1.7"
      >
      <div class="title">
        {{ node.label }}
      </div>
    </div>
  </nav>
</template>

<style lang="less" scoped>
.mpl-display-node-menu {
  width: 300px;
  height: 100%;
  border-right: 1px solid var(--color-1);
  background-color: var(--color-7);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden auto;
  color: #000;

  &.is-pin {
    position: static;
    top: 0;
    height: 100%;
  }
  .display-node-title {
    height: 30px;
    line-height: 18px;
    font-size: 14px;
    text-align: left;
    margin-bottom: 5px;
    width: 100%;
    position: sticky;
    background-color: #e6e6e6;
    top: 0;
    padding: 6px;
    color: #000;
    font-weight: 600;
    box-sizing: border-box;
    display:flex;
    align-items: center;
    border-right: 1px solid var(--color-1);
    border-bottom: 1px solid var(--color-1);
    justify-content: space-between;
    button {
      font-weight: 600;
      color: var(--color-4);
    }
  }
  .display-node-block {
    width: 270px;
    margin-bottom: 10px;
    img {
      width: 100%;
      user-select: none;
      -webkit-user-drag: none;
    }
    .title {
      font-size: 12px;
      text-align: center;
      user-select: none;
    }
  }
}
</style>
