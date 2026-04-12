import type {
  ComponentBaseExport,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
  LimitInputProp,
  SLOT_NODE,
  FormItemRule
} from '@mpl/typings'
import { DialogProp } from '../dialog/define'
import { BaseTableProp } from '../table/define'

import { newCid } from '@mpl/libs'
import { SERVICE_MODE } from '@mpl/const'

export interface SelectDialogNodeProp {
  model: any // 服务绑定的接口选中值
  modelProp: {
    limit: number //当选择数据存在多选时的存储值
  }
  modelType: 'default' | 'custom'
  size: 'sm' | 'm' | 'l'
  width: number | '' // '' 代表默认值
  required: boolean
  pos: 'l' | 'c' | 'r'
  clearable: boolean // 可清空
  rules: FormItemRule[] // 校验规则列表
  readonly: boolean
  placeholder: string
  prefixIcon: string
  suffixIcon: string
  dialog: DialogProp
  searchTable: BaseTableProp
  prop: string
  limit: LimitInputProp[]
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

export function getSelectDefaultDialog(cid: string): DialogProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '弹窗',
    mpl_zh: '弹窗',
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    field: '',

    visible: '1',
    visibleType: 'default',

    cid,
    tag: 'mpl-dialog',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    model: `visible_dialog_${cid}`,
    width: 1000,
    widthType: 'px',
    header: {
      visible: true,
      showClose: true,
      title: '标题',
      icon: '',
      iconColor: '',
      iconInfo: '',
      btnGroup: [],
      btnPos: 'left',
      mpl_children: []
    },
    body: {
      padding: 10,
      height: '600'
    },
    footer: {
      visible: true,
      btnGroup: [
        {
          title: '取消',
          icon: '',
          disabledName: '',
          clickName: '',
          className: '',
          theme: '',
          visibleName: '',
          cid: newCid('dialogBtn'),
          type: 'c'
        },
        {
          title: '确认',
          icon: '',
          disabledName: '',
          clickName: '',
          className: '',
          theme: '',
          visibleName: '',
          cid: newCid('dialogBtn'),
          type: 'c'
        }
      ],
      mpl_children: []
    }
  }
}

export function newSearchTableNode(cid: string): BaseTableProp {
  return {
    mpl_group: '表格控件',
    mpl_title: '基础表格',
    mpl_zh: '基础表格',

    mpl_version: '1.0.0',
    mpl_ce: 'c',
    field: '',

    label: {
      text: '弹框选择',
    },
    visible: '1',
    visibleType: 'default',
    cid,
    tag: 'mpl-base-table',
    size: 'small',
    height: '',
    maxHeight: '',
    border: true,
    selectionModField: '',
    selectionMod: '',
    stripe: true,
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
    columns: [],
    service: {
      mode: SERVICE_MODE.STATIC,
      methodName: '',
      methodCode: '',
      staticData: [],
      postman: {
        url: '',
        methods: 'get',
        params: []
      }
    },
    headerBtnGroup: [],
    auxiliaryBtnGroup: {
      visible: true,
      list: []
    },
    auxiliaryColumn: false,
    operationButGroupColumn: {
      visible: false,
      max: 3,
      width: '200',
      minWidth: '',
      fixed: 'r',
      label: '操作',
      buttonList: []
    },
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
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

export interface SelectDialogFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  cid: string
  slotNodes: SLOT_NODE[]
  selectDialog: SelectDialogNodeProp
  pos: { pc: NodePos; mobile: NodePos }
  note: {
    open: boolean
    tip: string
    text: string
  }
}

export function newSelectDialogNode(cid: string): SelectDialogFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '弹窗选择',
    mpl_zh: '输入',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    field: '',
    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-select-dialog',
    size: 'small',
    mpl_children: [],
    note: {
      open: false,
      tip: '',
      text: ''
    },
    classList: [],
    userClassName: [],
    style: '',
    label: {
      show: true,
      width: 120,
      text: '弹窗选择',
      pos: 'r',
      icon: '',
      iconTheme: '#1E1E1E',
      iconText: ''
    },
    selectDialog: {
      modelType: 'default',
      limit: [],
      required: false,
      prefixIcon: '',
      suffixIcon: '',
      modelProp: {
        limit: 1
      },
      model: '',
      width: '',
      pos: 'l',
      size: 'sm',
      clearable: true,
      readonly: false,
      placeholder: '请选择',
      rules: [],
      dialog: getSelectDefaultDialog(cid),
      searchTable: newSearchTableNode(cid),
      prop: 'selectDialog'
    },
    slotNodes: [],
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos()
  }
}

function getTemplateCode(node: SelectDialogFormProp): string {
  return `
		<!-- 1、基础输入框 template 节点源码 -->
    <!-- 2、DOM只占一行，编辑template时，一次只能编辑一行。用户选择编辑的行【即DOM】，MPL展示该DOM的所有属性，用户选择属性或新增属性进行编辑更新。 -->
    <!-- 3、用户选择属性【属性需要根据MPL规则展示可编辑的范围，更换绑定、变量替换、禁止编辑、删除属性等】 -->
    <!-- 4、新增属性【查看是否存在冲突、key-value合法性】-->

		<mpl-select-dialog
      :placeholder="mpl.${node.cid}.placeholder"
      :clearable="mpl.${node.cid}.clearable"
    />
	`
}

export const selectDialogNode: ComponentBaseExport = {
  tag: 'mpl-select-dialog',
  comp: newSelectDialogNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: DialogProp) => {
    return [
      { desc: '显示隐藏', key: `mpl.${node.cid}.visible`, value: true }
    ]
  }
}
