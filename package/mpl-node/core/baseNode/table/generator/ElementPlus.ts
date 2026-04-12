import type { BaseTableProp } from '../define'

export default (el: BaseTableProp): string => {
  return `
    <mpl-table w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" :rules="mpl.${el.cid}.rule" />
  `
}
