import { ContextMenuNode } from '@mpl/typings'
import { triggerContextMenuMode } from './index'
import { workbenchStore } from '@mpl/store'

// 关闭右键菜单 - 所有右键菜单通用
export function closeTopContextMenu(force?: boolean) {
  // 减少DOM操作
  if (force || sessionStorage.getItem('showContentMenu') === '1') {
    const topContextMenu = window.parent?.document.getElementById('mplContextmenuTarget')

    if (topContextMenu) topContextMenu.style.display = 'none'

    sessionStorage.setItem('showContentMenu', '0')
  }
}

// 初始化右键菜单关闭实例
export function initEventBindCloseAllContextMenu() {
  function closeAllContextMenu() {
    closeTopContextMenu()
  }

  document.addEventListener('contextmenu', closeAllContextMenu)
  document.addEventListener('click', closeAllContextMenu)
  document.addEventListener('mousewheel', closeAllContextMenu)
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
  } else {
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
}

// mpl平台内置的所有组件标签
export type MPL_TAGS = 'mpl-input' | 'mpl-base-box'

export type CONTEXTMENU_TYPE =
  | 'copy' // 复制
  | 'copyId' // 复制标识
  | 'copyRight' // 向右复制
  | 'shear' // 剪贴
  | 'paste' // 粘贴
  | 'pasteLeft' // 粘贴左侧
  | 'pasteRight' // 粘贴右侧
  | 'delete' // 移除
  | 'changeNode' // 更换节点
  | MPL_TAGS
  // 这里展示所有组件tag
  | 'lock' // 锁定 - 禁止操作
  | 'fold' // 对折 - 减少排版占位
  | 'unfold' // 展开 - 开启排版占位
  | 'initial' // 初始化配置
  | 'style' // 样式 - 点击跳转到样式IDE
  | 'position' // 定位
  | 'positionLeft' // 左侧互换
  | 'positionRight' // 右侧互换
  | 'positionTop' // 上级移入 - 与父级同级
  | 'insertNode' // 插入节点【插入到首位】 - 适用于容器类
  | 'position' // 定位
  | 'position' // 定位
  | 'position' // 定位
  | 'position' // 定位
  | 'paste' // 粘贴
  | 'paste' // 粘贴
  | 'paste' // 粘贴
  | 'paste' // 粘贴
  | 'paste' // 粘贴
  | 'paste' // 粘贴

// 右键菜单列表回调API
export interface ContextMenuItemParams {
  include: Array<'copy' | 'shear' | 'remove' | 'changeNode'>
}
