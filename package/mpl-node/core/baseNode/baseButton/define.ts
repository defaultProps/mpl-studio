import type { BaseBtn, ComponentBaseExport, Node, NodePos } from '@mpl/typings'

export interface ButtonProp extends BaseBtn, Node { }

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 6,
      h: 4,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: 'h',
      mod: 'box',
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
  }
}

export function newBaseButtonNode(cid: string): ButtonProp {
  return {
    mpl_group: '基础控件',
    mpl_title: '按钮',
    mpl_zh: '按钮',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    cid,
    visible: true,

    tag: 'mpl-btn',
    childIds: [],
    title: '标题',
    icon: '',
    theme: 'primary',
    classList: [], // 首位是默认className, 补位是用户选择的className
    userClassName: [], // 用户输入的className, 动态变量配置。exp: { 'upload-btn': this.mpl.isUploadStatus }
    style: '',
    disabledName: '',
    clickName: '',
    className: '',
    visibleName: '',
    events: [],
    pos: pos(),
  }
}


function getTemplateCode(node: ButtonProp): string {
  console.log(node)
  return `
		<!-- 基础输入框 template 节点源码 -->
		<mpl-button />
	`
}

// 获取输入框组件的全部变量
function getNodeVar(node: ButtonProp): string {
  console.log(node)

  return `
    // 基础输入框组件变量
    const mplVar = {
      fb4rg5: {
        visible: true, // 显示控件
        label: {
          visible: true, // 显示标题
          vModel: '', // 标题值
          icon: {
            tooltip: "label tooltip"
          }
        }
      }
    }
  `
}

export const baseButton: ComponentBaseExport = {
  tag: 'mpl-btn',
  comp: newBaseButtonNode,
  pos: pos(),
  events: [
    { name: 'click', desc: '点击按钮', code: '', type: 'flow' },
    { name: 'dblclick', desc: '双击按钮', code: '', type: 'flow' },
  ],
  getContextmenu: (node: ButtonProp) => {
    console.log(node) // eslint-disable-line no-console
    return []
  },
  getTemplateCode,
  getNodeVar
}
