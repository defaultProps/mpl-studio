<script lang="ts" setup>
// import { project } from './sidebar'

// interface Tree {
// 	id: string
// 	label: string
// 	isPenultimate?: boolean
// 	children?: Tree[]
// }

// 样式、主题、图片、图标、字体、接口、API、变量、html、Events
// 所有框架同步更新：vue3、SinglePageVue3、Vue2、SinglePageVue

// const defaultProps = {
// 	children: 'children',
// 	title: 'title',
// 	class: (data: Tree) => {
// 		return !data.children && data.id === project.activeFile?.id ? 'mpl-active' : ''
// 	}
// }
</script>

<template>
  <div class="project-sourceCode-sidebar--container">
    源码仓库地址
    <!--
      1、静态资源存储在一个单独的文件夹内，不显示内部的文件，点击文件夹可视化显示列表内容。
      2、图片列表展示：点击复制图片地址。
      3、样式脚本IDE展示，点击编辑文件
    -->
    <!-- 手动实现tree -->
    <!-- mpl-tree
      node-key="id"
      class="mpl-package-tree mpl-scroll-none"
      :data="project.packageSourceTree"
      default-expand-all
      :props="defaultProps"
      @node-click="project.clickNode"
    >
      <template #default="{ data }">
        <span class="mpl-tree-custom-node" :title="data.title">
          <img v-if="data.children" src="@/assets/file.png" alt="logo">
          <img v-else src="@/assets/logo.png" alt="">
          {{ data.title }}
        </span>
      </template>
</mpl-tree> -->
  </div>
</template>

<style lang="less" scoped>
.project-sourceCode-sidebar--container {
  width: 200px;
  height: 100%;
  overflow: hidden;
  position: relative;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: #1E1E1E;
  padding: 5px;
  box-sizing: border-box;

  .mpl-package-tree {
    font-size: 12px;
    background: transparent;
    height: 100%;
    width: 100%;
    color: rgb(204, 204, 204);
    flex: 1;
    overflow: hidden auto;

    .mpl-tree-custom-node {
      width: 100%;
      overflow: hidden;
      padding-right: 5px;
      box-sizing: border-box;
      font-size: 13px;
      user-select: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;

      img {
        height: 15px;
        margin-right: 3px;
        position: relative;
        top: 3px;
      }

      .mpl-file {
        color: var(--primary-color);
      }

      .mpl-folder {
        color: #e6a23c;
      }
    }
  }
}
</style>
