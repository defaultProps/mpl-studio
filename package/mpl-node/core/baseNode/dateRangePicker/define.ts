import { NodePos, FormLabelProp, FormItemSize, Node, ComponentBaseExport } from '@mpl/typings'

// 日期范围
export interface DateRangePickerNode {
  // ["2012-12-12 12:12:12", "2020-12-12 12:12:12"]
  // [new Date(), new Date()]
  // [1704505099513, 1704505099513]
  // null
  // 传入的值类型和返回的值类型相同[expect null]
  model: string[] | null
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
  rangeSeparator: string // 间距文本
  startPlaceHolder: string
  endPlaceholder: string
  type: 'daterange' | 'monthrange' | 'yearrange'
  shortcuts: Array<string | { text: string, value: () => Date[] }> // 快捷设置选项日期 MPL内置
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 6,
      h: 4,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: "w",
      mod: "formItem",
    },
    mobile: {
      w: 24,
      h: '76px',
      minH: 8,
      maxH: 20,
      minW: 24,
      type: "h",
      mod: "formItem",
    }
  }
}

export interface DateRangePickerFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  dateRangePicker: DateRangePickerNode
  pos: { pc: NodePos, mobile: NodePos }
}

export function newDateRangePickerNode(cid: string): DateRangePickerFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '日期范围控件',
    mpl_zh: '日期范围控件',
    mpl_version: '1.0.0',
    mpl_ce: 'c',

    cid,
    tag: 'mpl-date-range-picker',
    visible: true,
    childIds: [],
    events: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '日期范围',
      pos: 'r',
      icon: '',
      iconTheme: '',
      iconText: '',
    },
    size: 'small',
    footerSlotSize: 'small',
    dateRangePicker: {
      model: [],
      size: 'sm',
      pos: 'l',
      endPlaceholder: '请输入',
      startPlaceHolder: '',
      required: false,
      rangeSeparator: '-',
      type: 'daterange',
      shortcuts: []
    },
  }
}

function getTemplateCode(node: DateRangePickerNode): string {
  console.error(node)
  return ``
}

function getNodeVar(node: DateRangePickerNode): string {
  console.error(node)
  return ``
}

export const dateRangePicker: ComponentBaseExport = {
  tag: 'mpl-date-range-picker',
  comp: newDateRangePickerNode,
  pos: pos(),
  events: [],
  getContextmenu: (node: DateRangePickerNode) => {
    console.log(node)
    return []
  },
  getTemplateCode,
  getNodeVar
}
