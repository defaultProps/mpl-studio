import type { NodePos } from '@mpl/typings'

function updateAttributeNode(dom: HTMLElement, pos: NodePos): HTMLElement {
  dom.className = ''
  // 弹框控件
  if (pos.mod === 'dialog') {
    dom.classList.add('workbench-highlight-block--dialog')
    dom.style.cssText = `display: inline-block;`
  }
  else if (pos.mod === 'drawer') {
    dom.classList.add('workbench-highlight-block--drawer')
    dom.style.cssText = `display: inline-block;`
  }

  // 其他控件
  else {
    dom.style.cssText = `display: inline-block;`
    // 移动端
    if (window.mplHighlightBlockSize[1].indexOf('px') >= 0 || +window.mplHighlightBlockSize[1] === 0) {
      dom.style.cssText += `height:${window.mplHighlightBlockSize[1]};`
      dom.classList.add(window.mplHighlightBlockSize[0])
    } else {
      dom.classList.add(...window.mplHighlightBlockSize)
    }

    dom.classList.remove('workbench-highlight-block--drawer', 'workbench-highlight-block--dialog')
  }

  return dom
}

/**
 *
 * @param el 拖动控件对象
 * @param pos 拖动组件位置对象
 * @return void
 */
export function dragOverElement(el: DragEvent, pos: NodePos) {
  let dom = window.draggingBlock

  if (!dom) {
    dom = document.createElement('div')
    dom.setAttribute('id', 'highlightBlock')

    window.draggingBlock = dom

    const targetDOM = el.target as HTMLElement

    targetDOM.appendChild(updateAttributeNode(dom, pos))
  }
  else {
    //
  }

  dom.className = ''

  // 弹框控件
  if (pos.mod === 'dialog') {
    dom.classList.add('workbench-highlight-block--dialog')
    dom.style.cssText = `width: ${pos.w}; height: ${pos.h};display: inline-block;`
  }
  else if (pos.mod === 'drawer') {
    dom.classList.add('workbench-highlight-block--drawer')
    dom.style.cssText = `display: inline-block; width:${pos.w};`
  }

  // 其他控件
  else {
    dom.style.cssText = `display: inline-block;`
    if (window.mplHighlightBlockSize[1].indexOf('px') >= 0 || +window.mplHighlightBlockSize[1] === 0) {
      dom.style.cssText += `height:${window.mplHighlightBlockSize[1]};`
      dom.classList.add(window.mplHighlightBlockSize[0])
    } else {
      dom.classList.add(...window.mplHighlightBlockSize)
    }
    dom.classList.remove('workbench-highlight-block--drawer', 'workbench-highlight-block--dialog')
  }

  const targetDOM = el.target as HTMLElement

  targetDOM.appendChild(dom)
}
