import type { NumberInputFormProp } from '../define'

export default (el: NumberInputFormProp): string => {
  return `
    <mpl-number-input w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" :rules="mpl.${el.cid}.rule" />
  `
}
