<script setup lang="ts">
import ProjectDirectory from "./sideBarNav/ProjectDirectory.vue";
import ComponentBox from "./sideBarNav/Component.vue";
import ResourceBox from "./sideBarNav/ResourceBox.vue";
import GitProjectPane from "./sideBarNav/GitProjectPane.vue";
import { navHeaderList } from "@/utils/constant";
import mplStore from '@mpl/store'
import type { ActiveSidebarTag } from '@mpl/typings'

const coreView = mplStore.viewStore();

function handleSelect(event: MouseEvent) {
  const dom = event.target as HTMLElement;
  const value = dom.getAttribute("mpl-menu") as ActiveSidebarTag;

  coreView.setSideBarTag(value);

  console.log(value);
}
</script>

<template>
  <nav class="mpl-nav-menu">
    <div @click="handleSelect($event)">
      <span v-for="item in navHeaderList" :key="item.value" :mpl-menu="item.value"
        :class="{ select: item.value === coreView.activeNavTag }">
        {{ item.title }}
      </span>
    </div>
  </nav>
  <nav v-show="coreView.activeNavTag !== ''" class="mpl-nav-main">
    <ProjectDirectory v-show="coreView.activeNavTag === 'projectModel'" />
    <ComponentBox v-show="coreView.activeNavTag === 'componentLibsModel'" />
    <ResourceBox v-show="coreView.activeNavTag === 'resourceModel'" />
    <GitProjectPane v-show="coreView.activeNavTag === 'sourceCodeModel'" />
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
  color: #000;
  box-shadow: -1px 0 0 var(--color-1) inset;

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
      background-color: #c6c6c6;
    }

    &.select {
      color: var(--primary-color);
      position: relative;
      box-shadow: 2px 0 0 0 var(--primary-color) inset;
      background-color: #b3b3b3;
      font-weight: 600;
    }
  }
}

.mpl-nav-main {
  height: 100%;
  width: 200px;
  position: relative;
  color: #000;
  background-color: var(--color-7);
  border-right: 1px solid var(--color-1);
}
</style>
