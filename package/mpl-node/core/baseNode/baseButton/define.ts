import type { BaseBtn, SLOT_NODE, ComponentBaseExport, Node, NodePos, ContextMenuNode } from '@mpl/typings'


export interface ButtonProp extends BaseBtn, Node {
  slotNodes: SLOT_NODE[]
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
      type: 'h',
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

export function newBaseButtonNode(cid: string): ButtonProp {
  return {
    mpl_group: '基础控件',
    mpl_title: '按钮',
    mpl_zh: '按钮',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    field: '',

    cid,
    visible: '1',
    visibleType: 'default',
    type: 'c',

    tag: 'mpl-btn',
    mpl_children: [],
    title: '标题',
    icon: '',
    theme: 'primary',
    classList: [], // 首位是默认className, 补位是用户选择的className
    userClassName: [], // 用户输入的className, 动态变量配置。exp: { 'upload-btn': this.mpl.isUploadStatus }
    style: '',
    disabledName: '',
    clickName: '',
    className: '',
    visibleName: '',
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
    slotNodes: []
  }
}

function getTemplateCode(node: ButtonProp): string {

  return `
		<!-- 基础输入框 template 节点源码 -->
		<mpl-button />
	`
}

export const baseButton: ComponentBaseExport = {
  tag: 'mpl-btn',
  comp: newBaseButtonNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: ButtonProp) => {
    return []
  }
}
