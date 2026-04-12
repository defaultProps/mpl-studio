import type { ComponentBaseExport, Node, NodePos } from '@mpl/typings'
import { newCid } from '@mpl/libs'

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 0,
      minH: '322px',
      maxH: 0,
      minW: 20,
      type: 'wh',
      mod: 'box'
    },
    mobile: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 8,
      minH: 8,
      maxH: 20,
      minW: 24,
      type: 'h',
      mod: 'box'
    }
  }
}

export interface CollapseItem {
  title: string
  value: string
  disabled: boolean
  visible: boolean
  mpl_children: Node[]
}

export interface CollapseProp extends Node {
  model: string
  accordion: boolean // 单面板打开
  collapseHeaderSlot: 'default' | 'mplCollapse1' | 'mplCollapse2' | 'mplCollapse3' // 顶部插槽类型，仅仅涉及到UI排版
  itemList: CollapseItem[]
  pos: { pc: NodePos; mobile: NodePos }
}

export function newCollapseNode(cid: string): CollapseProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '折叠面板',
    mpl_zh: '折叠面板',
    mpl_version: '1.0.0',
    field: '',
    mpl_ce: 'c',
    visible: '1',
    visibleType: 'default',
    cid,
    tag: 'mpl-collapse',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    collapseHeaderSlot: 'default',
    model: `activeCollapse_${cid}`,
    accordion: true,
    itemList: [
      { title: '面板标题1', value: newCid('collapseItem'), disabled: false, visible: true, mpl_children: [] },
      { title: '面板标题2', value: newCid('collapseItem'), disabled: false, visible: true, mpl_children: [] }
    ]
  }
}

function getTemplateCode(node: CollapseProp): string {
  console.error(node)
  return ``
}

export const collapse: ComponentBaseExport = {
  tag: 'mpl-collapse',
  comp: newCollapseNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: CollapseProp) => {
    return [
      { desc: '显示隐藏', key: `mpl.${node.cid}.visible`, value: true },
      { desc: '展开项', key: `mpl.${node.cid}.vModel`, value: '' }
    ]
  }
}
