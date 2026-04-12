import type { ButtonProp } from '../define'

export default (el: ButtonProp): string => {
  return `
    <mpl-btn v-model="mpl.${el.cid}" cid="${el.cid}" />
  `
}
