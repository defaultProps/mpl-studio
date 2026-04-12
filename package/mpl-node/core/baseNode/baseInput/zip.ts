// node压缩存储 - 此压缩为属性值压缩，无法编译，只能在 mpl studio 平台试用解压工具后预览。
// key value的压缩
import { newSingleInputNode, type SingleInputFormProp } from './define'

export function zip(node: SingleInputFormProp): Partial<SingleInputFormProp> {
  const keys = Object.keys(node)
  const result: Partial<SingleInputFormProp> = {}
  const defaultNode = newSingleInputNode(node.cid)

  function compileAttr(originObj: any, sourceObj: any, k: string, _result: any) {
    if (['number', 'string', 'boolean'].includes(typeof sourceObj[k])) {
      // 保留必要字段
      if (sourceObj[k] !== originObj[k] || ['tag', 'cid'].includes(k)) {
        _result[k] = originObj[k]
      }
    }
    // 数组
    else if (Array.isArray(sourceObj[k])) {
      // 基础对比数组
      const isEqualArray = sourceObj[k].every(s => ['number', 'string', 'boolean'].includes(typeof s))
      if (isEqualArray) {
        if (sourceObj[k].join() !== originObj[k].join()) {
          _result[k] = originObj[k]
        }
      } else {
        sourceObj[k].forEach((t, i) => {
          const keys = Object.keys(t)
          _result[k] = []
          _result[k][i] = {}
          keys.forEach(a => {
            compileAttr(t, originObj[k][i], a, _result[k][i])
          })
          if (Object.keys(_result[k][i]).length === 0) {
            delete _result[k][i]
          }
        })
        // 保留数组长度占位。显示"空
        if (_result[k].length === 0) {
          delete _result[k]
        }
      }
    }
    // 对象
    else {
      const keys = Object.keys(sourceObj[k])
      _result[k] = {}
      keys.forEach(a => {
        compileAttr(sourceObj[k], originObj[k], a, _result[k])
      })

      if (Object.keys(_result[k]).length === 0) {
        delete _result[k]
      }
    }
  }

  keys.forEach(key => {
    compileAttr(defaultNode, node, key, result)
  })

  return result
}