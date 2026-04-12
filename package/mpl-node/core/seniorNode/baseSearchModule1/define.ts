import type { BaseBtn, ComponentBaseExport, FormItemNode, NodePos, Node, EventNode, ContextMenuNode } from '@mpl/typings'
import { newSingleInputNode } from '../../baseNode/baseInput/define'
import { newCid } from '@mpl/libs'


export interface BaseSearchModule1 {
  width: number | '' // 0 代表全宽
  size: 'sm' | 'm' | 'l' // 内间距设置尺寸
  limitLine: number // 收起时展示的列表行
  rowSpan: number // 一行展示多少项
  colSpan: number // 一行展示多少项
  // k: 1-2 v: cid // 组件位置映射关系
  mapNode: {
    [k: string]: string
  }
  title: string // 右上角查询标题
  slotNodes: FormItemNode[] // 查询组件集合
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 8,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: 'w',
      mod: 'formItem'
    },
    mobile: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 76,
      minH: 8,
      maxH: 20,
      minW: 24,
      type: 'h',
      mod: 'formItem'
    }
  }
}
export type BaseBtnSearchModule1 = BaseBtn & { pos: 'l' | 'c' | 'r' }

export interface BaseSearchModule1Prop extends Node {
  seniorNode: BaseSearchModule1
  visibleSlotBtn: boolean // 显示底部按钮组 - 不显示时展示效果与页签一致。
  slotBtn: BaseBtnSearchModule1[] // 底部按钮组
  pos: { pc: NodePos; mobile: NodePos }
}

// 展开关闭按钮
export function newBaseSearchModule1ExpandBtn(cid = newCid()): BaseBtnSearchModule1 {
  return {
    title: '',
    icon: '',
    disabledName: '',
    clickName: '',
    type: 'searchExpand',
    theme: '',
    cid: `searchModule1_${cid}`,
    visibleName: '',
    className: '',
    pos: 'l'
  }
}

// 重置按钮
export function newBaseSearchModule1ResetBtn(cid = newCid()): BaseBtnSearchModule1 {
  return {
    title: '',
    icon: '',
    disabledName: '',
    clickName: '',
    type: 'searchReset',
    theme: '',
    cid: `searchModule1_${cid}`,
    visibleName: '',
    className: '',
    pos: 'l'
  }
}

// 提交按钮
export function newBaseSearchModule1SubmitBtn(cid = newCid()): BaseBtnSearchModule1 {
  const _cid = newCid()

  return {
    title: '查询',
    icon: '',
    disabledName: `disabled_${_cid}_${cid}`,
    clickName: `基础查询1_查询_${cid}`,
    type: 'searchSubmit',
    theme: '',
    cid: `${cid}_expandBtn`,
    visibleName: `visible_${_cid}_${cid}`,
    className: '',
    pos: 'l'
  }
}

export function newBaseSearchModule1(cid: string): BaseSearchModule1Prop {
  return {
    mpl_group: '表单控件',
    mpl_title: '基础查询1',
    mpl_zh: '基础查询1',
    mpl_ce: 'e',
    mpl_version: '1.0.0',
    field: '',

    cid,
    tag: 'mpl-baseSearchModule1',
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    visible: '1',
    visibleType: 'default',
    seniorNode: {
      width: 24,
      size: 'm',
      limitLine: 3,
      rowSpan: 3,
      colSpan: 3,
      mapNode: {},
      title: '标题查询',
      slotNodes: [newSingleInputNode(newCid())]
    },
    visibleSlotBtn: true,
    events: [],
    variables: [],
    defaultEvents: [],
    slotBtn: [newBaseSearchModule1ExpandBtn(cid), newBaseSearchModule1ResetBtn(cid), newBaseSearchModule1SubmitBtn(cid)],
    pos: pos()
  }
}

function getTemplateCode(node: BaseSearchModule1Prop): string {
  return ``
}

export const baseSearchModule1Node: ComponentBaseExport = {
  tag: 'mpl-baseSearchModule1',
  comp: newBaseSearchModule1,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: BaseSearchModule1Prop) => {
    return []
  }
}
