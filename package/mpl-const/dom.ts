// 关闭右键目录 - 重置状态
export function resetContextmenu() {
  // 减少DOM操作
  if (sessionStorage.getItem('nodeContextStatus') === 'close') {
    return
  }

  focusHeaderMenuNode(false)
  // mplStore.viewStore().context.display = 'none'
  sessionStorage.setItem('nodeContextStatus', 'close')
}

// 更新选中状态UI - header
export function focusHeaderMenuNode(isFocus: boolean, key = '') {
  // 高亮选中按钮
  const doms = document.querySelectorAll(`.mpl-header .operation button`)

  doms.forEach((dom) => {
    dom.classList.remove('focus')
    if (dom.classList.contains(key) && isFocus)
      dom.classList.add('focus')
  })
}