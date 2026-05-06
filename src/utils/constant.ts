import type { Node, ActiveWorkbenchModel, Authority, ActiveSidebarTag, ActiveComponentSettingModel, File, ThemeFileProp, NODE_TAG } from '@mpl/typings'

interface NavIcon {
  value: ActiveSidebarTag
  title: string
}

export function getComponentToolOption(activeNode: Node | null) {
}

export const componentToolOptions: Array<{
  label: string
  value: ActiveComponentSettingModel
  show: boolean
  disabled: boolean
  icon: string
}> = [
    {
      label: '控件',
      value: 'componentModel',
      show: true,
      disabled: false,
      icon: 'icon-xiangmu'
    },
    {
      label: '样式',
      value: 'styleModel',
      show: true,
      disabled: false,
      icon: 'icon-shezhiweizhukongzhi'
    },
    {
      label: '属性补充',
      value: 'patchModel',
      show: true,
      disabled: false,
      icon: 'icon-gengduo'
    },
    {
      label: '模板推荐',
      value: 'moduleModel',
      show: true,
      disabled: true,
      icon: 'icon-gengduo'
    },
    {
      label: 'schema',
      value: 'schemaModel',
      show: false,
      disabled: true,
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
    color: '#196eff',
    divider: false,
    checked: false
  },
  {
    title: '项目信息',
    value: 'info',
    icon: 'icon-bianji',
    color: '#196eff',
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
    title: '项目'
  },
  {
    value: 'componentLibsModel',
    title: '组件库'
  },
  {
    value: 'resourceModel',
    title: '资源'
  },
  {
    value: 'sourceCodeModel',
    title: '源码'
  }
]

export type SpanSize = 'large' | 'medium' | 'small'

export const workbenchOptions = [
  {
    label: '标准画板布局', // 基础display: inline-block布局， 紧凑型从左右到从上到下
    value: 'standard',
  },
  {
    label: '栅格紧凑布局', // grid-layout-plus 插件. 紧凑类型, 比标准画板布局更加精细。但是缺失了响应式flex功能
    value: 'grid',
  }
]

export const workbenchSizeOptions: Array<{ label: string; value: string; disabled?: boolean }> = [
  {
    label: '4k显示器3840*2160',
    value: '3840*2160'
  },
  {
    label: '2k显示器2560*1440',
    value: '2560*1440'
  },
  {
    label: '标准显示器1920*1080',
    value: '1920*1080'
  },
  {
    label: '旧款显示器1440*900',
    value: '1440*900'
  },
  {
    label: '小屏显示器1336*768',
    value: '1336*768'
  },
  {
    label: '移动端IOS432*938', // 苹果iphone 16
    value: '432*938',
    disabled: true
  },
  {
    label: '移动端Android408*900', // 华为 mate60/p60/小米13
    value: '408*900',
    disabled: true
  },
  {
    label: '自定义尺寸',
    value: 'customSize',
    disabled: true
  },
]

type NodeType = 'elementPlus' | 'vant4' | 'antDesign' | 'antDesignMobile'

export interface CoreNodeList {
  label: string
  value: string
  children: Array<Omit<CoreNodeList, 'children' | 'value'> & { icon: string; type: NodeType[]; value: NODE_TAG; authority: Authority }>
}

