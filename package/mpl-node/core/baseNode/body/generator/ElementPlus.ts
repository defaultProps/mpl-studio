import type { Node } from '@mpl/typings'
import { mapNodeSetting } from '../../../index'

export default async (_: Node): Promise<string> => {
  const result = await Promise.all(_.mpl_children.map(async node => {
    const obj = mapNodeSetting[node.tag]
    let str = ''

    if (obj) {
      str = await obj.generator.elementPlus(node)
    }

    return str

  }))

  return result.join('')
}
