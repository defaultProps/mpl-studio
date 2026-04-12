type NODE_CLIENT_TYPE =
  | 'lockNode' // 锁定组件【几乎所有组件，鼠标操作组件】。表单组件、按钮组件、输入组件、选择组件。鼠标操作的组件【展开关闭灯】
  | 'unlockNode' // 取消锁定组件
  | 'triggerLockNode' // 反转锁定组件
  | 'disabledNode' // 锁定组件中的一种状态【禁用】，仅仅适配表单组件、按钮组件

// 前端API表 - 动态前端API
export default [
  {
    label: '锁定组件',
    value: 'lockNode',
    desc: '针对组件进行锁定，禁止编辑、选择、点击等操作',
    pararms: [
      { label: '目标组件', value: 'lockNode' }
    ]
  }
]
