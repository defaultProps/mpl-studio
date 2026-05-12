import type { NodePos, Node, ComponentBaseExport, NodeVarTreeProp, NodeVar } from '@mpl/typings'
interface BodyNode extends Node {
  customVars: Array<NodeVar & { initValue: string, varType: 'data' | 'computed', type: string, desc: string }>
}

export function newNode(): BodyNode {
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
    pos: pos(),
    customVars: [
      {
        // 是一个data变量或computed计算变量
        label: '用户信息',
        value: 'userInfo', // 使用方式 mpl.var.custom.userInfo
        initValue: 'getUserInfo()', // 初始赋值
        varType: 'data',
        type: 'object',
        desc: ''
      }
    ]
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
  getNodeVar: (node: BodyNode): NodeVarTreeProp => {
    // 自定义页面变量
    const result: NodeVar[] = [
      { label: `禁用`, value: `mpl.disabledPage`, type: 'boolean' },
      { label: `全屏加载中`, value: `mpl.loadingPage`, type: 'boolean' },
      { label: `表单规则`, value: `mpl.rules`, type: 'array' },
    ]
    node.customVars.filter(v => v.varType === 'data').forEach(v => {
      result.push({
        ...v,
        value: `mpl.var.custom.${v.value}`
      })
    })

    return {
      label: '页面变量',
      children: result
    }
  }
}
