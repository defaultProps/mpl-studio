import { NodePos, ComponentBaseExport, Node } from '@mpl/typings'

// 表单插槽容器、仅适用于特定表单组件 + 按钮等内置
// 场景：快捷容器排版、表单组件插槽排版、基础数据展示排版【展示/编辑切换】
// 采用 grid布局。空位不处理
export interface SlotBoxProp extends Node {
  width: string
  height: number
  bgColor: string
  layoutRow: number
  layoutCol: number
  selectNodePos: [number, number] | ''
  // k: 1-2 v: cid // 组件位置映射关系
  layoutMapNode: {
    [k: string]: string
  }
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 16,
      minH: 2,
      maxH: 0,
      type: 'wh',
      minW: 1,
      mod: 'formItem'
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

export function newSlotBox(cid: string): SlotBoxProp {
  return {
    mpl_group: '容器控件',
    mpl_title: '插槽容器',
    mpl_version: '1.0.0',
    field: '',
    cid,
    tag: 'mpl-slot-box',
    mpl_zh: '插槽容器',
    mpl_ce: 'c',
    mpl_children: [],
    layoutMapNode: {},
    classList: ['flex-left'],
    userClassName: [],
    style: '',
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos(),
    width: '24',
    height: 20,
    bgColor: '#ffffff',
    visible: '1',
    visibleType: 'default',
    layoutRow: 4,
    layoutCol: 4,
    selectNodePos: ''
  }
}

function getTemplateCode(node: SlotBoxProp): string {
  // todo: 紧凑源码的生成，延后做
  // 思路：默认使用静态文本写入template. 当存在赋值操作时，即[watchEffect () => mpl.var.fb4rg5.label] // 源码存在时替换静态文本
  // 性能比较缓慢，每个组件仅部分使用其动态，大部分默认为静态

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const slotBox: ComponentBaseExport = {
  tag: 'mpl-slot-box',
  comp: newSlotBox,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: SlotBoxProp) => {
    return []
  }
}
