import { SearchBoxProp } from '../define'

export default (el: SearchBoxProp): string => {
  return `<mpl-base-input :node="mpl.${el.cid}" cid="${el.cid}" />`
}
