import { defineStore } from 'pinia'
import { projectStore } from './projectStore'
import { workbenchStore } from './workbenchStore'
import type {
  ThemeFileProp,
  VarIDESize,
  ActiveMainModel,
  ActiveWorkbenchModel,
  ActiveSidebarTag,
  ActiveComponentBoxModel,
  ActiveComponentGroupView,
  WorkbenchResizeType,
  SUB_BOX_SETTING_MODEL
} from '@mpl/typings'

export interface CoreView {
  activeNavTag: ActiveSidebarTag
  visibleRightBarComponentSetting: boolean
  activeMainModel: ActiveMainModel
  activeWorkbenchModel: ActiveWorkbenchModel
  activeComponentView: ActiveComponentBoxModel
  activeComponentGroupView: ActiveComponentGroupView,
  activeTheme: ThemeFileProp | null
  workbenchResizeType: WorkbenchResizeType
  visibleDraftDialog: boolean
  visibleDisplayNodeBox: boolean
  workbenchFooterIDESize: VarIDESize
  autoSave: boolean
  visibleLayoutDialog: boolean
  activeOutlineMod: 'category' | 'directory'
  subBoxSettingModel: SUB_BOX_SETTING_MODEL
  subBoxSettingModelId: string
  asyncSubSettingComponent: any
}

function initCoreView(): CoreView {
  return {
    activeComponentView: 'baseComponent', // 当前选中的控件库中的控件类型
    activeComponentGroupView: 'systemComponent', // 当前选中的控件库中的控件组类型
    activeNavTag: 'projectModel', // 当前选中的左侧区域
    visibleRightBarComponentSetting: true, // 右侧控件配置项
    activeMainModel: 'initialPage', // 主要内容区域
    activeWorkbenchModel: 'quickConfigPaneModel', // 画布视图类型
    workbenchFooterIDESize: 'small', // 底部画板组件事件IDE左侧变量区域展示宽度尺寸
    visibleDisplayNodeBox: false,
    activeTheme: null,
    workbenchResizeType: 'normal',

    autoSave: true, // 自动保存
    visibleLayoutDialog: false, // 是否显示排版弹框
    activeOutlineMod: 'directory', // 大纲目录展示类型

    subBoxSettingModel: '', // 右侧配置项-子项配置容器
    subBoxSettingModelId: '', // 右侧配置下-子项配置容器-打开目标id
    asyncSubSettingComponent: null, // 右侧配置项-子项配置组件
    visibleDraftDialog: false // 是否显示草稿区弹框
  }
}

export const viewStore = defineStore('coreView', {
  state: () => initCoreView(),
  actions: {
    triggerAutoSave() {
      this.autoSave = !this.autoSave
    },
    updateWorkbenchFooterIDESize(type: 'up' | 'down') {
      const size = this.workbenchFooterIDESize
      if (type === 'up') {
        this.workbenchFooterIDESize = size === 'small' ? 'medium' : size === 'medium' ? 'large' : 'small'
      } else {
        this.workbenchFooterIDESize = size === 'large' ? 'medium' : size === 'medium' ? 'small' : 'large'
      }
    },
    updateWorkbenchResizeType(val?: WorkbenchResizeType) {
      this.workbenchResizeType = val || this.workbenchResizeType === 'normal' ? 'reduce' : 'normal'
    },
    updateActiveTheme(val: ThemeFileProp) {
      this.activeTheme = val
      projectStore().updateActiveFile(val, true)
      this.updateActiveMainModel('workbench')
    },
    updateActiveMainModel(val: ActiveMainModel) {
      // 首次打开画板时延迟初始化画板数据。iframe加载完成后postMessage数据 todo
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
    triggerVisibleRightBarComponentSetting() {
      this.visibleRightBarComponentSetting = !this.visibleRightBarComponentSetting
    },
    setSideBarTag(val: ActiveSidebarTag) {
      this.activeNavTag = this.activeNavTag === val ? '' : val
    }
  }
})
