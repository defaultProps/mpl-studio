import { SingleInputFormProp } from '../define'

export default (el: SingleInputFormProp): string => {
  // mpl.cid 存储组件的所有有效变量。包括时间事件方法、变量。
  return `<mpl-form-item type="baseInput" :node="mpl.${el.cid}" cid="${el.cid}" mpl-note />`
}
