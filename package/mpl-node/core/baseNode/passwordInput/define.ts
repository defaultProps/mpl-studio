import type {
  ComponentBaseExport,
  FormItemSize,
  FormLabelProp,
  Node,
  NodePos,
  BaseBtn,
  FormItemRule
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
  suffixIcon: string
  clearable: boolean
  rules: FormItemRule[];
  readonly: boolean
  placeholder: string
}

function pos(): { pc: NodePos, mobile: NodePos } {
  return {
    pc: {
      w: 6,
      h: 4,
      minH: 5,
      maxH: 7,
      minW: 1,
      type: 'h',
      mod: 'formItem',
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

export interface PasswordInputFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  input: PasswordInputNodeProp
  pos: { pc: NodePos, mobile: NodePos }
  slotBtn: BaseBtn[]
}

export function newPasswordInputNode(cid: string): PasswordInputFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '密码输入',
    mpl_zh: '密码',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    cid,
    visible: true,
    tag: 'mpl-password',
    size: 'small',
    childIds: [],
    classList: [],
    userClassName: [],
    style: '',

    label: {
      show: true,
      width: 120,
      text: '密码输入框',
      pos: 'r',
      icon: '',
      iconTheme: '#c3002f',
      iconText: '基础信息',
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
      rules: [
        {
          mod: 'system',
          trigger: ['blur'],
          option: [
            { value: 'required', message: '请输入' }
          ],
          message: ''
        }
      ]
    },
    slotBtn: [],
    events: [],
    pos: pos(),
  }
}

function getTemplateCode(node: PasswordInputFormProp): string {

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

  // todo: 紧凑源码的生成，延后做
  // 思路：默认使用静态文本写入template. 当存在赋值操作时，即[watchEffect () => mpl.var.fb4rg5.label] // 源码存在时替换静态文本
  // 性能比较缓慢，每个组件仅部分使用其动态，大部分默认为静态

  return `
		<!-- 密码输入框 template 节点源码 -->
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

// 获取输入框组件的全部变量
function getNodeVar(node: PasswordInputFormProp): string {
  console.log(node)

  return `
    // 密码输入框组件变量
    const mplVar = {
      fb4rg5: {
        visible: true, // 显示控件
        label: {
          visible: true, // 显示标题
          vModel: '', // 标题值
          icon: {
            tooltip: "label tooltip"
          }
        },
        input: {
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

export const passwordInput: ComponentBaseExport = {
  tag: 'mpl-password',
  comp: newPasswordInputNode,
  pos: pos(),
  events: [
    { name: 'input', desc: '输入时', code: `console.log(value)`, type: 'flow' },
    { name: 'focus', desc: '聚焦时', code: '', type: 'flow' },
    { name: 'blur', desc: '失焦时', code: `console.log(value)`, type: 'flow' },
    { name: 'change', desc: '输入内容改变时', code: '', type: 'flow' },
    { name: 'clear', desc: '点击清空图标', code: '', type: 'flow' },
  ],
  getContextmenu: (node: PasswordInputFormProp) => {
    console.log(node)
    return []
  },
  getTemplateCode,
  getNodeVar
}