// 基础控件
export function getBaseComponentList(): CoreNodeList[] {
  return [
    {
      label: '容器类',
      value: 'container',
      children: [
        {
          label: '基础容器',
          value: 'mpl-base-box', // 移动端使用cell-group
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '插槽容器',
          value: 'mpl-slot-box',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        {
          label: '弹窗',
          value: 'mpl-dialog',
          icon: '',
          type: ['elementPlus'],
          authority: 'community'
        },
        {
          label: '抽屉',
          value: 'mpl-drawer',
          icon: '',
          type: ['elementPlus'],
          authority: 'community'
        },
        {
          label: '折叠面板',
          value: 'mpl-collapse',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '卡片',
          value: 'mpl-card',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '面板',
          value: 'mpl-panel',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '选项卡',
          value: 'mpl-tabs',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        }
      ]
    },
    {
      label: '表单类',
      value: 'formNode',
      children: [
        {
          label: '基础输入',
          value: 'mpl-input',
          icon: 'icon-input1',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '密码输入',
          value: 'mpl-password',
          icon: 'icon-mimakuang2',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '数字输入',
          value: 'mpl-number-input',
          icon: 'icon-shuzi3',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '下拉选择',
          value: 'mpl-select',
          icon: 'icon-xiala3',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '弹框选择',
          value: 'mpl-select-dialog',
          icon: 'icon-xiala3',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '单选',
          value: 'mpl-radio',
          icon: 'icon-radio-button-on',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '多选',
          value: 'mpl-checkbox',
          icon: 'icon-duoxuan',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '评分',
          value: 'mpl-rate',
          icon: 'icon-shoucang',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '滑块',
          value: 'mpl-slider',
          icon: 'icon-sliders',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '开关',
          value: 'mpl-switch',
          icon: 'icon-icf_button',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '时间',
          value: 'mpl-time-picker',
          icon: 'icon-shijian2',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '时间范围',
          value: 'mpl-time-range-picker',
          icon: 'icon-shijianfanwei',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '日期',
          value: 'mpl-date-picker',
          icon: 'icon-riqi1',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '日期范围',
          value: 'mpl-date-range-picker',
          icon: 'icon-riqifanwei',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '头像',
          value: 'mpl-avatar',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '颜色选择',
          value: 'mpl-color-picker',
          icon: 'icon-theme',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        }
      ]
    },
    {
      label: '数据类',
      value: 'dataNode',
      children: [
        {
          label: '表格',
          value: 'mpl-base-table',
          icon: 'icon-table3',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '目录树',
          value: 'mpl-tree',
          icon: 'icon-tree2',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '穿梭选择',
          value: 'mpl-transfer',
          icon: 'icon-m-chuansuokuang',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        }
      ]
    },
    {
      label: '基础类',
      value: 'baseNode',
      children: [
        {
          label: '文本段落',
          value: 'mpl-paragraph',
          icon: 'icon-text',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '按钮',
          value: 'mpl-btn',
          icon: 'icon-Stop-Button',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '按钮组',
          value: 'mpl-btn-group',
          icon: 'icon-Stop-Button',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '文件上传',
          value: 'mpl-upload-file',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        {
          label: '图片上传',
          value: 'mpl-upload-img',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        {
          label: '文本',
          value: 'mpl-text',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '图片',
          value: 'mpl-img',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '链接',
          value: 'mpl-link',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '分隔线',
          value: 'mpl-divider',
          icon: 'icon-line',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '步骤',
          value: 'mpl-step',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '标签',
          value: 'mpl-tag',
          icon: 'icon-tag',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '时间线',
          value: 'mpl-timeline',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '徽章',
          value: 'mpl-badge',
          icon: 'icon-huizhang3',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '名片',
          value: 'mpl-card',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        }
      ]
    },
    {
      label: '悬浮类',
      value: 'toastComponent',
      children: [
        {
          label: '对话框',
          value: 'mpl-dialog',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '弹出框',
          value: 'mpl-popover',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '文字提示',
          value: 'mpl-tooltip',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '抽屉',
          value: 'mpl-drawer',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '轻提示',
          value: 'mpl-toast',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        }
      ]
    },
    {
      label: '展示类',
      value: 'toastComponent',
      children: [
        {
          label: '下拉菜单',
          value: 'mpl-dropdown',
          icon: 'icon-select4',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '页头',
          value: 'mpl-pageHeader',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '页脚',
          value: 'mpl-footer',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '统计值',
          value: 'mpl-statistics',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '面包屑',
          value: 'mpl-breadcrumb',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '骨架屏',
          value: 'mpl-skeleton',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '描述列表',
          value: 'mpl-description',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '图片轮播',
          value: 'mpl-carousel',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '列表轮播',
          value: 'mpl-list-carousel',
          icon: '', // 视频列表轮播 https://manga.bilibili.com/?from=bill_top_mnav&spm_id_from=333.1007.0.0
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '日历',
          value: 'mpl-calendar',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '进度条',
          value: 'mpl-process',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '锚点',
          value: 'mpl-anchor',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
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
    // table + tree + search + pagination
    label: '标准表格查询页',
    value: 'standardTableSearchPage',
    children: [
      { label: '表格查询1', value: 'standardTable1', icon: '', authority: 'community' },
      { label: '表格查询2', value: 'standardTable2', icon: '', authority: 'community' },
      { label: '表格查询3', value: 'standardTable3', icon: '', authority: 'community' },
      { label: '表格查询4', value: 'standardTable4', icon: '', authority: 'community' },
      { label: '表格查询5', value: 'standardTable5', icon: '', authority: 'community' },
      { label: '表格查询6', value: 'standardTable6', icon: '', authority: 'community' },
      { label: '表格查询7', value: 'standardTable7', icon: '', authority: 'community' },
      { label: '表格查询8', value: 'standardTable8', icon: '', authority: 'community' },
      { label: '表格查询9', value: 'standardTable9', icon: '', authority: 'community' }
    ]
  },
  {
    label: '标准步骤页签页', // tabs + table pagination + search
    value: 'standardTableSearchPage',
    children: [
      { label: '步骤页签1', value: 'stepPane1', icon: '', authority: 'community' },
      { label: '步骤页签2', value: 'stepPane2', icon: '', authority: 'community' },
      { label: '步骤页签3', value: 'stepPane3', icon: '', authority: 'community' },
      { label: '步骤页签4', value: 'stepPane4', icon: '', authority: 'community' },
      { label: '步骤页签5', value: 'stepPane5', icon: '', authority: 'community' },
      { label: '步骤页签6', value: 'stepPane6', icon: '', authority: 'community' },
      { label: '步骤页签7', value: 'stepPane7', icon: '', authority: 'community' },
      { label: '步骤页签8', value: 'stepPane8', icon: '', authority: 'community' },
      { label: '步骤页签9', value: 'stepPane9', icon: '', authority: 'community' }
    ]
  },
  {
    label: '标准看板页',
    value: 'standardBoardPage',
    children: [
      { label: '看板页1', value: 'stepPane1', icon: '', authority: 'community' }, // 阿里低代码引擎
      { label: '看板页2', value: 'stepPane2', icon: '', authority: 'community' }, // 信公小安首页
      { label: '看板页3', value: 'stepPane3', icon: '', authority: 'community' }, // 掘金Bot
      { label: '看板页4', value: 'stepPane4', icon: '', authority: 'community' }, // 掘金商城看板
      { label: '看板页5', value: 'stepPane5', icon: '', authority: 'community' }, // 自定义看板【绝对定位设计】
      { label: '看板页6', value: 'stepPane6', icon: '', authority: 'community' }
    ]
  },
  {
    label: '标准文章页',
    value: 'standardArticlePage',
    children: [
      { label: '文章页1', value: 'stepPane1', icon: '', authority: 'community' }, // 掘金文章详情
      { label: '文章页2', value: 'stepPane2', icon: '', authority: 'community' }, //
      { label: '文章页3', value: 'stepPane3', icon: '', authority: 'community' },
      { label: '文章页4', value: 'stepPane4', icon: '', authority: 'community' },
      { label: '文章页5', value: 'stepPane5', icon: '', authority: 'community' },
      { label: '文章页6', value: 'stepPane6', icon: '', authority: 'community' }
    ]
  },
  {
    label: '标准看板页',
    value: 'standardBoardPage',
    children: [
      { label: '看板页1', value: 'stepPane1', icon: '', authority: 'community' },
      { label: '看板页2', value: 'stepPane2', icon: '', authority: 'community' },
      { label: '看板页3', value: 'stepPane3', icon: '', authority: 'community' },
      { label: '看板页4', value: 'stepPane4', icon: '', authority: 'community' },
      { label: '看板页5', value: 'stepPane5', icon: '', authority: 'community' },
      { label: '看板页6', value: 'stepPane6', icon: '', authority: 'community' }
    ]
  },
  {
    label: '其他页',
    value: 'standardBoardPage',
    children: [
      { label: '视频页1', value: 'stepPane1', icon: '', authority: 'community' },
      { label: '视频页2', value: 'stepPane2', icon: '', authority: 'community' },
      { label: '视频页3', value: 'stepPane3', icon: '', authority: 'community' },
      { label: '视频页4', value: 'stepPane4', icon: '', authority: 'community' }
    ]
  }
]

// 高级控件 = 基础控件 + ui => 都免费使用，但是控件内部都有付费企业版配置项。免费版只能使用简单功能，复杂且自定义都需要开启企业付费服务
export function getSeniorComponentList(): CoreNodeList[] {
  return [
    {
      label: '容器类',
      value: 'groupModule',
      children: [
        {
          label: 'Grid容器',
          value: 'mpl-grid-layout',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '横向容器',
          value: 'mpl-horizontal-layout',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '纵向容器',
          value: 'mpl-vertical-layout',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
      ]
    },
    {
      label: '组合类',
      value: 'groupModule',
      children: [
        {
          label: '打卡签到', // 地图 + 确认按钮 + 刷新按钮
          value: 'mpl-check-in-work',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        {
          label: '补卡', // 输入框【原因】 + 补卡时间【日期只读】 + 剩余补卡次数【输入框只读】 + 确认按钮 + 补卡类型【默认补卡、事假、年假】
          value: 'mpl-clock-out',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '请假', // 请假类型【请假类型-事假、】
          value: 'mpl-leave',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '外出',
          value: 'mpl-business-trip',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '加班',
          value: 'mpl-overtime',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '报销',
          value: 'mpl-reimbursement',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '日报',
          value: 'mpl-day-report',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '周报',
          value: 'mpl-week-report',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          // 接入todo Google
          label: '公司日历',
          value: 'mpl-calendar-group',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        }
      ]
    },
    {
      label: '通用类',
      value: 'commonModule',
      children: [
        // 参考草料二维码设计规则，增加拖拉拽自定义表单二维码 => 跳转到单独的页面[项目内自动新建页面或跳转到另一个页面]
        {
          label: '二维码',
          value: 'mpl-qr-code',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        // 企业版：内置FTP服务器上传
        {
          label: '视频',
          value: 'mpl-video',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        // 企业版：内置FTP服务器上传
        {
          label: '音频',
          value: 'mpl-audio',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        // 企业版：内置FTP服务器上传
        {
          label: '富文本',
          value: 'mpl-richtext',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        // 签名 + 水印
        {
          label: '签名',
          value: 'mpl-signature',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        {
          label: '文件上传',
          value: 'mpl-upload-file',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        {
          label: '图片上传',
          value: 'mpl-upload-img',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        {
          label: '地图定位',
          value: 'mpl-map',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        // 免费版仅支持部分语言UI。企业版：多语言、复制粘贴、图片生成、在线更改主题等
        {
          label: '代码IDE',
          value: 'mpl-ide',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        // 网上大部分评论的模板UI
        {
          label: '评论区',
          value: 'mpl-comment',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        // 免费版需要水印、企业付费版需要单独购买
        {
          label: 'Excel表格',
          value: 'mpl-excel-table',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        // 图片、文字、动画、视频、gif等动态水印
        {
          label: '水印',
          value: 'mpl-watermark',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        // 参考企查查的股权分配图
        {
          label: '流程图',
          value: 'mpl-flow-map',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        }
      ]
    },
    {
      label: '表格类',
      value: 'tableModule',
      children: [
        {
          label: '嵌套表格',
          value: 'mpl-nestingTable1',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        }
      ]
    },
    {
      label: '树形类',
      value: 'treeModule',
      children: [
        {
          label: '目录树1',
          value: 'mpl-treePage1',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        }
      ]
    },
    {
      label: '查询类',
      value: 'searchModule',
      children: [
        {
          label: '基础查询1',
          value: 'mpl-baseSearchModule1',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '表格查询1',
          value: 'mpl-tableSearchBaseModule1',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
      ]
    },
    {
      label: '图表类',
      value: 'commonModule',
      children: [
        {
          label: '折线图',
          value: 'mpl-pageHeader',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '柱状图',
          value: 'mpl-footer',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '饼图',
          value: 'mpl-statistics',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '散点图',
          value: 'mpl-breadcrumb',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '地图',
          value: 'mpl-skeleton',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        {
          label: '雷达图',
          value: 'mpl-description',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '盒须图',
          value: 'mpl-carousel',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '热力图',
          value: 'mpl-calendar',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '树图',
          value: 'mpl-process',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '漏斗图',
          value: 'mpl-anchor',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '仪表盘',
          value: 'mpl-anchor',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '象形柱图',
          value: 'mpl-anchor',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '主题河流图',
          value: 'mpl-anchor',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '日历坐标系',
          value: 'mpl-anchor',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '矩形树图',
          value: 'mpl-anchor',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'community'
        },
        {
          label: '地图控件',
          value: 'mpl-map',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        }
      ]
    },
    {
      label: '列表类',
      value: 'typographyModule',
      children: []
    },
    // Element Plus X
    {
      label: 'AI类',
      value: 'AIModule',
      children: [
        {
          label: 'AI聊天',
          value: 'ai-chart',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        },
        {
          label: '多人聊天',
          value: 'chart-multiple',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        }
      ]
    },
    {
      label: '查询类',
      value: 'searchModule',
      children: []
    },
    {
      label: '看板类',
      value: 'bannerModule',
      children: [
        {
          label: '消息列表',
          value: 'mpl-banner1',
          icon: '',
          type: ['elementPlus', 'vant4'],
          authority: 'enterprise'
        }
      ]
    }
  ]
}

// 市场
export const marketList: File[] = [
  { title: '模板市场', id: 'moduleMarket', type: 'moduleMarket', pageInfo: {} },
  { title: '主题市场', id: 'themeMarket', type: 'themeMarket', pageInfo: {} },
  { title: '图标管理', id: 'iconMarket', type: 'iconMarket', pageInfo: {} },
  { title: '图片管理', id: 'imageMarket', type: 'imageMarket', pageInfo: {} },
  { title: '服务管理', id: 'serviceMarket', type: 'serviceMarket', pageInfo: {} },
  { title: '脚本管理', id: 'javascriptMarket', type: 'javascriptMarket', pageInfo: {} },
  { title: '多语言管理', id: 'i18nMarket', type: 'i18nMarket', pageInfo: {} }
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
    locked: false,
    pageInfo: {}
  },
  {
    logo: './assets/logo.png',
    title: 'MPL Studio中国红',
    id: 'a8sr2e56UbzX1OK2',
    type: 'theme',
    desc: '适用于LCS纯前端低代码平台的一套主题。',
    author: 'LCSCode',
    locked: true,
    pageInfo: {}
  },
  {
    logo: './assets/logo.png',
    title: 'MPL Studio活力橙',
    id: 'a8sr2123UbzX1OK1',
    type: 'theme',
    desc: '适用于LCS纯前端低代码平台的一套主题。',
    author: 'LCSCode',
    locked: false,
    pageInfo: {}
  }
]

export const themeTypeList = [
  { label: '系统主题', author: 'author1' },
  { label: '张三主题', author: 'author2' },
  { label: '李四主题', author: 'author3' },
  { label: '王五主题', author: 'author4' }
]
