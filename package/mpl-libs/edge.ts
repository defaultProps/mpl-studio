import type { Node, Edge } from '@vue-flow/core'

// 校验Node节点数据是否正常
function validateNodeData(node: Node) {
  const {type, data} = node
  const errMsgs: string[] = []
  if(type === 'dialogVisible') {
    // 请选择弹框
    if(data.target === '') {
      errMsgs.push('请选择弹框')
    } else if(!data.valueType) {
      errMsgs.push('请选择弹框状态')
    } else if(!data.value) {
      errMsgs.push('请选择弹框状态')
    }
  }
  return true
}

// 流程编排数据结构生成源码
export function generateFlowCodeByNodesAndEdges(nodes: Node[], edges: Edge[]) {
  // 开始节点
  const startNode = nodes.find(node => node.type === 'input')
  // 结束节点
  const endNode = nodes.find(node => node.type === 'output')

  if(!startNode || !endNode) {
    throw new Error('开始节点或结束节点不存在')
    return ''
  }

  // 寻找开始节点的下一个节点
  const nextNode = edges.find(edge => edge.source === startNode.id)

  if(!nextNode) {
    throw new Error('开始节点没有下一个节点')
    return ''
  }

  // 开始节点直接关联到结束节点时, 代表没有数据
  if(nextNode.target === endNode.id) {
    return ''
  }

  // 寻找具体的节点数据node
  const node = nodes.find(node => node.id === nextNode.target) as Node

  // 根据节点类型生成不同的数据
  function generateNodeData(node: Node) {
    // 开启/关闭弹窗
    if (node.type === 'dialogVisible') {
      // 校验数据是否正确
    }
  }

}