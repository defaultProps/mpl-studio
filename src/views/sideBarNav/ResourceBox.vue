<script lang="ts" setup>
import { ref, watch } from 'vue'
import { docsList } from '@mpl/const'
import { marketList } from '@/utils/constant'
import { projectStore } from '@mpl/store'

type MenuType = 'theme' | 'docs' | 'node'

const project = projectStore()
const projectRef = ref<any>()
const activePane = ref<Array<MenuType>>(['theme', 'docs', 'node'])

watch(
  () => project.activeFile,
  (value: any) => {
    projectRef.value?.setCheckedNodes([value])
  }
)

function docNodeClick(data: any) {
  project.updateActiveFile(data, true)
}

function handlePaneChange(pane: MenuType) {
  const pos = activePane.value.indexOf(pane)

  if (pos >= 0) activePane.value.splice(pos, 1)
  else activePane.value.push(pane)
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
        :class="{ active: item.id === project.activeFileId }" @click="project.updateActiveFile(item, true)">
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
      <template v-for="docs in docsList">
        <div class="header-line">
          {{ docs.title }}
        </div>
        <div v-for="doc in docs.children" class="doc-item" :class="{ target: doc.id === project.activeFileId }"
          @click="docNodeClick(doc)">
          <img src="@/assets/file.png" alt="logo">
          {{ doc.title }}
        </div>
      </template>
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
    height: 25px;
    padding: 0 3px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    background: #e6e6e6;
    border-bottom: 1px solid #ccc;
    color: #000000;
    width: 100%;
  }

  .docs-content {
    flex: 1;
    width: 100%;
    overflow: hidden auto;
    color: #333;
    text-align: left;

    .header-line {
      font-weight: 600;
    }

    .header-line {
      display: flex;
      align-items: center;
      height: 26px;
      font-size: 12px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: default;
      user-select: none;
      padding: 0 10px;
    }

    .doc-item {
      padding-left: 20px;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      align-items: center;
      height: 26px;
      line-height: 26px;

      img {
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }

      &:hover {
        background: #e6e6e6;
      }

      &.target {
        background: #e6e6e6;
        position: relative;
        color: var(--primary-color);
        font-weight: 600;

        &::after {
          position: absolute;
          content: '';
          top: 0;
          right: 0;
          width: 2px;
          height: 100%;
          bottom: 0;
          background: var(--primary-color);
        }
      }
    }

    .mpl-active,
    .mpl-active:hover {
      background: #e6e6e6;
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
      color: #1E1E1E;

      &.active {
        position: relative;
        background: #f6f8fa;
        color: var(--primary-color);
        font-weight: 600;

        &::after {
          position: absolute;
          content: '';
          right: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--primary-color);
        }
      }

      img {
        height: 16px;
        margin-right: 5px;
        width: 16px;
        overflow: hidden;
      }

      &:hover {
        background: #e6e6e68a;
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
