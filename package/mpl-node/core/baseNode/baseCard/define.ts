import type { ComponentBaseExport, Node, NodePos } from '@mpl/typings'

export interface BaseCardProp {
  layout: 'layout1' | 'layout2' // 排版类型
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 6,
      h: 12,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: 'wh',
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

export interface BaseCard extends Node {
  card: BaseCardProp
}

export function newBaseCardNode(cid: string): BaseCard {
  return {
    mpl_group: '容器类',
    mpl_title: '卡片',
    mpl_zh: '卡片',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    cid,
    visible: true,
    tag: 'mpl-card',
    childIds: [],
    classList: [],
    userClassName: [],
    style: '',
    events: [],
    card: {
      layout: 'layout1',
    },
    pos: pos(),
  }
}

function getTemplateCode(node: BaseCard): string {
  console.log(node)
  return `
		<!-- 基础输入框 template 节点源码 -->
		<mpl-button />
	`
}

// 获取输入框组件的全部变量
function getNodeVar(node: BaseCard): string {
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

export const baseCardNode: ComponentBaseExport = {
  tag: 'mpl-card',
  comp: newBaseCardNode,
  pos: pos(),
  events: [],
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar
}
