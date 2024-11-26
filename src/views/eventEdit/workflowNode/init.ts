import { Position } from '@vue-flow/core'

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    value: 'input',
    label: '交互开始',
    position: { x: 250, y: 150 },
    class: 'start-flow-node',
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    type: 'dialogVisible',
    label: '开启/关闭弹窗',
    position: { x: 450, y: 150 },
    class: 'ia-flow-node'
  },
  {
    id: '3',
    type: 'setVModel',
    label: '设置表单值',
    position: { x: 850, y: 150 },
    class: 'ia-flow-node'
  },
  {
    id: '4',
    type: 'setVModel',
    label: '设置表单值',
    position: { x: 1200, y: 150 },
    class: 'ia-flow-node'
  },
  {
    id: '5',
    type: 'output',
    label: '交互结束',
    targetPosition: Position.Left,
    position: { x: 1600, y: 150 },
    class: 'end-flow-node'
  }
]

export const initialEdges = [
  { id: 'e1-2', type: 'smoothstep', source: '1', target: '2' },
  { id: 'e1-3', type: 'smoothstep', source: '2', target: '3' },
  { id: 'e3-4', type: 'smoothstep', source: '3', target: '4' },
  { id: 'e3-5', type: 'smoothstep', source: '4', target: '5' }
]
