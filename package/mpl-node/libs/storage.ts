// 右键菜单状态。模拟浏览器，只存在一个右键状态
export function triggerContextMenuMode(val?: 'close' | 'open'): string {
  if(val) {
    sessionStorage.setItem('mplWorkbenchNodeContextmenuStatus', val)
    return val
  }
  const value = sessionStorage.getItem('mplWorkbenchNodeContextmenuStatus')

  if(value === null) {
    sessionStorage.setItem('mplWorkbenchNodeContextmenuStatus', 'close')
  }

  return value || 'close'
}