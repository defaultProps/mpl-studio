import { requiredVar } from './constant'

// 点击事件触发赋值变量悬浮框
export function tooltipCopyEvent(screenX: number, screenY: number, text: string): void {
  console.log(screenX, screenY, window.screen.width)

  let dom = document.getElementById('mplRightBarSettingToolTipNode')

  if (!dom) {
    dom = document.createElement('div')
    dom.setAttribute('id', 'mplRightBarSettingToolTipNode')
    document.body.appendChild(dom)
  }

  if (dom) {
    dom.classList.add('visible-tooltip')

    dom.innerText = text
    dom.style.right = window.screen.width - screenX + 'px'
    dom.style.top = screenY + 'px'

    setTimeout(() => {
      // dom.classList.remove('visible-tooltip')
    }, 500)
  }
}

// 检测页面必要变量是否存在
// const code = { 
//  pageDisabled: false, 
//  pageLoading: false, 
//  pageRules: [],
//  pageReadonly: false, 
//  pageData: {} 
// }
export function checkRequiredVar(code: string): boolean {
  // 检测页面必要变量是否存在
  for (const v of requiredVar) {
    if (!code.includes(v)) {
      return false
    }
  }
  return true
}