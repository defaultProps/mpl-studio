import type {
  BaseBtn,
  ComponentBaseExport,
  EventNode,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
  FormItemRule
} from '@mpl/typings'

export const numberInputEvents: EventNode[] = [
  { name: 'input', desc: '输入内容时', code: '', type: 'flow' },
  { name: 'focus', desc: '获取焦点时', code: '', type: 'flow' },
  { name: 'blur', desc: '失去焦点时', code: '', type: 'flow' },
  { name: 'change', desc: '输入内容改变时', code: '', type: 'flow' },
  { name: 'clear', desc: '点击清空时', code: '', type: 'flow' },
]

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
  };
}

export interface NumberInputProp {
  model: string
  width: number | string // '' 代表全宽
  size: 'sm' | 'm' | 'l'
  maxlength: number | ''
  pos: 'l' | 'c' | 'r'
  required: boolean
  showLimit: boolean
  prefixIcon: string
  suffixIcon: string
  clearable: boolean
  readonly: boolean
  placeholder: string
  rules: FormItemRule[]
}

export interface NumberInputFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  input: NumberInputProp
  slotBtn: BaseBtn[]
}

export function newNumberInputNode(cid: string): NumberInputFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '数字输入框',
    mpl_zh: '数字输入框',
    mpl_version: '1.0.0',
    mpl_ce: 'c',

    cid,
    visible: true,
    tag: 'mpl-number-input',
    size: 'small',
    childIds: [],
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '数字输入',
      pos: 'r',
      icon: 'icon-info2',
      iconTheme: '#e6a23c',
      iconText: '基础信息',
    },
    input: {
      required: false,
      model: '',
      suffixIcon: '',
      prefixIcon: '',
      width: 0,
      size: 'sm',
      pos: 'l',
      maxlength: 10,
      showLimit: false,
      clearable: true,
      readonly: false,
      placeholder: '请输入',
      rules: [
        {
          mod: 'system',
          trigger: ['blur'],
          option: [
            { value: 'required', message: '请输入' }
          ],
          message: ''
        }
      ]
    },
    events: [],
    slotBtn: [],
    pos: pos(),
  }
}

function getTemplateCode(node: NumberInputFormProp): string {
  console.error(node)
  return ``
}

function getNodeVar(node: NumberInputFormProp): string {
  console.error(node)
  return ``
}

export const numberInput: ComponentBaseExport = {
  tag: 'mpl-number-input',
  comp: newNumberInputNode,
  pos: pos(),
  events: numberInputEvents,
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar
}
