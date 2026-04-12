import type { Node, NODE_TAG, SENIOR_TAG } from '@mpl/typings'

/**
 * @description 前端API绑定过滤节点
 * @param nodes 控件列表 Node[]
 * @param tag 控件标签 NODE_TAG | SENIOR_TAG
 */
export function filterNodeListWithClientAPI(nodes: Node[], tag: NODE_TAG | SENIOR_TAG): Node[] {
  console.log(nodes, tag)

  return []
}

// 生成有规律的组件id
/**
 * 
 * @param tag 控件标签 NODE_TAG | SENIOR_TAG 或者 自定义字符串【表示前缀】
 * @returns 
 */
export function newCid(tag?: NODE_TAG | SENIOR_TAG | string): string {
  const str = 'qwertyuipasdfghjklzxcvbnm'
  const s = () => str[Math.floor(Math.random() * str.length)]
  const n = () => Math.floor(Math.random() * 11)
  // todo 提高可读性. 
  // input => inp2df
  // button => btn4hh
  // select => sel2hq
  // checkbox => che2hh
  // radio => rad2hh
  // switch => swi2hh
  // timePicker => tim2hh
  // datePicker => dat2hh
  // dateRangePicker => datR2hh
  // timeRangePicker => timR3ht
  // colorPicker => col2hh
  // transfer => tra2hh
  // selectDialog => selD2hh
  // loopBox => loop2hh
  // link => lnk2hh

  if(tag === 'mpl-body') {
    return 'body' + [n(), n()].join('')
  }

  // 输入框
  else if(tag === 'mpl-input') {
    return 'inp' + [n(), s(), s()].join('')
  }

  // 按钮
  else if(tag === 'mpl-btn') {
    return 'btn' + [n(), s(), s()].join('')
  }

  // 下拉选择
  else if(tag === 'mpl-select') {
    return 'sel' + [n(), s(), s()].join('')
  }

  // 复选框
  else if(tag === 'mpl-checkbox') {
    return 'che' + [n(), s(), s()].join('')
  }

  // 单选框
  else if(tag === 'mpl-radio') {
    return 'rad' + [n(), s(), s()].join('')
  }

  // 开关
  else if(tag === 'mpl-switch') {
    return 'swi' + [n(), s(), s()].join('')
  }

  // 时间选择器
  else if(tag === 'mpl-time-picker') {
    return 'tim' + [n(), s(), s()].join('')
  }

  // 时间范围选择器
  else if(tag === 'mpl-time-range-picker') {
    return 'timR' + [n(), s(), s()].join('')
  }

  // 日期选择器
  else if(tag === 'mpl-date-picker') {
    return 'dat' + [n(), s(), s()].join('')
  }

  // 日期范围选择器
  else if(tag === 'mpl-date-range-picker') {
    return 'datR' + [n(), s(), s()].join('')
  }

  // 颜色选择器
  else if(tag === 'mpl-color-picker') {
    return 'col' + [n(), s(), s()].join('')
  }

  // 穿梭框
  else if(tag === 'mpl-transfer') {
    return 'tra' + [n(), s(), s()].join('')
  }

  // 弹框选择
  else if(tag === 'mpl-select-dialog') {
    return 'selD' + [n(), s(), s()].join('')
  }

  // 循环框
  else if(tag === 'mpl-loop-box') {
    return 'loop' + [n(), s(), s()].join('')
  }

  // 链接
  else if(tag === 'mpl-link') {
    return 'lnk' + [n(), s(), s()].join('')
  }

  // 自定义前缀
  if(tag) {
    return tag + [n(), s(), s()].join('')
  }

  // rg5hy 简短、简洁、不报错
  return [s(), s(), n(), s(), s()].join('')
}

// 随机id
export function newId(): string {
  const str = 'qwertyuipasdfghjklzxcvbnm'
  const c = () => str[Math.floor(Math.random() * str.length)]
  const n = () => Math.floor(Math.random() * 11)

  // rg5hy 简短、简洁、不报错
  return [c(), c(), n(), n(), c(), c(), n(), n()].join('')
}

interface WatermarkProps {
  title: string
  mode: 'richtext' | 'text' // 换行水印、默认单行文本
}

// 导入水印功能。 引入watermark-plus
export function watermark(opt: WatermarkProps) {
  console.log(opt)
}


// 组件对应的事件名称
export function nodeMapEventName(tag: NODE_TAG) {
  const mapNode = {
    'mpl-input': 'input',
  }
}