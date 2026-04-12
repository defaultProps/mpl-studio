import type { SelectDialogFormProp } from '../define'

export default (el: SelectDialogFormProp): string => {
  return `
    <mpl-select-dialog w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" :rules="mpl.${el.cid}.rule" />
  `
}
