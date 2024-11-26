import { NodePos, FormLabelProp, FormItemSize, Node, ComponentBaseExport } from '@mpl/typings'

export type LinkTheme =
  | 'primary'
  | 'second'
  | 'third'
  | 'four'
  | 'five'
  | 'success'

export interface LinkNodeProp extends Node {
  width: string
  height: number
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 24,
      h: 40,
      minH: 2,
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

export function newLink(cid: string): LinkNodeProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '基础容器',
    mpl_version: '1.0.0',
    cid,
    visible: true,
    tag: 'mpl-link',
    mpl_zh: '基础容器',
    mpl_ce: 'c',

    childIds: [],
    classList: ['flex-left'],
    userClassName: [],
    style: '',
    events: [],
    pos: pos(),
    width: '24',
    height: 20,
  }
}

function getTemplateCode(node: LinkNodeProp):string {
  console.error(node)
  return ``
}

function getNodeVar(node: LinkNodeProp):string {
  console.error(node)
  return ``
}

export const link: ComponentBaseExport = {
  tag: 'mpl-link',
  comp: newLink,
  pos: pos(),
  events: [],
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar
}
