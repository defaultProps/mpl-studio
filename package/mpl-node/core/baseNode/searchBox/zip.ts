// node压缩存储 - 此压缩为属性值压缩，无法编译，只能在 mpl studio 平台试用解压工具后预览。
// key value的压缩
import { type SearchBoxProp } from './define'

export function zip(node: SearchBoxProp): Partial<SearchBoxProp> {
  const keys = Object.keys(node)
  const result: Partial<SearchBoxProp> = {}

  return result
}