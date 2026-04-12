import { SingleInputFormProp } from '../define'

export default (el: SingleInputFormProp): string => {
  return `<mpl-base-input :node="mpl.${el.cid}" cid="${el.cid}" />`
}
