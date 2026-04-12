import type { ComponentBaseExport, Node, NodePos, BaseBtnType, BTN_THEME_TYPE } from '@mpl/typings'

import { newCid } from '@mpl/libs'

export interface SlotSearchPanelBtn {
  title: string
  icon: string
  disabledName: string
  clickName: string
  type: BaseBtnType
  theme: BTN_THEME_TYPE
  cid: string
}

// 查询面板, 针对顶部查询区域进行搜索。 默认靠左
export interface SearchPanel extends Node {
  slotBtnGroup: SlotSearchPanelBtn[]
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 1000,
      h: 700,
      minH: '',
      maxH: '',
      minW: '',
      type: 'wh',
      mod: 'dialog'
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

export function newSearchPanelNode(cid: string): SearchPanel {
  return {
    mpl_group: '容器控件',
    mpl_title: '查询面板',
    mpl_zh: '查询面板',
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    field: '',
    visible: '1',
    visibleType: 'default',
    cid,
    tag: 'mpl-search-panel',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [],
    classList: [],
    userClassName: [],
    style: '',
    pos: pos(),
    slotBtnGroup: [
      {
        title: '重置',
        icon: '',
        disabledName: '',
        clickName: '',
        type: 'searchSubmit',
        theme: '',
        cid: newCid('searchPanelBtn'),
      },
      {
        title: '查询',
        icon: '',
        disabledName: '',
        clickName: '',
        type: 'searchSubmit',
        theme: 'primary',
        cid: newCid('searchPanelBtn'),
      },
      {
        title: '',
        icon: 'icon-expand',
        disabledName: '',
        clickName: '',
        type: 'searchExpand',
        theme: '',
        cid: newCid('searchPanelBtn'),
      },
    ]
  }
}

export const searchPanel: ComponentBaseExport = {
  tag: 'mpl-search-panel',
  comp: newSearchPanelNode,
  pos: pos(),
  getTemplateCode: (node: SearchPanel) => {
    return ``
  },
  getNodeVar: (node: SearchPanel) => {
    return [
      { desc: '显示隐藏', key: `mpl.${node.cid}.visible`, value: true },
    ]
  }
}