import type { DateRangePickerFormProp } from '../define'

export default (el: DateRangePickerFormProp): string => {
  return `
    <mpl-date-range-picker w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" />
  `
}
