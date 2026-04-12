import { NodePos, Node, ComponentBaseExport } from '@mpl/typings'


export function newNode(): Node {
  return {
    mpl_group: '页面节点',
    mpl_title: '画板节点',
    mpl_version: '1.0.0',
    field: '',
    cid: 'body',
    tag: 'mpl-body',

    variables: [],
    mpl_zh: 'body',
    mpl_ce: 'c',
    visible: '1',
    visibleType: 'default',
    mpl_children: [],
    // 页面级别用户自定义事件
    events: [],
    // 页面级别系统事件
    defaultEvents: [
      {
        name: 'validateForm',
        code: '',
        desc: '',
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid: 'mpl-body',
        tag: 'mpl-body'
      },
      {
        name: 'getPageData',
        code: '',
        desc: '',
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid: 'mpl-body',
        tag: 'mpl-body'
      },
      {
        name: 'submitPageData',
        code: '',
        desc: '',
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid: 'body',
        tag: 'mpl-body'
      }
    ],
    classList: [],
    userClassName: [],
    style: '',
    pos: pos()
  }
}

// 根据页面新建类型判断导入不同的默认方法
function getDefaultPageMethods(type: 'formPage' | 'treePage' | 'listPage'): string {
  // 表单页面 自带校验, 提交, 获取数据, 重置, 清空方法
  if (type === 'formPage') {
    return `
      validateForm() {},
      submitFormData() {},
      getFormData() {},
      resetPageData() {},
      clearPageData() {},
    `
  }
  // 树形页面 自带获取树, 重置, 清空方法
  if (type === 'treePage') {
    return `
      getTreeData() {},
      resetPageData() {},
      clearPageData() {},
    `
  }
  // 列表页面 自带获取列表, 重置, 清空方法
  if (type === 'listPage') {
    return `
      getListData() {},
      resetPageData() {},
      clearPageData() {},
    `
  }

  return ''
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 1,
      h: 1,
      minH: 1,
      maxH: 11,
      minW: 1,
      type: 'wh',
      mod: 'box'
    },
    mobile: {
      wType: '%',
      hType: 'px',
      w: 1,
      h: 1,
      minH: 1,
      maxH: 11,
      minW: 1,
      type: 'wh',
      mod: 'box'
    }
  }
}

function getTemplateCode(node: Node): string {
  // todo: 紧凑源码的生成，延后做
  // 思路：默认使用静态文本写入template. 当存在赋值操作时，即[watchEffect () => mpl.var.fb4rg5.label] // 源码存在时替换静态文本
  // 性能比较缓慢，每个组件仅部分使用其动态，大部分默认为静态

  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const bodyNode: ComponentBaseExport = {
  tag: 'mpl-body',
  comp: newNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: Node) => {
    return [
      { desc: `页面变量 / 禁用`, key: 'disabledPage', value: true, fullPath: `disabledPage` },
      { desc: `页面变量 / 全屏加载中`, key: 'loadingPage', value: true, fullPath: `loadingPage` },
      { desc: `页面变量 / 页面所有表单规则`, key: 'rules', value: true, fullPath: `rules` }
    ]
  }
}
