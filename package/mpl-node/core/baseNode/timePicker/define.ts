import type {
  ComponentBaseExport,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
} from "@mpl/typings"

export interface TimePickerNode {
  model: string
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

export interface TimePickerFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  timePicker: TimePickerNode
  pos: { pc: NodePos, mobile: NodePos }
}

export function newTimePickerNode(cid: string): TimePickerFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '单时间控件',
    mpl_zh: '单时间控件',
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    cid,
    visible: true,
    tag: 'mpl-time-picker',
    childIds: [],
    events: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '时间控件',
      pos: 'r',
      icon: '',
      iconTheme: '',
      iconText: '',
    },
    size: 'small',
    footerSlotSize: 'small',
    timePicker: {
      model: '',
      placeholder: '请输入',
      size: 'sm',
      pos: 'l',
      required: false,
    },
  }
}

function getTemplateCode(node: TimePickerNode): string {
  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

function getNodeVar(node: TimePickerNode): string {
  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const timePickerNode: ComponentBaseExport = {
  tag: 'mpl-time-picker',
  comp: newTimePickerNode,
  pos: pos(),
  events: [],
  getContextmenu: (node: TimePickerNode) => {
    console.log(node)
    return []
  },
  getTemplateCode,
  getNodeVar,
}
