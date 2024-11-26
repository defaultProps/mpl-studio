import type MPL from '@mpl/typings'

// 通用指令
export function getBaseDirectEventNodes(): MPL.EventNode[] {
  return [
    { name: 'v-if', desc: 'V-IF', code: '', type: 'flow' },
    { name: 'v-else-if', desc: 'V-ELSE-IF', code: '', type: 'flow' },
    { name: 'v-else', desc: 'V-ELSE', code: '', type: 'flow' },
    { name: 'mpl-input-focus', desc: '自动聚焦输入表单', code: '', type: 'flow' },
    { name: 'mpl-btn-focus', desc: '自动聚焦按钮', code: '', type: 'flow' },
    { name: 'mpl-copy', desc: '点击复制内容', code: '', type: 'flow' },
    { name: 'mpl-download', desc: '点击下载文件', code: '', type: 'flow' },
    // others 系统自带指令或用户自定义全局指令
  ]
}

export const labelPosWithClassName = new Map([
  ['l', 'mpl-label-left'],
  ['c', 'mpl-label-center'],
  ['r', 'mpl-label-right'],
])

export const formContentPosClassName = new Map([
  ['l', 'mpl-content-left'],
  ['c', 'mpl-content-center'],
  ['r', 'mpl-content-right'],
])

// dom/text方向
export const textAlignPosition = [
  { label: '居左', value: 'l' },
  { label: '居中', value: 'c' },
  { label: '居右', value: 'r' },
]

// 表单自定义规则类型
export const ruleOption = [
  { label: '系统', value: 'system' },
  { label: '自定义', value: 'custom' },
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
  { label: '宽松', value: 'large' },
]

// 边框类型
export const borderTypeOptions = [
  { label: '线框', value: 'border' },
  { label: '线条', value: 'line' },
]

// 组件颜色选择
export const colorPickerOptions = ['#e6a23c', '#67c23a', '#409eff', '#c3002f', '#303133', '#606266', '#909399']

// 排版模式
export const displayOptions = [
  { label: '默认布局', value: 'static', disabled: false },
  { label: '弹性布局', value: 'flex', disabled: false },
  { label: '网格布局', value: 'grid', disabled: false },
  { label: '悬浮定位', value: 'fixed', disabled: false },
]

export type ButtonTheme =
  | 'mpl-btn-1'
  | 'mpl-btn-2'
  | 'mpl-btn-3'
  | 'mpl-btn-4'
  | 'mpl-btn-5'
  | 'mpl-btn-6'
  | 'mpl-btn-7'
  | 'mpl-btn-8'
  | 'mpl-btn-9'
  | 'mpl-btn-10'
  | 'mpl-btn-11'
  | 'mpl-btn-12'
  | 'mpl-btn-13'
  | 'mpl-btn-14'
  | 'mpl-btn-15'
  | 'mpl-btn-16'
  | 'mpl-btn-17'
  | 'mpl-btn-18'
  | 'mpl-btn-19'
  | 'mpl-btn-20'

// 按钮主题
export const buttonThemeOptions: { label: string, value: ButtonTheme }[] = [
  { label: '按钮主题1', value: 'mpl-btn-1' },
  { label: '按钮主题2', value: 'mpl-btn-2' },
  { label: '按钮主题3', value: 'mpl-btn-3' },
  { label: '按钮主题4', value: 'mpl-btn-4' },
  { label: '按钮主题5', value: 'mpl-btn-5' },
  { label: '按钮主题6', value: 'mpl-btn-6' },
  { label: '按钮主题7', value: 'mpl-btn-7' },
  { label: '按钮主题8', value: 'mpl-btn-8' },
  { label: '按钮主题9', value: 'mpl-btn-9' },
  { label: '按钮主题10', value: 'mpl-btn-10' },
  { label: '按钮主题11', value: 'mpl-btn-11' },
  { label: '按钮主题12', value: 'mpl-btn-12' },
  { label: '按钮主题13', value: 'mpl-btn-13' },
  { label: '按钮主题14', value: 'mpl-btn-14' },
  { label: '按钮主题15', value: 'mpl-btn-15' },
  { label: '按钮主题16', value: 'mpl-btn-16' },
  { label: '按钮主题17', value: 'mpl-btn-17' },
  { label: '按钮主题18', value: 'mpl-btn-18' },
  { label: '按钮主题19', value: 'mpl-btn-19' },
  { label: '按钮主题20', value: 'mpl-btn-20' },
]
