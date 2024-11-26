// 组件属性定义压缩 - 方便存储和阅读
import type { NumberInputFormProp } from './define'

const miniSchemaInputNumber: MPL.miniSchema<NumberInputFormProp> = (node) => {
  // const result = JSON.parse(JSON.stringify(node))

  return node
}

export default miniSchemaInputNumber
