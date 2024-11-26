import i18nInstance from '@mpl/i18n'
import type { ActiveWorkbenchModel, ActiveSidebarTag, ActiveComponentSettingModel, File, ThemeFileProp } from "@mpl/typings";

interface NavIcon {
  value: ActiveSidebarTag
  title: string
}

export const componentToolOptions: Array<{
  label: string
  value: ActiveComponentSettingModel
  show: boolean
  disabled: boolean
  icon: string
}> = [
    {
      label: i18nInstance.global.t('nodeSetting.sidebar.node'),
      value: 'componentModel',
      show: true,
      disabled: false,
      icon: 'icon-xiangmu'
    },
    {
      label: i18nInstance.global.t('nodeSetting.sidebar.style'),
      value: 'styleModel',
      show: true,
      disabled: false,
      icon: 'icon-shezhiweizhukongzhi'
    },
    {
      label: i18nInstance.global.t('nodeSetting.sidebar.attrs'),
      value: 'patchModel',
      show: true,
      disabled: false,
      icon: 'icon-gengduo'
    },
    {
      label: '模板推荐',
      value: 'moduleModel',
      show: true,
      disabled: false,
      icon: 'icon-gengduo'
    }
  ]

// 画布底部列表
export const workbenchViewList: Array<{
  label: string
  value: ActiveWorkbenchModel
  icon?: string
  tooltip?: string
}> = [
    {
      label: '快捷交互',
      value: 'quickConfigPaneModel'
    },
    { label: '服务配置', value: 'serviceConfigPaneModel' },
    { label: '智能检测', value: 'intelligentDetection' },
    { label: '页面源码', value: 'pageCodePaneModel' },
    { label: 'Schema模型', value: 'schemaPaneModel' }
  ]

// 项目文件夹功能
export const foldPopoverList = [
  {
    title: '新建文件',
    value: 'newFile',
    icon: 'icon-file',
    color: '#2f7f79',
    divider: true,
    checked: false
  },
  {
    title: '新建文件夹',
    value: 'newFolder',
    icon: 'icon-addfolder',
    color: '#2f7f79',
    divider: true,
    checked: false
  },
  {
    title: '扫描威胁',
    value: 'scan',
    icon: 'icon-Already',
    color: '#e6a23c',
    divider: false,
    checked: false
  },
  {
    title: '历史记录',
    value: 'history',
    icon: 'icon-node',
    color: '',
    divider: false,
    checked: false
  },
  {
    title: '重命名',
    value: 'rename',
    icon: 'icon-bianji',
    color: '#409eff',
    divider: false,
    checked: false
  },
  {
    title: '项目信息',
    value: 'info',
    icon: 'icon-bianji',
    color: '#409eff',
    divider: false,
    checked: false
  },
  {
    title: '移除',
    value: 'delete',
    icon: 'icon-qingkongshanchu',
    color: '#F56C6C',
    divider: false,
    checked: false
  }
]

export const navHeaderList: NavIcon[] = [
  {
    value: 'projectModel',
    title: i18nInstance.global.t('leftSidebar.project')
  },
  {
    value: 'componentLibsModel',
    title: i18nInstance.global.t('leftSidebar.component')
  },
  {
    value: 'resourceModel',
    title: i18nInstance.global.t('leftSidebar.resource')
  },
  {
    value: 'sourceCodeModel',
    title: i18nInstance.global.t('leftSidebar.sourceCode')
  }
]


export type SpanSize = 'large' | 'medium' | 'small'

export const themeOptions = [
  {
    label: '主题列表',
    value: 'singleWindow',
    children: [
      {
        label: i18nInstance.global.t('workbenchHeaderTool.theme1'),
        value: 'MPL-Dark'
      },
      {
        label: i18nInstance.global.t('workbenchHeaderTool.theme2'),
        value: 'MPL-Light'
      },
      {
        label: i18nInstance.global.t('workbenchHeaderTool.theme3'),
        value: 'MPL-Color'
      }
    ]
  }
]

type NodeType = 'elementPlus' | 'vant4' | 'antDesign' | 'antDesignMobile'

