<script setup lang="ts">
import { projectStore } from '@mpl/store'
import type { File } from '@mpl/typings'
import ContextMenu from '@imengyu/vue3-context-menu'

const project = projectStore()

function handleContextmenu(e: MouseEvent, file: File) {
  e.stopPropagation()
  e.preventDefault()

  const len = project.openFileList.length
  const disabledLeftMenu = len >= 1 && project.openFileList.findIndex(p => p.id === file.id) === len - 1

  const contextmenu = [
    {
      label: '关闭',
      icon: 'mpl-duowenjianjia',
      divider: true,
      value: 'close',
      onclick: () => {
        project.closeFile(file.id)
      }
    },
    {
      label: '关闭左侧',
      value: 'docs',
      icon: 'mpl-more6',
      divider: false,
      disabled: disabledLeftMenu,
      onclick: () => {
        project.closeLeftFile(file.id)
      }
    },
    {
      label: '关闭右侧',
      value: 'docs',
      icon: 'mpl-more6',
      divider: false,
      disabled: disabledLeftMenu,
      onclick: () => {
        project.closeRightFile(file.id)
      }
    },
    {
      label: '关闭其他',
      value: 'docs',
      icon: 'mpl-theme3',
      divider: true,
      disabled: project.openFileList.length <= 1,
      onclick: () => {
        project.closeOthersFile(file.id)
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

  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: contextmenu
  })
}

function newEmptyPage() {
  // 新建一个空白文件。文件类型固定为文本类型
  alert('新建一个空白文件, 文件内容固定为page类型')
}

function handleDblclick(item: File) {
  // 双击生成一个新的页面。 此页面是一个未保存的临时页面。页面类型是画板页面。
  // 页面为空，画板绘制页面， 当用户点击ctrl+s时，保存页面, 用户选择保存的页面位置\
  // 方便用户快速保存新建页面.
}
</script>


<!-- 
  1、同一时间社区版只能编辑1个文件[vue页面类型]
  2、同一时间企业版可以编辑3个文件[vue页面类型]
  3、页面只读类型最多开启2个页面[iframe过多卡死] 
  4、页签最多展示10个. 其中编辑页面最多3个, 展示页面最多7个
  5、刷新时弹框是否保存用户编辑信息.
  6、页面编辑类型未保存时, 弹框提示是否保存.
  7、多个浏览器窗口只能开启一个编辑页签.
-->
<template>
  <header v-show="project.openFileList.length" class="page-open--container mpl-scroll-none"
    @dblclick.stop.prevent="newEmptyPage">
    <div v-for="item in project.openFileList" :key="item.id" class="page" :title="item.title" :data-page-id="item.id"
      :class="{ select: item.id === project.activeFile?.id }" @contextmenu="handleContextmenu($event, item)"
      @click="project.updateActiveFile(item, true)" @dblclick.stop.prevent="handleDblclick(item)">
      <!-- 不用svg-icon是因为dom标签太多, 导致性能问题.
      所以这里用img标签来展示图标. -->
      <img v-if="item.type === 'basePage'" src="@/assets/page.svg" alt="-">
      <img v-else-if="item.type === 'theme'" src="@/assets/theme2.png" alt="-">
      <img v-else-if="item.type === 'doc'" src="@/assets/logo.png" alt="-">
      <img v-else-if="item.type === 'resource'" src="@/assets/service.png" alt="-">
      <img v-else-if="item.type === 'sourceCode'" src="@/assets/file-table.png" alt="-">
      <img v-else src="@/assets/question.svg" alt="-">
      <span class="title" :title="item.title">
        {{ item.title }}
      </span>
      <button type="button" class="mpl-btn close-btn ml-5 icon icon-close1" @click.stop="project.closeFile(item.id)" />
    </div>
  </header>
</template>

<style lang="less" scoped>
.page-open--container {
  white-space: nowrap;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  background: #e6e6e6;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    background: #ccc;
    z-index: 1;
  }

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
    color: #1E1E1E;
    border-right: 1px solid #ccc;

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
      color: var(--primary-color);
      font-weight: 600;
      background: #ffffff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1px;
        background: #fff;
        z-index: 2;
      }
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
