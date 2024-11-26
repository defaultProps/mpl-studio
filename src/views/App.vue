<script setup lang="ts">
import { onMounted } from 'vue'
import HeaderBox from '@/components/HeaderBox.vue'
import NavBox from '@/views/NavBox.vue'
import PageOpenList from '@/views/PageOpenList.vue'
import DisplayNodeList from '@/views/nodeView/DisplayNodeList.vue'
import WorkbenchBox from '@/views/workbench/WorkbenchBox.vue'
import mplStore from '@mpl/store'
import InitialPage from '@/components/InitialPage.vue'
import ContextMenuNode from '@/components/ContextMenu.vue'
import { resetContextmenu } from '@mpl/const'

const coreView = mplStore.viewStore()
const projectStore = mplStore.projectStore()

onMounted(() => {
  document.addEventListener('click', () => {
    resetContextmenu()
  })
  document.addEventListener('mousewheel', () => {
    resetContextmenu()
  })
})
</script>

<template>
  <!-- 右键菜单节点 -->
  <ContextMenuNode />
  <!-- 顶部栏 -->
  <HeaderBox />
  <section class="mpl-container">
    <!-- 左侧菜单 -->
    <NavBox v-if="projectStore.userRole" />
    <!-- 左侧菜单内容 -->
    <DisplayNodeList v-show="coreView.visibleDisplayNodeBox" />
    <!-- 主要操作区域 -->
    <main class="drawing-board--container">
      <PageOpenList />
      <InitialPage v-if="coreView.activeMainModel === 'initialPage'" />
      <!-- 预加载 - 画板iframe -->
      <WorkbenchBox v-else-if="coreView.activeMainModel === 'workbench'" />
    </main>
  </section>
</template>

<style scoped lang="less">
section.mpl-container {
  position: relative;
  width: 100%;
  bottom: 0;
  height: calc(100% - 30px);
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;

  main.drawing-board--container {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
}
</style>
