import type { ComponentBaseExport, Node, NodePos, BaseBtn, ServiceTableBindNode } from '@mpl/typings'
import { SERVICE_MODE } from '@mpl/const'
import { newCid } from '@mpl/libs'
import { initTableColumn, initTableData } from './constant'

import type { Pagination } from '../pagination'

export type TableSize = 'small' | 'medium' | 'large'

// 表格列UI展示组件类型
export type ColumnUIType =
  | 'button'
  | 'link'
  | 'textarea'
  | 'progress'
  | 'tabs'
  | 'password'
  | 'img'
  | 'imgList'
  | 'uploadList'
  | 'text'
  | 'textarea'
  | 'tabs'
  | 'progress'
  | 'money'
  | 'address'
  | 'email'
  | 'telephone'
  | 'html'
  | 'c'
  | 'select'
  | 'yyyy'
  | 'yyyy-MM'
  | 'yyyy-MM-dd'
  | 'yyyy-MM-dd hh:mm'
  | 'yyyy-MM-dd hh:mm:ss'
  | 'yyyy ~ yyyy'
  | 'yyyy-MM ~ yyyy-MM'
  | 'yyyy-MM-dd ~ yyyy-MM-dd'
  | 'yyyy-MM-dd hh:mm ~ yyyy-MM-dd hh:mm'
  | 'yyyy-MM-dd hh:mm:ss ~ yyyy-MM-dd hh:mm:ss'
  | 'datePickerRange'
  | 'upload'
  | 'cascader'
  | 'selectDialog'
  | 'number'
  | ''
  | 'html'
  | 'baseInput'
  | 'mentionInput'
  | 'textarea'
  | 'passwordInput'
  | 'numberInput'
  | 'numberRange'
  | 'tagInput'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'timeSelect'
  | 'virtualSelect'
  | 'treeSelect'
  | 'colorPicker'
  | 'datePicker'
  | 'dateRangePicker'
  | 'imageUpload'
  | 'customSingleNode'
  | 'customLoopNode'

// 表格列数据格式化类型
export type ColumnFormatType =
  | '' // 默认不格式化、文本展示
  | 'money-USD'
  | 'money-CNY'
  | 'date-yyyy'
  | 'date-yyyy-MM'
  | 'date-yyyy-MM-dd'
  | 'date-yyyy-MM-dd hh:mm'
  | 'date-yyyy-MM-dd hh:mm:ss'
  | 'dateRange-yyyy'
  | 'dateRange-yyyy-MM'
  | 'dateRange-yyyy-MM-dd'
  | 'dateRange-yyyy-MM-dd hh:mm'
  | 'dateRange-yyyy-MM-dd hh:mm:ss'
  | 'mapSelect' // label value映射格式
  | 'img'
  | 'imgList'
  | 'c'

// 表格顶部辅助按钮
export interface TableColumn {
  // 社区版仅支持固定组件类型。高级类型/自定义类型需要企业版
  renderNode: ColumnUIType // 表格列单元格类型。存在编辑、展示、禁用显示隐藏等状态
  // 表头设置
  label: {
    text: string // 标题
    icon: string //标题图标
    iconTheme: string // 图标信息
    iconText: string // 鼠标移入到图标上展示的信息
    iconPos: 'l' | 'r'
    customStrEvt: string // 自定义代码 tableColumnLabelStr(scope.row, scope.$index, scope, defaultValue)
    pos: 'l' | 'r' | 'c' // 标题对齐
    align: 'l' | 'r' | 'c' // 文本内容对齐
    sort: {
      visible: boolean,
      type: 'single' | 'multi' // 单排序, 多排序
    },
    // 表头内置过滤功能
    filter: {
      visible: boolean // 开启过滤
      cid: string // 过滤绑定组件id // cid和customStr互斥
      customStr: string // 参考excel过两次
    }
    width: number | ''
  }
  cid: string // 唯一标识
  prop: string // 字段名[可能为空]
  // 密码类型规则，仅仅UI是密码类型
  formatterType: ColumnFormatType // 支持自动过滤API. 内置MPL常用过滤类型 默认不格式化
  fixed: 'l' | 'r' | '' // 列固定位置
  width: 'auto' | number // 列宽
  showTip: boolean // 显示超出省略号 仅文本类型
  minWidth: 'auto' | number // 最小列宽
  classNameEvt: string
  children: TableColumn[]
}

export interface TableOperationButtonProp {
  cid: string
  renderNode: ''
  classNameEvt: string // 样式自定义节点 tableCid_operation_btn_cid(scope.row, scope.$index, scope)
  title: {
    value: string // 按钮标题
    syncValueEvt: string // 动态按钮标题
  }
  visibleEvt: string // 是否显示隐藏事件
  clickEvt: string // 点击事件
}

// 表格列设计规则
export interface BaseTableProp extends Node {
  size: TableSize
  height: string // 高度
  maxHeight: string // 最大高度
  border: boolean // 表格边框UI
  stripe: boolean // 斑马纹UI
  selectionMod: '' | 'radio' | 'checkbox' // 单选多选
  selectionModField: string // 单选多选时的禁用字段绑定
  label: {
    text: string // 标题
  }
  tableIndex: {
    // 索引列
    label: string
    visible: boolean
    fixed: 'l' | 'r' | ''
    valueType: '1' | '2' // 1 不跟随表格分页, 2 跟随
  }
  loading: boolean // 加载动画效果
  loadingMeta: {
    text: string // 加载动画效果
    customStr: 'ui-1' | 'ui-2' | 'ui-3' | string // 自定义加载动画效果
  }

