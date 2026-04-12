import type {
  ComponentBaseExport, FormItemSize, FormItemRule,
  FormLabelProp, Node, ContextMenuNode, EventNode,
  ServiceFormBindNode, NodePos, SLOT_NODE
} from '@mpl/typings'

import { SERVICE_MODE } from '@mpl/const'

const selectEvents: EventNode[] = [
  { name: 'input', desc: '输入内容时', code: '', open: false, type: 'baseComponent', flowType: '', tag: 'mpl-select', cid: '' },
  { name: 'focus', desc: '获取焦点时', code: '', open: false, type: 'baseComponent', flowType: '', tag: 'mpl-select', cid: '' },
  { name: 'blur', desc: '失去焦点时', code: '', open: false, type: 'baseComponent', flowType: '', tag: 'mpl-select', cid: '' },
  { name: 'change', desc: '输入内容改变时', code: '', open: false, type: 'baseComponent', flowType: '', tag: 'mpl-select', cid: '' },
  { name: 'clear', desc: '点击清空时', code: '', open: false, type: 'baseComponent', flowType: '', tag: 'mpl-select', cid: '' },
  { name: 'removeTag', desc: '多选Tag移除时', code: '', open: false, type: 'baseComponent', flowType: '', tag: 'mpl-select', cid: '' },
  { name: 'visibleChange', desc: '开启/关闭选项', code: '', open: false, type: 'baseComponent', flowType: '', tag: 'mpl-select', cid: '' }
]

export function getDefaultSelectOptions() {
  return [
    { label: '北京', value: 'beiJin' },
    { label: '上海', value: 'shangHai' },
    { label: '广州', value: 'guangZhou' },
    { label: '杭州', value: 'hangZhou' },
    { label: '佛山', value: 'foShan' },
    { label: '长沙', value: 'changSha' }
  ]
}

export interface SelectNode {
  mode: 'onlySelect' | 'input' | 'tag' | 'tagInput'
  modelType: 'custom' | 'default' // 绑定值类型。自定义或默认值。默认值为手动输入值, 自定义为通过前端API获取
  model: string
  width: number | '' // 0 代表全宽
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
  clearable: boolean
  readonly: boolean
  placeholder: string
  service: ServiceFormBindNode
  prefixIcon: string
  suffixIcon: string
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

export interface SelectFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize // 底部占位的信息位置。如果检测出错误信息显示时此占位江自动设置为最高。关闭用户配置项。
  select: SelectNode
  pos: { pc: NodePos; mobile: NodePos }
  rule: FormItemRule
  slotNodes: SLOT_NODE[]
  note: {
    open: boolean
    tip: string
    text: string
  }
}

export function newSelectNode(cid: string): SelectFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '下拉选择',
    mpl_zh: '下拉选择',
    mpl_ce: 'c',

    rule: {
      type: 'system',
      code: '',
      option: [
        {
          type: 'required',
          message: '请输入',
          trigger: ['change']
        }
      ]
    },

    mpl_version: '1.0.0',
    field: '',
    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-select',
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '下拉选择标题',
      pos: 'r',

      icon: 'icon-info2',
      iconTheme: '#e6a23c',
      iconText: '基础信息'
    },
    size: 'small',
    footerSlotSize: 'small',
    select: {
      required: false,
      width: 0,
      size: 'sm',
      pos: 'l',
      mode: 'onlySelect',
      modelType: 'default',
      model: '',
      clearable: true,
      readonly: false,
      placeholder: '请选择',
      service: {
        mode: SERVICE_MODE.STATIC,
        methodName: '',
        methodCode: '',
        labelKey: 'label',
        valueKey: 'value',
        staticData: getDefaultSelectOptions(),
        postman: {
          url: '',
          methods: 'get',
          params: []
        }
      },
      prefixIcon: '',
      suffixIcon: ''
    },
    slotNodes: [],
    note: {
      open: false,
      tip: '',
      text: ''
    },
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos()
  }
}

function getTemplateCode(node: SelectFormProp): string {
  return `
    <!-- 基础输入框 template 节点源码 -->
		<div class="mpl-form-item mpl-input--fb4rg5">
			<div class="mpl-label">{{ mpl.variable.fb4rg5.label }}</div>
			<div class="mpl-content">
				<el-input
          :placeholder="mpl.${node.cid}.placeholder"
          :clearable="mpl.${node.cid}.clearable"
        />
			</div>
		</div>
  `
}

export const selectNode: ComponentBaseExport = {
  tag: 'mpl-select',
  comp: newSelectNode,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: SelectFormProp) => {
    return []
  }
}
