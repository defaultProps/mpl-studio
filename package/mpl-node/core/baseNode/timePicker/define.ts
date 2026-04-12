import type { ComponentBaseExport, FormItemSize, FormLabelProp, Node, NodePos, SlotSubNode } from '@mpl/typings'

export interface TimePickerNode {
  model: string
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
  placeholder: string
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

export interface TimePickerFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  timePicker: TimePickerNode
  slotNodes: SlotSubNode[]
  pos: { pc: NodePos; mobile: NodePos }
}

export function newTimePickerNode(cid: string): TimePickerFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '单时间控件',
    mpl_zh: '单时间控件',
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    field: '',
    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-time-picker',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    slotNodes: [],
    label: {
      show: true,
      width: 120,
      text: '时间选择标题',
      pos: 'r',
      icon: '',

      iconTheme: '#1E1E1E',
      iconText: ''
    },
    size: 'small',
    footerSlotSize: 'small',
    timePicker: {
      model: '',
      placeholder: '请输入',
      size: 'sm',
      pos: 'l',
      required: false,
      prop: 'timePicker'
    }
  }
}

function getTemplateCode(node: TimePickerNode): string {
  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const timePickerNode: ComponentBaseExport = {
  tag: 'mpl-time-picker',
  comp: newTimePickerNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: TimePickerFormProp) => {
    return []
  }
}
