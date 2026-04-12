import type { ComponentBaseExport, Node, NodePos } from '@mpl/typings'
import type { GridOptions } from 'ag-grid-community'

// 表格列设计规则
export interface ExcelTableProp extends Node {
  height: string // 高度
  license: string // 未输入时许可证来自于项目配置项
  gridOptions: GridOptions<any>
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 48,
      minH: 20,
      maxH: 0,
      minW: 12,
      type: 'wh',
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

export function newExcelTableNode(cid: string): ExcelTableProp {
  return {
    mpl_group: '表格控件',
    mpl_title: '基础表格',
    mpl_zh: '基础表格',

    mpl_version: '1.0.0',
    mpl_ce: 'c',
    field: '',
    visible: '1',
    visibleType: 'default',
    cid,
    tag: 'mpl-excel-table',
    height: '400px',
    pos: pos(),
    license: '',
    gridOptions: {
      columnDefs: [],
      rowData: [],
    },

    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    events: [],
    variables: [],
    defaultEvents: []
  }
}

function getTemplateCode(node: ExcelTableProp): string {
  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-excel-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const excelTable: ComponentBaseExport = {
  tag: 'mpl-excel-table',
  comp: newExcelTableNode,
  pos: pos(),

  getTemplateCode,
  getNodeVar: (node: ExcelTableProp) => {
    return []
  }
}
