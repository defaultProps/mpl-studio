import {NodePos,Node } from '@mpl/typings'

export function newNode(): Node {
  return {
    mpl_group: '页面节点',
    mpl_title: 'Body',
    mpl_version: '1.0.0',
    cid: 'mpl-body-cid',
    tag: 'mpl-body',
    mpl_zh: '',
    mpl_ce: 'c',
    visible: true,

    childIds: [],
    events: [],
    classList: [],
    userClassName: [],
    style: '',
    pos: pos()
  }
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 1,
      h: 1,
      minH: 1,
      maxH: 11,
      minW: 1,
      type: 'wh',
      mod: 'box'
    },
    mobile: {
      w: 1,
      h: 1,
      minH: 1,
      maxH: 11,
      minW: 1,
      type: 'wh',
      mod: "box",
    }
  }
}

function getTemplateCode(node: Node): string {
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
function getNodeVar(node: Node): string {
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

export const bodyNode = {
  tag: 'mpl-body',
  comp: newNode,
  pos: pos(),
  events: [],
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar
}
