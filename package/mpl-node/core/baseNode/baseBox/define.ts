import { NodePos, ComponentBaseExport, Node } from '@mpl/typings'

export interface BaseBoxProp extends Node {
  width: string
  height: number
  visible: boolean // 显示隐藏
  layout: string // 排版类型
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    
    pc: {
      w: 24,
      h: 12,
      minH: 2,
      maxH: 0,
      type: 'wh',
      minW: 1,
      mod: "formItem",
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

export function newBaseBox(cid: string): BaseBoxProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '基础容器',
    mpl_version: '1.0.0',
    cid,
    tag: 'mpl-base-box',
    mpl_zh: '基础容器',
    mpl_ce: 'c',

    childIds: [],
    classList: ['flex-left'],
    userClassName: [],
    style: '',
    events: [],
    pos: pos(),
    width: '24',
    height: 20,
    visible: true,
    layout: '1-1',
  }
}

function getTemplateCode(node: BaseBoxProp): string {
  // todo: 紧凑源码的生成，延后做
  // 思路：默认使用静态文本写入template. 当存在赋值操作时，即[watchEffect () => mpl.var.fb4rg5.label] // 源码存在时替换静态文本
  // 性能比较缓慢，每个组件仅部分使用其动态，大部分默认为静态

  console.log(node)

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

// 获取输入框组件的全部变量
function getNodeVar(node: BaseBoxProp): string {
  console.log(node)

  return `
    // 基础容器组件变量
    const mplVar = {
      fb4rg5: {
        visible: true, // 显示控件
      }
    }
  `
}

export const baseBox: ComponentBaseExport = {
  tag: 'mpl-base-box',
  comp: newBaseBox,
  pos: pos(),
  events: [],
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar
}
