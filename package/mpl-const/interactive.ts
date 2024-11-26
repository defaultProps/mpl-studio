// 交互列表
// 单个服务详情
export const serviceInfoTable = [
  {
    url: '/mpl/prototype/getBaseArticleList',
    desc: '获取基础文章列表',
    updateTime: '',
    createdTime: '',
    id: '6dee6e4e11e8',
    options: []
  },
  {
    url: '/mpl/prototype/getCompanyList',
    desc: '获取公司列表',
    id: 'c47a3d4e8614',
    updateTime: '',
    createdTime: '',
    options: [
      {
        field: 'logo',
        type: 'img',
        desc: '公司logo地址',
        enable: true
      },
      {
        field: 'companyName',
        type: 'text',
        desc: '公司名称',
        enable: true
      },
      {
        field: 'email',
        type: ['email', 'array'],
        desc: '邮箱地址',
        enable: true
      },
      {
        field: 'description',
        type: 'text',
        desc: '公司简介',
        enable: true
      },
      {
        desc: '公司地址列表',
        enable: true,
        children: [
          {
            field: 'address',
            type: '地址',
            enable: true
          },
          {
            field: '地图坐标',
            type: 'map',
            enable: true
          }
        ]
      },
      {
        field: 'website',
        type: 'url',
        desc: '网址',
        enable: true
      }
    ]
  }
]

export interface clientProp {
  label: string
  value: string
  message: string
  code: Function
  params: { option: string, type: string, value: string | unknown, desc: string, required: boolean }[]
}

