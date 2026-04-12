import type {
  ComponentBaseExport,
  SLOT_NODE,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
  ServiceFormBindNode
} from '@mpl/typings'

import { SERVICE_MODE } from '@mpl/const'

export function getDefaultRadioOptions() {
  return [
    { label: '北京', value: 'beiJin' },
    { label: '上海', value: 'shangHai' },
    { label: '广州', value: 'guangZhou' }
  ]
}

export interface RadioBoxNode {
  model: string
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
  placeholder: string
  slotNodes: SLOT_NODE[]
  service: ServiceFormBindNode & { labelKey: string; valueKey: string; disabledKey: 'disabled' }
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

export interface RadioBoxFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  radio: RadioBoxNode
  note: {
    open: boolean
    tip: string
    text: string
  }
  slotNodes: SLOT_NODE[]
  pos: { pc: NodePos; mobile: NodePos }
}

export function newRadioNode(cid: string): RadioBoxFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '单选选择',
    mpl_zh: '单选选择',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    field: '',
    cid,
    tag: 'mpl-radio',
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
    label: {
      show: true,
      width: 120,
      text: '单选选择标题',
      pos: 'r',
      icon: '',
      iconTheme: '#1E1E1E',
      iconText: ''
    },
    note: {
      open: false,
      tip: '',
      text: ''
    },
    slotNodes: [],
    size: 'small',
    radio: {
      slotNodes: [],
      model: '',
      size: 'sm',
      pos: 'l',
      required: false,
      placeholder: '请选择',
      service: {
        mode: SERVICE_MODE.STATIC,
        methodName: '',
        methodCode: '',
        labelKey: 'label',
        valueKey: 'value',
        disabledKey: 'disabled',
        staticData: JSON.stringify(getDefaultRadioOptions()),
        postman: {
          url: '',
          methods: 'get',
          params: []
        }
      }
    }
  }
}

function getTemplateCode(node: RadioBoxFormProp): string {
  console.error(node)
  return ``
}

export const radioNode: ComponentBaseExport = {
  tag: 'mpl-radio',
  comp: newRadioNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: RadioBoxFormProp) => {
    return []
  }
}
