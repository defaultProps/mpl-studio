import type { RateFormProp } from '../define'

export default (el: RateFormProp): string => {
  return `
    <mpl-rate w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" :rules="mpl.${el.cid}.rule" />
  `
}
