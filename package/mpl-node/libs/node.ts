import type MPL from '@mpl/typings'

// JSON嵌套格式化NodeList
export function formatNodeListToTree(nodeList: MPL.Node[]): MPL.TreeNodeList[] {
  const stashNodes = JSON.parse(JSON.stringify(nodeList))
  const newNodeList: MPL.TreeNodeList[] = stashNodes.map((n: MPL.Node) => ({
    ...n,
    mpl_children: [],
  }))

  function loopNodes(nodesCid: string[], target: MPL.TreeNodeList) {
    newNodeList.forEach((n) => {
      nodesCid.forEach((cid) => {
        if (n.cid === cid) {
          if (n.mpl_children.length) {
            target.mpl_children.push(n)
            loopNodes(n.childIds, n)
          }
          else {
            target.mpl_children.push(JSON.parse(JSON.stringify(n)))
            // newNodeList.splice(i, 1)
            n.isDeep = true
          }
        }
      })
    })
  }

  newNodeList.forEach((n) => {
    if (n.childIds.length)
      loopNodes(n.childIds, n)
  })

  const result = newNodeList.filter(v => !v.isDeep)

  // 补充body节点

  result.unshift(getRootMountedNode())

  return result
}

// 拖拽过程节点占位的模拟组件
export function initHighlightBlockNode(): MPL.Node {
  return {
    mpl_title: '',
    mpl_group: '',
    mpl_ce: 'c',
    visible: true,
    tag: 'mpl-workbench-highlight-node',
    cid: '',
    mpl_version: '',
    mpl_zh: '',
    childIds: [],
    events: [],
    pos: {
      pc: {
        w: 0,
        h: 0,
        minH: 0,
        maxH: 0,
        minW: 0,
        type: 'wh',
      },
      mobile: {
        w: 0,
        h: 0,
        minH: 0,
        maxH: 0,
        minW: 0,
        type: 'wh',
      }
    },
    classList: [],
    style: '',
    userClassName: [],
  }
}

// 挂载节点的Node初始化， 通常是一个画板区域的顶部节点。
export function getRootMountedNode(): MPL.TreeNodeList {
  return {
    mpl_group: '',
    mpl_title: '挂载基点',
    mpl_version: '0.0.0',
    cid: 'mpl-body-cid',
    mpl_zh: '挂载基点',
    mpl_ce: 'c',
    visible: true,
    tag: 'mpl-body',
    childIds: [],
    events: [],
    pos: {
      pc: {
        w: 0,
        h: 0,
        minH: 0,
        maxH: 0,
        minW: 0,
        type: 'wh',
      },
      mobile: {
        w: 0,
        h: 0,
        minH: 0,
        maxH: 0,
        minW: 0,
        type: 'wh',
      }
    },
    classList: [],
    style: '',
    isDeep: false,
    userClassName: [],
    mpl_children: [],
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
    children: MPL.Node[]
  }>
}

// 级联统计nodeList
export function formatNodeListToCascade(
  nodeList: MPL.Node[],
): OutlineCascadeOptions[] {
  const cascadeOptions: OutlineCascadeOptions[] = []
  const _nodeGroupList: MPL.Node[] = JSON.parse(JSON.stringify(nodeList))

  _nodeGroupList.forEach((n) => {
    const index = cascadeOptions.findIndex(
      p => p.outline_label === n.mpl_group,
    )
    const opt = cascadeOptions[index]
    if (index >= 0 && opt) {
      opt.total += 1
      const _temp = opt.children
      const i = _temp.findIndex(t => t.tag === n.tag)
      const tempOpt = _temp[i]
      if (i >= 0 && tempOpt) {
        tempOpt.total += 1
        if (Array.isArray(tempOpt.children)) {
          tempOpt.children = [
            {
              outline_label: `${n.mpl_title} - ${n.mpl_zh}`,
              outline_value: n.cid,
              ...JSON.parse(JSON.stringify(n)),
            },
          ]
        }
        else {
          tempOpt.children = [
            {
              outline_label: `${n.mpl_title} - ${n.mpl_zh}`,
              outline_value: n.cid,
              ...JSON.parse(JSON.stringify(n)),
            },
          ]
        }
      }
      else if (_temp[0]) {
        _temp[0].children.push({
          outline_label: `${n.mpl_title} - ${n.mpl_zh}`,
          outline_value: '--',
          ...JSON.parse(JSON.stringify(n)),
        })
      }
    }
    else {
      cascadeOptions.push({
        total: 1,
        outline_label: n.mpl_group,
        outline_value: n.mpl_group,
        children: [
          {
            outline_label: n.mpl_title,
            outline_value: n.mpl_title,
            tag: n.tag,
            total: 1,
            children: [
              {
                outline_label: `${n.mpl_title} - ${n.mpl_zh}`,
                outline_value: n.cid,
                ...JSON.parse(JSON.stringify(n)),
              },
            ],
          },
        ],
      })
    }
  })

  return cascadeOptions
}
export type LabelProps = MPL.FormLabelProp
