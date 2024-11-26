import type { ComponentBaseExport, Node, NodePos } from "@mpl/typings";

export interface Paragraph extends Node {
  label: string
  model: string
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 6,
      h: 4,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: "w",
      mod: "formItem",
    },
    mobile: {
      w: 24,
      h: '76px',
      minH: 8,
      maxH: 20,
      minW: 24,
      type: "h",
      mod: "formItem",
    }
  }
}

export function newParagraph(cid: string): Paragraph {
  return {
    mpl_group: '容器控件',
    mpl_title: '基础容器',
    mpl_version: '1.0.0',
    cid,
    visible: true,
    tag: 'mpl-paragraph',
    mpl_zh: '基础容器',
    mpl_ce: 'c',

    childIds: [],
    classList: ['flex-left'],
    userClassName: [],
    style: '',
    events: [],
    pos: pos(),
    label: '文本段落',
    model: '描述信息'
  }
}

function getTemplateCode(node: Paragraph): string {
  console.error(node)
  return ``
}

function getNodeVar(node: Paragraph): string {
  console.error(node)
  return ``
}

export const paragraph: ComponentBaseExport = {
  tag: 'mpl-paragraph',
  comp: newParagraph,
  pos: pos(),
  events: [],
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar
}
