export interface StringFlowNode {
  id: string
  type: string
  label: string
  children?: StringFlowNode[]
}

export const edges = (): StringFlowNode[] => [
  {
    id: 'rg5jt6',
    type: 'dialogVisible',
    label: '开启/关闭弹窗',
  },
  {
    id: 'qw2r45',
    type: 'clearValidate',
    label: '清除表单内部控件校验'
  },
  {
    id: 'ku8lo0',
    type: 'setVModel',
    label: '设置表单值'
  },
  {
    id: 'ng7li9',
    type: 'if',
    label: '假如xxx条件时',
    children: [
      {
        id: 'lop0o8',
        type: 'setVModel',
        label: '设置表单值'
      },
      {
        id: 'vv4hj7',
        type: 'setVModel',
        label: '设置表单值',
      }
    ]
  },
  {
    id: 'ng7li9',
    type: 'if',
    label: '假如xxx条件时',
    children: [
      {
        id: 'lop0o8',
        type: 'setVModel',
        label: '设置表单值'
      },
      {
        id: 'vv4hj7',
        type: 'setVModel',
        label: '设置表单值',
      }
    ]
  },
  {
    id: 'sd4ht7',
    type: 'elseIf',
    label: '假如xxx条件时',
    children: [
      {
        id: 'mh8ku9',
        type: 'setVModel',
        label: '设置表单值'
      },
      {
        id: 'sd4ht7',
        type: 'elseIf',
        label: '假如xxx条件时',
        children: [
          {
            id: 'mh8ku9',
            type: 'setVModel',
            label: '设置表单值'
          },
          {
            id: 'mh8ku9',
            type: 'setVModel',
            label: '设置表单值'
          },
          {
            id: 'mh8ku9',
            type: 'setVModel',
            label: '设置表单值'
          },
        ]
      }
    ]
  }
]