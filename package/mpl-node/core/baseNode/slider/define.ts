import type { ComponentBaseExport, FormItemSize, SlotSubNode, FormLabelProp, Node, NodePos } from '@mpl/typings'

export interface SliderNode {
  model: number
  width: number | null
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
      h: 76,
      minH: 8,
      maxH: 20,
      minW: 24,
      type: 'h',
      mod: 'formItem'
    }
  }
}

export interface SliderFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  slotNodes: SlotSubNode[]
  slider: SliderNode
  pos: { pc: NodePos; mobile: NodePos }
}

export function newSliderNode(cid: string): SliderFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '滑块控件',
    mpl_zh: '滑块控件',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    field: '',

    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-slider',
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
      text: '滑块标题',
      pos: 'r',
      icon: '',

      iconTheme: '',
      iconText: ''
    },
    size: 'small',
    footerSlotSize: 'small',
    slider: {
      width: 120,
      model: 20,
      size: 'sm',
      pos: 'l',
      required: false,
      prop: 'slider'
    }
  }
}

function getTemplateCode(node: SliderNode): string {
  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const sliderNode: ComponentBaseExport = {
  tag: 'mpl-slider',
  comp: newSliderNode,
  pos: pos(),

  getTemplateCode,
  getNodeVar: (node: SliderFormProp) => {
    return []
  }
}
