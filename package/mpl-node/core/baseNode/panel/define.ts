import type {
  ComponentBaseExport,
  Node,
  NodePos,
  NODE_TAG
} from "@mpl/typings";

// 顶部右侧挂载节点类型。仅适配挂载常用组件，特殊组件根据公司业务自行补充

// 面板顶部右侧区域节点插槽节点类型
export const panelHeaderNodeTypeOptions: Array<{
  label: string
  value: NODE_TAG
}> = [
    { label: '下拉菜单', value: 'mpl-select' },
    { label: '基础按钮', value: 'mpl-btn' },
    { label: '输入框', value: 'mpl-input' }
  ]

// 内间距设置
type PanelPaddingSize = 'none' | 'small' | 'medium' | 'large'
export const panelPaddingSizeOptions: Array<{
  label: string
  value: PanelPaddingSize
}> = [
    { label: '无间距', value: 'none' },
    { label: '紧凑间距', value: 'small' },
    { label: '标准间距', value: 'medium' },
    { label: '宽松间距', value: 'large' },
  ]

export interface PanelHeaderSlot {
  label: string,
  cid: string,
  value: NODE_TAG
}

export interface PanelProp extends Node {
  width: string
  height: number
  header: {
    visible: boolean
    label: string
    icon: string
    slots: Array<{ label: string, cid: string, value: NODE_TAG }>
    slotNodes: Node[]
  }
  body: {
    paddingSize: PanelPaddingSize // 内间距
    layout:
    | 'flex-inline'
    | 'flex-left'
    | 'flex-center'
    | 'flex-end'
    | 'absolute'
    | 'grid-table'
    | '' // 布局类型通常与基础容器排版布局保持一致或稍小
  }
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 24,
      h: 18,
      minH: 4,
      maxH: 0,
      type: 'wh',
      minW: 1,
      mod: "formItem",
    },
    mobile: {
      w: 24,
      h: 8,
      minH: 8,
      maxH: 20,
      minW: 24,
      type: "h",
      mod: "formItem",
    }
  }
}

export function newPanel(cid: string): PanelProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '面板',
    mpl_version: '1.0.0',
    cid,
    tag: 'mpl-panel',
    mpl_zh: '面板',
    mpl_ce: 'c',
    visible: true,
    header: {
      visible: true,
      label: '标题',
      icon: '',
      slots: [],
      slotNodes: []
    },
    body: {
      layout: '',
      paddingSize: 'small',
    },

    childIds: [],
    classList: [],
    userClassName: [],
    style: '',
    events: [],
    pos: pos(),
    width: '24',
    height: 20,
  }
}


function getTemplateCode(node: PanelProp): string {
  console.error(node)
  return ``
}

function getNodeVar(node: PanelProp): string {
  console.error(node)
  return ``
}

export const panel: ComponentBaseExport = {
  tag: 'mpl-panel',
  comp: newPanel,
  pos: pos(),
  events: [],
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar
}
