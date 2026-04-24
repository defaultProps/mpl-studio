import type { NODE_TAG, SENIOR_TAG, SettingMap, Node, PLATFORM_GENERATOR, FormItemRuleNode, NodeVar } from '@mpl/typings'
import { newCid } from '@mpl/libs'
import { baseNodeMapSetting } from './baseNode'
import { seniorNodeSetting } from './seniorNode'

// common style.
import '../components/common.less'
export * from './baseNode'

export const mapNodeSetting: Record<string, SettingMap> = {
  ...baseNodeMapSetting,
  ...seniorNodeSetting
}

export function initNode(tag: NODE_TAG | SENIOR_TAG): Node | null {
  if (mapNodeSetting[tag]) {
    const t = mapNodeSetting[tag]

    return t ? t.newNode(newCid()) : null
  }
  return null
}

// 扁平化nodeList所有节点， 成一维数组
function flattenNodes(nodes: Node[]): Node[] {
  const result: Node[] = []

  function _flatNode(node: Node) {
    result.push(JSON.parse(JSON.stringify({ ...node, mpl_children: [] })))

    if (node.mpl_children.length > 0) {
      node.mpl_children.forEach(child => _flatNode(child))
    }
  }

  for (const node of nodes) {
    _flatNode(node)
  }

  return result
}

// 根据tag获取组件的变量列表
export function getComponentVars({ tag, cid }: { tag: NODE_TAG | SENIOR_TAG, cid: string }) {
  const obj = mapNodeSetting[tag]
  if (obj) {
    return obj.node.getBaseVar?.(cid) || ''
  }
  return ''
}

// nodeList 生成变量
export async function generatorVars(nodes: Node[]): Promise<any> {
  const resultVars: any = {}

  async function _generatorVars(node: Node) {
    const obj = mapNodeSetting[node.tag]
    if (obj) {
      const vars = await obj.generator.vars(node)
      Object.keys(vars).map(key => {
        resultVars[key] = vars[key]
      })
    }
  }

  const flatNodes = flattenNodes(nodes)

  for (const node of flatNodes) {
    await _generatorVars(node)
  }

  return JSON.parse(JSON.stringify(resultVars))
}

// nodeList 生成模板
export async function generatorTemplate(nodes: Node[], mode: PLATFORM_GENERATOR): Promise<string> {
  const result = await Promise.all(nodes.map(async node => {
    const obj = mapNodeSetting[node.tag]
    if (obj) {
      return await obj.generator.elementPlus(node)
    }
    return ''
  }))

  return result.join('')
}

// 移除无意义的key-value, 优化ref变量大小
export async function generatorRenderMiniRef(nodes: Node | Node[]): Promise<Partial<Node>[]> {
  const resultVars: any = {}

  async function _generatorVars(node: Node) {
    const obj = mapNodeSetting[node.tag]
    if (obj) {
      const vars = await obj.generator.vars(node)
      Object.keys(vars).forEach(key => {
        resultVars[key] = vars[key]
      })
    }
    if (node.mpl_children.length > 0) {
      node.mpl_children.forEach(async node => {
        await _generatorVars(node)
      })
    }
  }

  if (Array.isArray(nodes)) {
    nodes.forEach(async node => await _generatorVars(node))
  } else {
    await _generatorVars(nodes)
  }

  console.log(resultVars)

  return JSON.parse(JSON.stringify(resultVars))
}

// 生成页面规则
export function generatorRule(nodes: Node[]) {
  const rules: any = {}
  const formTags = [
    'mpl-input',
    'mpl-password',
    'mpl-number-input',
    'mpl-input',
    'mpl-password',
    'mpl-number-input',
    'mpl-select',
    'mpl-radio',
    'mpl-checkbox',
    'mpl-rate',
    'mpl-slider',
    'mpl-switch',
    'mpl-time-picker',
    'mpl-time-range-picker',
    'mpl-date-picker',
    'mpl-date-range-picker',
    'mpl-color-picker',
    'mpl-transfer',
    'mpl-select-dialog'
  ]
  const formNodes = nodes.filter(v => formTags.includes(v.tag))
  formNodes.forEach((node: any) => {
    if (node.rule.type === 'custom') {
      rules[node.cid] = JSON.parse(node.rule.code)
    } else {
      let nodeRule = ''
      node.rule.option.forEach((rule: FormItemRuleNode) => {
        // 自定义规则
        if (rule.type === 'custom') {
          // 
        }
        // 系统规则
        else {
          nodeRule += `
            { validator: mpl.rule.${rule.type}, trigger: ${JSON.stringify(rule.trigger)} ,message: "${rule.message}" },
          `
        }
      })
      rules[node.cid] = nodeRule
    }
  })

  return rules
}

// 根据ide代码变量路径查找所有组件对应的变量描述
export function searchNodeListVarsByFullPath(fullPath: string, nodeList: Node[]): string {
  // 递归查询所有组件列表
  const allVars: NodeVar[] = []
  function queryNode(list: Node[]) {
    list.forEach((v: any) => {
      const vars: NodeVar[] = mapNodeSetting[v.tag]!.node.getNodeVar?.(v) || []
      allVars.push(...vars)

      // 折叠面板
      if (['mpl-collapse', 'mpl-tabs'].includes(v.tag)) {
        v.itemList.forEach((s: any) => {
          if (Array.isArray(s.mpl_children) && s.mpl_children.length > 0) {
            queryNode(s.mpl_children)
          }
        })
      }
      // 其他容器
      else if (Array.isArray(v.mpl_children) && v.mpl_children.length > 0) {
        queryNode(v.mpl_children)
      }
    })
  }

  queryNode(nodeList)

  return allVars.find(v => fullPath.replace('mpl.var.', '') === v.fullPath)?.desc || ''
}