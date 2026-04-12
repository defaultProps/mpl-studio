import type { TimePickerFormProp } from '../define'

export default (el: TimePickerFormProp): string => {
  return `
    <mpl-time-picker w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" :rules="mpl.${el.cid}.rule" />
  `
}