// 事件列表 - 交互节点
export const flowNodes:{label: string, value: string, children: clientProp[]}[] = [
  {
    label: '组件交互',
    value: 'nodeInteractive',
    children: [
      {
        label: '开启/关闭弹窗',
        value: 'dialogVisible',
        message: 'mpl.api.dialogVisible(nodeKey:string, boolean)',
        code: (nodeKey: string, visible: boolean) => `mpl.api.dialogVisible("${nodeKey}", ${visible})`,
        params: [
          {
            option: 'dialogNode',
            type: 'string',
            value: '',
            desc: '弹窗节点DialogNode',
            required: true
          },
          {
            option: 'boolean',
            type: 'boolean',
            value: '',
            desc: '开启',
            required: false
          }
        ]
      },
      {
        label: '设置表单值',
        value: 'setVModel',
        message: 'mpl.api.dialogVisible(nodeKey:string, boolean)',
        code: (nodeKey: string, value: any) => `mpl.api.setVModel("${nodeKey}", "${value}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择表单节点FormItemNode',
            required: true
          },
          {
            option: 'string',
            type: 'string',
            value: '',
            desc: '值',
            required: false
          }
        ]
      },
      {
        label: '控件校验',
        value: 'validateFormItem',
        message: 'mpl.api.validateFormItem(formNodeKey: string)',
        code: (formNodeKey: string) => `mpl.api.validate("${formNodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择表单节点FormNode',
            required: true
          }
        ]
      },
      {
        label: '表单校验',
        value: 'validate',
        message: 'mpl.api.validate(formNodeKey: string)',
        code: (formNodeKey: string) => `mpl.api.validate("${formNodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择表单节点FormNode',
            required: true
          }
        ]
      },
      {
        label: '表单校验清除',
        value: 'clearValidate',
        message: 'mpl.api.clearValidate(formNodeKey: string)',
        code: (formNodeKey: string) => `mpl.api.clearValidate("${formNodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择表单节点FormNode',
            required: true
          }
        ]
      },
      {
        label: '表单数据重置',
        value: 'resetForm',
        message: 'mpl.api.resetValidate(formNodeKey: string)',
        code: (formNodeKey: string) => `mpl.api.resetValidate("${formNodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择表单节点FormNode',
            required: true
          }
        ]
      },
      {
        label: '基础输入-赋值',
        value: 'baseInputSetVModel',
        message: 'mpl.api.baseInput.setVModel(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInput.setVModel("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: '',
            type: 'string',
            value: '',
            desc: '设置值',
            required: true
          }
        ]
      },
      {
        // 清空值 & 重置校验
        label: '基础输入-清空',
        value: 'baseInputReset',
        message: 'mpl.api.baseInput.baseInputReset(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInputReset.baseInputReset("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          }
        ]
      },
      {
        label: '基础输入-禁用',
        value: 'baseInputSetDisabled',
        message: 'mpl.api.baseInput.setDisabled(boolean: string)',
        code: (disabled = false) => `mpl.api.baseInput.setDisabled(${disabled})`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: 'boolean',
            type: 'boolean',
            value: '',
            desc: '设置禁用',
            required: false
          }
        ]
      },
      {
        label: '密码输入-赋值',
        value: 'baseInputSetVModel',
        message: 'mpl.api.baseInput.setVModel(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInput.setVModel("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: '',
            type: 'string',
            value: '',
            desc: '设置值',
            required: true
          }
        ]
      },
      {
        // 清空值 & 重置校验
        label: '密码输入-清空',
        value: 'baseInputReset',
        message: 'mpl.api.baseInput.baseInputReset(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInputReset.baseInputReset("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          }
        ]
      },
      {
        label: '密码输入-禁用',
        value: 'baseInputSetDisabled',
        message: 'mpl.api.baseInput.setDisabled(boolean: string)',
        code: (disabled = false) => `mpl.api.baseInput.setDisabled(${disabled})`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: 'boolean',
            type: 'boolean',
            value: '',
            desc: '设置禁用',
            required: false
          }
        ]
      },
      {
        label: '数字输入-赋值',
        value: 'baseInputSetVModel',
        message: 'mpl.api.baseInput.setVModel(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInput.setVModel("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: '',
            type: 'string',
            value: '',
            desc: '设置值',
            required: true
          }
        ]
      },
      {
        // 清空值 & 重置校验
        label: '数字输入-清空',
        value: 'baseInputReset',
        message: 'mpl.api.baseInput.baseInputReset(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInputReset.baseInputReset("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          }
        ]
      },
      {
        label: '数字输入-禁用',
        value: 'baseInputSetDisabled',
        message: 'mpl.api.baseInput.setDisabled(boolean: string)',
        code: (disabled = false) => `mpl.api.baseInput.setDisabled(${disabled})`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: 'boolean',
            type: 'boolean',
            value: '',
            desc: '设置禁用',
            required: false
          }
        ]
      },
      {
        label: '日期输入-赋值',
        value: 'baseInputSetVModel',
        message: 'mpl.api.baseInput.setVModel(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInput.setVModel("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: '',
            type: 'string',
            value: '',
            desc: '设置值',
            required: true
          }
        ]
      },
      {
        // 清空值 & 重置校验
        label: '日期输入-清空',
        value: 'baseInputReset',
        message: 'mpl.api.baseInput.baseInputReset(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInputReset.baseInputReset("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          }
        ]
      },
      {
        label: '日期输入-禁用',
        value: 'baseInputSetDisabled',
        message: 'mpl.api.baseInput.setDisabled(boolean: string)',
        code: (disabled = false) => `mpl.api.baseInput.setDisabled(${disabled})`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: 'boolean',
            type: 'boolean',
            value: '',
            desc: '设置禁用',
            required: false
          }
        ]
      },
      {
        label: '下拉输入-赋值',
        value: 'baseInputSetVModel',
        message: 'mpl.api.baseInput.setVModel(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInput.setVModel("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: '',
            type: 'string',
            value: '',
            desc: '设置值',
            required: true
          }
        ]
      },
      {
        // 清空值 & 重置校验
        label: '下拉输入-清空',
        value: 'baseInputReset',
        message: 'mpl.api.baseInput.baseInputReset(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInputReset.baseInputReset("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          }
        ]
      },
      {
        label: '下拉输入-禁用',
        value: 'baseInputSetDisabled',
        message: 'mpl.api.baseInput.setDisabled(boolean: string)',
        code: (disabled = false) => `mpl.api.baseInput.setDisabled(${disabled})`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: 'boolean',
            type: 'boolean',
            value: '',
            desc: '设置禁用',
            required: false
          }
        ]
      },
      {
        label: '单选-赋值',
        value: 'baseInputSetVModel',
        message: 'mpl.api.baseInput.setVModel(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInput.setVModel("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: '',
            type: 'string',
            value: '',
            desc: '设置值',
            required: true
          }
        ]
      },
      {
        label: '单选-禁用',
        value: 'baseInputSetDisabled',
        message: 'mpl.api.baseInput.setDisabled(boolean: string)',
        code: (disabled = false) => `mpl.api.baseInput.setDisabled(${disabled})`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: 'boolean',
            type: 'boolean',
            value: '',
            desc: '设置禁用',
            required: false
          }
        ]
      },
      {
        label: '多选输入-赋值',
        value: 'baseInputSetVModel',
        message: 'mpl.api.baseInput.setVModel(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInput.setVModel("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: '',
            type: 'string',
            value: '',
            desc: '设置值',
            required: true
          }
        ]
      },
      {
        // 清空值 & 重置校验
        label: '多选输入-清空',
        value: 'baseInputReset',
        message: 'mpl.api.baseInput.baseInputReset(nodeKey: string)',
        code: (nodeKey: string) => `mpl.api.baseInputReset.baseInputReset("${nodeKey}")`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          }
        ]
      },
      {
        label: '多选输入-禁用',
        value: 'baseInputSetDisabled',
        message: 'mpl.api.baseInput.setDisabled(boolean: string)',
        code: (disabled = false) => `mpl.api.baseInput.setDisabled(${disabled})`,
        params: [
          {
            option: 'vModel',
            type: 'string',
            value: '',
            desc: '选择基础输入框',
            required: true
          },
          {
            option: 'boolean',
            type: 'boolean',
            value: '',
            desc: '设置禁用',
            required: false
          }
        ]
      },
    ]
  },
  {
    label: '服务交互',
    value: 'serviceInteractive',
    children: [
      {
        label: '请求服务',
        value: 'http',
        message: 'mpl.api.fetch(url:string, {header: any, body: any})',
        code: (url: string, method: 'get' | 'post', { header, body }: { header?: any, body?: any }) =>
          `mpl.api.fetch("${url}", "${method}", {header: ${header}, body:${body}})`,
        params: [
          {
            option: 'url',
            type: 'string',
            value: '',
            desc: '选择请求地址',
            required: true
          },
          {
            option: 'method',
            type: 'string',
            value: ['get', 'post'],
            desc: '值',
            required: true
          },
          {
            option: 'header',
            type: 'object',
            value: {},
            desc: '请求头参数header',
            required: false
          },
          {
            option: 'body',
            type: 'object',
            value: {},
            desc: '请求体参数body',
            required: false
          }
        ]
      }
    ]
  },
  {
    // 与挂载平台的交互
    label: '平台交互',
    value: 'platformInteractive',
    children: []
  },
  {
    // if for、else else-if else while + 浏览器的交互
    label: '其他交互',
    value: 'othersInteractive',
    children: []
  },
]

// 服务列表
export const serviceList = [
  {
    title: 'MPL服务',
    value: 'mplService',
    id: 'fg4u7oil9vf254',
    children: [
      {
        title: '原型服务',
        value: 'prototypeService',
        id: 'cd1yr5br5wd556',
        children: [
          {
            title: '获取基础文章列表',
            value: '/mpl/prototype/getBaseArticleList',
            id: '6dee6e4e11e8'
          },
          {
            title: '获取用户信息',
            value: '/mpl/prototype/getUserInfo',
            id: 'a6357433dd49'
          },
          {
            title: '获取级联层级地图',
            value: '/mpl/prototype/getCityMapCascader',
            id: '12c59d8f9738'
          },
          {
            title: '获取公司列表',
            value: '/mpl/prototype/getCompanyList',
            id: 'c47a3d4e8614'
          },
          {
            title: '获取照片列表',
            value: '/mpl/prototype/getPhotosList',
            id: '851ab7ffb821'
          },
          {
            title: '获取微信好友列表',
            value: '/mpl/prototype/weChatList',
            id: '349e15175553'
          }
        ]
      },
      {
        title: '平台服务',
        value: 'platformService',

        id: '9dac356cdd43',
        children: [
          {
            title: '获取用户信息',
            value: '/mpl/platformService/userInfo',
            id: 'qp67234g4353dd'
          },

          {
            title: '获取租户信息',
            value: '/mpl/platformService/tenantInfo',
            id: 'ht3dsf43h65'
          }
        ]
      },
      {
        title: '三方服务',
        value: 'thirdService',
        id: 'dae9669387e5',
        children: [
          {
            title: '获取网易云音乐接口',
            value: '/mpl/thirdService/getPhotosList',
            id: '19818686e1f9'
          },

          {
            title: '获取网易云音乐接口',
            value: '/mpl/thirdService/getPhotosList',
            id: '728d7e892dca'
          }
        ]
      },
      {
        title: '付费服务',
        value: 'paidService',
        id: 'f961d052',
        children: [
          {
            title: '获取当前火车票',
            value: '/mpl/paidService/getPhotosList',
            id: '18ef258b95b3'
          },
          {
            title: '获取当前机票',
            value: '/mpl/paidService/getPhotosList',
            id: '5a0cd666f6c2'
          }
        ]
      }
    ]
  },
  {
    title: '项目服务',
    value: 'projectService',
    children: [
      {
        title: '获取信息披露列表',
        value: '/mpl/projectService/getDisclosureList',
        id: '34rft679mt4'
      },
      {
        title: '获取所有公司信息列表',
        value: '/mpl/projectService/getCompanyList',
        id: 'bg6ju8r2tvr'
      }
    ]
  }
]
