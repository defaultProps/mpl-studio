import { SearchBoxProp } from '../define'

export default (el: SearchBoxProp): string => {
  return `
    <mpl-base-input w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" :rule="rules.${el.cid}" />
  `
}
