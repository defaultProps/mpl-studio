<script setup lang="ts">
import { complexContextmenu } from '@/utils/dom'
import mplStore from '@mpl/store'
import type { File } from '@mpl/typings'

const projectStore = mplStore.projectStore()

function handleContextmenu(e: MouseEvent, file: File) {
  e.preventDefault()

  const len = projectStore.openFileList.length
  const disabledLeftMenu = len >= 1 && projectStore.openFileList.findIndex(p => p.id === file.id) === len - 1

  const contextmenu = [
    {
      label: '关闭',
      icon: 'mpl-duowenjianjia',
      divider: true,
      value: 'close',
      onclick: () => {
        projectStore.closeFile(file.id)
      }
    },
    {
      label: '关闭左侧',
      value: 'docs',
      icon: 'mpl-more6',
      divider: false,
      disabled: disabledLeftMenu,
      onclick: () => {
        projectStore.closeLeftFile(file.id)
      }
    },
    {
      label: '关闭右侧',
      value: 'docs',
      icon: 'mpl-more6',
      divider: false,
      disabled: disabledLeftMenu,
      onclick: () => {
        projectStore.closeRightFile(file.id)
      }
    },
    {
      label: '关闭其他',
      value: 'docs',
      icon: 'mpl-theme3',
      divider: true,
      disabled: projectStore.openFileList.length <= 1,
      onclick: () => {
        projectStore.closeOthersFile(file.id)
      }
    },
    {
      label: '复制路径',
      value: 'docs',
      icon: 'mpl-theme3',
      divider: false,
      onclick: () => { }
    },
    {
      label: '历史记录',
      value: 'docs',
      icon: 'mpl-theme3',
      divider: false,
      onclick: () => { }
    },
    {
      label: '复制到页面',
      value: 'docs',
      icon: 'mpl-theme3',
      divider: false,
      onclick: () => { }
    },
    {
      label: '页面信息',
      value: 'docs',
      icon: 'mpl-theme3',
      divider: false,
      onclick: () => { }
    }
  ]

  complexContextmenu(e, contextmenu, file.title)
}
</script>

<template>
  <header v-show="projectStore.openFileList.length" class="page-open--container mpl-scroll-none">
    <div v-for="item in projectStore.openFileList" :key="item.id" class="page" :title="item.title"
      :data-page-id="item.id" :class="{ select: item.id === projectStore.activeFile?.id }" :mpl-c-id="item.title"
      @contextmenu="handleContextmenu($event, item)" @click="projectStore.updateActiveFile(item, true)">
      <img v-if="item.type === 'page'" src="@/assets/logo.png" alt="-">
      <img v-else-if="item.type === 'theme'" src="@/assets/theme2.png" alt="-">
      <img v-else-if="item.type === 'doc'" src="@/assets/logo.png" alt="-">
      <img v-else-if="item.type === 'resource'" src="@/assets/service.png" alt="-">
      <img v-else-if="item.type === 'sourceCode'" src="@/assets/file-table.png" alt="-">
      <img v-else src="@/assets/question.svg" alt="-">
      <span class="title" :title="item.title">
        {{ item.title }}
      </span>
      <button class="mpl-btn close-btn ml-5 icon icon-close1" @click.stop="projectStore.closeFile(item.id)" />
    </div>
  </header>
</template>

<style lang="less" scoped>
.page-open--container {
  white-space: nowrap;
  overflow: hidden;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: inset 0 -1px 0 var(--color-1);
  box-sizing: border-box;
  background-color: #e6e6e6;

  .page {
    padding: 0 5px;
    height: 100%;
    overflow: hidden;
    cursor: default;
    user-select: none;
    max-width: 160px;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    color: #000;
    box-shadow: inset -1px 0 0 0 var(--color-1), 0 -1px 0px var(--color-1) inset;

    img {
      width: 16px;
      height: 16px;
      display: inline-block;
      overflow: hidden;
      margin-right: 4px;
    }

    &:hover {
      i.close-btn {
        opacity: 1;
        color: var(--primary-color);
      }
    }

    &.select {
      box-shadow: inset -1px 0px 0px var(--color-1);
      color: var(--primary-color);
      font-weight: 600;
      background: var(--color-7);
    }

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
  }
}
</style>
