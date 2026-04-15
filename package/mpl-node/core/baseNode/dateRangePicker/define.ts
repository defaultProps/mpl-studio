import { NodePos, FormLabelProp, FormItemSize, Node, ComponentBaseExport, ContextMenuNode } from '@mpl/typings'

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
  shortcuts: Array<string | { text: string; value: () => Date[] }> // 快捷设置选项日期 MPL内置
  prop: string
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 6,
      h: 4,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: 'w',
      mod: 'formItem'
    },
    mobile: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 76,
      minH: 8,
      maxH: 20,
      minW: 24,
      type: 'h',
      mod: 'formItem'
    }
  }
}

export interface DateRangePickerFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  dateRangePicker: DateRangePickerNode
  pos: { pc: NodePos; mobile: NodePos }
}

export function newDateRangePickerNode(cid: string): DateRangePickerFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '日期范围控件',
    mpl_zh: '日期范围控件',
    mpl_version: '1.0.0',
    field: '',
    mpl_ce: 'c',
    cid,
    tag: 'mpl-date-range-picker',
    visible: '1',
    visibleType: 'default',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [
      {
        name: `mpl_dateRangePicker_change_${cid}`,
        desc: '日期范围更改时',
        code: `
          mpl_dateRangePicker_change_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-date-range-picker'
      }
    ],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '日期范围标题',
      pos: 'r',
      icon: '',

      iconTheme: '#1E1E1E',
      iconText: ''
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
      shortcuts: [],
      prop: 'dateRange'
    }
  }
}

function getTemplateCode(node: DateRangePickerNode): string {
  console.error(node)
  return ``
}

export const dateRangePicker: ComponentBaseExport = {
  tag: 'mpl-date-range-picker',
  comp: newDateRangePickerNode,
  pos: pos(),
  getTemplateCode,
  getBaseVar: (cid: string) => {
    return `
      ${cid}: { 
        vModel: ''
      }
    `
  },
  getNodeVar: (node: DateRangePickerFormProp) => {
    const prefix = `${node.mpl_title} / ${node.mpl_zh}`

    return [
      { desc: `${prefix} / 显示隐藏`, key: 'visible', value: true, fullPath: `${node.cid}.visible` },
      { desc: `${prefix} / 绑定值`, key: 'vModel', value: '', fullPath: `${node.cid}.vModel` },
      { desc: `${prefix} / 必填`, key: 'required', value: false, fullPath: `${node.cid}.required` },
      { desc: `${prefix} / 禁用`, key: 'disabled', value: false, fullPath: `${node.cid}.disabled` },
      { desc: `${prefix} / 只读`, key: 'readonly', value: false, fullPath: `${node.cid}.readonly` },
      { desc: prefix, key: 'cid', value: 'cid', fullPath: node.cid },
    ]
  }
}
