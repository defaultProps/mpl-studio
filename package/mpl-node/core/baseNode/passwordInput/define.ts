import type {
  ComponentBaseExport,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
  LimitInputProp,
  FormItemRule,
  SLOT_NODE,
  NodeVar
} from '@mpl/typings'


export interface PasswordInputNodeProp {
  model: string
  width: number | '' // 0 代表全宽
  size: 'sm' | 'm' | 'l'
  maxlength: number | ''
  pos: 'l' | 'c' | 'r'
  required: boolean
  showLimit: boolean
  prefixIcon: string
  modelType: 'custom' | 'default' // 绑定值类型。自定义或默认值。默认值为手动输入值, 自定义为通过前端API获取
  suffixIcon: string
  clearable: boolean
  readonly: boolean
  placeholder: string
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
      type: 'h',
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

export interface PasswordInputFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  input: PasswordInputNodeProp
  rule: FormItemRule
  pos: { pc: NodePos; mobile: NodePos }
  note: {
    open: boolean
    tip: string
    text: string
  }
  slotNodes: SLOT_NODE[]
}

export function newPasswordInputNode(cid: string): PasswordInputFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '密码输入',
    mpl_zh: '密码输入框',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    field: '',
    cid,
    visible: '1',
    visibleType: 'default',
    tag: 'mpl-password',
    size: 'small',
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    note: {
      open: false,
      tip: '',
      text: ''
    },

    label: {
      show: true,
      width: 120,
      text: '密码输入标题',
      pos: 'r',
      icon: '',

      iconTheme: '#c3002f',
      iconText: '基础信息'
    },
    input: {
      required: false,
      model: '',
      suffixIcon: '',
      prefixIcon: '',
      width: 0,
      size: 'sm',
      pos: 'l',
      maxlength: 10,
      showLimit: false,
      clearable: true,
      readonly: false,
      placeholder: '请输入',
      limit: [],
      modelType: 'default',
      prop: 'password'
    },
    rule: {
      type: 'system',
      code: '',
      option: []
    },
    slotNodes: [],
    events: [],
    variables: [],
    defaultEvents: [
      {
        name: `mpl_baseInput_${cid}`,
        desc: '输入时',
        code: `
          mpl_baseInput_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        tag: 'mpl_baseInput',
        cid,
      },
      {
        name: `mpl_baseInput_focus_${cid}`,
        desc: '聚焦时',
        code: `
          mpl_baseInput_focus_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        tag: 'mpl_baseInput',
        cid,
      },
      {
        name: `mpl_baseInput_blur_${cid}`,
        desc: '失焦时',
        code: `
          mpl_baseInput_blur_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        tag: 'mpl_baseInput',
        cid,
      },
      {
        name: `mpl_baseInput_change_${cid}`,
        desc: '内容改变',
        code: `
          mpl_baseInput_change_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        tag: 'mpl_baseInput',
        cid,
      },
      {
        name: `mpl_baseInput_clear_${cid}`,
        desc: '点击清空',
        code: `
          mpl_baseInput_clear_${cid}(value) {
            console.log(value)
          }
        `,
        open: false,
        type: 'baseComponent',
        flowType: '',
        tag: 'mpl_baseInput',
        cid,
      },
    ],
    pos: pos()
  }
}

function getTemplateCode(node: PasswordInputFormProp): string {
  // todo: 紧凑源码的生成，延后做
  // 思路：默认使用静态文本写入template. 当存在赋值操作时，即[watchEffect () => mpl.var.fb4rg5.label] // 源码存在时替换静态文本
  // 性能比较缓慢，每个组件仅部分使用其动态，大部分默认为静态

  return `
		<!-- 密码输入框 template 节点源码 -->
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


export const passwordInput: ComponentBaseExport = {
  tag: 'mpl-password',
  comp: newPasswordInputNode,
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
  getNodeVar: (node: PasswordInputFormProp): NodeVar[] => {
    // 如果有子组件, 也根据该组件获取动态变量
    const prefix = `${node.mpl_title} / ${node.mpl_zh}`

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
