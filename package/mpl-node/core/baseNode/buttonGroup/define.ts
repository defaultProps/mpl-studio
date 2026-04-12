import type {
  BaseBtn,
  ComponentBaseExport,
  Node,
  NODE_TAG,
  NodePos
} from '@mpl/typings'

export interface ButtonGroupProp extends BaseBtn, Node {
  slotNodes: Array<{ tag: NODE_TAG, cid: string, pos: 'l' | 'r' }>
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

export function newButtonGroupNode(cid: string): ButtonGroupProp {
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
    type: '',

    tag: 'mpl-btn-group',
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

function getTemplateCode(node: ButtonGroupProp): string {

  return `
		<!-- 基础输入框 template 节点源码 -->
		<mpl-button />
	`
}

export const buttonGroup: ComponentBaseExport = {
  tag: 'mpl-btn-group',
  comp: newButtonGroupNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: ButtonGroupProp) => {
    return []
  }
}
