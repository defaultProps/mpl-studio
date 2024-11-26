import type { InjectionKey, Ref } from 'vue'
import type MPL from '@mpl/typings'

type NodeClick = (cid: string) => void
type NodeContextmenu = (e: MouseEvent, node: MPL.Node) => void

export const VISIBLE_NOTE: InjectionKey<Ref<boolean>> = Symbol('visibleNote') //  是否显示注解
export const IS_DRAGGER: InjectionKey<Ref<boolean>> = Symbol('isDragging')
export const ACTIVE_NODE: InjectionKey<Ref<MPL.Node | null>> = Symbol('activeNode')
export const DRAG_START_NODE: InjectionKey<Ref<MPL.Node | null>> = Symbol('dragStartNode')
export const NODE_CLICK: InjectionKey<Ref<NodeClick>> = Symbol('nodeClick')
export const NODE_CONTEXTMENU: InjectionKey<Ref<NodeContextmenu>> = Symbol('nodeContextmenu')

export default {
  VISIBLE_NOTE,
  IS_DRAGGER,
  ACTIVE_NODE,
  DRAG_START_NODE,
  NODE_CLICK,
  NODE_CONTEXTMENU,
}
