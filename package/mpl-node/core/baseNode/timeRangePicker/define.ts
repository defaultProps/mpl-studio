import type { ComponentBaseExport, FormItemSize, FormLabelProp, Node, NodePos, SlotSubNode } from '@mpl/typings'

export interface TimeRangePickerNode {
  model: null | string[]
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
  placeholder: string
  type: 'yearrange' | 'monthrange' | 'daterange' | 'datetimerange'
  prop: string
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 6,
      h: 4,
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

export interface TimeRangePickerFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize
  timeRangePicker: TimeRangePickerNode
  slotNodes: SlotSubNode[]
  pos: { pc: NodePos; mobile: NodePos }
}

export function newTimeRangePickerNode(cid: string): TimeRangePickerFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '时间范围控件',
    mpl_zh: '时间范围控件',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    field: '',

    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-time-range-picker',
    mpl_children: [],
    events: [],
    variables: [],
    defaultEvents: [
      {
        name: `mpl_timeRangePicker_change_${cid}`,
        desc: '内容改变',
        code: `
          mpl_timeRangePicker_change_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-time-range-picker'
      },
      {
        name: `mpl_timeRangePicker_clear_${cid}`,
        desc: '点击清空',
        code: `
          mpl_timeRangePicker_clear_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-time-range-picker'
      },
    ],
    pos: pos(),
    classList: [],
    userClassName: [],
    style: '',

    slotNodes: [],
    label: {
      show: true,
      width: 120,
      text: '时间范围标题',
      pos: 'r',
      icon: '',

      iconTheme: '#1E1E1E',
      iconText: ''
    },
    size: 'small',
    footerSlotSize: 'small',
    timeRangePicker: {
      model: [],
      size: 'sm',
      pos: 'l',
      required: false,
      placeholder: '请输入',
      type: 'daterange',
      prop: 'timeRangePicker'
    }
  }
}

function getTemplateCode(node: TimeRangePickerNode): string {
  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}

export const timeRangePickerNode: ComponentBaseExport = {
  tag: 'mpl-time-range-picker',
  comp: newTimeRangePickerNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: TimeRangePickerFormProp) => {
    return []
  }
}
