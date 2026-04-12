import type { Node } from '@mpl/typings'

// workbench platform to mpl platform
export const platformFrame = {
  deleteActiveNode() {
    window.parent.postMessage(
      {
        type: 'DELETE_ACTIVE_NODE_ACTION',
        payload: {}
      },
      '*'
    )
  },
  selectLayoutMessage(cid: string) {
    window.parent.postMessage({
      type: 'SELECT_LAYOUT_MESSAGE',
      payload: {
        cid
      }
    })
  },
  updateNodePropMessage(cid: string, prop: any) {
    window.parent.postMessage(
      {
        type: 'UPDATE_NODE_PROP_MESSAGE',
        payload: {
          cid,
          prop
        }
      },
      '*'
    )
  },
  deleteNode(id: string): void {
    window.parent.postMessage(
      {
        type: 'DELETE_NODE_ACTION',
        payload: {
          cid: id
        }
      },
      '*'
    )
  },
  copyActiveNodeToRightNode(): void {
    window.parent.postMessage(
      {
        type: 'COPY_ACTIVE_NODE_TO_RIGHT_NODE_ACTION',
        payload: {}
      },
      '*'
    )
  },
  copyToRightNode(id: string): void {
    window.parent.postMessage(
      {
        type: 'COPY_TO_RIGHT_NODE_ACTION',
        payload: {
          cid: id
        }
      },
      '*'
    )
  },
  // 节点后移
  moveRightNode(id: string): void {
    window.parent.postMessage(
      {
        type: 'MOVE_TO_RIGHT_ACTION',
        payload: {
          cid: id
        }
      },
      '*'
    )
  },
  // 节点前移
  moveLeftNode(id: string): void {
    window.parent.postMessage(
      {
        type: 'MOVE_TO_LEFT_ACTION',
        payload: {
          cid: id
        }
      },
      '*'
    )
  },
  clickMenu: (id: string): void => {
    window.parent.postMessage(
      {
        type: 'CLICK_MENU_ACTION',
        payload: {
          pageId: id
        }
      },
      '*'
    )
  },
  selectNodeByCid(cid: string) {
    window.parent.postMessage(
      {
        type: 'SELECT_NODE_BY_CID',
        payload: {
          cid
        }
      },
      '*'
    )
  },
  updateNodeList(_nodeList: Node[]) {
    window.parent.postMessage(
      {
        type: 'UPDATE_NODE_LIST',
        payload: {
          nodeList: JSON.stringify(_nodeList)
        }
      },
      '*'
    )
  }
}

// 画布切换状态或左侧目录开启关闭等操作，最终改变拖动内部画布的尺寸时需要重新计算宽度布局
export function layoutWorkbenchSize(span: number): number {
  const dom = document.getElementById('workbenchDragContainer')
  let unitWidth = 0

  if (dom) unitWidth = dom.clientWidth / span

  return unitWidth
}
