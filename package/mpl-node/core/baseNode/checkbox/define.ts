import {
  NodePos,
  BaseBtn,
  ServiceBindNode,
  FormLabelProp,
  FormItemSize,
  Node,
  ComponentBaseExport
} from '@mpl/typings'

export function getDefaultCheckboxOptions() {
  return [
    { label: '北京', value: '北京' },
    { label: '上海', value: '上海' },
    { label: '广州', value: '广州' },
    { label: '深圳', value: '深圳' },
  ]
}

export interface CheckboxNode {
  model: string[]
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  maxChecked: number | '' // 最大选中数量
  minChecked: number | '' // 最小选中数量. '' 不限制
  placeholder: string
  required: boolean
  readonly: boolean
  service: ServiceBindNode
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

export interface CheckboxFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  checkbox: CheckboxNode
  slotBtn: BaseBtn[]
  pos: { pc: NodePos, mobile: NodePos }
}

export function newCheckboxNode(cid: string): CheckboxFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '多选控件',
    mpl_zh: '多选控件',
    mpl_version: '1.0.0',
    mpl_ce: 'c',

    cid,
    tag: 'mpl-checkbox',
    visible: true,
    childIds: [],
    events: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '多选标题',
      pos: 'r',
      icon: '',
      iconTheme: '',
      iconText: '',
    },
    size: 'small',
    slotBtn: [],
    checkbox: {
      model: [],
      size: 'sm',
      pos: 'l',
      required: false,
      maxChecked: '',
      minChecked: '',
      placeholder: '请选择',
      readonly: false,
      service: {
        defaultValue: '',
        labelKey: 'label',
        valueKey: 'label',
        mode: 'static',
        staticData: getDefaultCheckboxOptions(),
      },
    },
  }
}


function getTemplateCode(node: CheckboxFormProp): string {
  console.error(node)
  return ``
}

function getNodeVar(node: CheckboxFormProp): string {
  console.error(node)
  return ``
}

export const checkbox: ComponentBaseExport = {
  tag: 'mpl-checkbox',
  comp: newCheckboxNode,
  pos: pos(),
  events: [],
  getContextmenu: (node: CheckboxNode) => {
    console.log(node)
    return []
  },
  getTemplateCode,
  getNodeVar
}
