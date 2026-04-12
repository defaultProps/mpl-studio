import type { ComponentBaseExport, FormItemSize, FormLabelProp, Node, NodePos, ContextMenuNode } from '@mpl/typings'

export type TransferValue = Array<{ key: string; label: string; disabled: boolean;[k: string]: any }>

export interface TransferNode {
  model: TransferValue
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 12,
      h: 30,
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

export interface TransferFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  rate: TransferNode
  pos: { pc: NodePos; mobile: NodePos }
}

export function newTransferNode(cid: string): TransferFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '穿梭框',
    mpl_zh: '穿梭框',
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    field: '',

    cid,
    tag: 'mpl-transfer',
    visible: '1',
    visibleType: 'default',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '穿梭框标题',
      pos: 'r',
      icon: '',

      iconTheme: '#1E1E1E',
      iconText: ''
    },
    size: 'small',
    footerSlotSize: 'small',
    rate: {
      model: [],
      size: 'sm',
      pos: 'l',
      required: false
    }
  }
}

function getTemplateCode(node: TransferFormProp): string {
  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const transferNode: ComponentBaseExport = {
  tag: 'mpl-rate',
  comp: newTransferNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: TransferFormProp) => {
    return []
  }
}
