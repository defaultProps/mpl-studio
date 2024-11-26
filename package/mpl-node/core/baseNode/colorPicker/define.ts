import {
  NodePos,
  FormLabelProp,
  FormItemSize,
  Node,
  ComponentBaseExport
} from '@mpl/typings'

export interface ColorPickerNode {
  model: string
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
  placeholder: string
  disabled: boolean
  predefineColors: string[]
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

export interface ColorPickerFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  colorPicker: ColorPickerNode
  pos: { pc: NodePos, mobile: NodePos }
}

export function newColorPickerNode(cid: string): ColorPickerFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '颜色控件',
    mpl_zh: '颜色控件',
    mpl_version: '1.0.0',
    mpl_ce: 'c',

    cid,
    tag: 'mpl-color-picker',
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
      text: '颜色',
      pos: 'r',
      icon: '',
      iconTheme: '',
      iconText: '',
    },
    size: 'small',
    footerSlotSize: 'small',
    colorPicker: {
      model: '',
      size: 'sm',
      disabled: false,
      pos: 'l',
      required: false,
      placeholder: '请输入',
      predefineColors: []
    },
  }
}

function getTemplateCode(node: ColorPickerNode): string {
  console.error(node)
  return ``
}

function getNodeVar(node: ColorPickerNode): string {
  console.error(node)
  return ``
}

export const colorPicker: ComponentBaseExport = {
  tag: 'mpl-color-picker',
  comp: newColorPickerNode,
  pos: pos(),
  events: [],
  getContextmenu: (node: ColorPickerNode) => {
    console.info(node)
    return []
  },
  getTemplateCode,
  getNodeVar
}
