import {
  NodePos,
  BaseBtn,
  ServiceFormBindNode,
  SLOT_NODE,
  FormLabelProp,
  FormItemSize,
  Node,
  ComponentBaseExport
} from '@mpl/typings'

import { SERVICE_MODE } from '@mpl/const'

export function getDefaultCheckboxOptions() {
  return [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' }
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
  service: ServiceFormBindNode
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

export interface CheckboxFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  checkbox: CheckboxNode
  slotBtn: BaseBtn[]
  pos: { pc: NodePos; mobile: NodePos }
  slotNodes: SLOT_NODE[]
  note: {
    open: boolean
    tip: string
    text: string
  }
}

export function newCheckboxNode(cid: string): CheckboxFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '多选控件',
    mpl_zh: '多选控件',
    mpl_version: '1.0.0',
    field: '',
    mpl_ce: 'c',

    cid,
    tag: 'mpl-checkbox',
    visible: '1',
    visibleType: 'default',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [
        {
        name: `mpl_checkbox_change_${cid}`,
        desc: '选中项更改时',
        code: `
          mpl_checkbox_change_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-checkbox'
      }
    ],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',
    slotNodes: [],
    note: {
      open: false,
      tip: '',
      text: ''
    },

    label: {
      show: true,
      width: 120,
      text: '多选标题',
      pos: 'r',
      icon: '',

      iconTheme: '',
      iconText: ''
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
        mode: SERVICE_MODE.STATIC,
        methodName: '',
        methodCode: '',
        labelKey: 'label',
        valueKey: 'value',
        staticData: getDefaultCheckboxOptions(),
        postman: {
          url: '',
          methods: 'get',
          params: []
        }
      }
    }
  }
}

function getTemplateCode(node: CheckboxFormProp): string {
  console.error(node)
  return ``
}

export const checkbox: ComponentBaseExport = {
  tag: 'mpl-checkbox',
  comp: newCheckboxNode,
  pos: pos(),
  getTemplateCode,
  getBaseVar: (cid: string) => {
    return `
      ${cid}: { 
        vModel: ''
      }
    `
  },
  getNodeVar: (node: CheckboxFormProp) => {
    const prefix = `${node.mpl_title} / ${node.mpl_zh}`

    return [
      { desc: `${prefix} / 显示隐藏`, key: 'visible', value: true, fullPath: `${node.cid}.visible` },
      { desc: `${prefix} / 绑定值`, key: 'vModel', value: false, fullPath: `${node.cid}.vModel` },
      { desc: `${prefix} / 选项列表`, key: 'options', value: false, fullPath: `${node.cid}.options` },
      { desc: `${prefix} / 必填`, key: 'required', value: false, fullPath: `${node.cid}.required` },
      { desc: `${prefix} / 禁用`, key: 'disabled', value: false, fullPath: `${node.cid}.disabled` },
      { desc: `${prefix} / 只读`, key: 'readonly', value: false, fullPath: `${node.cid}.readonly` },
      { desc: prefix, key: 'cid', value: 'cid', fullPath: node.cid },
    ]
  }
}
