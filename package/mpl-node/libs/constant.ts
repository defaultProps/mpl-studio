import type { EventNode } from '@mpl/typings'
import { SERVICE_MODE } from '@mpl/const'

// 通用指令
export function getBaseDirectEventNodes(): EventNode[] {
  return [
    { name: 'v-if', desc: 'V-IF', code: '', open: false },
    { name: 'v-else-if', desc: 'V-ELSE-IF', code: '', open: false },
    { name: 'v-else', desc: 'V-ELSE', code: '', open: false },
    { name: 'mpl-input-focus', desc: '自动聚焦输入表单', code: '', open: false },
    { name: 'mpl-btn-focus', desc: '自动聚焦按钮', code: '', open: false },
    { name: 'mpl-copy', desc: '点击复制内容', code: '', open: false },
    { name: 'mpl-download', desc: '点击下载文件', code: '', open: false }
    // others 系统自带指令或用户自定义全局指令
  ]
}

export const labelPosWithClassName = new Map([
  ['l', 'mpl-label-left'],
  ['c', 'mpl-label-center'],
  ['r', 'mpl-label-right']
])

export const formContentPosClassName = new Map([
  ['l', 'mpl-content-left'],
  ['c', 'mpl-content-center'],
  ['r', 'mpl-content-right']
])

// dom/text方向
export const textAlignPosition = [
  { label: '居左', value: 'l' },
  { label: '居中', value: 'c' },
  { label: '居右', value: 'r' }
]

export const serviceTypeOption: Array<{ label: string; value: SERVICE_MODE }> = [
  { label: '静态数据', value: SERVICE_MODE.STATIC },
  { label: '接口绑定', value: SERVICE_MODE.DYNAMICS },
  { label: '关联配置', value: SERVICE_MODE.CONNECT },
  { label: '自定义', value: SERVICE_MODE.CUSTOM }
]

// 表单自定义规则类型
export const ruleOption = [
  { label: '系统', value: 'system' },
  { label: '自定义', value: 'custom' }
]

// 表单自定义规则触发条件
export const ruleTriggerOption = [
  { label: '聚焦', value: 'focus' },
  { label: '失焦', value: 'blur' },
  { label: '输入', value: 'input' },
  { label: '改变', value: 'change' }
]

// 组件尺寸
export const sizeOptions = [
  { label: '紧凑', value: 'small' },
  { label: '标准', value: 'medium' },
  { label: '宽松', value: 'large' }
]

// 边框类型
export const borderTypeOptions = [
  { label: '线框', value: 'border' },
  { label: '线条', value: 'line' }
]

// 组件颜色选择
export const colorPickerOptions = ['#e6a23c', '#67c23a', '#196eff', '#c3002f', '#303133', '#606266', '#909399']

// 排版模式
export const displayOptions = [
  { label: '默认布局', value: 'static', disabled: false },
  { label: '弹性布局', value: 'flex', disabled: false },
  { label: '网格布局', value: 'grid', disabled: false },
  { label: '悬浮定位', value: 'fixed', disabled: false }
]

// 页面必要变量
export const requiredVar = [
  'pageDisabled',
  'pageLoading',
  'pageRules',
  'pageReadonly',
  'pageData'
]