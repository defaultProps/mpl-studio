import type { ComponentBaseExport, FormLabelProp, Node, NodePos } from '@mpl/typings'

export type LinkTheme = 'primary' | 'second' | 'third' | 'four' | 'five' | 'success'

export interface Link {
  text: string
  url: string
}

export interface LinkNodeProp extends Node {
  label: FormLabelProp
  link: Link
  pos: { pc: NodePos; mobile: NodePos }
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 40,
      minH: 2,
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

export function newLink(cid: string): LinkNodeProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '基础容器',
    mpl_version: '1.0.0',
    field: '',
    mpl_zh: '基础容器',
    mpl_ce: 'c',
    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-link',
    mpl_children: [],
    classList: ['flex-left'],
    userClassName: [],
    style: '',
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
    label: {
      show: true,
      width: 120,
      text: '链接标题',
      pos: 'r',
      icon: '',

      iconTheme: '#1E1E1E',
      iconText: ''
    },
    link: {
      text: '点击链接',
      url: 'https://cn.bing.com'
    }
  }
}

function getTemplateCode(node: LinkNodeProp): string {
  console.error(node)
  return ``
}

export const link: ComponentBaseExport = {
  tag: 'mpl-link',
  comp: newLink,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: LinkNodeProp) => {
    return []
  }
}
