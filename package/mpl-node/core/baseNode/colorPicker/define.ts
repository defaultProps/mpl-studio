import { NodePos, FormLabelProp, NODE_TAG, FormItemSize, Node, ComponentBaseExport, ContextMenuNode } from '@mpl/typings'

export interface ColorPickerNode {
  model: string
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
  placeholder: string
  disabled: boolean
  prop: string
  predefineColors: string[]
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

export interface ColorPickerFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  colorPicker: ColorPickerNode
  slotNodes: Array<{ tag: NODE_TAG, cid: string, pos: 'l' | 'r' }>
  pos: { pc: NodePos; mobile: NodePos }
}

export function newColorPickerNode(cid: string): ColorPickerFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '颜色控件',
    mpl_zh: '颜色控件',
    mpl_version: '1.0.0',
    field: '',
    mpl_ce: 'c',
    cid,
    tag: 'mpl-color-picker',
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
      text: '颜色标题',
      pos: 'r',
      icon: '',

      iconTheme: '#1E1E1E',
      iconText: ''
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
      predefineColors: [],
      prop: 'color'
    },
    slotNodes: []
  }
}

function getTemplateCode(node: ColorPickerNode): string {
  console.error(node)
  return ``
}

export const colorPicker: ComponentBaseExport = {
  tag: 'mpl-color-picker',
  comp: newColorPickerNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: ColorPickerFormProp) => {
    return []
  }
}
