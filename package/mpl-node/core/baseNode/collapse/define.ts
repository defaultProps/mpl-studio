import type { ComponentBaseExport, Node, NodePos } from '@mpl/typings'
import { visibleContextmenu } from '../../../libs'
import { newCid } from "@mpl/const";

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 24,
      h: 25,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: 'wh',
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

export interface CollapseProp extends Node {
  model: string
  accordion: boolean // 单面板打开
  collapseHeaderSlot:
  | 'default'
  | 'mplCollapse1'
  | 'mplCollapse2'
  | 'mplCollapse3' // 顶部插槽类型，仅仅涉及到UI排版
  options: {
    title: string
    value: string
    disabled: boolean
    visible: boolean
  }[]
  pos: { pc: NodePos, mobile: NodePos }
}

export function newCollapseNode(cid: string): CollapseProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '折叠面板',
    mpl_zh: '折叠面板',
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    visible: true,

    cid,
    tag: 'mpl-collapse',
    childIds: [],
    events: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    collapseHeaderSlot: 'default',
    model: `activeCollapse_${cid}`,
    accordion: true,
    options: [
      { title: '面板标题1', value: newCid(), disabled: false, visible: true },
      { title: '面板标题2', value: newCid(), disabled: false, visible: true },
    ],
  }
}

function getTemplateCode(node: CollapseProp): string {
  console.error(node)
  return ``
}

function getNodeVar(node: CollapseProp): string {
  console.error(node)
  return ``
}

export const collapse: ComponentBaseExport = {
  tag: 'mpl-collapse',
  comp: newCollapseNode,
  pos: pos(),
  events: [],
  getContextmenu: () => [
    {
      label: '复制',
      icon: '',
      divider: false,
      disabled: false,
      value: 'copy',
      onClick: () => { },
    },
    {
      label: '剪切',
      icon: '',
      divider: false,
      disabled: false,
      value: 'shear',
      onClick: () => { },
    },
    {
      label: '删除',
      icon: '',
      divider: false,
      disabled: false,
      value: 'delete',
      onClick: () => { },
    },
    {
      label: '事件列表',
      icon: '',
      divider: false,
      disabled: false,
      value: 'evtList',
      onClick: () => {
        visibleContextmenu(true)
      },
      children: [
        {
          label: '选中/取消选中-change',
          disabled: false,
          icon: '',
          divider: false,
          value: 'checkboxChange',
          onClick: () => { },
        },
      ],
    },
    {
      label: '变量列表',
      icon: '',
      divider: true,
      value: 'varList',
      disabled: false,
      children: [
        {
          label: '选中的项列',
          icon: '',
          disabled: false,
          divider: false,
          value: 'checkboxVModel',
          onClick: () => { },
        },
      ],
    },
    {
      label: '注解',
      icon: 'el-icon-info',
      disabled: false,
      divider: true,
      value: 'note',
      children: [
        {
          label: '跳转注解',
          icon: '',
          divider: false,
          disabled: false,
          value: 'linkNote',
          onClick: () => { },
        },
        {
          label: '删除注解',
          icon: '',
          divider: false,
          disabled: false,
          value: 'deleteNote',
          onClick: () => { },
        },
      ],
    },
    {
      label: '转到文档',
      icon: '',
      divider: false,
      disabled: false,
      value: 'doc',
      onClick: () => { },
    },
    {
      label: '转到注解',
      icon: '',
      divider: false,
      disabled: false,
      value: 'note',
      onClick: () => { },
    },
    {
      label: '节点源码',
      icon: '',
      divider: false,
      disabled: false,
      value: 'nodeCode',
      onClick: () => { },
    },
    {
      label: 'Schema数据',
      icon: '',
      divider: true,
      disabled: false,
      value: 'nodeSchema',
      onClick: () => { },
    },
    {
      label: '重置状态',
      icon: '',
      divider: false,
      disabled: false,
      value: 'resetStatus',
      onClick: () => { },
    },
    {
      label: '历史记录',
      icon: '',
      divider: false,
      disabled: false,
      value: 'history',
      onClick: () => { },
    },
  ],
  getTemplateCode,
  getNodeVar
}
