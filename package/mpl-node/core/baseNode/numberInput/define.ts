import type {
  ComponentBaseExport,
  LimitInputProp,
  FormItemSize,
  SLOT_NODE,
  FormLabelProp,
  Node,
  NodePos,
  FormItemRule
} from '@mpl/typings'

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
  prop: string
  limit: LimitInputProp[]
  modelType: 'custom' | 'default' // 绑定值类型。自定义或默认值。默认值为手动输入值, 自定义为通过前端API获取
}

export interface NumberInputFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  input: NumberInputProp
  slotNodes: SLOT_NODE[]
  note: {
    open: boolean
    tip: string
    text: string
  }
  rule: FormItemRule
}

export function newNumberInputNode(cid: string): NumberInputFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '数字输入框',
    mpl_zh: '数字输入框',
    mpl_version: '1.0.0',
    field: '',
    mpl_ce: 'c',

    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-number-input',
    size: 'small',
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',

    rule: {
      type: 'system',
      code: '',
      option: [
        {
          type: 'required',
          message: '请输入',
          trigger: ['change']
        }
      ]
    },
    note: {
      open: false,
      tip: '',
      text: ''
    },

    label: {
      show: true,
      width: 120,
      text: '数字输入标题',
      pos: 'r',

      icon: 'icon-info2',
      iconTheme: '#e6a23c',
      iconText: '基础信息'
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
      prop: 'num',
      limit: [],
      modelType: 'default'
    },
    events: [],
    variables: [],
    defaultEvents: [
      {
        name: `mpl_number_input_${cid}`,
        desc: '输入时',
        code: `
          mpl_number_input_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-input'
      },
      {
        name: `mpl_number_focus_${cid}`,
        desc: '聚焦时',
        code: `
          mpl_number_focus_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-input'
      },
      {
        name: `mpl_number_blur_${cid}`,
        desc: '失焦时',
        code: `
          mpl_number_blur_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-input'
      },
      {
        name: `mpl_number_change_${cid}`,
        desc: '内容改变',
        code: `
          mpl_number_change_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-input'
      },
      {
        name: `mpl_number_clear_${cid}`,
        desc: '点击清空',
        code: `
          mpl_number_clear_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-input'
      },
    ],
    slotNodes: [],
    pos: pos()
  }
}

function getTemplateCode(node: NumberInputFormProp): string {
  console.error(node)
  return ``
}

export const numberInput: ComponentBaseExport = {
  tag: 'mpl-number-input',
  comp: newNumberInputNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: NumberInputFormProp) => {
    return []
  }
}
