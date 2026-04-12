import type { NodePos } from '@mpl/typings'

/**
 *
 * @param el 拖动控件对象
 * @param pos 拖动组件位置对象
 * @return void
 */
export function dragOverElement(el: DragEvent, pos: NodePos) {
  let dom = document.getElementById('highlightBlock')

  if (!dom) {
    dom = document.createElement('div')
    dom.setAttribute('id', 'highlightBlock')
  }

  dom.className = ''

  // 弹框控件
  if (pos.mod === 'dialog') {
    dom.classList.add('workbench-highlight-block--dialog')
    dom.style.cssText = `width: ${pos.w}px; height: ${pos.h}px;display: inline-block;`
  }
  // 抽屉控件
  else if (pos.mod === 'drawer') {
    dom.classList.add('workbench-highlight-block--drawer')
    dom.style.cssText = `display: inline-block; width:${pos.w}px;`
  }
  // 插槽控件
  else if (pos.mod === 'slot') {
    dom.style.cssText = `display: inline-block;height: 100%;width: 100%`
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
