import type { InjectionKey, Ref } from 'vue'
import type { Node } from '@mpl/typings'

type NodeClick = (cid: string) => void
type UpdateNodeProp = (cid: string, node: any) => void
type ChangeNode = (node: Node) => void
type AddActiveNodeEvent = (event: { name: string, code: string, desc: string, cid: string }) => void
type RemoveActiveNodeEvent = (event: { cid: string, name: string }) => void

export const VISIBLE_BTN_GROUP: InjectionKey<Ref<boolean>> = Symbol('visibleBtnGroup') //  是否显示辅助工具栏
export const IS_DRAGGER: InjectionKey<Ref<boolean>> = Symbol('isDragging')
export const ACTIVE_NODE: InjectionKey<Ref<Node | null>> = Symbol('activeNode')
export const DRAG_START_NODE: InjectionKey<Ref<Node | null>> = Symbol('dragStartNode')
export const NODE_CLICK: InjectionKey<Ref<NodeClick>> = Symbol('nodeClick')
export const UPDATE_NODE_PROP: InjectionKey<Ref<UpdateNodeProp>> = Symbol('updateNodeProp')
export const CHANGE_NODE: InjectionKey<Ref<ChangeNode>> = Symbol('changeNode')
export const ADD_ACTIVE_NODE_EVENT: InjectionKey<Ref<AddActiveNodeEvent>> = Symbol('addActiveNodeEvent')
export const REMOVE_ACTIVE_NODE_EVENT: InjectionKey<Ref<RemoveActiveNodeEvent>> = Symbol('removeActiveNodeEvent')

export default {
  VISIBLE_BTN_GROUP,
  IS_DRAGGER,
  ACTIVE_NODE,
  DRAG_START_NODE,
  NODE_CLICK,
  UPDATE_NODE_PROP,
  CHANGE_NODE
}
