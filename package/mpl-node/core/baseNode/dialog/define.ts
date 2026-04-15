import { NodePos, Node, ComponentBaseExport, BaseBtn, LEN_UNIT_TYPE } from '@mpl/typings'
import { newCid } from '@mpl/libs'

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: 'px',
      hType: 'px',
      w: 1000,
      h: 700,
      minH: '',
      maxH: '',
      minW: '',
      type: 'wh',
      mod: 'dialog'
    },
    mobile: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 8,
      minH: 8,
      maxH: 20,
      minW: 24,
      type: 'h',
      mod: 'formItem'
    }
  }
}

// 弹窗内部间距
export const dialogPaddingOptions = [
  { label: 0, value: 0 },
  { label: 10, value: 10 },
  { label: 20, value: 20 }
]

export interface DialogProp extends Node {
  model: string
  width: number // [1000 => 1000px]  [6 => 60%]
  widthType: LEN_UNIT_TYPE
  header: {
    visible: boolean
    showClose: boolean
    title: string
    icon: string
    iconColor: string
    iconInfo: string
    btnGroup: BaseBtn[]
    btnPos: 'left' | 'right' // 按钮位置。默认靠右。childIds位置始终靠最右边
    mpl_children: Node[] // 顶部插入其他控件 => 搜索、下拉、级联等
  }
  body: {
    padding: 0 | 10 | 20
    height: string
  }
  footer: {
    visible: boolean
    btnGroup: BaseBtn[] // 默认靠右
    mpl_children: Node[] // 底部插入其他控件 => 控件限制大量条件。 默认靠左
  }
  pos: { pc: NodePos; mobile: NodePos }
}

export function newDialogNode(cid: string): DialogProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '弹窗',
    mpl_zh: '弹窗',
    mpl_version: '1.0.0',
    field: '',
    mpl_ce: 'c',
    visible: '1',
    visibleType: 'default',
    cid,
    tag: 'mpl-dialog',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [
      {
        name: `mpl_dialog_open_${cid}`,
        desc: '弹窗打开时',
        code: `
          mpl_dialog_open_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-dialog'
      },
      {
        name: `mpl_dialog_opened_${cid}`,
        desc: '弹窗打开完成时',
        code: `
          mpl_dialog_opened_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-dialog'
      },
      {
        name: `mpl_dialog_close_${cid}`,
        desc: '弹窗关闭时',
        code: `
          mpl_dialog_close_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-dialog'
      },
      {
        name: `mpl_dialog_closed_${cid}`,
        desc: '弹窗关闭完成时',
        code: `
          mpl_dialog_closed_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-dialog'
      }
    ],
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
          theme: 'primary',
          visibleName: '',
          cid: newCid('dialogBtn'),
          type: 'c'
        }
      ],
      mpl_children: []
    }
  }
}

function getTemplateCode(node: DialogProp): string {
  console.error(node)
  return ``
}

export const dialog: ComponentBaseExport = {
  tag: 'mpl-dialog',
  comp: newDialogNode,
  pos: pos(),
  getTemplateCode,
  getBaseVar: (cid: string) => {
    return `
      ${cid}: { 
        vModel: ''
      }
    `
  },
  getNodeVar: (node: DialogProp) => {
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
