<script lang="ts" setup>
import { ref, watch } from 'vue'
import { docsList } from '@mpl/const'
import { marketList } from '@/utils/constant'
import mplStore from '@mpl/store'

type MenuType = 'theme' | 'docs' | 'node'

const projectStore = mplStore.projectStore()
const projectRef = ref<any>()
const activePane = ref<Array<MenuType>>(['theme', 'docs', 'node'])

watch(
  () => projectStore.activeFile,
  (value: any) => {
    projectRef.value?.setCheckedNodes([value])
  }
)

function docNodeClick(data: any) {
  if (!data.children)
    projectStore.updateActiveFile(data, true)
}

function customNodeClass(data: any) {
  if (projectStore.activeFile?.id === data.id)
    return 'mpl-active'

  return ''
}

function handlePaneChange(pane: MenuType) {
  const pos = activePane.value.indexOf(pane)

  if (pos >= 0)
    activePane.value.splice(pos, 1)
  else
    activePane.value.push(pane)
}
</script>

<template>
  <div class="more-list-sidebar-pane--container">
    <header @click="handlePaneChange('node')">
      <span class="title">资源列表</span>
      <span>
        <i class="icon" :class="[activePane.includes('node') ? 'icon-xiala3' : 'icon-right1']" />
      </span>
    </header>
    <div v-if="activePane.includes('node')" class="pane-content mpl-scroll-none">
      <div v-for="item in marketList" :key="item.id" class="theme-item"
        :class="{ active: item.id === projectStore.activeFileId }" @click="projectStore.updateActiveFile(item, true)">
        <img src="@/assets/theme2.png" alt="theme-logo">
        <div class="title">
          {{ item.title }}
        </div>
      </div>
    </div>
    <header @click="handlePaneChange('docs')">
      <span class="title">文档列表</span>
      <span class="icon" :class="[activePane.includes('docs') ? 'icon-xiala3' : 'icon-right1']" />
    </header>
    <div v-if="activePane.includes('docs')" class="docs-content mpl-scroll-none">
      <!-- 手动实现tree -->
      <el-tree ref="projectRef" :data="docsList" :props="{
        children: 'children',
        title: 'title',
        class: customNodeClass
      }" class="mpl-project-tree" node-key="id">
        <template #default="{ data }">
          <span class="mpl-tree-custom-node" @click="docNodeClick(data)">
            <span>
              <img v-if="data.children" src="@/assets/file.png" alt="logo">
              <img v-else src="@/assets/logo.png" alt="logo">
              {{ data.title }}
            </span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<style lang="less" scoped>
.more-list-sidebar-pane--container {
  width: 200px;
  height: 100%;
  overflow: hidden;
  position: relative;
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: center;
  user-select: none;
  flex-direction: column;
  color: rgba(204, 204, 204, 0.6);

  >header {
    height: 30px;
    padding: 0 3px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    background-color: #e6e6e6;
    border-bottom: 1px solid #ccc;
    color: #000000;
    width: 100%;
  }

  .docs-content {
    flex: 1;
    width: 100%;
    overflow: hidden auto;

    .mpl-active,
    .mpl-active:hover {
      background-color: #f6f8fa;
    }

    .mpl-project-tree {
      font-size: 12px;
      background-color: transparent;

      .el-tree-node__content {
        cursor: default;
      }

      .mpl-tree-custom-node {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        overflow: hidden;
        padding-right: 5px;
        box-sizing: border-box;
        font-size: 12px;
        user-select: none;
        color: #000;
        height: 100%;

        &.active {
          color: var(--color-7);
        }

        >span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;

          img {
            height: 14px;
            margin-right: 3px;
            position: relative;
            top: 2px;
          }
        }
      }
    }
  }

  .pane-content {
    height: fit-content;
    width: 100%;
    overflow: hidden auto;

    .theme-item {
      line-height: 25px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 12px;
      padding: 0 5px;
      box-sizing: border-box;
      color: #000;

      &.active {
        position: relative;
        background-color: #f6f8fa;
        color: var(--primary-color);

        &::after {
          position: absolute;
          content: '';
          right: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: var(--primary-color);
        }
      }

      img {
        height: 16px;
        margin-right: 5px;
        width: 16px;
        overflow: hidden;
      }

      &:hover {
        background-color: #f6f8fa;
      }

      .title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
    }
  }
}
</style>
