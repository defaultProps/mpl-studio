import type { ColorPickerFormProp } from '../define'

export default (el: ColorPickerFormProp): string => {
  return `
    <mpl-color-picker w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" />
  `
}