export interface CoreNodeList {
  label: string
  value: string

  children: Array<Omit<CoreNodeList, 'children'> & { icon: string, type: NodeType[] }>
}

export function getBaseComponentList(): CoreNodeList[] {
  return [
    {
      label: i18nInstance.global.t('baseNodeList.containerNode'),
      value: 'container',
      children: [
        {
          label: i18nInstance.global.t('baseNodeList.box'),
          value: 'mpl-base-box', // 移动端使用cell-group
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.dialog'),
          value: 'mpl-dialog',
          icon: '',

          type: ['elementPlus']
        },
        {
          label: i18nInstance.global.t('baseNodeList.drawer'),
          value: 'mpl-drawer',
          icon: '',
          type: ['elementPlus'],
        },
        {
          label: i18nInstance.global.t('baseNodeList.collapse'),
          value: 'mpl-collapse',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.empty'),
          value: 'mpl-empty',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.card'),
          value: 'mpl-card',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.panel'),
          value: 'mpl-panel',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.tabs'),
          value: 'mpl-tabs',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表单容器',
          value: 'mpl-form',
          icon: '',

          type: ['elementPlus']
        }
      ]
    },
    {
      label: i18nInstance.global.t('baseNodeList.formNode'),
      value: 'formNode',
      children: [
        {
          label: i18nInstance.global.t('baseNodeList.baseInput'),
          value: 'mpl-input',
          icon: 'icon-input1',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.passwordInput'),
          value: 'mpl-password',
          icon: 'icon-mimakuang2',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.numberInput'),
          value: 'mpl-number-input',
          icon: 'icon-shuzi3',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.select'),
          value: 'mpl-select',
          icon: 'icon-xiala3',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.radio'),
          value: 'mpl-radio',
          icon: 'icon-radio-button-on',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.checkbox'),
          value: 'mpl-checkbox',
          icon: 'icon-duoxuan',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.rate'),
          value: 'mpl-rate',
          icon: 'icon-shoucang',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.slider'),
          value: 'mpl-slider',
          icon: 'icon-sliders',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.switch'),
          value: 'mpl-switch',
          icon: 'icon-icf_button',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.timePicker'),
          value: 'mpl-time-picker',
          icon: 'icon-shijian2',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.timeRangerPicker'),
          value: 'mpl-time-range-picker',
          icon: 'icon-shijianfanwei',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.datePicker'),
          value: 'mpl-date-picker',
          icon: 'icon-riqi1',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.dateRangerPicker'),
          value: 'mpl-date-range-picker',
          icon: 'icon-riqifanwei',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.color'),
          value: 'mpl-color-picker',
          icon: 'icon-theme',

          type: ['elementPlus', 'vant4']
        }
      ]
    },
    {
      label: i18nInstance.global.t('baseNodeList.dataNode'),
      value: 'dataNode',
      children: [
        {
          label: i18nInstance.global.t('baseNodeList.baseTable'),
          value: 'mpl-base-table',
          icon: 'icon-table3',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.excelTable'),
          value: 'mpl-excel-table',
          icon: 'icon-table3',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.tree'),
          value: 'mpl-tree',
          icon: 'icon-tree2',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.list'),
          value: 'mpl-list',
          icon: 'icon-caidan',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.transfer'),
          value: 'mpl-transfer',
          icon: 'icon-m-chuansuokuang',

          type: ['elementPlus', 'vant4']
        },
        {
          label: '评论列表', value: 'mpl-comment-tree', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    },
    {
      label: i18nInstance.global.t('baseNodeList.baseNode'),
      value: '',
      children: [
        {
          label: '文本段落', value: 'mpl-paragraph', icon: 'icon-text',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.button'),
          value: 'mpl-btn',
          icon: 'icon-Stop-Button',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.buttonGroup'),
          value: 'mpl-btn-group',
          icon: 'icon-Stop-Button',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.upload'),
          value: 'mpl-upload',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.avatar'),
          value: 'mpl-avatar',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.text'),
          value: 'mpl-text',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.img'),
          value: 'mpl-img',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.link'),
          value: 'mpl-link',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.divider'),
          value: 'mpl-divider',
          icon: 'icon-line',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.step'),
          value: 'mpl-step',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.tag'),
          value: 'mpl-tag',
          icon: 'icon-tag',

          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.timeline'),
          value: 'mpl-timeline',
          icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: i18nInstance.global.t('baseNodeList.badge'),
          value: 'mpl-badge',
          icon: 'icon-huizhang3',

          type: ['elementPlus', 'vant4']
        },
        {
          label: '名片', value: 'mpl-card', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    },
    {
      label: '悬浮类',
      value: 'toastComponent',
      children: [
        {
          label: '对话框', value: 'mpl-dialog', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '弹出框', value: 'mpl-popover', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '文字提示', value: 'mpl-tooltip', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '抽屉', value: 'mpl-drawer', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '轻提示', value: 'mpl-toast', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    },
    {
      label: '展示类',
      value: 'toastComponent',
      children: [
        {
          label: i18nInstance.global.t('baseNodeList.dropdown'),
          value: 'mpl-dropdown',
          icon: 'icon-select4',

          type: ['elementPlus', 'vant4']
        },
        {
          label: '页头', value: 'mpl-pageHeader', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '页脚', value: 'mpl-footer', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '统计值', value: 'mpl-statistics', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '面包屑', value: 'mpl-breadcrumb', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '骨架屏', value: 'mpl-skeleton', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '空状态', value: 'mpl-empty', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '描述列表', value: 'mpl-description', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '走马灯', value: 'mpl-carousel', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '日历', value: 'mpl-calendar', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '进度条', value: 'mpl-process', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '锚点', value: 'mpl-anchor', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    }
  ]
}

// { label: '纵向页面', value: 'mpl-ly-1', icon: '' }, // 仅上下排版。采用flex布局，主要用于标准表格查询页
// { label: '横向页面', value: 'mpl-ly-2', icon: '' }, // 仅左右排版。采用flex布局，主要用于左侧目录右侧表单详情页
// { label: '目录表单', value: 'mpl-ly-3', icon: '' }, // 左侧目录 + 右侧[纵向页面]，主要用户左侧目录，右侧标准表格查询页
// { label: '目录表格', value: 'mpl-ly-4', icon: '' }, // 左侧目录 + 右侧[纵向页面]，主要用户左侧目录，右侧标准表格查询页
// { label: '纵横滚动', value: 'mpl-ly-5', icon: '' }, // 上下排版。顶部内部区域图片区块显示纵向滚动，底部横向滚动。
// { label: '看板页面', value: 'mpl-ly-6', icon: '' }, // 卡片布局。常用于首页看板页面
// { label: '页签页面', value: 'mpl-ly-7', icon: '' }, // tabs占据整页布局
// { label: '看板滚动', value: 'mpl-ly-8', icon: '' } // 看板存在纵向滚动条

// 业务模板 = 复合控件 + 业务代码
export const pageComponentList = [
  {
    label: '标准表格查询页',
    value: 'standardTableSearchPage',
    children: [
      { label: '表格查询1', value: 'standardTable1', icon: '' },
      { label: '表格查询2', value: 'standardTable2', icon: '' },
      { label: '表格查询3', value: 'standardTable3', icon: '' },
      { label: '表格查询4', value: 'standardTable4', icon: '' },
      { label: '表格查询5', value: 'standardTable5', icon: '' },
      { label: '表格查询6', value: 'standardTable6', icon: '' },
      { label: '表格查询7', value: 'standardTable7', icon: '' },
      { label: '表格查询8', value: 'standardTable8', icon: '' },
      { label: '表格查询9', value: 'standardTable9', icon: '' }
    ]
  },
  {
    label: '标准步骤页签页',
    value: 'standardTableSearchPage',
    children: [
      { label: '步骤页签1', value: 'stepPane1', icon: '' },
      { label: '步骤页签2', value: 'stepPane2', icon: '' },
      { label: '步骤页签3', value: 'stepPane3', icon: '' },
      { label: '步骤页签4', value: 'stepPane4', icon: '' },
      { label: '步骤页签5', value: 'stepPane5', icon: '' },
      { label: '步骤页签6', value: 'stepPane6', icon: '' },
      { label: '步骤页签7', value: 'stepPane7', icon: '' },
      { label: '步骤页签8', value: 'stepPane8', icon: '' },
      { label: '步骤页签9', value: 'stepPane9', icon: '' }
    ]
  }
]

// 复合控件 = 基础控件 + ui => 都免费使用，但是控件内部都有付费企业版配置项。免费版只能使用简单功能，复杂且自定义都需要开启企业付费服务
export function getSeniorComponentList(): CoreNodeList[] {
  return [
    {
      label: '通用类',
      value: 'commonModule',
      children: [
        // 参考草料二维码设计规则，增加拖拉拽自定义表单二维码 => 跳转到单独的页面[项目内自动新建页面或跳转到另一个页面]
        {
          label: '二维码', value: 'mpl-qr-code', icon: '',
          type: ['elementPlus', 'vant4']
        },
        // 企业版：内置FTP服务器上传
        {
          label: '视频', value: 'mpl-video', icon: '',
          type: ['elementPlus', 'vant4']
        },
        // 企业版：内置FTP服务器上传
        {
          label: '音频', value: 'mpl-audio', icon: '',
          type: ['elementPlus', 'vant4']
        },
        // 企业版：内置FTP服务器上传
        {
          label: '富文本', value: 'mpl-richtext', icon: '',
          type: ['elementPlus', 'vant4']
        },
        // 签名 + 水印
        {
          label: '签名', value: 'mpl-signature', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '上传', value: 'mpl-upload', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '地图定位', value: 'mpl-map', icon: '',
          type: ['elementPlus', 'vant4']
        },
        // 免费版仅支持部分语言UI。企业版：多语言、复制粘贴、图片生成、在线更改主题等
        {
          label: '代码IDE', value: 'mpl-ide', icon: '',
          type: ['elementPlus', 'vant4']
        },
        // 网上大部分评论的模板UI
        {
          label: '评论区', value: 'mpl-comment', icon: '',
          type: ['elementPlus', 'vant4']
        },
        // 免费版需要水印、企业付费版需要单独购买
        {
          label: 'Excel表格', value: 'mpl-excel-table', icon: '',
          type: ['elementPlus', 'vant4']
        },
        // 图片、文字、动画、视频、gif等动态水印
        {
          label: '水印', value: 'mpl-watermark', icon: '',
          type: ['elementPlus', 'vant4']
        },
        // 参考企查查的股权分配图
        {
          label: '流程图', value: 'mpl-flow-map', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    },
    {
      label: '图表类',
      value: 'commonModule',
      children: [
        {
          label: '折线图', value: 'mpl-pageHeader', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '柱状图', value: 'mpl-footer', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '饼图', value: 'mpl-statistics', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '散点图', value: 'mpl-breadcrumb', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '地图', value: 'mpl-skeleton', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: 'K线图', value: 'mpl-empty', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '雷达图', value: 'mpl-description', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '盒须图', value: 'mpl-carousel', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '热力图', value: 'mpl-calendar', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '树图', value: 'mpl-process', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '漏斗图', value: 'mpl-anchor', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '仪表盘', value: 'mpl-anchor', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '象形柱图', value: 'mpl-anchor', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '主题河流图', value: 'mpl-anchor', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '日历坐标系', value: 'mpl-anchor', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '矩形树图', value: 'mpl-anchor', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '地图控件', value: 'mpl-map', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    },
    {
      label: '列表类',
      value: 'typographyModule',
      children: [
        {
          label: '时间线', value: 'searchModule2', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '搜索列2', value: 'searchModule2', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '搜索列3', value: 'searchModule3', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '搜索列4', value: 'searchModule4', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '搜索列5', value: 'searchModule5', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '搜索列6', value: 'searchModule6', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '搜索列7', value: 'searchModule7', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '搜索列8', value: 'searchModule8', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '搜索列9', value: 'searchModule9', icon: '',
          type: ['elementPlus', 'vant4']
        },

        {
          label: '文章列表1', value: 'articleList1', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '文章列表2', value: 'articleList2', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '文章列表3', value: 'articleList3', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '文章列表4', value: 'articleList4', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '文章列表5', value: 'articleList5', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '文章列表6', value: 'articleList6', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '文章列表7', value: 'articleList7', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '文章列表8', value: 'articleList8', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '文章列表9', value: 'articleList9', icon: '',
          type: ['elementPlus', 'vant4']
        },

        {
          label: '图片列表1', value: 'image1', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '图片列表2', value: 'image2', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '图片列表3', value: 'image3', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '图片列表4', value: 'image4', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '图片列表5', value: 'image5', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '图片列表6', value: 'image6', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '图片列表7', value: 'image7', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '图片列表8', value: 'image8', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '图片列表9', value: 'image9', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    },
    {
      label: '查询类',
      value: 'searchModule',
      children: [
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '表格查询', value: 'tableSearchBaseModule', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    },
    {
      label: '看板类',
      value: 'bannerModule',
      children: [
        {
          label: '消息列表', value: 'btn', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '基础看板', value: 'upload', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '消息列表', value: 'btn', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '基础看板', value: 'upload', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '消息列表', value: 'btn', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '基础看板', value: 'upload', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '消息列表', value: 'btn', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '基础看板', value: 'upload', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '消息列表', value: 'btn', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '基础看板', value: 'upload', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '消息列表', value: 'btn', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '基础看板', value: 'upload', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    },
    {
      label: '表格类',
      value: 'tableModule',
      children: [
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '嵌套表格', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    },
    {
      label: '树形类',
      value: 'treeModule',
      children: [
        {
          label: '目录树1', value: 'multipleNesting1', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '目录树2', value: 'multipleNesting2', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '目录树3', value: 'multipleNesting3', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '目录树4', value: 'multipleNesting4', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '目录树5', value: 'multipleNesting5', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '文档静态树', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '多重树', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        },
        {
          label: '多选树', value: 'multipleNesting', icon: '',
          type: ['elementPlus', 'vant4']
        }
      ]
    }
  ]
}

// 市场
export const marketList: File[] = [
  { title: '模板市场', id: 'moduleMarket', type: 'moduleMarket' },
  { title: '主题市场', id: 'themeMarket', type: 'themeMarket' },
  { title: '图标管理', id: 'iconMarket', type: 'iconMarket' },
  { title: '图片管理', id: 'imageMarket', type: 'imageMarket' },
  { title: '服务管理', id: 'javascriptMarket', type: 'serviceMarket' },
  { title: '脚本管理', id: 'javascriptMarket', type: 'javascriptMarket' }
]

// 模板市场
export const moduleMarketList = [
  {
    title: '标准表单模板1',
    id: ''
  }
]

// 主题列表
export const themeList: ThemeFileProp[] = [
  {
    logo: './assets/logo.png',
    title: 'MPL Studio企业蓝',
    id: 'a8sr2e56UbzX1OK1',
    type: 'theme',
    desc: '适用于LCS纯前端低代码平台的一套主题。',
    author: 'LCSCode',
    locked: false
  },
  {
    logo: './assets/logo.png',
    title: 'MPL Studio中国红',
    id: 'a8sr2e56UbzX1OK2',
    type: 'theme',
    desc: '适用于LCS纯前端低代码平台的一套主题。',
    author: 'LCSCode',
    locked: true
  },
  {
    logo: './assets/logo.png',
    title: 'MPL Studio活力橙',
    id: 'a8sr2123UbzX1OK1',
    type: 'theme',
    desc: '适用于LCS纯前端低代码平台的一套主题。',
    author: 'LCSCode',
    locked: false
  }
]

export const themeTypeList = [
  { label: '系统主题', author: 'author1' },
  { label: '张三主题', author: 'author2' },
  { label: '李四主题', author: 'author3' },
  { label: '王五主题', author: 'author4' }
]
