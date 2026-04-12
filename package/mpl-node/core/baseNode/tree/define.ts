import type { ComponentBaseExport, Node, NodePos, ServiceFormBindNode } from '@mpl/typings'

import { SERVICE_MODE } from '@mpl/const'

export function getDefaultTreeOptions() {
  return []
}

export interface TreeNode {
  emptyText: string
  highlightCurrent: boolean
  defaultExpandAll: boolean
  expandOnClickNode: boolean
  checkOnClickNode: boolean // 复选框使用
  defaultExpandKeys: string[] // 默认展开节点列表
  showCheckbox: boolean // 开启多选
  props: {
    labelKey: string
    valueKey: string
    childrenKey: string
    disabledKey: string
    isLeafKey: string
    classKey: string
  }
  service: ServiceFormBindNode
}

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
      type: 'h',
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

export interface TreeNodeProp extends Node {
  tree: TreeNode
  pos: { pc: NodePos; mobile: NodePos }
}

export function newTreeNode(cid: string): TreeNodeProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '树形',
    mpl_zh: '基础树',
    mpl_version: '1.0.0',
    mpl_ce: 'c',
    field: '',

    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-tree',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [],
    pos: {
      pc: {
        wType: '%',
        hType: 'px',
        w: 6,
        h: 24,
        minH: '',
        maxH: '',
        minW: '',
        type: 'wh',
        mod: 'normal'
      },
      mobile: {
        wType: '%',
        hType: 'px',
        w: 6,
        h: 24,
        minH: '',
        maxH: '',
        minW: '',
        type: 'wh',
        mod: 'normal'
      }
    },
    classList: [],
    userClassName: [],
    style: '',
    tree: {
      emptyText: '',
      highlightCurrent: true,
      defaultExpandAll: true,
      checkOnClickNode: false,
      expandOnClickNode: true,
      defaultExpandKeys: [],
      showCheckbox: true,
      props: {
        labelKey: 'label',
        valueKey: 'value',
        childrenKey: 'children',
        disabledKey: 'disabled',
        isLeafKey: 'isLeaf',
        classKey: ''
      },
      service: {
        mode: SERVICE_MODE.STATIC,
        staticData: getDefaultTreeOptions(),
        methodName: '',
        methodCode: '',
        labelKey: 'label',
        valueKey: 'value',
        postman: {
          url: '',
          methods: 'get',
          params: []
        }
      }
    }
  }
}

function getTemplateCode(node: TreeNodeProp): string {
  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const treeNode: ComponentBaseExport = {
  tag: 'mpl-tree',
  comp: newTreeNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: TreeNodeProp) => {
    return []
  }
}
