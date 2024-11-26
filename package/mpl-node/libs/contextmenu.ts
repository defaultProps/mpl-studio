import type MPL from '@mpl/typings'
import { triggerContextMenuMode } from './index'

// 关闭右键菜单 - 所有右键菜单通用
export function closeTopContextMenu(force?: boolean) {
  // 减少DOM操作
  if (force || sessionStorage.getItem('nodeContextStatus') === 'open') {
    const topContextMenu = window.parent?.document.getElementById('mplContextmenuTarget')
    const activeContextComponent = window.parent?.document.querySelector(`.component-title.context-light[mpl-c-id]`)

    if (topContextMenu)
      topContextMenu.style.display = 'none'

    activeContextComponent?.classList?.remove('context-light')
    sessionStorage.setItem('nodeContextStatus', 'close')
  }
}

// 右键列表位置渲染
export function rendererContextmenu(e: MouseEvent, menu: any[]): { top: number, left: number } {
  const len = menu.length
  const { pageX, pageY } = e
  const defaultMenuItemHeight = 35

  let resultPos = {
    top: 0,
    left: 0,
  }

  if (defaultMenuItemHeight * len + pageY > window.innerHeight) {
    resultPos = {
      left: pageX + 5,
      top: window.innerHeight - defaultMenuItemHeight * len,
    }
  }
  else {
    resultPos = {
      left: pageX + 5,
      top: pageY + 5,
    }
  }

  return resultPos
}

// 显示隐藏右键菜单
export function visibleContextmenu(visible: boolean) {
  const contextmenuStatus = triggerContextMenuMode()
  // 减少DOM请求
  if (visible) {
    const contextmenuNode = document.getElementById('contextmenuMounted')
    if (contextmenuNode) {
      contextmenuNode.style.display = 'block'
      triggerContextMenuMode('open')
    }
  }
  else {
    if (contextmenuStatus === 'open') {
      const contextmenuNode = document.getElementById('contextmenuMounted')
      if (contextmenuNode) {
        contextmenuNode.style.display = 'none'
        triggerContextMenuMode('close')
      }
    }
  }

  closeTopContextMenu()
}

// 右键更换节点
export function handleChangeNode(tag: string) {
  console.log(tag) // eslint-disable-line no-console
}

// mpl平台内置的所有组件标签
export type MPL_TAGS = 'mpl-base-input' | 'mpl-base-box'

export type CONTEXTMENU_TYPE =
  'copy' | // 复制
  'copyId' | // 复制标识
  'copyRight' | // 向右复制
  'shear' | // 剪贴

  'paste' | // 粘贴
  'pasteLeft' | // 粘贴左侧
  'pasteRight' | // 粘贴右侧

  'delete' | // 移除
  'changeNode' | // 更换节点
  MPL_TAGS |
  // 这里展示所有组件tag

  'lock' |  // 锁定 - 禁止操作

  'fold' | // 对折 - 减少排版占位
  'unfold' | // 展开 - 开启排版占位

  'initial' | // 初始化配置

  'style' | // 样式 - 点击跳转到样式IDE

  'position' | // 定位
  'positionLeft' | // 左侧互换
  'positionRight' | // 右侧互换
  'positionTop' | // 上级移入 - 与父级同级

  'insertNode' | // 插入节点【插入到首位】 - 适用于容器类
  'position' | // 定位
  'position' | // 定位
  'position' | // 定位
  'position' | // 定位
  'paste' | // 粘贴
  'paste' | // 粘贴
  'paste' | // 粘贴
  'paste' | // 粘贴
  'paste' | // 粘贴
  'paste' // 粘贴

// 右键菜单列表回调API
export interface ContextMenuItemParams {
  include: Array<'copy' | 'shear' | 'remove' | 'changeNode'>
}


// 通用右键列
export function getContextmenuItem(type: string, node: MPL.Node): MPL.ContextMenuNode {
  if (type === 'copy') {
    return {
      label: '复制',
      icon: '',
      disabled: false,
      divider: false,
      value: 'copy',
      onClick: () => {
        console.log(node) // eslint-disable-line no-console
        visibleContextmenu(false)
      },
    }
  }
  // 剪切
  else if (type === 'shear') {
    return {
      label: '剪切',
      icon: '',
      disabled: false,
      divider: false,
      value: 'shear',
      onClick: () => {
        visibleContextmenu(false)
      },
    }
  }
  // 移除
  else if (type === 'remove') {
    return {
      label: '删除',
      icon: '',
      disabled: false,
      divider: false,
      value: 'shear',
      onClick: () => {
        visibleContextmenu(false)
      },
    }
  }

  return {
    label: '剪切',
    icon: '',
    disabled: false,
    divider: false,
    value: 'shear',
    onClick: () => {
      visibleContextmenu(false)
    },
  }
}

// 画板右键菜单
export function getNodeContextmenu(node: MPL.Node): MPL.ContextMenuNode[] {
  if (node.tag === 'mpl-btn') {
    return [
      getContextmenuItem('copy', node),
      getContextmenuItem('shear', node),
      getContextmenuItem('remove', node),
      getContextmenuItem('changeNode', node),
      getContextmenuItem('shear', node),
      getContextmenuItem('shear', node),
      getContextmenuItem('shear', node),
      getContextmenuItem('shear', node),
    ]
  }

  return []
}
