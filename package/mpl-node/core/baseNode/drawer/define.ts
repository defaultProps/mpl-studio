import { NodePos, Node, ComponentBaseExport, BaseBtn, ContextMenuNode } from '@mpl/typings'
import { newCid } from '@mpl/libs'

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 700,
      h: 0,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: 'h',
      mod: 'drawer'
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

// 内部间距
export const drawerPaddingOptions = [
  { label: 0, value: 0 },
  { label: 5, value: 5 },
  { label: 10, value: 10 }
]

export interface DrawerProp extends Node {
  model: string
  pos: { pc: NodePos; mobile: NodePos }
  width: string // 任意宽度类型值 '700px' | '60%' | '50vw' | 'calc(100vw - 100px)'
  header: {
    visible: boolean
    showClose: boolean
    title: string
    icon: string
    iconColor: string
    iconInfo: string
    btnGroup: BaseBtn[]
    btnPos: 'left' | 'right' // 按钮位置。默认靠右。childIds位置始终靠最右边
    mpl_children: string[] // 顶部插入其他控件 => 搜索、下拉、级联等
  }
  body: {
    padding: 0 | 10 | 20
  }
  footer: {
    visible: boolean
    btnGroup: BaseBtn[] // 默认靠右
    mpl_children: string[] // 底部插入其他控件 => 控件限制大量条件。 默认靠左
  }
}

export function newDrawerNode(cid: string): DrawerProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '抽屉',
    mpl_zh: '抽屉',
    mpl_version: '1.0.0',
    field: '',
    mpl_ce: 'c',
    cid,
    tag: 'mpl-drawer',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [
      {
        name: `mpl_drawer_open_${cid}`,
        desc: '抽屉打开时',
        code: `
          mpl_drawer_open_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-drawer'
      },
      {
        name: `mpl_drawer_opened_${cid}`,
        desc: '抽屉打开完成时',
        code: `
          mpl_drawer_opened_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-drawer'
      },
      {
        name: `mpl_drawer_close_${cid}`,
        desc: '抽屉关闭时',
        code: `
          mpl_drawer_close_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-drawer'
      },
      {
        name: `mpl_drawer_closed_${cid}`,
        desc: '抽屉关闭完成时',
        code: `
          mpl_drawer_closed_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-drawer'
      },
    ],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',
    width: '700px',
    visible: '1',
    visibleType: 'default',
    model: `visible_dialog_${cid}`,
    header: {
      visible: true,
      showClose: true,
      title: '抽屉标题',
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
          type: '',
          visibleName: '',
          cid: newCid('drawerBtn')
        },
        {
          title: '标题',
          icon: '',
          disabledName: '',
          clickName: '',
          className: '',
          theme: '',
          type: '',
          visibleName: '',
          cid: newCid('drawerBtn')
        }
      ],
      btnPos: 'left',
      mpl_children: []
    },
    body: {
      padding: 10
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
          type: '',
          visibleName: '',
          cid: newCid('drawerBtn')
        },
        {
          title: '确认',
          icon: '',
          disabledName: '',
          clickName: '',
          className: '',
          theme: '',
          type: '',
          visibleName: '',
          cid: newCid('drawerBtn')
        }
      ],
      mpl_children: []
    }
  }
}

function getTemplateCode(node: DrawerProp): string {
  console.error(node)
  return ``
}

export const drawer: ComponentBaseExport = {
  tag: 'mpl-drawer',
  comp: newDrawerNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: DrawerProp) => {
    return []
  }
}
