import type {
  ComponentBaseExport,
  FormItemSize,
  SLOT_NODE,
  FormLabelProp,
  Node,
  NodePos,
  FormItemRule,
  LimitInputProp,
  NodeVar,
} from '@mpl/typings'

export interface SingleInputNode {
  model: string
  modelType: 'custom' | 'default' // 绑定值类型。自定义或默认值。默认值为手动输入值, 自定义为通过前端API获取
  width: number | '' // 0 代表全宽
  size: 'sm' | 'm' | 'l'
  maxlength: number | ''
  pos: 'l' | 'c' | 'r'
  required: boolean
  showLimit: boolean
  prefixIcon: string
  suffixIcon: string
  clearable: boolean
  readonly: boolean
  placeholder: string
  maxLength: number | ''
  prop: string
  limit: LimitInputProp[]
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

export interface SingleInputFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  input: SingleInputNode
  rule: FormItemRule
  slotNodes: SLOT_NODE[]
  note: {
    open: boolean
    tip: string
    text: string
  }
  pos: { pc: NodePos; mobile: NodePos }
}

export function newSingleInputNode(cid: string): SingleInputFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '基础输入',
    mpl_zh: '基础输入框',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    field: '',
    cid,
    tag: 'mpl-input',
    size: 'small',
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    visible: '1',
    visibleType: 'default',
    note: {
      open: false,
      tip: '',
      text: ''
    },
    label: {
      show: true,
      width: 120,
      text: '基础输入',
      pos: 'r',
      icon: 'AlertCircle',
      iconTheme: '#C3002F',
      iconText: '基础信息'
    },
    input: {
      required: false,
      model: '',
      modelType: 'default',
      suffixIcon: '',
      prefixIcon: '',
      width: '',
      size: 'sm',
      limit: [],
      pos: 'l',
      maxlength: 10,
      prop: 'prop',
      showLimit: false,
      clearable: true,
      readonly: false,
      maxLength: '',
      placeholder: '请输入',
    },
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
    defaultEvents: [
      {
        name: `mpl_input_input_${cid}`,
        desc: '输入时',
        code: `
          mpl_input_input_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-input'
      },
      {
        name: `mpl_input_focus_${cid}`,
        desc: '聚焦时',
        code: `
          mpl_input_focus_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-input'
      },
      {
        name: `mpl_input_blur_${cid}`,
        desc: '失焦时',
        code: `
          mpl_input_blur_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-input'
      },
      {
        name: `mpl_input_change_${cid}`,
        desc: '内容改变',
        code: `
          mpl_input_change_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-input'
      },
      {
        name: `mpl_input_clear_${cid}`,
        desc: '点击清空',
        code: `
          mpl_input_clear_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        cid,
        tag: 'mpl-input'
      },
    ],
    // 存储动态事件
    events: [],
    variables: [],
    slotNodes: [],
    pos: pos()
  }
}

function getTemplateCode(node: SingleInputFormProp): string {
  // todo: 紧凑源码的生成, 延后做
  // 思路：默认使用静态文本写入template. 当存在赋值操作时, 即[watchEffect () => $.var.fb4rg5.label] // 源码存在时替换静态文本
  // 性能比较缓慢, 每个组件仅部分使用其动态, 大部分默认为静态

  return `
		<!-- 1、基础输入框 template 节点源码 -->
    <!-- 2、DOM只占一行, 编辑template时, 一次只能编辑一行。用户选择编辑的行【即DOM】, MPL展示该DOM的所有属性, 用户选择属性或新增属性进行编辑更新。 -->
    <!-- 3、用户选择属性【属性需要根据MPL规则展示可编辑的范围, 更换绑定、变量替换、禁止编辑、删除属性等】 -->
    <!-- 4、新增属性【查看是否存在冲突、key-value合法性】-->

		<div class="mpl-form-item mpl-input--fb4rg5">
			<div class="mpl-label">{{ mpl.var.fb4rg5.label }}</div>
			<div class="mpl-content">
				<el-input
          :placeholder="mpl.var.${node.cid}.placeholder"
          :clearable="mpl.var.${node.cid}.clearable"
        />
			</div>
		</div>
	`
}

export const singleInputNode: ComponentBaseExport = {
  tag: 'mpl-input',
  comp: newSingleInputNode,
  pos: pos(),
  getTemplateCode,
  getBaseVar: (cid: string) => {
    return `
      ${cid}: { 
        vModel: '',
        disabled: false,
      }
    `
  },
  getNodeVar: (node: SingleInputFormProp): NodeVar[] => {
    // 如果有子组件, 也根据该组件获取动态变量
    const prefix = `${node.mpl_title} / ${node.mpl_zh}`
    // >>

    return [
      { desc: `${prefix} / 显示隐藏`, key: 'visible', value: true, fullPath: `${node.cid}.visible` },
      { desc: `${prefix} / 绑定值`, key: 'vModel', value: '', fullPath: `${node.cid}.vModel` },
      { desc: `${prefix} / 必填`, key: 'required', value: false, fullPath: `${node.cid}.required` },
      { desc: `${prefix} / 禁用`, key: 'disabled', value: false, fullPath: `${node.cid}.disabled` },
      { desc: `${prefix} / 只读`, key: 'readonly', value: false, fullPath: `${node.cid}.readonly` },
      { desc: prefix, key: 'cid', value: 'cid', fullPath: node.cid },
    ]
  }
}
