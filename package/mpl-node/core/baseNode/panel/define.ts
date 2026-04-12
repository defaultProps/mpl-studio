import type { ComponentBaseExport, Node, NodePos, BaseBtn } from '@mpl/typings'

// 顶部右侧挂载节点类型。仅适配挂载常用组件，特殊组件根据公司业务自行补充

// 面板顶部右侧区域节点插槽节点类型
export const panelHeaderNodeTypeOptions: Array<{
  label: string
  value: string
}> = [
    { label: '按钮', value: 'mpl-btn' },
    { label: '基础输入', value: 'mpl-input' },
    { label: '数字输入', value: 'mpl-number' },
    { label: '下拉选择', value: 'mpl-select' },
    { label: '弹框选择', value: 'mpl-select-dialog' }
  ]

// 内间距设置
type PanelPaddingSize = 'none' | 'small' | 'standard'
// 外间距
type PanelMarginSize = 'none' | 'small' | 'medium'

export const panelPaddingSizeOptions: Array<{
  label: string
  value: PanelPaddingSize
}> = [
    { label: '无', value: 'none' },
    { label: '紧凑', value: 'small' },
    { label: '标准', value: 'standard' }
  ]

export const panelMarginSizeOptions: Array<{
  label: string
  value: PanelMarginSize
}> = [
    { label: '无间距', value: 'none' },
    { label: '紧凑间距', value: 'small' },
    { label: '标准间距', value: 'medium' }
  ]


export interface PanelProp extends Node {
  width: string
  height: number
  header: {
    visible: boolean
    label: string
    icon: string
    showBorderBottom: boolean
    slotNodes: BaseBtn[] // 顶部右侧挂载节点
    expandable: boolean
  }
  body: {
    paddingSize: PanelPaddingSize // 内间距
    autoHeight: boolean
    layout: 'flex-inline' | 'flex-left' | 'flex-center' | 'flex-end' | 'absolute' | 'grid-table' | '' // 布局类型通常与基础容器排版布局保持一致或稍小
  }
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 18,
      minH: 4,
      maxH: 0,
      type: 'wh',
      minW: 1,
      mod: 'formItem'
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

export function newPanel(cid: string): PanelProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '面板',
    mpl_version: '1.0.0',
    field: '',

    cid,
    tag: 'mpl-panel',
    mpl_zh: '面板',
    mpl_ce: 'c',
    visible: '1',
    visibleType: 'default',
    header: {
      visible: true,
      label: '面板标题',
      icon: '',
      slotNodes: [],
      expandable: true,
      showBorderBottom: true
    },
    body: {
      layout: '',
      paddingSize: 'standard',
      autoHeight: false
    },

    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
    width: '24',
    height: 20
  }
}

function getTemplateCode(node: PanelProp): string {
  console.error(node)
  return ``
}

export const panel: ComponentBaseExport = {
  tag: 'mpl-panel',
  comp: newPanel,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: PanelProp) => {
    return [
      { desc: '显示隐藏', key: `mpl.${node.cid}.visible`, value: true },
    ]
  }
}
