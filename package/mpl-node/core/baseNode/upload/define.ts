import type { ComponentBaseExport, FormItemSize, FormLabelProp, Node, NodePos, FormItemRule } from '@mpl/typings'
import type { UploadUserFile } from 'element-plus'

// 普通文件上传。仅仅支持小文件上传。大文件上传请使用高级控件 mpl-upload-pro
export interface UploadInputNode {
  model: UploadUserFile[]
  size: 'sm' | 'm' | 'l'
  pos: 'l' | 'c' | 'r'
  required: boolean
  limit: number // 限制上传数量
  clearable: boolean // 一键清空
  multiple: boolean // 支持批量上传
  readonly: boolean
  placeholder: string
  rules: FormItemRule[]
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 20,
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

export interface UploadInputFormProp extends Node {
  label: FormLabelProp
  size: FormItemSize
  upload: UploadInputNode
  pos: { pc: NodePos; mobile: NodePos }
}

export function newUploadInputNode(cid: string): UploadInputFormProp {
  return {
    mpl_group: '表单控件',
    mpl_title: '基础上传',
    mpl_zh: '基础上传',
    mpl_ce: 'c',
    mpl_version: '1.0.0',
    field: '',
    cid,
    tag: 'mpl-base-upload',
    size: 'small',
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    visible: '1',
    visibleType: 'default',
    label: {
      show: true,
      width: 120,
      text: '附件上传标题',
      pos: 'r',

      icon: 'icon-info2',
      iconTheme: '#C3002F',
      iconText: '基础信息'
    },
    upload: {
      required: false,
      model: [],
      size: 'sm',
      pos: 'l',
      limit: 1,
      clearable: true,
      readonly: false,
      multiple: false,
      placeholder: '请输入',
      rules: [
        {
          type: 'system',
          option: [{ type: 'required', message: '请输入', trigger: ['change'] }],
          code: ''
        }
      ]
    },
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos()
  }
}

function getTemplateCode(node: UploadInputFormProp): string {
  // todo: 紧凑源码的生成，延后做
  // 思路：默认使用静态文本写入template. 当存在赋值操作时，即[watchEffect () => mpl.var.fb4rg5.label] // 源码存在时替换静态文本
  // 性能比较缓慢，每个组件仅部分使用其动态，大部分默认为静态

  return `
		<!-- 1、基础输入框 template 节点源码 -->
    <!-- 2、DOM只占一行，编辑template时，一次只能编辑一行。用户选择编辑的行【即DOM】，MPL展示该DOM的所有属性，用户选择属性或新增属性进行编辑更新。 -->
    <!-- 3、用户选择属性【属性需要根据MPL规则展示可编辑的范围，更换绑定、变量替换、禁止编辑、删除属性等】 -->
    <!-- 4、新增属性【查看是否存在冲突、key-value合法性】-->

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

export const uploadInputNode: ComponentBaseExport = {
  tag: 'mpl-base-upload',
  comp: newUploadInputNode,
  pos: pos(),

  getTemplateCode,
  getNodeVar: (node: UploadInputFormProp) => {
    return []
  }
}
