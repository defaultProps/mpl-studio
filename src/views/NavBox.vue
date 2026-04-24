<script setup lang="ts">
import ProjectDirectory from './sideBarNav/ProjectDirectory.vue'
import ComponentBox from './sideBarNav/Component.vue'
import ResourceBox from './sideBarNav/ResourceBox.vue'
import GitProjectPane from './sideBarNav/GitProjectPane.vue'
import { navHeaderList } from '@/utils/constant'
import { viewStore } from '@mpl/store'
import type { ActiveSidebarTag } from '@mpl/typings'

const coreView = viewStore()

function handleSelect(value: ActiveSidebarTag) {
  coreView.setSideBarTag(value)
}
</script>

<template>
  <nav class="mpl-nav-menu">
    <span v-for="item in navHeaderList" :key="item.value" :mpl-menu="item.value"
      :class="{ select: item.value === coreView.activeNavTag }" @click="handleSelect(item.value)">
      {{ item.title }}
    </span>
  </nav>
  <nav v-show="coreView.activeNavTag !== ''" class="mpl-nav-main">
    <!-- 保证DOM数量够少，且需要存储用户编辑状态 -->
    <ProjectDirectory v-show="coreView.activeNavTag === 'projectModel'" />
    <ComponentBox v-if="coreView.activeNavTag === 'componentLibsModel'" />
    <ResourceBox v-if="coreView.activeNavTag === 'resourceModel'" />
    <GitProjectPane v-if="coreView.activeNavTag === 'sourceCodeModel'" />
  </nav>
</template>

<style scoped lang="less">
.mpl-nav-menu {
  width: 25px;
  background: #e6e6e6;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  font-size: 0;
  color: #1E1E1E;
  border-right: 1px solid #ccc;
  box-sizing: border-box;

  span {
    cursor: default;
    text-orientation: sideways-right;
    writing-mode: tb-rl;
    padding: 10px 0;
    font-size: 12px;
    display: inline-block;
    width: 25px;
    line-height: 25px;
    transform: rotate(-180deg);
    user-select: none;

    i {
      font-size: 12px;
    }

    &:hover {
      background: #c6c6c6;
    }

    &.select {
      color: var(--primary-color);
      position: relative;
      box-shadow: 2px 0 0 0 var(--primary-color) inset;
      background: #b3b3b3;
      font-weight: 600;
    }
  }
}

.mpl-nav-main {
  height: 100%;
  width: 200px;
  position: relative;
  background: #ffffff;
  border-right: 1px solid #cccccc;
}
</style>
