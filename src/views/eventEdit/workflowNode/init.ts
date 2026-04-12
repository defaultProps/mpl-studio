import { Position, type Node, type Edge } from '@vue-flow/core'

export const initialNodes: Node[] = [
  {
    id: 'startNode',
    type: 'input',
    label: '交互开始',
    position: { x: 160, y: 50 },
    sourcePosition: Position.Bottom
  },
  {
    id: 'rg5jt6',
    type: 'dialogVisible',
    label: '开启/关闭弹窗',
    position: { x: 50, y: 140 },
    sourcePosition: Position.Bottom,
    data: {
      target: 'dialogCid',
      valueType: 'boolean',
      value: true
    }
  },
  {
    id: 'ku8lo0',
    type: 'setVModel',
    label: '设置表单值',
    position: { x: 25, y: 290 },
    sourcePosition: Position.Bottom,
    data: {
      target: 'dialogCid',
      valueType: 'boolean',
      value: true
    }
  },
  {
    id: 'endNode',
    type: 'output',
    label: '交互结束',
    targetPosition: Position.Top,
    position: { x: 160, y: 460 },
  },
]

export const initialEdges: Edge[] = [
  { id: 'e1-1', source: 'startNode', target: 'rg5jt6', },
  { id: 'e1-2', source: 'rg5jt6', target: 'ku8lo0', },
  { id: 'e1-3', source: 'ku8lo0', target: 'endNode', },
]
