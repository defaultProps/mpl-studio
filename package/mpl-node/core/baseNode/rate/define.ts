import type {
  ComponentBaseExport,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
} from "@mpl/typings"

export interface RateNode {
  model: number
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

export interface RateFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize // 底部占位的信息位置。如果检测出错误信息显示时此占位江自动设置为最高。关闭用户配置项。
  rate: RateNode
  pos: { pc: NodePos, mobile: NodePos }
}

export function newRateNode(cid: string): RateFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '分数控件',
    mpl_zh: '分数控件',
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    cid,
    tag: 'mpl-rate',
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
      text: '评分',
      pos: 'r',
      icon: '',
      iconTheme: '',
      iconText: '',
    },
    size: 'small',
    footerSlotSize: 'small',
    rate: {
      model: 0,
      size: 'sm',
      pos: 'l',
      required: false,
    },
  }
}

function getTemplateCode(node: RateFormProp): string {
  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

function getNodeVar(node: RateFormProp): string {
  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const rateNode: ComponentBaseExport = {
  tag: 'mpl-rate',
  comp: newRateNode,
  pos: pos(),
  events: [],
  getContextmenu: (node: RateNode) => {
    console.log(node)
    return []
  },
  getTemplateCode,
  getNodeVar,
}
