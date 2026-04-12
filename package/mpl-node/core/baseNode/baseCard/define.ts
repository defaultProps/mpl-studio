import type { ComponentBaseExport, Node, NodePos, ContextMenuNode } from '@mpl/typings'


export interface BaseCardProp {
  layout: 'layout1' | 'layout2' // 排版类型
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 6,
      h: 12,
      minH: 5,
      maxH: 7,
      minW: 1,
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
      mod: 'formItem'
    }
  }
}

export interface BaseCard extends Node {
  card: BaseCardProp
}

export function newBaseCardNode(cid: string): BaseCard {
  return {
    mpl_group: '容器类',
    mpl_title: '卡片',
    mpl_zh: '卡片',
    mpl_ce: 'c',

    field: '',
    mpl_version: '1.0.0',
    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-card',
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    events: [],
    variables: [],
    defaultEvents: [],
    card: {
      layout: 'layout1'
    },
    pos: pos()
  }
}

function getTemplateCode(node: BaseCard): string {

  return `
		<!-- 基础输入框 template 节点源码 -->
		<mpl-button />
	`
}

export const baseCardNode: ComponentBaseExport = {
  tag: 'mpl-card',
  comp: newBaseCardNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: BaseCard) => {
    return []
  }
}
