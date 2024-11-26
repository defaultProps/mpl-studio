import type {
  ComponentBaseExport,
  EventNode,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
  ServiceBindNode,
} from '@mpl/typings'

const radioEvents: EventNode[] = [
  { name: 'change', desc: '选择其他选项时', code: '', type: 'flow' },
]

export function getDefaultRadioOptions() {
  return [
    { label: '北京', value: 'beiJin' },
    { label: '上海', value: 'shangHai' },
    { label: '广州', value: 'guangZhou' },
  ]
}

export interface RadioBoxNode {
  model: string
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
  placeholder: string
  service: ServiceBindNode & { labelKey: string, valueKey: string, disabledKey: 'disabled' }
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

export interface RadioBoxFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  radio: RadioBoxNode
  pos: { pc: NodePos, mobile: NodePos }
}

export function newRadioNode(cid: string): RadioBoxFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '单选选择',
    mpl_zh: '单选选择',
    mpl_ce: 'c',
    mpl_version: '1.0.0',

    cid,
    tag: 'mpl-radio',
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
      text: '单选选择',
      pos: 'r',
      icon: '',
      iconTheme: '',
      iconText: '',
    },
    size: 'small',
    radio: {
      model: '',
      size: 'sm',
      pos: 'l',
      required: false,
      placeholder: '请选择',
      service: {
        mode: 'static',
        labelKey: 'label',
        valueKey: 'value',
        disabledKey: 'disabled',
        staticData: getDefaultRadioOptions(),
        defaultValue: '',
      },
    },
  }
}

function getTemplateCode(node: RadioBoxFormProp): string {
  console.error(node)
  return ``
}

function getNodeVar(node: RadioBoxFormProp): string {
  console.error(node)
  return ``
}

export const radioNode: ComponentBaseExport = {
  tag: 'mpl-radio',
  comp: newRadioNode,
  pos: pos(),
  events: radioEvents,
  getContextmenu: (node: RadioBoxNode) => {
    console.log(node) // eslint-disable-line no-console
    return []
  },
  getTemplateCode,
  getNodeVar
}
