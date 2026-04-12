import type { ComponentBaseExport, FormItemSize, SLOT_NODE, Node, NodePos } from '@mpl/typings'

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

// 内部包裹一个el-form标签, 可以设置查询条件, 支持多组件关联查询
export interface SearchBoxProp extends Node {
  labeWidth: number | '' // 内部查询组件的默认标题宽度
  size: FormItemSize
  slotNodes: SLOT_NODE[]
  pos: { pc: NodePos; mobile: NodePos }
}

export function newSearchBoxNode(cid: string): SearchBoxProp {
  return {
    mpl_group: '容器组件',
    mpl_title: '查询容器',

    mpl_zh: '查询容器',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    field: '',
    cid,
    tag: 'mpl-search-box',
    size: 'small',
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    visible: '1',
    visibleType: 'default',
    labeWidth: 200,
    defaultEvents: [],
    events: [],
    variables: [],
    slotNodes: [],
    pos: pos()
  }
}

function getTemplateCode(node: SearchBoxProp): string {
  // todo: 紧凑源码的生成, 延后做
  // 思路：默认使用静态文本写入template. 当存在赋值操作时, 即[watchEffect () => $.var.fb4rg5.label] // 源码存在时替换静态文本
  // 性能比较缓慢, 每个组件仅部分使用其动态, 大部分默认为静态

  return `
		<!-- 1、基础输入框 template 节点源码 -->
    <!-- 2、DOM只占一行, 编辑template时, 一次只能编辑一行。用户选择编辑的行【即DOM】, MPL展示该DOM的所有属性, 用户选择属性或新增属性进行编辑更新。 -->
    <!-- 3、用户选择属性【属性需要根据MPL规则展示可编辑的范围, 更换绑定、变量替换、禁止编辑、删除属性等】 -->
    <!-- 4、新增属性【查看是否存在冲突、key-value合法性】-->

		<div class="mpl-form-item mpl-input--fb4rg5">
			<div class="mpl-label">{{ mpl.var.fb4rg5.label }}</div>
			<div class="mpl-content">
				<el-input
          :placeholder="mpl.var.${node.cid}.placeholder"
          :clearable="mpl.var.${node.cid}.clearable"
        />
			</div>
		</div>
	`
}

export const searchBox: ComponentBaseExport = {
  tag: 'mpl-search-box',
  comp: newSearchBoxNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: SearchBoxProp) => {
    return [
      { desc: '显示隐藏', key: 'visible', value: true },
      { desc: '禁用', key: 'disabled', value: false },
      { desc: '重置', key: 'reset', value: false },
      { desc: '重置', key: 'reset', value: false },
      { desc: '展开', key: 'expand', value: false },
      { desc: '查询', key: 'submit', value: false },
      { desc: '收起', key: 'collapse', value: false },
    ]
  }
}
