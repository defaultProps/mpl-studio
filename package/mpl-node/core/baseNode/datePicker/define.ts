import type {
  BaseBtn,
  ComponentBaseExport,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
  EventNode,
} from "@mpl/typings";

export interface DatePickerNode {
  model: string
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean;
  clearable: boolean; 
  placeholder: string
  prefixIcon: string
  dateCell: string // 自定义日期展示节点UI。以IDE进行编辑。内置MPL常规UI >=3 种
  type: 'week' | 'date' | 'dates' | 'year' | 'years' | 'month' | 'months'
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

function getTemplateCode(node: DatePickerFormProp): string {
  console.error(node)
  return ``
}

function getNodeVar(node: DatePickerFormProp): string {
  console.error(node)
  return ``
}

export interface DatePickerFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  slotBtn: BaseBtn[];
  datePicker: DatePickerNode
  pos: { pc: NodePos, mobile: NodePos }
}

export function newDatePickerNode(cid: string): DatePickerFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '单日期控件',
    mpl_zh: '单日期控件',
    mpl_version: '1.0.0',
    mpl_ce: 'c',

    cid,
    tag: 'mpl-date-picker',
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
      text: '单日期',
      pos: 'r',
      icon: '',
      iconTheme: '',
      iconText: '',
    },
    size: 'small',
    slotBtn: [],
    datePicker: {
      model: '',
      size: 'sm',
      clearable: true,
      pos: 'l',
      required: false,
      placeholder: '请选择日期',
      prefixIcon: '',
      dateCell: '',
      type: 'date'
    },
  }
}

const events: EventNode[] = [
  { name: "change", desc: "输入内容改变时", code: "", type: "flow" },
  { name: "clear", desc: "点击清空图标", code: "", type: "flow" },
];

export const datePicker: ComponentBaseExport = {
  tag: 'mpl-date-picker',
  comp: newDatePickerNode,
  pos: pos(),
  events,
  getContextmenu: (node: DatePickerNode) => {
    console.log(node)
    return []
  },
  getTemplateCode,
  getNodeVar
}
