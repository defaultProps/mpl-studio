import type { Node } from '@mpl/typings'

// workbench platform to mpl platform
export const platformFrame = {
  // drop node
  dropNodePlus(cid: string, dragNodeTag: string | null): void {
    window.parent.postMessage({
      type: 'DROP_NODE_ACTION',
      payload: {
        cid,
        tag: dragNodeTag
      }
    })
  },
  scrollIntoViewPopperNode() {
    window.parent.postMessage(
      {
        type: 'SCROLL_TOP_WORKBENCH',
        payload: {}
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
  selectNodeById(cid: string) {
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

  if (dom)
    unitWidth = dom.clientWidth / span

  return unitWidth
}
