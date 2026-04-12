// 客户端API
export const clientAPIList = [
  {
    label: '系统平台公式',
    value: 'systemPlatform',
    children: [
      { label: '获取当前主题', value: '' },
      { label: '获取系统主题列表', value: '' },
      { label: '获取系统token', value: '' },
      { label: '获取登录用户名', value: '' },
      { label: '获取登录用户信息', value: '' },
      { label: '获取登录用户邮箱', value: '' },
      { label: '判断是否为企业版用户', value: '' },
    ]
  },
  {
    label: '常用公式',
    value: 'common',
    children: [
      { label: '转数字', value: '' },
      { label: '数字转中文', value: '' },
      { label: '数字转日期', value: '' },
      { label: '获取当前日期', value: '' },
      { label: '获取url参数值', value: '' },
      { label: '字符校验相同', value: '' },
      { label: '是否为空', value: '' },
    ]
  },
  {
    label: '组件公式',
    value: 'component',
    children: [
      { label: '计算总和', value: '' } // 表格列计算总和、循环类型列表的某一项计算总和
    ]
  }
]