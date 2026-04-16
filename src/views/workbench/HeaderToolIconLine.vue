<script lang="ts" setup>
import i18nInstance from '@mpl/i18n'
import { workbenchOptions, workbenchSizeOptions } from '@/utils/constant'
import { workbenchStore, projectStore, viewStore, userStore } from '@mpl/store'
import { mplIframePostMessage } from '@mpl/const'
import ClearPageDialog from '../../components/dialog/ClearPageDialog.vue'
import { saveAs } from 'file-saver'
import { ref, onMounted, onUnmounted } from 'vue'
import AIAskDialog from '../../components/dialog/AIAskDialog.vue'

const clearPageDialogVisible = ref<boolean>(false)
const aiAskDialogVisible = ref<boolean>(false)
const project = projectStore()
const workbench = workbenchStore()
const user = userStore()
const view = viewStore()

function cleanWorkbench() {
  // 创建校验输入内容后，才允许删除
  workbenchStore().resetStore()
}

// 下载页面数据
function downloadFile() {
  const exportJSON = {
    nodeList: workbench.nodeList, // 节点列表
    noteList: workbench.noteList, // 注解列表
    pageStyle: workbench.pageStyle, // 页面样式
    pageImport: workbench.pageImport, // 页面脚本
    eventList: workbench.eventList, // 事件列表
    pageInfo: workbench.pageMeta, // 页面信息
    pageCode: '' // 生成的页面源码
  }
  const blob = new Blob([JSON.stringify(exportJSON)], { type: "application/json" })
  const activeFileName = project.activeFile?.title || 'mpl导出文件'

  saveAs(blob, `${activeFileName}.json`)
}

async function openPreview() {
  // 初始化预览窗口存储
  if (!Array.isArray(window.mplFocusPreviewWindowList)) {
    window.mplFocusPreviewWindowList = []
  }

  if (!project.activeFileId) {
    return
  }

  const obj = window.mplFocusPreviewWindowList.find(v => v.id === project.activeFileId)

  // 复用现有预览窗口
  if (obj?.target && !obj.target.closed) {
    obj.target.focus()
  } else {
    // 根据挂载平台预览不同窗口.PC默认用户窗口大小
    if (workbench.activePlatform.includes('MPL-DFN')) {
      // const windowFeatures = `left=0,top=0,width=${window.screen.width},height=${window.screen.height}`
      const params = {
        id: project.activeFileId,
        name: project.activeFile?.title || '',
        width: window.screen.width,
        height: window.screen.height
      }
      // 移动端固定宽度，每次打开都要缓存window引用。引用可以更新窗口大小。handler.resizeTo(100, 100)
      const handler = window.open(
        `/preview?id=${params.id}&name=${params.name}`,
        'MPL-DFN',
      )
      window.mplFocusPreviewWindowList.push({
        target: handler,
        id: project.activeFileId,
        params: ''
      })
    }

    // 移动端窗口
    // if (workbench.activePlatform.includes('MPL-MHS')) {
    //   const windowFeatures = 'left=200,top=300,width=390,height=844'
    //   const params = {
    //     id: project.activeFileId,
    //     name: project.activeFile?.title || '',
    //     width: 390,
    //     height: 844
    //   }
    //   const handler = window.open(
    //     `/preview?page=${params.id}&name=${params.name}`,
    //     '_blank',
    //     windowFeatures
    //   )
    //   window.mplFocusPreviewWindowList.push({
    //     target: handler,
    //     id: project.activeFileId,
    //     params: ''
    //   })
    // }
  }
}

function changeWorkbenchSize() {
  mplIframePostMessage.workbench.changeWorkbenchSize(workbench.workbenchSize)
}

function handleSelectNote() {
  if (user.authority !== 'enterprise') {
    return
  }

  workbench.triggerVisibleNote()
}

function handleSelectDraft() {
  if (user.authority !== 'enterprise') {
    return
  }

  workbench.triggerVisibleDraft()
}

function handleSyncSwagger() {
  alert('同步更新swagger接口文档,弹窗. 并显示组件绑定的接口文档')
}

function handleWheel(e: any) {
  const dom = document.querySelector('header.header-tool-btn--container')
  if (!dom) {
    return
  }

  dom.addEventListener('wheel', function (e: any) {
    // 阻止默认滚轮行为
    // 如果出现弹框. 那么就不需要滚动了.
    if (view.isOpenDialog) {
      return
    }

    e.preventDefault();
    // 控制滚动速度
    const speed = 30;
    // 滚轮纵向偏移 转为横向滚动
    dom.scrollBy({
      left: e.deltaY * speed,
      behavior: 'smooth'
    });
  });
}

