import type { BaseBtn, ComponentBaseExport, Node, NodePos } from '@mpl/typings'
import { newCid } from '@mpl/const'

export interface TabsPaneProp {
  label: string
  value: string
  disabledName: string
  visibleName: string
  cid: string
  footerBtnGroup: BaseBtn[]
}

export const tabsEvent = {
  // 面板禁用事件名
  getPaneDisabledName: (cid: string): string => `tabsPane_disabled_${cid}`,
  // 面板显示隐藏事件名
  getPaneVisibleName: (cid: string): string => `tabsPane_visible_${cid}`,
}

export function newTabPane(): TabsPaneProp {
  return {
    label: '标题',
    value: newCid(),
    disabledName: '',
    visibleName: '',
    cid: newCid(),
    footerBtnGroup: []
  }
}

export interface TabsProp {
  position: 'top' | 'right' | 'left' | 'bottom' // 卡片标题位置
  cardMode: 'border-type' | 'card' | '' // 标题类型
  panes: TabsPaneProp[]
  cid: string
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {

    pc: {
      w: 24,
      h: 12,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: 'h',
      mod: 'box',
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

function initTabsPanes(): TabsPaneProp[] {
  return [
    {
      label: '面板',
      value: 'vdr6u7',
      cid: 'vdr6u7',
      disabledName: '',
      visibleName: '',
      footerBtnGroup: [],
    },
    {
      label: '角色',
      value: 'ku4lo5',
      cid: 'ku4lo5',
      disabledName: '',
      visibleName: '',
      footerBtnGroup: [],
    },
    {
      label: '菜单',
      value: 'we3rf4',
      cid: 'we3rf4',
      disabledName: '',
      visibleName: '',
      footerBtnGroup: []
    }
  ]
}

export function initTabsPaneFooterBtn(cid = newCid()): BaseBtn {
  return {
    title: '按钮',
    theme: '',
    disabledName: '',
    visibleName: '',
    icon: '',
    clickName: '',
    cid,
    className: '',
  }
}

export interface Tabs extends Node {
  tabs: TabsProp
  activeModel: string
}

export function newTabsNode(cid: string): Tabs {
  return {
    mpl_group: '容器类',
    mpl_title: '标签页',
    mpl_zh: '空状态',
    mpl_ce: 'c',
    visible: true,
    mpl_version: '1.0.0',
    cid,
    tag: 'mpl-tabs',
    childIds: [],
    classList: [],
    userClassName: [],
    style: '',
    events: [],
    activeModel: 'vdr6u7',
    tabs: {
      position: 'top',
      cardMode: '',
      cid: newCid(),
      panes: initTabsPanes(),
    },
    pos: pos(),
  }
}

function getTemplateCode(node: Tabs): string {
  console.error(node)
  return ``
}

function getNodeVar(node: Tabs): string {
  console.error(node)
  return ``
}

export const tabsNode: ComponentBaseExport = {
  tag: 'mpl-tabs',
  comp: newTabsNode,
  pos: pos(),
  events: [],
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar
}
