import type { QrCodeProp, NODE_TAG, BTN_THEME_TYPE } from '@mpl/typings'
import { newId } from '@mpl/libs'
// 基础颜色列表
export const predefineColorsList = ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']

export enum SERVICE_MODE {
  STATIC = 'static', // 静态数据配置。初始化配置
  DYNAMICS = 'dynamics', // 接口绑定。默认onMounted触发
  CONNECT = 'connect', // 通过其他关联绑定。举例：前端添加列动态添加行数据
  CUSTOM = 'custom' // 自定义
}

export const serviceOption: Array<{ label: string; value: SERVICE_MODE }> = [
  { label: '静态', value: SERVICE_MODE.STATIC },
  { label: '服务', value: SERVICE_MODE.DYNAMICS },
  { label: '自定义', value: SERVICE_MODE.CUSTOM }
]

// 预留颜色
export const predefineColors: string[] = [
  '#1e1e1e',
  '#107c41',
  '#c3002f',
  '#196eff',
  '#ffffff',
  '#e3e4e5',
  '#e6e6e6',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
]

export enum RESOURCE {
  ELEMENT_PLUS = '@mpl/node',
  VANT4 = '@mpl/vant4',
  ANT_DESIGN = '@mpl/ant-design',
  ANT_DESIGN_MOBILE = '@mpl/ant-design-mobile'
}

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

// 根据二维码的UI，生成对应的字段类型。所有UI类型都可以自定义拖拉拽排序添加删除字段。
export const mplQrCodeUIList: QrCodeProp[] = [
  {
    type: 'simple', // 简单二维码
    id: '',
    title: '简单二维码',
    fields: []
  },
  {
    type: 'simple',
    id: '',
    title: '简单标签 A100-1',
    fields: [
      {
        id: newId(),
        type: 'text',
        text: 'xx产品说明书',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '型号VT056-12',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '日期 2008-12-34',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      }
    ]
  },
  {
    type: 'simple',
    id: '',
    title: '说明书 B349-67',
    fields: [
      {
        id: newId(),
        type: 'text',
        text: '名称：xx产品说明书',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '型号：VT056-12',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '生产日期：2008-12-34',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '产品编码：2008-12-34',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '出厂地：中国-广东-揭阳',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '爱仕达服装有限公司',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      }
    ]
  },
  {
    type: 'simple',
    id: '',
    title: '资产标签 R634-9',
    fields: [
      {
        id: newId(),
        type: 'text',
        text: '名称：xx产品说明书',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '型号：VT056-12',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24', color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '生产日期：2008-12-34',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '产品编码：2008-12-34',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '出厂地：中国-广东-揭阳',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '爱仕达服装有限公司',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      }
    ]
  },
  {
    type: 'simple',
    id: '',
    title: '微信扫码 R57-16',
    fields: [
      {
        id: newId(),
        type: 'text',
        text: '微信扫一扫',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '关注公众号',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'text',
        text: '关注领取福利',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      },
      {
        id: newId(),
        type: 'img',
        text: 'base64:xxx',
        fontFamily: '',
        fontWeight: 'bold',
        fontSize: '24',
        color: '#1E1E1E'
      }
    ]
  }
]

export const mplBtnThemeList: Array<{ label: string, value: BTN_THEME_TYPE }> = [
  { label: '主色', value: 'primary' }, // 主色按钮
  { label: '文本', value: 'text' }, // 文本按钮
  { label: '链接', value: 'link' }, // 链接按钮
  { label: '默认', value: '' } // 默认按钮
]

// 可内置的组件类型
export const defaultNodeList = [
  { label: '按钮', value: 'btn' },
  { label: '文本', value: 'txt' },
  { label: '链接', value: 'link' },
  { label: '图标', value: 'icon' },
  { label: '基础输入', value: 'input' },
]

// 容器组件tag
export const containerNodeTag: NODE_TAG[] = [
  'mpl-tabs',
  'mpl-panel',
  'mpl-drawer',
  'mpl-dialog'
]

export const beautifyCode = {
  html: {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: -1,
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 160,
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false
  },
  css: {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: -1,
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'keep',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 160,
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false
  },
  js: {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: -1,
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'keep',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 160,
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false
  }
}