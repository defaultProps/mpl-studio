import { mplIframePostMessage, focusHeaderMenuNode } from '@mpl/const'
import mplStore from '@mpl/store'
import type { ContextMenu } from '@mpl/typings'

// 顶部目录展示更多菜单
export function complexContextmenuByHeaderArea(
  e: MouseEvent,
  menu: ContextMenu[],
  key?: string
) {
  if (e.target instanceof HTMLElement) {
    const target = e.target
    const coreView = mplStore.viewStore()

    focusHeaderMenuNode(true, key)

    coreView.updateContextMenuByHeaderMenu({
      top: 30,
      left: target.offsetLeft || 0,
      display: 'block',
      menu,
      meta: key
    })
  }
}


// 基础组件右键展示更多菜单
export function complexContextmenu(
  e: MouseEvent,
  menu: ContextMenu[],
  key: string
) {
  const len = menu.length
  const { pageX, pageY } = e
  const defaultMenuItemHeight = 35

  const coreView = mplStore.viewStore()

  let resultPos = {
    top: 0,
    left: 0
  }

  if (defaultMenuItemHeight * len + pageY > window.innerHeight) {
    resultPos = {
      left: pageX + 5,
      top: window.innerHeight - defaultMenuItemHeight * len
    }
  }
  else {
    resultPos = {
      left: pageX + 5,
      top: pageY + 5
    }
  }

  coreView.updateContextMenu({
    ...resultPos,
    display: 'block',
    menu,
    meta: key
  })
}

// context menu close
export function closeMenuAuto() {
}

export function dragNewCompStart(el: any, tag: string) {
  el.dataTransfer?.setData('tag', tag)
  el.dataTransfer.effectAllowed = 'move'
  el.dataTransfer.dropEffect = 'move'
  mplIframePostMessage.workbench.dragStartElement(tag)
}
