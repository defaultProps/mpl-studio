import type {
  ComponentBaseExport,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
} from "@mpl/typings"

export interface SliderNode {
  model: number
  width: number | null
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
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

export interface SliderFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  slider: SliderNode
  pos: { pc: NodePos, mobile: NodePos }
}

export function newSliderNode(cid: string): SliderFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '滑块控件',
    mpl_zh: '滑块控件',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    cid,
    visible: true,
    tag: 'mpl-slider',
    childIds: [],
    events: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '滑块',
      pos: 'r',
      icon: '',
      iconTheme: '',
      iconText: '',
    },
    size: 'small',
    footerSlotSize: 'small',
    slider: {
      width: 120,
      model: 20,
      size: 'sm',
      pos: 'l',
      required: false,
    },
  }
}

function getTemplateCode(node: SliderNode): string {
  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

function getNodeVar(node: SliderNode): string {
  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}


export const sliderNode: ComponentBaseExport = {
  tag: 'mpl-slider',
  comp: newSliderNode,
  pos: pos(),
  events: [],
  getContextmenu: (node: SliderNode) => {
    console.log(node)
    return []
  },
  getTemplateCode,
  getNodeVar,
}