import type { ComponentBaseExport, NodePos, Node } from '@mpl/typings'

export interface QrCodeNode {
  color: string // 码颜色
  bgColor: string // 背景色
  directionUI: 'a' | 'b' | 'c' | 'd' | 'e' // 码眼形状
  pointUI: string // 码点形状
  directionColorType: 'default' | 'custom' // 自定义码眼颜色
  size: 'mini' | 'small' | 'medium' | 'large'
  model: string // 扫码内容 文本或跳转地址
  field: string // 动态字段名 cid => 映射字段名 => field
  shadow: boolean // 二维码阴影
  logo: string // 二维码内部logo base64
  logoPos: 'center' | 'bottom' // logo位置
}

function pos(): { pc: NodePos; mobile: NodePos } {
  return {
    pc: {
      wType: '%',
      hType: 'px',
      w: 6,
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

export interface QrCodeBox extends Node {
  qrCode: QrCodeNode
  pos: { pc: NodePos; mobile: NodePos }
}

export function newQrCodeNodeBox(cid: string): QrCodeBox {
  return {
    mpl_group: '表单控件',
    mpl_title: '二维码',
    mpl_zh: '二维码',
    mpl_ce: 'e',
    mpl_version: '1.0.0',
    field: '',

    cid,
    tag: 'mpl-qr-code',
    mpl_children: [],
    classList: [],
    userClassName: [],
    style: '',
    visible: '1',
    visibleType: 'default',
    qrCode: {
      color: '#1E1E1E',
      bgColor: '#fff',
      directionColorType: 'default',
      directionUI: 'a',
      pointUI: '',
      size: 'medium',
      model: '二维码扫码内容',
      field: '',
      shadow: false,
      logo: '',
      logoPos: 'center'
    },
    events: [],
    variables: [],
    defaultEvents: [],
    pos: pos()
  }
}

function getTemplateCode(node: QrCodeNode): string {

  return ``
}

export const QrCode: ComponentBaseExport = {
  tag: 'mpl-qr-code',
  comp: newQrCodeNodeBox,
  pos: pos(),

  getTemplateCode,
  getNodeVar: (node: QrCodeBox) => {
    return [
      { desc: '显示隐藏', key: `mpl.${node.cid}.visible`, value: true },
      { desc: '绑定值', key: `mpl.${node.cid}.vModel`, value: '' },
    ]
  }
}
