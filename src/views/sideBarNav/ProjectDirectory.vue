<script lang="ts" setup>
import { ref } from "vue";
import { project } from "./sidebar";
import mplStore from '@mpl/store'

const projectStore = mplStore.projectStore();
const defaultExpandKey = ref<string>("rg53href08nt3f3");

const defaultProps = {
  children: "children",
  title: "title",
  class: (data: any) => {
    return { 'mpl-active' : data.id === projectStore.activeFile?.id }
  },
};

function pageTitle(obj: any) {
  const title = `🗂️标题：${obj.title}\n`;
  const user = `👨‍🌾当前用户：许丽\n`;
  const saveUsersName = `👨‍🌾参与用户[12]：张琳、林芝、许丽、赵倩、孙超然、李谈...\n`;
  const description = `📧页面描述：页面描述信息\n`;
  const lastUpdateTime = `🍗最新更新：2023-12-12 09:23`;

  return `${title}${user}${saveUsersName}${description}${lastUpdateTime}`;
}
</script>

<template>
  <div class="mpl-project--container mpl-scroll-none">
    <div class="mpl-title">{{ projectStore.activeProject?.title }}</div>
    <el-tree ref="projectRef" class="mpl-project-tree mpl-scroll-none" :data="projectStore.projectTree"
      :props="defaultProps" node-key="id" :default-expanded-keys="[projectStore.activeFile?.id || defaultExpandKey]"
      @node-click="project.clickNode">
      <template #default="{ data }">
        <span class="mpl-tree-custom-node" :title="pageTitle(data)">
          <img v-if="data.children?.length" src="@/assets/file.png" alt="logo">
          <img v-else src="@/assets/logo.png" alt="logo">
          <span class="label">{{ data.title }}</span>
          <img v-if="projectStore.lockedFileList.includes(data.id)" src="@/assets/avatar/02.svg" class="avatar" alt="">
        </span>
      </template>
    </el-tree>
  </div>
</template>

<style lang="less">
.mpl-header-popover {
  overflow: hidden;
  box-shadow: none;

  .mpl-tree-popover--item {
    line-height: 30px;
    padding-left: 10px;
    font-size: 12px;
    cursor: default;
    user-select: none;

    &.divider {
      border-bottom: 1px solid rgb(0 0 0 / 10%);
    }

    &:hover {
      color: #196eff;
      background-color: var(--primary-color);

      i {
        color: #196eff !important;
      }
    }

    .checked {
      float: right;
      position: relative;
      right: 10px;
    }
  }
}
</style>

<style lang="less">
.mpl-project--container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  height: 100%;

  .mpl-title {
    height: 58px;
    color: var(--color-2);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    padding: 0 10px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 58px;
    display: inline-flex;
  }

  .mpl-project-tree {
    font-size: 14px;
    width: 100%;
    background-color: transparent;
    flex: 1;
    overflow: hidden auto;

    .el-tree-node__content {
      cursor: default;
    }

    .el-tree-node.mpl-active>.el-tree-node__content {
      background-color: #e6e6e6;

      .mpl-tree-custom-node {
        box-shadow: -2px 0 0 0 inset var(--primary-color);
      }
    }

    .mpl-tree-custom-node {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      font-size: 12px;
      user-select: none;
      color: #000;
      height: 100%;

      img {
        height: 14px;
        margin-right: 3px;
        width: fit-content;
      }

      span.label {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      img.avatar {
        width: 18px;
        height: 18px;
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