// 直接鼠标横向滚动, 不需要按住shift键
onMounted(() => {
  const dom = document.querySelector('header.header-tool-btn--container')
  if (!dom) {
    return
  }
  dom.addEventListener('wheel', handleWheel)
})

onUnmounted(() => {
  const dom = document.querySelector('header.header-tool-btn--container')
  if (!dom) {
    return
  }
  dom.removeEventListener('wheel', handleWheel)
})

function handleAskAI() {
  aiAskDialogVisible.value = true
  view.$patch({
    isOpenDialog: true
  })
}


</script>
<template>
  <header class="header-tool-btn--container mpl-scroll-x">
    <!-- 清空页面弹框确定 -->
    <ClearPageDialog v-if="clearPageDialogVisible" v-model="clearPageDialogVisible" />
    <!-- AI提问 -->
    <AIAskDialog v-if="aiAskDialogVisible" v-model="aiAskDialogVisible" />
    <div class="workbench-tool-container" aria-label="工作台">
      <div class="line-box">
        <button type="button" class="mpl-btn del-btn mr-5 icon icon-qingkongshanchu"
          title="清空，无法撤销回滚. &#10; ctrl + shift + backspace" @click="cleanWorkbench" />
        <!-- <button type="button" class="mpl-btn mr-5">
          {{ workbench.activePlatform.join(', ') }}桌面平台
        </button> -->
        <select v-model="workbench.workbenchLayout" class="mpl-select mr-5" :disabled="user.authority !== 'enterprise'"
          style="max-width: 100px">
          <option v-for="item in workbenchOptions" :key="item.value" :label="item.label" :value="item.value" />
        </select>
        <select v-model="workbench.workbenchSize" class="mpl-select mr-5" @change="changeWorkbenchSize">
          <option v-for="item in workbenchSizeOptions" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled || false" />
        </select>
      </div>
      <div class="line-box">
        <button class="mpl-btn mr-5" :class="{ 'is-active': view.autoSave }" @click="view.triggerAutoSave">
          自动保存
        </button>
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleGuildLine }" title="纵向分割24份，高度12px"
          @click="workbench.triggerVisibleGuild">
          {{ i18nInstance.global.t('workbenchHeaderTool.guildLine') }}
        </button>
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleNodeOutline }"
          @click="workbench.triggerVisibleNodeCalloutLine">
          {{ i18nInstance.global.t('workbenchHeaderTool.nodeCalloutLine') }}
        </button>
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleBtnGroup }"
          @click="workbench.triggerVisibleBtnGroup">
          辅助工具栏
        </button>

        <button class="mpl-btn mr-5 icon icon-jurassic_import-data"
          :title="i18nInstance.global.t('workbenchHeaderTool.codePush')" />
        <button class="mpl-btn mr-5 icon icon-jurassic_laststep" disabled
          :title="i18nInstance.global.t('workbenchHeaderTool.redo')" />
        <button class="mpl-btn mr-5 icon icon-jurassic_nextstep" disabled
          :title="i18nInstance.global.t('workbenchHeaderTool.undo')" />
      </div>
      <button type="button" class="mpl-btn mr-5 preview-btn"
        :title="i18nInstance.global.t('workbenchHeaderTool.preview')" @click="openPreview">
        预览
      </button>
      <svg-icon name="more" />
    </div>
    <div class="workbench-tool-container" aria-label="插入/更新">
      <div class="line-box">
        <button type="button" class="mpl-btn mr-5 icon icon-moban">
          图标/图片
        </button>
        <button class="mpl-btn mr-5 icon icon-moban" type="button" title="同步更新swagger接口文档" @click="handleSyncSwagger">
          接口/服务
        </button>
        <button class="mpl-btn icon icon-moban" type="button" :disabled="user.authority !== 'enterprise'">
          控件/模板
        </button>
      </div>
      <div class="line-box">
        <button class="mpl mpl-btn mr-5" :disabled="user.authority !== 'enterprise'"
          :class="{ 'is-active': workbench.visibleNote }" @click="handleSelectNote">
          批注区
        </button>
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleDraft }"
          :disabled="user.authority !== 'enterprise'" @click="handleSelectDraft">
          草稿/暂存区
        </button>
      </div>
      <svg-icon name="more" />
    </div>
    <div class="workbench-tool-container" aria-label="AI">
      <div class="line-box">
        <button type="button" title="分析优化页面UI, 交互, 事件, 服务等" class="mpl-btn mr-5 icon icon-moban"
          :disabled="user.authority !== 'enterprise'">
          页面分析
        </button>
        <button class="mpl-btn mr-5 icon icon-moban" title="分析页面并大数据查询相似模板页面" type="button"
          :disabled="user.authority !== 'enterprise'">
          推荐模板
        </button>
        <button class="mpl-btn icon icon-moban" type="button" :disabled="user.authority !== 'enterprise'"
          @click="handleAskAI">
          AI提问
        </button>
      </div>
      <svg-icon name="more" />
    </div>
    <div class="workbench-tool-container" aria-label="辅助功能">
      <div class="line-box">
        <button class="mpl-btn mr-5 icon icon-moban" type="button" :disabled="user.authority !== 'enterprise'">
          打印
        </button>
        <button class="mpl-btn mr-5 icon icon-xiayiyiceng" type="button">
          截图
        </button>
        <button class="mpl-btn mr-5 icon icon-link4" :title="i18nInstance.global.t('workbenchHeaderTool.shear')"
          type="button">
          分享
        </button>
        <button class="mpl-btn mr-5 icon icon-xiazaidaoru" type="button" title="下载页面数据" @click="downloadFile">
          下载
        </button>
        <button class="mpl-btn mr-5 icon icon-zuhe" type="button" :disabled="user.authority !== 'enterprise'">
          3D图层
        </button>
        <button class="mpl-btn mr-5 icon icon-moban" type="button" :disabled="user.authority !== 'enterprise'">
          草稿图层
        </button>
      </div>
      <div class="line-box">
        <button class="mpl-btn mr-5 icon icon-moban" type="button">
          帮助
        </button>
        <button class="mpl-btn mr-5 icon icon-moban" type="button">
          反馈
        </button>
      </div>
    </div>
  </header>
