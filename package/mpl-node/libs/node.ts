import type { Node, TreeNodeList, PLATFORM_UI, BreadCrumbNode, NODE_TAG, SLOT_NODE_TAG } from '@mpl/typings'
import { workbenchStore } from '@mpl/store'
import { mapNodeSetting } from '../core'

// 页面源码生成
export function generatorSinglePageCode(ui: PLATFORM_UI) {
  const nodeList = workbenchStore().nodeList
  return formatNodeListToTree(nodeList).map(async node => {
    const generator = await mapNodeSetting[node.tag]?.generator[ui]?.(node)

    return generator || ''
  })
}

/**
 * 
 * @param nodeList 组件列表。一维数组
 * @param simpleMode 简单模式下，仅生成 id,tag, mpl_children字段
 * @returns TreeNodeList[]
 * @description 格式化生成树形结构
 */
export function formatNodeListToTree(nodeList: Node[], simpleMode = false): TreeNodeList[] {
  const stashNodes = JSON.parse(JSON.stringify(nodeList))
  const newNodeList: TreeNodeList[] = stashNodes.map((n: Node & any) => ({
    ...n,
    mpl_children: []
  }))

  const isSubChildNodes: string[] = []  // 非顶层节点

  function getChildNodeByCid(node: any, cids: string[]) {
    isSubChildNodes.push(...cids)
    node.mpl_children = newNodeList.filter(v => cids.includes(v.cid))
    node.mpl_children.forEach((v: any) => {
      if (v.tag === 'mpl-panel') {
        getChildNodeByCid(v, v.header.slotNodes.concat(v.body.slotNodes).map((v: Partial<Node>) => v.cid))
      }
      if (v.tag === 'mpl-slot-box') {
        getChildNodeByCid(v, v.mpl_children)
      }
      if (v.tag === 'mpl-input') {
        getChildNodeByCid(v, v.slotNodes.map((v: Partial<Node>) => v.cid))
      }
    })
  }

  newNodeList.forEach((node: any) => {
    if (node.tag === 'mpl-panel') {
      getChildNodeByCid(node, node.header.slotNodes.concat(node.body.slotNodes).map((v: Partial<Node>) => v.cid))
    }
    if (node.tag === 'mpl-input') {
      getChildNodeByCid(node, node.slotNodes.map((v: Partial<Node>) => v.cid))
    }
    if (node.tag === 'mpl-slot-box') {
      getChildNodeByCid(node, node.mpl_children)
    }
  })

  // 移除子节点
  const result = newNodeList.filter(v => !isSubChildNodes.includes(v.cid))
  return result
}

// 挂载节点的Node初始化， 通常是一个画板区域的顶部节点。
export function getRootMountedNode(): TreeNodeList {
  return {
    mpl_group: '',
    mpl_title: '画板节点',
    mpl_version: '0.0.0',
    field: '',
    mpl_zh: '画板节点',
    mpl_ce: 'c',
    cid: 'body',
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-body',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [],
    pos: {
      pc: {
        wType: '%',
        hType: 'px',
        w: 0,
        h: 0,
        minH: 0,
        maxH: 0,
        minW: 0,
        type: 'wh'
      },
      mobile: {
        wType: '%',
        hType: 'px',
        w: 0,
        h: 0,
        minH: 0,
        maxH: 0,
        minW: 0,
        type: 'wh'
      }
    },
    classList: [],
    style: '',
    isRootNode: false,
    userClassName: []
  }
}

export interface OutlineCascadeOptions {
  outline_label: string
  outline_value: string
  total: number
  children: Array<{
    outline_label: string
    outline_value: string
    total: number
    tag: string
    children: Node[]
  }>
}

// 辅助组件的初始化
export function initSlotNode(tag: SLOT_NODE_TAG, cid: string, isMergeOldNode = false): any {
  // 按钮
  if (tag === 'btn') {
    return {
      tag,
      cid,
      icon: '',
      ui: '',
      txt: '标题',
      disabled: {
        name: '',
        code: ''
      },
      click: {
        name: '',
        code: '',
      },
      visible: {
        name: '',
        code: ''
      },
    }
  }

  // 文本
  else if (tag === 'txt') {
    return {
      tag,
      cid,
      txt: '文本'
    }
  }

  // 链接
  else if (tag === 'link') {
    return {
      tag,
      cid,
      txt: '链接文本',
      link: 'https://cn.bing.com',
      target: '_blank'
    }
  }

  // 图标
  else if (tag === 'icon') {
    return {
      tag,
      cid,
      icon: '',
      iconColor: '',
      txt: '',
      popoverText: '',
      disabled: {
        name: '',
        code: ''
      },
      click: {
        name: '',
        code: '',
      },
      visible: {
        name: '',
        code: ''
      },
    }
  }

  // 基础输入
  else if (tag === 'input') {
    return {
      tag,
      cid,
      placeholder: '请输入',
      prop: '',
      prefixIcon: '',
      suffixIcon: '',
      clearable: false,
      readonly: false,
      disabledName: '',
      showLimit: false,
      maxLength: '',
      visible: {
        name: '',
        code: ''
      },
    }
  }
}