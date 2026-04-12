import type { CheckboxFormProp } from '../define'

export default (el: CheckboxFormProp): string => {
  return `
    <mpl-check-group w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" :rules="mpl.${el.cid}.rule" />
  `
}