</template>
<style lang="less">
.header-tool-btn--container {
  width: 100%;
  font-size: 12px;
  height: 80px;
  min-height: 80px;
  box-sizing: border-box;
  position: relative;
  white-space: nowrap;
  overflow: hidden;

  .workbench-tool-container {
    position: relative;
    height: 80px;
    overflow: hidden;
    display: inline-block;
    padding: 5px;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    display: inline-grid;
    grid-template-rows: 25px 25px auto;

    &::after {
      content: attr(aria-label);
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 12px;
      left: 50%;
      transform: translateX(-50%);
    }

    >svg {
      position: absolute;
      right: 0px;
      bottom: -2px;
      width: 15px;
      height: 15px;
      padding: 2px;
      color: #ccc;
      cursor: pointer;

      &:hover {
        background: #e6e6e6;
        color: var(---primary-color);
      }
    }

    &:first-child {
      grid-template-columns: 1fr 50px;
      gap: 0;
    }

    &:last-child {
      border-right: 0;
    }

    .bold-btn {
      margin-right: 6px;
    }

    i.mpl {
      font-size: 14px;
    }

    .preview-btn {
      min-height: 48px;
      margin-top: 1px;
      width: 50px;
      font-size: 16px;
      grid-column: 2;
      grid-row: 1 / 3;
    }

    .line-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      grid-column: 1;

      &+.line-box {
        margin-top: 5px;
      }

      .note-btn {
        font-size: 12px;
        color: #1E1E1E;
        margin-right: 5px;
        border: 1px solid #414141;
        height: 20px;
        line-height: 20px;
        padding: 0 4px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: #1e1e1e;
        }

        &.is-active,
        &.is-active:hover {
          color: var(--primary-color);
          background: #1e1e1e;
        }
      }

      .fz-up,
      .fz-down,
      .bold-btn,
      .italic-btn,
      .outline-btn,
      .bg-select-box,
      .color-select-box,
      .logo-select-box,
      .border-select-box,
      .node-btn,
      .underline-select-box {
        width: 20px;
        min-width: fit-content;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        cursor: default;

        &:hover {
          background: #1e1e1e;
          outline: 1px solid #1e1e1e;
          color: var(--primary-color);
        }

        img {
          width: 8px;
        }
      }

      .border-select-box,
      .underline-select-box,
      .bg-select-box,
      .color-select-box,
      .logo-select-box {
        margin-left: 7px;
        padding: 0 2px;
      }

      .node-btn {
        margin-left: 3px;
        margin-right: 5px;
      }
    }
  }

  .right-tool {
    float: right;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
