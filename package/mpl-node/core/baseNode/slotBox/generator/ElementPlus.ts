import type { SlotBoxProp } from '../define'

export default (node: SlotBoxProp) => {
  const slotNode = node
  return `
    <mpl-slot-box w='${node.pos.pc.w}' h='${node.pos.pc.h}' v-model="mpl.${node.cid}" cid="${node.cid}">
      ${slotNode}
    </mpl-slot-box>
  `
}
