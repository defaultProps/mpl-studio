import type { ActiveNodeEvent, ServiceBindMode } from '@mpl/typings'

// 基础颜色列表
export const predefineColorsList = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
]

export const serviceOption: Array<{ label: string, value: ServiceBindMode }> = [
  { label: '静态', value: 'static' },
  { label: '服务', value: 'dynamics' }
]

export enum RESOURCE {
  ELEMENT_PLUS = '@mpl/node',
  VANT4 = '@mpl/vant4',
  ANT_DESIGN = '@mpl/ant-design',
  ANT_DESIGN_MOBILE = '@mpl/ant-design-mobile'
}

// 页面的默认事件
export const pageEventList: ActiveNodeEvent[] = [
  { name: 'onMounted', code: '', desc: '页面初始化', type: 'flow', checked: true },
  { name: 'onUnMounted', code: '', desc: '页面关闭时', type: 'flow', checked: true },
  { name: 'onCreated', code: '', desc: '页面预加载', type: 'flow', checked: true }
]

// 字体列表
export const FontFamilyOptions = [
  { label: '微软雅黑', value: 'Yahei' },
  { label: '等宽宋体', value: 'NSinSun' },
  { label: '浏览器默认字体', value: 'default' }
]

// 平台列表
export const platformList = [
  {
    label: '营销领域平台',
    value: 'MPL-SMS',
    theme: ['light', 'dark']
  },
  {
    label: '资产云平台',
    value: 'MPL-DFN',
    theme: ['light', 'dark']
  },
  {
    label: '人事管理平台',
    value: 'MPL-PQC',
    theme: ['light', 'dark', 'color']
  },
  {
    label: '大屏展示平台',
    value: 'MPL-QT',
    theme: ['light', 'dark']
  },
  {
    label: '空平台',
    value: 'MPL-EPT',
    theme: ['light']
  }
]

// 左右 - 方向
export const lrOptions = [
  { label: '左侧', value: 'l' },
  { label: '右侧', value: 'r' }
]

// 左中右 - 方向
export const lcrOptions = [
  { label: '居左', value: 'l' },
  { label: '居中', value: 'c' },
  { label: '居右', value: 'r' }
]