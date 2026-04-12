import type { ComponentBaseExport, Node, NodePos } from '@mpl/typings'

export interface Pagination extends Node {
  total: number
  current: number
  pageSizes: number[]
  pageSize: number
  model: number // 当前页
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
      type: 'w',
      mod: 'formItem'
    },
    mobile: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 76,
      minH: 8,
      maxH: 20,
      minW: 24,
      type: 'h',
      mod: 'formItem'
    }
  }
}

export function newPaginationNode(cid: string): Pagination {
  return {
    mpl_group: '表单控件',
    mpl_title: '分页控件',
    mpl_zh: '分页控件',
    mpl_version: '1.0.0',
    field: '',
    mpl_ce: 'c',
    cid,
    tag: 'mpl-pagination',
    visible: '1',
    visibleType: 'default',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    total: 100,
    current: 1,
    model: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40]
  }
}

function getTemplateCode(node: Pagination): string {


  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const paginationNode: ComponentBaseExport = {
  tag: 'mpl-pagination',
  comp: newPaginationNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: Pagination) => {
    return []
  }
}
