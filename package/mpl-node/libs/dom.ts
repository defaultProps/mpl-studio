// 点击事件触发赋值变量悬浮框
export function tooltipCopyEvent(screenX: number, screenY: number, text: string):void {
  console.log(screenX, screenY, window.screen.width)

  let dom = document.getElementById("mplRightBarSettingToolTipNode")

  if (!dom) {
    dom = document.createElement('div')
    dom.setAttribute('id', 'mplRightBarSettingToolTipNode')
    document.body.appendChild(dom)
  }

  if(dom) {
    dom.classList.add('visible-tooltip')

    dom.innerText = text
    dom.style.right = window.screen.width - screenX + 'px'
    dom.style.top = screenY + 'px'

    setTimeout(() => {
      // dom.classList.remove('visible-tooltip')
    }, 500)
  }
}