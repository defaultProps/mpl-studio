<script setup lang="ts">
import { onMounted, ref, createApp, defineComponent } from 'vue'
import { platformFrame } from '../../core/util'
import type { ProjectDir } from '@mpl/typings'
// import mountPage from './render'
import localforage from 'localforage'
import { mplRegister, generatorTemplate, generatorVars } from '@mpl/node'
import ElementPlus from 'element-plus'
import { beautifyCode, monacoFormatter, mplSystemRule } from '@mpl/const'
import * as beautify from 'js-beautify'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import { compileSFC } from '@mpl/libs'

const isLoading = ref(false)
window.ref = ref
const isCollapseMenu = ref(true)
const defaultActiveMenu = ref<string>('')
const projectTree = ref<ProjectDir[]>([])
const defaultTheme = ref<string>('mpl-dfn')
const drawerVisible = ref(false)
let pageInfo: any = {}
let app: any = null
const vueString = ref('')

onMounted(async () => {
  const pageId = new URL(window.parent.document.location.href).searchParams.get('id')

  if (!pageId) {
    return
  }
  pageInfo = await localforage.getItem(`previewNodeList-${pageId}`)
})

function handleSelectNavNode(pageId: string) {
  platformFrame.clickMenu(pageId)
}

// onMounted(async () => {
//   // defaultActiveMenu.value = projectStore.activeFile?.id || ''
//   if (!window.parent) {
//     return
//   }
//   const fileId = new URL(window.parent.location.href).searchParams.get('id')
//   const obj = await localforage.getItem(`previewNodeList-${fileId}`)
//   console.log(obj)
// 获取左侧菜单目录
// fetch('https://127.0.0.1:8080/getMenu')
// 获取页面详情
// fetch('https://127.0.0.1:8080/getFileDetail')
// 获取挂载前端API
// fetch('https://127.0.0.1:8080/getClientAPI')
// 图片、自定义样式文件、通用脚本
// fetch('https://127.0.0.1:8080/getResourceList')
// 获取主题列表
// fetch('https://127.0.0.1:8080/getThemeList')
// 获取图标
// fetch('https://127.0.0.1:8080/getIcon')

// 当所有的资源加载完成后，再postMessage loading = false
// })

async function getPage() {
  if (!pageInfo) {
    return
  }

  const { nodeList, style } = JSON.parse(pageInfo)
  const template = await generatorTemplate(nodeList, 'elementPlus')
  const vars = await generatorVars(nodeList)
  const scriptEnd = '</' + `script>`
  vueString.value = `
    <template>
      <el-form class="el-row">
        ${template}
      </el-form>
    </template>
    <script>
      export default {
        setup() {
          return {
            mpl: ref(${JSON.stringify(vars)})
          }
        },
      }
    ${scriptEnd}
  `

  const componentOptions: any = await compileSFC(vueString.value)

  app = createApp(defineComponent(componentOptions))

  app.use(mplRegister)
  app.use(ElementPlus)
  app.mount('#dfnRenderRef')
}

function changeTheme() {
  defaultTheme.value = defaultTheme.value === 'mpl-dfn' ? 'mpl-pqc' : 'mpl-dfn'
}

const emit = defineEmits(['change', 'close'])

let monacoInstance: null | editor.IStandaloneCodeEditor = null

function viewCode() {
  drawerVisible.value = true
}

function handleClose() {
  monacoInstance?.dispose()
  drawerVisible.value = false
}

function opened() {
  const dom = document.getElementById('designIDECode')

  if (dom) {
    monacoInstance = monacoEditor.editor.create(
      dom,
      Object.assign(monacoFormatter.html, {
        value: beautify.html(vueString.value, beautifyCode.html),
        readOnly: true,
        fontSize: 16,
        language: 'html',
        tabSize: 2,
        minimap: {
          enabled: true
        },
      })
    )
  }
}

</script>

<template>
  <el-drawer v-model="drawerVisible" direction="rtl" class="drawer-ide" size="600px" :before-close="handleClose"
    :with-header="false" @opened="opened">
    <div id="designIDECode" style="width: 100%;height:100%;" />
  </el-drawer>
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
        <button type="button" class="base-btn" @click="isCollapseMenu = !isCollapseMenu">
          <i class="icon" :class="[isCollapseMenu ? 'icon-double-arro-right' : 'icon-double-arrow-left']" />
        </button>
        <button type="button" class="trigger-btn icon icon-theme1"
          :style="{ color: defaultTheme === 'mpl-dfn' ? '#c3002f' : '#196eff' }" @click="changeTheme" />
        <button type="button" class="update-btn" @click="getPage">  
          刷新页面
        </button>
        <button type="button" class="update-btn" @click="viewCode"> 
          页面源码
        </button>
      </div>
      <main class="dfn-content" :class="{ 'is-loading': isLoading }">
        <div id="dfnRenderRef" />
      </main>
      <div class="home-page-footer-line">
        <div class="tag-box">
          <span>底部页签</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.drawer-ide {
  .el-drawer__body {
    padding: 0;
  }
}

.root-mp--box {
  overflow: hidden;
  height: calc(100% - 4px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #ccc;

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
    background: #fff;
    box-shadow: inset 0 -1px 0 #d8dee4;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;

    button {
      width: 28px;
      min-width: fit-content;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;

      &:hover {
        color: var(--primary-color);
      }
    }

    .update-btn {
      height: 28px;
      font-size: 12px;
      padding: 0 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
    }
  }

  .sidebar-box {
    height: 100%;
    background-color: #323232;
    color: rgb(204, 204, 204);
    user-select: none;

    .el-menu {
      border: 0;
      overflow: hidden auto;
      height: calc(100% - 42px);
      width: 200px;
      background-color: #323232;

      &.el-menu--collapse {
        width: 65px;
      }

      img {
        width: 25px;
        height: 25px;
      }

      li.el-menu-item {
        position: relative;
        background-color: #323232;
      }
    }

    .header-logo {
      height: 42px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0 0 3px;
      font-size: 18px;
      font-weight: 600;
      user-select: none;

      &.is-collapse {
        justify-content: center;
      }

      img {
        width: 35px;
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
    width: 100%;
    overflow: hidden;

    .dfn-content {
      flex: 1;
      padding: 15px;
      box-sizing: border-box;
      width: 100%;
      overflow: auto;

      #dfnRenderRef {
        width: 100%;
        height: 100%;
        overflow: auto;
        // background-color: #ccc;
      }
    }
  }

  .home-page-footer-line {
    height: 30px;
    border-top: 1px solid #ccc;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    width: 100%;

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
      color: #fff;
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
