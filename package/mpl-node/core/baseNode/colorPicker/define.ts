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
    defaultEvents: [
      {
        name: `mpl_colorPicker_change_${cid}`,
        desc: '颜色更改时',
        code: `
          mpl_colorPicker_change_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-color-picker'
      }
    ],
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
  getBaseVar: (cid: string) => {
    return `
      ${cid}: { 
        vModel: ''
      }
    `
  },
  getNodeVar: (node: ColorPickerFormProp) => {
    // 如果有子组件, 也根据该组件获取动态变量
    const prefix = `${node.mpl_title} / ${node.mpl_zh}`

    return [
      { desc: `${prefix} / 显示隐藏`, key: 'visible', value: true, fullPath: `${node.cid}.visible` },
      { desc: `${prefix} / 绑定值`, key: 'vModel', value: '', fullPath: `${node.cid}.vModel` },
      { desc: `${prefix} / 必填`, key: 'required', value: false, fullPath: `${node.cid}.required` },
      { desc: `${prefix} / 禁用`, key: 'disabled', value: false, fullPath: `${node.cid}.disabled` },
      { desc: `${prefix} / 只读`, key: 'readonly', value: false, fullPath: `${node.cid}.readonly` },
      { desc: prefix, key: 'cid', value: 'cid', fullPath: node.cid },
    ]
  }
}
