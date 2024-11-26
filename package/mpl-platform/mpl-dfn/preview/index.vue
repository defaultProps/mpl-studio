<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { platformFrame } from '../../core/util'
import mplStore from '@mpl/store'
import type { ProjectDir } from '@mpl/typings'

const projectStore = mplStore.projectStore()
const isCollapseMenu = ref(false)
const defaultActiveMenu = ref<string>('')
const projectTree = ref<ProjectDir[]>([])
function handleSelectNavNode(pageId: string) {
  platformFrame.clickMenu(pageId)
}

onMounted(() => {
  defaultActiveMenu.value = projectStore.activeFile?.id || ''
})

onMounted(() => {
  window.addEventListener('message', (e) => {
    const obj = e.data

    if (obj.type === 'INIT_PROJECT_DIR')
      projectTree.value = JSON.parse(obj.payload.projectTree)

    if (obj.type === 'UPDATE_ACTIVE_PAGE')
      defaultActiveMenu.value = obj.payload.id
  })
})
</script>

<template>
  <div class="root-mp--box">
    <div class="sidebar-box">
      <div class="header-logo" :class="{ 'is-collapse': isCollapseMenu }">
        <img src="@/assets/logo.png" alt="logo">
        <h1 v-if="!isCollapseMenu">
          MPL云服务中心
        </h1>
      </div>
      <el-menu active-text-color="var(--color-7)" text-color="#c8c9cc" :collapse="isCollapseMenu" menu-trigger="click"
        background-color="var(--color-3)" :default-active="defaultActiveMenu" class="mpl-scroll-none"
        @select="handleSelectNavNode">
        <el-sub-menu v-for="item in projectTree" :key="item.id" :index="item.id">
          <template #title>
            <img v-show="isCollapseMenu" src="@/assets/file.png">
            <div v-show="!isCollapseMenu">
              {{ item.title }}
            </div>
          </template>
          <el-menu-item v-for="p in item.children" :key="p.id" :index="p.id">
            {{ p.title }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="content-box">
      <div class="header-box">
        <div class="trigger-btn" @click="isCollapseMenu = !isCollapseMenu">
          <i class="mpl icon" :class="[
            isCollapseMenu
              ? 'mpl-double-arro-right'
              : 'mpl-double-arrow-left'
          ]" />
        </div>
      </div>
      <div class="loading-preview">
        预览加载中...
      </div>
      <div class="footer-box">
        <div class="tag-box">
          <span>底部页签</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.root-mp--box {
  overflow: hidden;
  height: calc(100% - 4px);
  height: 100%;
  background-color: #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  box-sizing: border-box;
  border: 1px solid var(--color-1);

  .componentDraggingBox {
    position: absolute;
    border: 1px solid var(--primary-color);
    z-index: 100;
    transform: translate(-1px, -1px);
    background: linear-gradient(45deg,
        #2f7f795c 0,
        #2f7f795c 25%,
        transparent 25%,
        transparent 50%,
        #2f7f795c 50%,
        #2f7f795c 75%,
        transparent 75%,
        transparent);
    background-size: 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    color: #000000;
    pointer-events: none;
    user-select: none;
  }

  .header-box {
    height: 42px;
    background-color: var(--color-7);
    box-shadow: inset 0 -1px 0 #d8dee4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;

    .trigger-btn {
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      border-radius: 4px;
      outline: 1px solid var(--color-1);

      &:hover {
        background-color: var(--color-1);
        color: var(--primary-color);
      }
    }
  }

  .sidebar-box {
    height: 100%;
    background-color: var(--color-3);
    color: rgb(204, 204, 204);
    user-select: none;

    .el-menu {
      border: 0;
      overflow: hidden auto;
      height: calc(100% - 42px);
      width: 250px;

      &.el-menu--collapse {
        width: 65px;
      }

      img {
        width: 25px;
        height: 25px;
      }

      li.el-menu-item {
        position: relative;
      }
    }

    .header-logo {
      height: 42px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0 0 3px;
      font-size: 20px;
      font-weight: 600;
      user-select: none;

      &.is-collapse {
        justify-content: center;
      }

      img {
        width: 40px;
      }

      h1 {
        margin-right: 5px;
        font-size: 20px;
      }
    }
  }

  .content-box {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    background-color: #eee;
    width: 100%;

    .loading-preview {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }

  .footer-box {
    height: 30px;
    box-shadow: inset -1px 0 0 0 rgb(0 0 0 / 10%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    width: 100%;
    background-color: #dadbde;

    .tag-box {
      display: flex;
      align-items: center;
      height: 100%;
      width: 80px;
      box-sizing: border-box;
      cursor: default;
      text-align: center;
      justify-content: space-between;
      padding: 0 5px;
      background: var(--color-4);
      color: var(--color-7);
      border-right: 1px solid #dadbde;

      >span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80px;
      }
    }
  }
}
</style>
