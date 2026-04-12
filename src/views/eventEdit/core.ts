import { workbenchStore } from '@mpl/store'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'

// 校验 pageJs 是否更改
export function checkPageScript(codeStr: string): string {
  let msg = ''
  const allMethods: { name: string, code: string }[] = []

  try {
    const ast = parse(codeStr, { sourceType: 'script' })
    const astBody = ast.program.body

    if (astBody.length > 1) {
      msg = '代码错误, 请检查'
    }

    traverse(ast, {
      ObjectMethod(path: any) {
        const obj = generate(path.node, {}, codeStr)
        allMethods.push({ name: path.node.key.name, code: obj.code })
      }
    })

  } catch (err) {
    msg = '代码错误, 请检查'
  }

  if (msg) {
    return ''
  }

  const workbench = workbenchStore()
  const result: Array<{ name: string, code: string }> = []
  const bodyNode = workbench.nodeList.find(v => v.tag === 'mpl-body')
  const _method = bodyNode!.defaultEvents.filter(s => s.name === 'METHODS').map(t => ({ ...t, cid: bodyNode!.cid }))
  if (_method.length) {
    result.push({ name: _method[0]!.name, code: _method[0]!.code })
  }
  // 已经更改的事件方法集合
  const updatedNodeEvents: Array<{ name: string, code: string, cid: string }> = []
  const allBindEvents = workbench.nodeList.filter(v => v.tag !== 'mpl-body').map(v => {
    const defaultEvents = v.defaultEvents.filter(s => s.open).map(t => ({ ...t, cid: v.cid }))
    const events = v.events.filter(s => s.open).map(t => ({ ...t, cid: v.cid }))
    return defaultEvents.concat(...events)
  }).flat()

  // IDE可能误删了组件事件.需要从nodeList重新加载默认值
  // 校验事件是否存在添加, 删除, 修改
  allBindEvents.forEach(v => {
    const method = allMethods.find(s => s.name === v.name)
    if (!method) {
      // IDE中的代码找到, 新增事件
      result.push({ name: v.name, code: v.code })
    } else {
      // 校验事件内部代码是否存在
      if (method.code !== v.code) {
        result.push({ name: v.name, code: method.code })
        updatedNodeEvents.push({ name: v.name, code: method.code, cid: v.cid })
      } else {
        result.push({ name: v.name, code: v.code })
      }
    }
  })

  // 检测IDE的代码是否手动添加的
  allMethods.forEach(v => {
    const method = allBindEvents.find(s => s.name === v.name)
    // 手动添加的自定义事件, 需要填充到body节点的events中
    if (!method) {
      updatedNodeEvents.push({ name: v.name, code: v.code, cid: 'body' })
    }
  })

  // 更新NodeList节点事件
  workbench.updateNodeEvents(updatedNodeEvents)

  return result.map(v => v.code).filter(v => v).join(',')
}