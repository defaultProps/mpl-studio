import { CollapseProp } from '../define'

export default (el: CollapseProp): string => {
  return `
    <mpl-collapse w='${el.pos.pc.w}' h='${el.pos.pc.h}' v-model="mpl.${el.cid}" cid="${el.cid}" />
  `
}
