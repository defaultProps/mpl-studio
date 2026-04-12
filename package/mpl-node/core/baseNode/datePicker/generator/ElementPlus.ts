import type { DatePickerFormProp } from '../define'

export default (el: DatePickerFormProp): string => {
  return `
    <mpl-date-picker w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" />
  `
}
