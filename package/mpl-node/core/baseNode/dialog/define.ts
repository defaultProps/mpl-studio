import { NodePos, Node, ComponentBaseExport, BaseBtn } from '@mpl/typings'
import { newCid } from "@mpl/const";

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: '1000px',
      h: '700px',
      minH: '',
      maxH: '',
      minW: '',
      type: 'wh',
      mod: 'dialog',
    },
    mobile: {
      w: 24,
      h: 8,
      minH: 8,
      maxH: 20,
      minW: 24,
      type: "h",
      mod: "formItem",
    }
  };
}

// 弹窗内部间距
export const dialogPaddingOptions = [
  { label: 0, value: 0 },
  { label: 10, value: 10 },
  { label: 20, value: 20 },
]

export interface DialogProp extends Node {
  model: string
  width: string //  string: 固定宽度px
  header: {
    visible: boolean
    showClose: boolean
    title: string
    icon: string
    iconColor: string
    iconInfo: string
    btnGroup: BaseBtn[]
    btnPos: 'left' | 'right' // 按钮位置。默认靠右。childIds位置始终靠最右边
    childIds: string[] // 顶部插入其他控件 => 搜索、下拉、级联等
  }
  body: {
    padding: 0 | 10 | 20
    height: string
  }
  footer: {
    visible: boolean
    btnGroup: BaseBtn[] // 默认靠右
    childIds: string[] // 底部插入其他控件 => 控件限制大量条件。 默认靠左
  }
  pos: { pc: NodePos, mobile: NodePos }
}

export function newDialogNode(cid: string): DialogProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '弹窗',
    mpl_zh: '弹窗',
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    visible: true,

    cid,
    tag: 'mpl-dialog',
    childIds: [],
    events: [],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    model: `visible_dialog_${cid}`,
    width: '1000px',
    header: {
      visible: true,
      showClose: true,
      title: '标题',
      icon: '',
      iconColor: '',
      iconInfo: '',
      btnGroup: [
        {
          title: '标题',
          icon: '',
          disabledName: '',
          clickName: '',
          className: '',
          theme: '',
          visibleName: '',
          cid: newCid()
        }
      ],
      btnPos: 'left',
      childIds: [],
    },
    body: {
      padding: 10,
      height: '600',
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
          cid: newCid()
        },
        {
          title: '确认',
          icon: '',
          disabledName: '',
          clickName: '',
          className: '',
          theme: '',
          visibleName: '',
          cid: newCid()
        },
      ],
      childIds: [],
    },
  }
}

function getTemplateCode(node: DialogProp): string {
  console.error(node)
  return ``
}

function getNodeVar(node: DialogProp): string {
  console.error(node)
  return ``
}

export const dialog: ComponentBaseExport = {
  tag: 'mpl-dialog',
  comp: newDialogNode,
  pos: pos(),
  events: [],
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar
}
