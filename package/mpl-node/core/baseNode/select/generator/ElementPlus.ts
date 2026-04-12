import type { SelectFormProp } from '../define'

export default (el: SelectFormProp): string => {
  return `
    <mpl-select w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" :rules="mpl.${el.cid}.rule" />
  `
}
