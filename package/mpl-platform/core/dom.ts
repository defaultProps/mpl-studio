export function rendererContextmenu(e: MouseEvent, menu: any[]): { top: number, left: number } {
  const len = menu.length
  const { pageX, pageY } = e
  const defaultMenuItemHeight = 35

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

  return resultPos
}
