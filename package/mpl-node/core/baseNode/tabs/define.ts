import type { BaseBtn, ComponentBaseExport, Node, NodePos } from '@mpl/typings'
import { newCid } from '@mpl/libs'

export interface TabsPaneProp {
  label: string
  value: string
  disabledName: string
  visibleName: string
  cid: string
  footerBtnGroup: BaseBtn[]
  mpl_children: Node[]
}

export const tabsEvent = {
  // 面板禁用事件名
  getPaneDisabledName: (cid: string): string => `tabsPane_disabled_${cid}`,
  // 面板显示隐藏事件名
  getPaneVisibleName: (cid: string): string => `tabsPane_visible_${cid}`
}

export function newTabPane(): TabsPaneProp {
  return {
    label: '标题',
    value: newCid('pane'),
    disabledName: '',
    visibleName: '',
    cid: newCid('pane'),
    footerBtnGroup: [],
    mpl_children: []
  }
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 0,
      minH: '270px',
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

function initTabsPanes(): TabsPaneProp[] {
  return [
    {
      label: '面板',
      value: 'vdr6u7',
      cid: 'vdr6u7',
      disabledName: '',
      visibleName: '',
      footerBtnGroup: [],
      mpl_children: []
    },
    {
      label: '角色',
      value: 'ku4lo5',
      cid: 'ku4lo5',
      disabledName: '',
      visibleName: '',
      footerBtnGroup: [],
      mpl_children: []
    },
    {
      label: '菜单',
      value: 'we3rf4',
      cid: 'we3rf4',
      disabledName: '',
      visibleName: '',
      footerBtnGroup: [],
      mpl_children: []
    }
  ]
}

export function initTabsPaneFooterBtn(cid = newCid()): BaseBtn {
  return {
    title: '按钮',
    theme: '',
    type: '',
    disabledName: '',
    visibleName: '',
    icon: '',
    clickName: '',
    cid,
    className: ''
  }
}

export interface Tabs extends Node {
  activeModel: string
  tabPosition: 'top' | 'right' | 'left' | 'bottom' // 卡片标题位置
  cardStyle: 'border-type' | 'card' | '' // 标题类型
  itemList: TabsPaneProp[]
  cid: string
}

export function newTabsNode(cid: string): Tabs {
  return {
    mpl_group: '容器类',
    mpl_title: '标签页',
    mpl_zh: '空状态',
    mpl_ce: 'c',
    visible: '1',
    visibleType: 'default',
    mpl_version: '1.0.0',
    field: '',
    cid,
    tag: 'mpl-tabs',
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    events: [],
    variables: [],
    defaultEvents: [],
    activeModel: 'vdr6u7',
    tabPosition: 'top',
    cardStyle: 'border-type',
    itemList: initTabsPanes(),
    pos: pos()
  }
}

function getTemplateCode(node: Tabs): string {
  console.error(node)
  return ``
}

export const tabsNode: ComponentBaseExport = {
  tag: 'mpl-tabs',
  comp: newTabsNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: Tabs) => {
    return [
      { desc: '显示隐藏', key: `mpl.${node.cid}.visible`, value: true, fullPath: 'visible' },
      { desc: '当前选择页签', key: `mpl.${node.cid}.vModel`, value: '', fullPath: 'vModel' },
    ]
  }
}
