import { defineStore } from 'pinia'
import { projectStore } from './projectStore'
import { workbenchStore } from './workbenchStore'
import type {
  ContextmenuWrapper,
  ThemeFileProp,
  CoreView,
  ExpandSize,
  ActiveMainModel,
  ActiveWorkbenchModel,
  ActiveSidebarTag,
  WorkbenchResizeType
} from '@mpl/typings'

function initCoreView(): CoreView {
  return {
    isWorkbenchResize3DMode: false, // 是否开启了3D画板模式
    isWorkbenchResizeEventMode: false, // 是否开启了事件画板模式
    visibleIconSelect: false, // 点击显示右侧图标选择
    activeComponentView: 'baseComponent', // 当前选中的控件库中的控件类型
    activeNavTag: 'projectModel', // 当前选中的左侧区域
    visibleRightBarComponentSetting: true, // 右侧控件配置项
    activeMainModel: 'initialPage', // 主要内容区域
    activeWorkbenchModel: 'quickConfigPaneModel', // 画布视图类型
    visibleVideoDialog: false, // 视频播放弹框
    workbenchFooterToolSize: 'mini', // 底部画板展示高度尺寸
    outlineExpandSize: 'mini', // 大纲展示尺寸
    workbenchFooterIDESize: 'small', // 底部画板组件事件IDE左侧变量区域展示宽度尺寸
    videoSrc: '', // 视频播放的地址
    visibleDisplayNodeBox: false,
    activeTheme: null,
    workbenchResizeType: 'normal',
    // 右键菜单数据
    context: {
      menu: [],
      top: 0,
      left: -200,
      display: 'none',
      meta: ''
    },
    visibleDraftDialog: false // 是否显示草稿区弹框
  }
}

export const viewStore = defineStore('coreView', {
  state: () => initCoreView(),
  actions: {
    updateWorkbenchFooterIDESize(type: 'up' | 'down') {
      let size = this.workbenchFooterIDESize
      if (type === 'up') {
        this.workbenchFooterIDESize = size === 'small' ? 'medium' : size === 'medium' ? 'large' : 'small'
      } else {
        this.workbenchFooterIDESize = size === 'large' ? 'medium' : size === 'medium' ? 'small' : 'large'
      }

      console.log(this.workbenchFooterIDESize)
    },
    updateOutlineExpandSize(val: 'down' | 'up') {
      const allSize = ['mini', 'small', 'medium', 'mini']
      const index = allSize.indexOf(this.outlineExpandSize)

      if (val === 'down')
        this.outlineExpandSize = allSize[index - 1] as ExpandSize
      else if (val === 'up')
        this.outlineExpandSize = allSize[index + 1] as ExpandSize
      else
        this.outlineExpandSize = this.outlineExpandSize === 'mini' ? 'small' : 'mini'
    },
    closeVideo() {
      this.visibleVideoDialog = false
      this.videoSrc = ''
    },
    updateVideoDialog(val: boolean, src?: string) {
      this.visibleVideoDialog = val
      this.videoSrc = src || ''
    },
    updateWorkbenchResize3DMode(val = false) {
      this.isWorkbenchResize3DMode = val
    },
    updateWorkbenchResizeEventMode(val = false) {
      this.isWorkbenchResizeEventMode = val
    },
    updateWorkbenchResizeType(val?: WorkbenchResizeType) {
      this.workbenchResizeType = val || this.workbenchResizeType === 'normal' ? 'reduce' : 'normal'
    },
    updateWorkbenchFooterTool(val: 'down' | 'up') {
      const allSize = ['mini', 'small', 'medium', 'large', 'mini']
      const index = allSize.indexOf(this.workbenchFooterToolSize)

      if (val === 'down')
        this.workbenchFooterToolSize = allSize[index - 1] as ExpandSize
      else if (val === 'up')
        this.workbenchFooterToolSize = allSize[index + 1] as ExpandSize
      else
        this.workbenchFooterToolSize = this.workbenchFooterToolSize === 'mini' ? 'small' : 'mini'
    },
    updateActiveTheme(val: ThemeFileProp) {
      this.activeTheme = val
      projectStore().updateActiveFile(val, true)
      this.updateActiveMainModel('workbench')
    },
    updateContextMenuByHeaderMenu(contextmenu: ContextmenuWrapper) {
      this.context = contextmenu
      sessionStorage.setItem('nodeContextStatus', 'open')
    },
    updateContextMenu(contextmenu: ContextmenuWrapper) {
      this.context = contextmenu
      if (this.context.meta) {
        document.querySelector(`[mpl-c-id="${this.context.meta}"]`)?.classList?.add('context-light')
      }
      sessionStorage.setItem('nodeContextStatus', 'open')
    },
    updateActiveMainModel(val: ActiveMainModel) {
      // 首次打开画板时延迟初始化画板数据。iframe加载完成后postmessage数据 todo
      if (val === 'workbench' && this.activeMainModel !== 'workbench') {
        setTimeout(() => {
          workbenchStore().initWorkbench()
        }, 400)
      }

      this.activeMainModel = val
    },
    updateActiveWorkbenchModel(val: ActiveWorkbenchModel) {
      this.activeWorkbenchModel = val
    },
    triggerVisibleRightBarComponentSetting(visible?: boolean) {
      this.visibleRightBarComponentSetting = visible || !this.visibleRightBarComponentSetting
    },
    setSideBarTag(val: ActiveSidebarTag) {
      this.activeNavTag = this.activeNavTag === val ? '' : val
    }
  }
})
