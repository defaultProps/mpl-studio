import type { ComponentBaseExport, FormItemSize, FormLabelProp, SlotSubNode, Node, NodePos } from '@mpl/typings'

export interface SwitchNode {
  model: boolean
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
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
      h: 54,
      minH: 4,
      maxH: 20,
      minW: 24,
      type: 'h',
      mod: 'formItem'
    }
  }
}

export interface SwitchFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  switch: SwitchNode
  slotNodes: SlotSubNode[]
  pos: { pc: NodePos; mobile: NodePos }
}

export function newSwitchNode(cid: string): SwitchFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '开关控件',
    mpl_zh: '开关控件',
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    field: '',
    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-switch',
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
      text: '开关标题',
      pos: 'r',
      icon: '',

      iconTheme: '#1E1E1E',
      iconText: ''
    },
    size: 'small',
    footerSlotSize: 'small',
    switch: {
      model: false,
      size: 'sm',
      pos: 'l',
      required: false,
      prop: 'switch'
    }
  }
}

function getTemplateCode(node: SwitchNode): string {
  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const switchNode: ComponentBaseExport = {
  tag: 'mpl-switch',
  comp: newSwitchNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: SwitchFormProp) => {
    return []
  }
}
