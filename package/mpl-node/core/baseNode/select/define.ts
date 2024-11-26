import type {
  BaseBtn,
  ComponentBaseExport,
  FormItemSize,
  FormLabelProp,
  Node,
  EventNode,
  ServiceBindNode,
  NodePos,
} from "@mpl/typings";

const selectEvents: EventNode[] = [
  { name: 'input', desc: '输入内容时', code: '', type: 'flow' },
  { name: 'focus', desc: '获取焦点时', code: '', type: 'flow' },
  { name: 'blur', desc: '失去焦点时', code: '', type: 'flow' },
  { name: 'change', desc: '输入内容改变时', code: '', type: 'flow' },
  { name: 'clear', desc: '点击清空时', code: '', type: 'flow' },
  { name: 'removeTag', desc: '多选Tag移除时', code: '', type: 'flow' },
  { name: 'visibleChange', desc: '开启/关闭选项', code: '', type: 'flow' },
]

export function getDefaultSelectOptions() {
  return [
    { label: '北京', value: 'beiJin' },
    { label: '上海', value: 'shangHai' },
    { label: '广州', value: 'guangZhou' },
    { label: '杭州', value: 'hangZhou' },
    { label: '佛山', value: 'foShan' },
    { label: '长沙', value: 'changSha' },
  ]
}

export interface SelectNode {
  mode: 'onlySelect' | 'input' | 'tag' | 'tagInput'
  model: string
  width: number | '' // 0 代表全宽
  size: 'sm' | 'm' | 'l'
  maxlength: number | ''
  minlength: number | ''
  pos: 'l' | 'c' | 'r'
  required: boolean
  clearable: boolean
  readonly: boolean
  placeholder: string
  service: ServiceBindNode
  prefixIcon: string
  suffixIcon: string
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 6,
      h: 4,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: "w",
      mod: "formItem",
    },
    mobile: {
      w: 24,
      h: '76px',
      minH: 8,
      maxH: 20,
      minW: 24,
      type: "h",
      mod: "formItem",
    }
  }
}

export interface SelectFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  footerSlotSize: FormItemSize // 底部占位的信息位置。如果检测出错误信息显示时此占位江自动设置为最高。关闭用户配置项。
  select: SelectNode
  slotBtn: BaseBtn[];
  pos: { pc: NodePos, mobile: NodePos }
}

export function newSelectNode(cid: string): SelectFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '下拉选择',
    mpl_zh: '下拉选择',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    cid,
    visible: true,
    tag: 'mpl-select',
    childIds: [],
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '下拉选择',
      pos: 'r',
      icon: 'icon-info2',
      iconTheme: '#e6a23c',
      iconText: '基础信息',
    },
    size: 'small',
    footerSlotSize: 'small',
    select: {
      required: false,
      width: 0,
      size: 'sm',
      pos: 'l',
      maxlength: 10,
      minlength: 0,
      mode: 'onlySelect',
      model: '',
      clearable: true,
      readonly: false,
      placeholder: '请选择',
      service: {
        mode: 'static',
        labelKey: 'label',
        valueKey: 'value',
        staticData: getDefaultSelectOptions(),
        defaultValue: '',
      },
      prefixIcon: '',
      suffixIcon: ''
    },
    slotBtn: [],
    events: [],
    pos: pos(),
  }
}

function getTemplateCode(node: SelectFormProp): string {
  let eventStr = ''

  if (node.events.includes('input')) {
    eventStr += ` @input="mpl.${node.cid}.input"`
  }
  if (node.events.includes('change')) {
    eventStr += ` @change="mpl.${node.cid}.change"`
  }
  if (node.events.includes('blur')) {
    eventStr += ` @blur="mpl.${node.cid}.blur"`
  }
  if (node.events.includes('focus')) {
    eventStr += ` @focus="mpl.${node.cid}.focus"`
  }
  if (node.events.includes('disabled')) {
    eventStr += ` :disabled="mpl.${node.cid}.disabled"`
  }
  if (node.events.includes('readonly')) {
    eventStr += ` :readonly="mpl.${node.cid}.readonly"`
  }
  if (node.events.includes('visible')) {
    eventStr += ` :visible="mpl.${node.cid}.visible"`
  }

  if (node.events.includes('clearable')) {
    eventStr += ` :clearable="mpl.${node.cid}.clearable"`
  }

  if (node.events.includes('placeholder')) {
    eventStr += ` :placeholder="mpl.${node.cid}.placeholder"`
  }

  return `
    <!-- 基础输入框 template 节点源码 -->
		<div class="mpl-form-item mpl-input--fb4rg5">
			<div class="mpl-label">{{ mpl.variable.fb4rg5.label }}</div>
			<div class="mpl-content">
				<el-input
          ${eventStr}
          :placeholder="mpl.${node.cid}.placeholder"
          :clearable="mpl.${node.cid}.clearable"
        />
			</div>
		</div>
  `
}

function getNodeVar(node: SelectFormProp): string {
  console.log(node)

  return `
    // 下拉框组件变量
    const mplVar = {
      ${node.cid}: {
        visible: true, // 显示控件
        label: {
          visible: true, // 显示标题
          vModel: '', // 标题值
          icon: {
            tooltip: "label tooltip" // 图表tooltip内容
          }
        },
        select: {
          visible: true, // 显示输入框
          vModel: "", // 输入框值
          disabled: false,
          readonly: false,
          clearable: true
        }
      }
    }
  `
}

export const selectNode: ComponentBaseExport = {
  tag: 'mpl-select',
  comp: newSelectNode,
  pos: pos(),
  events: selectEvents,
  getContextmenu: () => [],
  getTemplateCode,
  getNodeVar
}
