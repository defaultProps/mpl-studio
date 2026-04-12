import type { SwitchFormProp } from '../define'

export default (el: SwitchFormProp): string => {
  return `
    <mpl-switch w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" :rules="mpl.${el.cid}.rule" />
  `
}
