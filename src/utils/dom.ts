import { mplIframePostMessage } from '@mpl/const'

// 组件开始拖动立即触发画板初始化节点
export function dragNewCompStart(el: any, tag: string) {
  el.dataTransfer?.setData('tag', tag)
  el.dataTransfer.effectAllowed = 'move'
  el.dataTransfer.dropEffect = 'move'
  mplIframePostMessage.workbench.dragStartElement(tag)
}
