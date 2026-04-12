<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { platformFrame } from '../../core/util'
import MountedContent from './mountedContent.vue'
import { projectStore } from '@mpl/store'
import { ProjectDir } from '@mpl/typings'
import keymaster from 'keymaster'

const project = projectStore()
const isCollapseMenu = ref(true)
const defaultActiveMenu = ref<string>('')
const projectTree = ref<ProjectDir[]>([])
const defaultTheme = ref<string>('mpl-dfn')

function changeMenu(id: string) {
  defaultActiveMenu.value = id
}

function handleSelectNavNode(pageId: string) {
  platformFrame.clickMenu(pageId)
}

onMounted(() => {
  defaultActiveMenu.value = project.activeFile?.id || ''
})

// 初始化快捷键绑定
onMounted(() => {
  // 删除节点
  // keymaster('backspace', function () {
  //   platformFrame.deleteActiveNode()
  // });
  keymaster('delete', function () {
    platformFrame.deleteActiveNode()
  });
})

onMounted(() => {
  window.addEventListener('message', e => {
    const obj = e.data

    if (obj.type === 'INIT_PROJECT_DIR') {
      projectTree.value = JSON.parse(obj.payload.projectTree)
    }
  })
})

function changeTheme() {
  defaultTheme.value = defaultTheme.value === 'mpl-dfn' ? 'mpl-pqc' : 'mpl-dfn'
}
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
      <el-menu active-text-color="#fff" text-color="#c8c9cc" :collapse="isCollapseMenu" menu-trigger="click"
        background="#323232" :default-active="defaultActiveMenu" class="mpl-scroll-none" @select="handleSelectNavNode">
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
        <!-- mpl icon icon-double-arro-right -->
        <div class="trigger-btn" @click="isCollapseMenu = !isCollapseMenu">
          <i class="icon" :class="[isCollapseMenu ? 'icon-double-arro-right' : 'icon-double-arrow-left']" />
        </div>
        <div class="trigger-btn icon icon-theme1" :style="{ color: defaultTheme === 'mpl-dfn' ? '#c3002f' : '#196eff' }"
          @click="changeTheme" />
      </div>
      <MountedContent @menu="changeMenu" />
      <div class="home-page-footer-line">
        <div class="tag-box">
          <span>底部页签</span>
          <!-- <i class="icon icon-close1" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.root-mp--box {
  overflow: hidden;
  height: calc(100% - 4px);
  height: 100%;
  background: #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;

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

  .sidebar-box {
    height: 100%;
    background: #323232;
    color: rgb(204, 204, 204);
    user-select: none;

    .el-menu {
      border: 0;
      overflow: hidden auto;
      height: calc(100% - 42px);
      width: 250px;
      background-color: #323232;

      &.el-menu--collapse {
        width: 65px;
      }

      .el-sub-menu__title:hover {
        background-color: #323232;
      }

      img {
        width: 25px;
        height: 25px;
      }

      li.el-menu-item {
        position: relative;
        background-color: #323232;

        &:hover {
          background-color: #404040;
        }

        &.is-active {
          background-color: #c3002f;
        }
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
    flex-direction: column;
    align-items: flex-start;
    background: #eee;
    width: 100%;
    overflow: hidden;

    >.header-box {
      height: 42px;
      background: #fff;
      box-shadow: inset 0 -1px 0 #d8dee4;
      display: flex;
      justify-content: flex-start;
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
        outline: 1px solid #ccc;

        &:hover {
          background: #ccc;
          color: var(--primary-color);
        }
      }
    }
  }

  .home-page-footer-line {
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    width: 100%;
    background: #f6f8fa;
    color: #1E1E1E;
    pointer-events: none;
    box-shadow: inset 1px 0 0 #d0d7deb3;

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
      background: #c3002f;
      border-right: 1px solid #dadbde;
      color: #f6f8fa;

      >span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80px;
        color: #f6f8fa;
        user-select: none;
      }

      i {
        border-radius: 50%;
        background: #00000026;
        font-size: 12px;
        padding: 1px;
      }
    }
  }
}
</style>