  columns: TableColumn[] // 表格列配置
  headerBtnGroup: BaseBtn[] // 顶部插槽按钮组
  auxiliaryBtnGroup: {
    // 辅助功能展示
    visible: boolean // 显示辅助功能
    list: Array<{ visible: boolean, label: string, value: 'size' | 'full' | 'stripe' | 'setting' }>
  }
  auxiliaryColumn: boolean // 辅助操作表格列 - 显示隐藏、排序等。向外抛出操作后的回调函数
  operationButGroupColumn: {
    // 操作按钮组列设置
    visible: boolean
    max: number // 最大显示按钮数量
    width: string // 列宽度
    minWidth: string // 列最小宽度
    label: string // 列名称
    fixed: 'l' | 'r' | '' // 是否固定列位置
    buttonList: TableOperationButtonProp[]
  }
  service: ServiceTableBindNode
  pagination: Pagination
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

export function newBaseTableNode(cid: string): BaseTableProp {
  return {
    mpl_group: '表格控件',
    mpl_title: '基础表格',
    mpl_zh: '基础表格',

    mpl_version: '1.0.0',
    mpl_ce: 'c',
    field: '',

    label: {
      text: '基础表格',
    },
    visible: '1',
    visibleType: 'default',
    cid,
    tag: 'mpl-base-table',
    size: 'small',
    height: '',
    maxHeight: '',
    border: true,
    stripe: true,
    selectionMod: '',
    selectionModField: 'disabled',
    tableIndex: {
      label: '序号',
      visible: false,
      fixed: '',
      valueType: '1'
    },
    loading: false,
    loadingMeta: {
      text: '正在加载中...',
      customStr: 'ui-1'
    },
    columns: initTableColumn(),
    headerBtnGroup: [
      {
        title: '新增',
        icon: '',
        disabledName: '',
        clickName: '',
        type: 'tableRowAdd',
        theme: '',
        cid: `table_${cid}_row_add`,
        visibleName: '',
        className: ''
      },
      {
        title: '编辑',
        icon: '',
        disabledName: '',
        clickName: '',
        type: 'tableRowAdd',
        theme: '',
        cid: `table_${cid}_row_add`,
        visibleName: '',
        className: ''
      },
      {
        title: '删除',
        icon: '',
        disabledName: '',
        clickName: '',
        type: 'tableRowAdd',
        theme: '',
        cid: `table_${cid}_row_add`,
        visibleName: '',
        className: ''
      },
      {
        title: '导入',
        icon: '',
        disabledName: '',
        clickName: '',
        type: 'import',
        theme: '',
        cid: `table_${cid}_import_btn`,
        visibleName: '',
        className: ''
      },
      {
        title: '导出',
        icon: '',
        disabledName: '',
        clickName: '',
        type: 'export',
        theme: '',
        cid: `table_${cid}_export_btn`,
        visibleName: '',
        className: ''
      }
    ],
    auxiliaryBtnGroup: {
      visible: true,
      list: [
        { label: '尺寸配置', value: 'size', visible: true },
        { label: '全屏配置', value: 'full', visible: true },
        { label: '斑马纹配置', value: 'stripe', visible: true },
        { label: '自定义列配置', value: 'setting', visible: true }
      ]
    },
    auxiliaryColumn: false,
    operationButGroupColumn: {
      visible: true,
      max: 3,
      width: '200',
      minWidth: '',
      fixed: 'r',
      label: '操作',
      buttonList: [
        {
          cid: newCid('btn'),
          renderNode: '',
          classNameEvt: '',
          title: {
            value: '编辑',
            syncValueEvt: ''
          },
          visibleEvt: '',
          clickEvt: ''
        },
        {
          cid: newCid('btn'),
          renderNode: '',
          classNameEvt: '',
          title: {
            value: '删除',
            syncValueEvt: ''
          },
          visibleEvt: '',
          clickEvt: ''
        },
        {
          cid: newCid('btn'),
          renderNode: '',
          classNameEvt: '',
          title: {
            value: '详情',
            syncValueEvt: ''
          },
          visibleEvt: '',
          clickEvt: ''
        },
        {
          cid: newCid('btn'),
          renderNode: '',
          classNameEvt: '',
          title: {
            value: '导入',
            syncValueEvt: ''
          },
          visibleEvt: '',
          clickEvt: ''
        },
        {
          cid: newCid('btn'),
          renderNode: '',
          classNameEvt: '',
          title: {
            value: '导出',
            syncValueEvt: ''
          },
          visibleEvt: '',
          clickEvt: ''
        }
      ]
    },
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
    service: {
      mode: SERVICE_MODE.STATIC,
      methodName: '',
      methodCode: '',
      staticData: initTableData(),
      postman: {
        url: '',
        methods: 'get',
        params: []
      }
    },
    pagination: {
      total: 0,
      current: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
      model: 1,
      mpl_group: '表单控件',
      mpl_title: '分页控件',
      mpl_zh: '分页控件',
      mpl_version: '1.0.0',
      mpl_ce: 'c',
      field: '',
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
    }
  }
}

function getTemplateCode(node: BaseTableProp): string {


  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const baseTable: ComponentBaseExport = {
  tag: 'mpl-base-table',
  comp: newBaseTableNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: BaseTableProp) => {
    return []
  }
}
