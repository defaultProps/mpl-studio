import type {
  ComponentBaseExport,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
} from "@mpl/typings"

export interface TimeRangePickerNode {
  model: null | string[]
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
  placeholder: string
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

export interface TimeRangePickerFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  timeRangePicker: TimeRangePickerNode
  pos: { pc: NodePos, mobile: NodePos }
}

export function newTimeRangePickerNode(cid: string): TimeRangePickerFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '时间范围控件',
    mpl_zh: '时间范围控件',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    cid,
    visible: true,
    tag: 'mpl-time-range-picker',
    childIds: [],
    events: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '时间范围控件',
      pos: 'r',
      icon: '',
      iconTheme: '',
      iconText: '',
    },
    size: 'small',
    footerSlotSize: 'small',
    timeRangePicker: {
      model: [],
      size: 'sm',
      pos: 'l',
      required: false,
      placeholder: '请输入'
    },
  }
}

function getTemplateCode(node: TimeRangePickerNode): string {
  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

function getNodeVar(node: TimeRangePickerNode): string {
  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const timeRangePickerNode: ComponentBaseExport = {
  tag: 'mpl-time-range-picker',
  comp: newTimeRangePickerNode,
  pos: pos(),
  events: [],
  getContextmenu: (node: TimeRangePickerNode) => {
    console.log(node)
    return []
  },
  getTemplateCode,
  getNodeVar,
}
