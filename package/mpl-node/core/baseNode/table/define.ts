import type {
  ComponentBaseExport,
  Node,
  NodePos,
  BaseBtn
} from "@mpl/typings";
import { newCid } from "@mpl/const";

export type TableSize = 'small' | 'medium' | 'large'

// 表格顶部辅助按钮
export interface TableColumn {
  type: Array<'text' | 'button' | 'link' | 'timePicker'> // 表格列单元格类型。存在编辑、展示、禁用显示隐藏等状态
  label: string // 标题
  icon: string //标题图标
  iconColor: string // 图标信息
  iconInfo: string // 鼠标移入到图标上展示的信息
  iconPos: 'left' | 'right'
  customStrEvt: string // 自定义代码 tableColumnLabelStr(scope.row, scope.$index, scope, tableData)
  labelPos: 'left' | 'right' | 'center' // 标题对齐
  align: 'left' | 'right' | 'center' // 文本内容对齐
  filter: {
    visible: boolean // 开启过滤
    type: 'select' | 'input' | 'radio' | string
    customStr: string // 自定义开启过滤类型 => [钉钉在线excel编辑类型]
  }
  fixed: 'left' | 'right' | 'none' // 列固定位置
  width: 'auto' | number // 列宽
  showTip: boolean // 显示超出省略号
  minWidth: 'auto' | number // 最小列宽
  classNameEvt: string
}

export interface TableOperationButtonProp {
  cid: string
  ui: ''
  classNameEvt: string // 样式自定义节点 tableCid_operation_btn_cid(scope.row, scope.$index, scope)
  title: {
    value: string // 按钮标题
    syncValueEvt: string // 动态按钮标题
  },
  visibleEvt: string // 是否显示隐藏事件
  clickEvt: string // 点击事件
}

// 表格列设计规则
export interface BaseTableProp extends Node {
  size: TableSize,
  height: string // 高度
  maxHeight: string // 最大高度
  border: boolean // 表格边框UI
  stripe: boolean // 斑马纹UI
  typeSelection: boolean // 多选列
  tableIndex: { // 索引列
    visible: boolean
    fixed: 'left' | 'right' | 'none'
    valueType: '1' | '2' // 1 不跟随表格分页, 2 跟随
  }
  loading: boolean // 加载动画效果
  loadingMeta: {
    text: string // 加载动画效果
    customStr: 'ui-1' | 'ui-2' | 'ui-3' | string // 自定义加载动画效果
  }

  columns: TableColumn[] // 表格列配置
  headerBtnGroup: BaseBtn[] // 顶部插槽按钮组
  auxiliaryColumn: boolean // 辅助操作表格列 - 显示隐藏、排序等。向外抛出操作后的回调函数
  operationButGroupColumn: { // 操作按钮组列设置
    visible: boolean
    max: number // 最大显示按钮数量
    width: string // 列宽度
    minWidth: string // 列最小宽度
    label: string // 列名称
    fixed: 'left' | 'right' | 'none' // 是否固定列位置
    buttonList: TableOperationButtonProp[]
  }
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 24,
      h: 48,
      minH: 20,
      maxH: 0,
      minW: 12,
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

export function newBaseTableNode(cid: string): BaseTableProp {
  return {
    mpl_group: '表格控件',
    mpl_title: '基础表格',
    mpl_zh: '基础表格',
    visible: true,
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    cid,
    tag: 'mpl-base-table',
    size: 'small',
    height: '',
    maxHeight: '',
    border: true,
    stripe: true,
    typeSelection: false,
    tableIndex: {
      visible: false,
      fixed: 'none',
      valueType: '1'
    },
    loading: false,
    loadingMeta: {
      text: '正在加载中...',
      customStr: 'ui-1'
    },
    columns: [],
    headerBtnGroup: [],
    auxiliaryColumn: false,
    operationButGroupColumn: {
      visible: true,
      max: 3,
      width: '200',
      minWidth: '',
      fixed: 'right',
      label: '操作',
      buttonList: [
        {
          cid: newCid(),
          ui: '',
          classNameEvt: '',
          title: {
            value: '编辑',
            syncValueEvt: ''
          },
          visibleEvt: '',
          clickEvt: ''
        },
        {
          cid: newCid(),
          ui: '',
          classNameEvt: '',
          title: {
            value: '删除',
            syncValueEvt: ''
          },
          visibleEvt: '',
          clickEvt: ''
        },
        {
          cid: newCid(),
          ui: '',
          classNameEvt: '',
          title: {
            value: '详情',
            syncValueEvt: ''
          },
          visibleEvt: '',
          clickEvt: ''
        },
        {
          cid: newCid(),
          ui: '',
          classNameEvt: '',
          title: {
            value: '导入',
            syncValueEvt: ''
          },
          visibleEvt: '',
          clickEvt: ''
        },
        {
          cid: newCid(),
          ui: '',
          classNameEvt: '',
          title: {
            value: '导出',
            syncValueEvt: ''
          },
          visibleEvt: '',
          clickEvt: ''
        },
      ]
    },
    childIds: [],
    classList: [],
    userClassName: [],
    style: '',
    events: [],
    pos: pos(),
  }
}

function getTemplateCode(node: BaseTableProp): string {
  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

function getNodeVar(node: BaseTableProp): string {
  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const baseTable: ComponentBaseExport = {
  tag: 'mpl-base-table',
  comp: newBaseTableNode,
  pos: pos(),
  events: [],
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar,
}
