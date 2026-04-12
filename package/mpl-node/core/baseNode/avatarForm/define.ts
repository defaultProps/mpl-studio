import { NodePos, ComponentBaseExport, Node, ContextMenuNode } from '@mpl/typings'


// 仅仅支持头像展示，不支持头像上传、尺寸更改、预览。
export interface BaseAvatar extends Node {
  width: string
  height: number
  layout: 'shape' | 'circle' // 排版类型 shape circle
  upload: boolean // 支持上传
  accept: string[] // 上传图片类型
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 12,
      minH: 2,
      maxH: 0,
      type: 'wh',
      minW: 1,
      mod: 'formItem'
    },
    mobile: {
      wType: '%',
      hType: 'px',
      w: 24,
      h: 8,
      minH: 8,
      maxH: 20,
      minW: 24,
      type: 'h',
      mod: 'formItem'
    }
  }
}

export function newAvatarBox(cid: string): BaseAvatar {
  return {
    mpl_group: '容器类',
    mpl_title: '头像',
    mpl_version: '1.0.0',

    mpl_zh: '头像',
    mpl_ce: 'c',

    field: '',
    cid,
    tag: 'mpl-avatar',
    mpl_children: [],
    classList: ['flex-left'],
    userClassName: [],
    style: '',
    events: [], 
    variables: [], 
    defaultEvents: [],
    pos: pos(),
    width: '24',
    height: 20,
    visible: '1',
    visibleType: 'default',
    layout: 'shape',
    upload: true,
    accept: ['png', 'jpg', 'jpeg', 'svg']
  }
}

function getTemplateCode(node: BaseAvatar): string {
  // todo: 紧凑源码的生成，延后做
  // 思路：默认使用静态文本写入template. 当存在赋值操作时，即[watchEffect () => mpl.var.fb4rg5.label] // 源码存在时替换静态文本
  // 性能比较缓慢，每个组件仅部分使用其动态，大部分默认为静态



  return `
		<!-- 基础容器 template 节点源码 --> 
		<div class="mpl-base-box--fb4rg5" v-if="mplVar.fb4rg5.visible"></div>
	`
}


export const avatar: ComponentBaseExport = {
  tag: 'mpl-avatar',
  comp: newAvatarBox,
  pos: pos(),
  getTemplateCode,
  getNodeVar: (node: BaseAvatar) => {
    return [
      { desc: '显示隐藏', key: `mpl.${node.cid}.visible`, value: true },
      { desc: '绑定值', key: `mpl.${node.cid}.vModel`, value: '' },
      { desc: '必填', key: `mpl.${node.cid}.required`, value: false },
      { desc: '禁用', key: `mpl.${node.cid}.disabled`, value: false },
    ]
  }
}
