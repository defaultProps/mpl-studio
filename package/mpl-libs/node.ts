import type { Node, BreadCrumbNode, ParseVueOptions, EventNode } from '@mpl/typings'

// 更新节点单个属性
export function updateNodeSingleProp(node: any, key: string, value: any) {
  node[key] = value
}

/**
 * @description 插入节点右侧[仅限制于非容器节点]
 * @param nodeList 页面节点
 * @param newNode 新增节点
 * @param nextSiblingCid 插入到指定节点cid的右侧
 * @return null 直接修改nodeList节点
 */
export function insertNodeRight(nodeList: Node[], newNode: Node, nextSiblingCid: string) {
  const obj: any = queryNodeParent(nodeList, nextSiblingCid)

  if (obj.node) {
    if (['mpl-collapse', 'mpl-tabs'].includes(obj.node.tag)) {
      obj.node.itemList[obj.itemListPos].mpl_children.splice(obj.position + 1, 0, newNode)
    } else {
      obj.node.mpl_children.splice(obj.position + 1, 0, newNode)
    }
  } else {
    // insert root node
    const i = nodeList.findIndex(v => v.cid === nextSiblingCid)
    if (i !== -1) {
      nodeList.splice(i + 1, 0, newNode)
    }
  }
}

/**
 * @description 节点替换[可用于更新节点信息]
 * 节点替换，直接替换nodeList中的节点，不进行插入操作
 * @param nodeList 节点列表
 * @param node 新增节点
 * @param pid 父节点cid
 * @param position 插入位置, 默认右侧
 * @description nodeList中容器节点添加子节点
 */
export function replaceNode(nodeList: Node[], node: Node, pid: string, position: 'l' | 'r' = 'r') {
  const { node: targetNode, parentNode, position: targetPosition } = queryNodeByCid(nodeList, node.cid)

  if (targetNode) {
    // targetNode = node
  }
}

/**
 * @param nodeList 节点列表
 * @param node 新增节点
 * @param pid 父节点cid
 * @param position 插入位置, 默认右侧
 * @description nodeList中容器节点添加子节点
 */
export function insertNodeChild(nodeList: Node[], node: Node, pid: string, position: 'l' | 'r' = 'r') {
  if (!pid) {
    if (position === 'l') {
      nodeList[0]!.mpl_children.unshift(node)
    } else {
      nodeList[0]!.mpl_children.push(node)
    }

    return
  }

  let isInsertNode = false

  function _insertNode(list: Node[]) {
    if (isInsertNode) return

    list.forEach(v => {
      if (isInsertNode) return

      if (v.cid === pid) {
        isInsertNode = true
        if (position === 'l') {
          v.mpl_children.unshift(node)
        } else {
          v.mpl_children.push(node)
        }
      } else {
        if (Array.isArray(v.mpl_children) && v.mpl_children.length > 0) {
          _insertNode(v.mpl_children)
        }
      }
    })
  }

  _insertNode(nodeList)

  if (!isInsertNode) {
    // 未找到插入的组件
    console.error('未找到插入的组件', nodeList, pid)
  }
}

/**
 * @description 查询折叠面板mpl_children是否存在子节点
 * @param nodeList 节点列表
 * @param cid  折叠面板cid
 * @param paneValue 折叠面板子节点value
 * @returns boolean 是否有子节点
 */
export function hasMultipleChildrenInCollapse(nodeList: Node[], cid: string, paneValue: string): boolean {
  let result = false
  function queryNode(list: Node[]) {
    list.forEach((v: any) => {
      // 折叠面板
      if (v.tag === 'mpl-collapse') {
        if (v.cid == cid) {
          const paneNode = v.itemList.find((v: any) => v.value === paneValue)
          if (paneNode) {
            result = paneNode.mpl_children.length > 1
          }
        } else {
          v.itemList.forEach((s: any) => {
            queryNode(s.mpl_children)
          })
        }
      }
      // 其他容器
      queryNode(v.mpl_children)
    })
  }

  queryNode(nodeList)

  return result
}

/**
 * @description 查询cid节点的父节点
 * @param nodeList 节点列表
 * @param cid 节点cid
 * @returns { node: Node | null, position: number, itemListPos: number } 父节点, cid节点在父节点的mpl_children位置. 如果父节点是折叠, 面板, 页签等组件, 则itemListPos为子节点在父节点itemList中的位置
 */
export function queryNodeParent(nodeList: Node[], cid: string): { node: Node | null, position: number, itemListPos: number } {
  let resultNode: Node | null = null
  let position = 0 // cid节点的位置
  let itemListPos = -1 // 多子节点组件位置
  function queryNode(list: Node[], parentNode: Node | null) {
    list.forEach((v: any, index: number) => {
      if (v.cid === cid) {
        resultNode = parentNode
        position = index
      }
      // 折叠面板
      if (['mpl-collapse', 'mpl-tabs'].includes(v.tag)) {
        const paneNodeIndex = v.itemList.findIndex((v: any) => v.value === cid)
        if (paneNodeIndex !== -1) {
          resultNode = v
          position = index
          itemListPos = paneNodeIndex
        }
        v.itemList.forEach((s: any) => {
          if (Array.isArray(s.mpl_children) && s.mpl_children.length > 0) {
            queryNode(s.mpl_children, s)
          }
        })
      }
      // 其他容器
      else if (Array.isArray(v.mpl_children) && v.mpl_children.length > 0) {
        queryNode(v.mpl_children, v)
      }
    })
  }

  queryNode(nodeList, null)

  return {
    node: resultNode,
    position,
    itemListPos
  }
}

// 查询节点
/**
 * @description 根据cid查询节点node
 * @param nodeList 节点列表
 * @param cid 节点cid
 */
export function queryNodeByCid(nodeList: Node[], cid: string): { node: Node | null, parentNode: Node | null, position: number } {
  let resultNode: Node | null = null
  let parentNode: Node | null = null
  let position = 0

  function queryNode(list: Node[], parent: Node | null) {
    list.forEach((v: any, index: number) => {
      if (v.cid === cid) {
        resultNode = v
        parentNode = parent
        position = index
      }
      // 折叠面板
      if (['mpl-collapse', 'mpl-tabs'].includes(v.tag)) {
        const paneNodeIndex = v.itemList.findIndex((v: any) => v.value === cid)
        if (paneNodeIndex !== -1) {
          resultNode = v.itemList[paneNodeIndex]
          parentNode = v
          position = paneNodeIndex
        }
        v.itemList.forEach((s: any) => {
          if (Array.isArray(s.mpl_children) && s.mpl_children.length > 0) {
            queryNode(s.mpl_children, s)
          }
        })
      }
      // 其他容器
      else if (Array.isArray(v.mpl_children) && v.mpl_children.length > 0) {
        queryNode(v.mpl_children, v)
      }
    })
  }

  queryNode(nodeList, null)

  return {
    node: resultNode,
    parentNode,
    position
  }
}

// 查询节点路径
export function queryNodePath(nodeList: Node[], cid: string): BreadCrumbNode[] {
  interface NodePath extends BreadCrumbNode {
    children?: NodePath[];
  }

  function traverse(node: any): NodePath[] | null {
    if (node.cid === cid) {
      return [{ label: node.mpl_title, cid: node.cid, tag: node.tag }];
    }
    else if (['mpl-collapse', 'mpl-tabs'].includes(node.tag)) {
      for (const child of node.itemList) {
        for (const ch of child.mpl_children) {
          const path = traverse(ch);
          if (path) {
            return [{ label: node.mpl_title, cid: node.cid, tag: node.tag }, ...path];
          }
        }
      }
    }
    else if (node.mpl_children) {
      for (const child of node.mpl_children) {
        const path = traverse(child);
        if (path) {
          return [{ label: node.mpl_title, cid: node.cid, tag: node.tag }, ...path];
        }
      }
    }

    return null;
  }

  for (const root of nodeList) {
    const result = traverse(root);

    if (result) {
      return result
    }
  }

  return []
}

// 更新nodeList中的事件
export function updateNodeListByMethodsCode(nodeList: Node[], parsed: ParseVueOptions) {
  // 递归所有dom节点列表
  const result = JSON.parse(JSON.stringify(nodeList))
  const methodMap = new Map(Object.entries(parsed.methods))

  function traverse(node: Node) {
    node.defaultEvents.forEach(v => {
      const hasEvent = methodMap.get(v.name)
      // 存在则更新事件, 不存在则默认认为是已经删除了事件
      if (hasEvent) {
        v.code = hasEvent.fn
        v.open = true
      } else {
        v.code = ''
        v.open = false
      }
    })
    if (node.mpl_children) {
      node.mpl_children.forEach(v => traverse(v))
    }
  }
  result.forEach(v => traverse(v))

  // body节点挂载自定义事件和系统事件
  const bodyNode = result.find(v => v.tag === 'mpl-body')

  if (bodyNode) {
    bodyNode.events = [...methodMap].map(([k, p]) => ({
      name: k,
      desc: k,
      code: p.fn,
      open: true
    }))
  }

  return result
}

// 根据IDE中代码更新eventList的open,code状态
export function updateEventListByNodeList(parsed: ParseVueOptions, eventList: EventNode[]) {
  const newEventList = JSON.parse(JSON.stringify(eventList))
  const methodMap = new Map(Object.entries(parsed.methods))
  newEventList.forEach(t => {
    const p = methodMap.get(t.name)
    if (p) {
      t.code = p.fn
      t.open = true
    } else {
      t.open = false
      t.code = '' // 提取默认值的方法事件. 而不是''
    }
  })

  return newEventList
}

// defaultEvents生成代码挂载到template上
export function bindEventByTemplateStr(defaultEvents: EventNode[]): string {
  return defaultEvents.map(v => `@${v.name}="${v.code}"`).join(' ')
}
 