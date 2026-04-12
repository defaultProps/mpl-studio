import type { NODE_TAG } from '@mpl/typings'

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
	code: any
	params: { option: string | NODE_TAG[]; type: string; value: string | unknown; desc: string; required: boolean }[]
}

// 事件列表 - 交互节点
export const flowNodes: { label: string; value: string; children: clientProp[] }[] = [
	{
		label: '辅助交互',
		value: 'nodeInteractive',
		children: [
			{
				label: '执行块', // 无顺序执行的区块
				value: 'executeBlock',
				message: '',
				code: '',
				params: []
			},
			{
				label: '数组循环forEach',
				value: 'forEachBlock',
				message: '',
				code: '',
				params: []
			},
			{
				label: '数组过滤filter',
				value: 'filterBlock',
				message: '',
				code: '',
				params: []
			},
			{
				label: '数组映射循环map',
				value: 'mapBlock',
				message: '',
				code: '',
				params: []
			},
			{
				label: '校验if',
				value: 'ifBlock',
				message: '',
				code: '',
				params: []
			},
			{
				label: '否则校验else if',
				value: 'ifBlock',
				message: '',
				code: '',
				params: []
			},
			{
				label: '否则 else',
				value: 'ifBlock',
				message: '',
				code: '',
				params: []
			},
		]
	},
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
				label: '表单控件校验',
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
				label: '表单容器校验',
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
				label: '表单控件赋值',
				value: 'formNodeSetVModel',
				message: 'mpl.api.baseInput.setVModel(nodeKey: string)',
				code: (nodeKey: string) => `mpl.api.baseInput.setVModel("${nodeKey}")`,
				params: [
					{
						option: 'vModel',
						type: 'string',
						value: '',
						desc: '选择表单节点FormNode',
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
				label: '控件数据清空',
				value: 'clearFormItem',
				message: 'mpl.api.baseInput.clearFormItem(nodeKey: string)',
				code: (nodeKey: string) => `mpl.api.clearFormItem("${nodeKey}")`,
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
				label: '控件禁用',
				value: 'disabledNode',
				message: 'mpl.api.disabledNode(cid, boolean: string)',
				code: (disabled = false) => `mpl.api.disabledNode(cid, ${disabled})`,
				params: [
					{
						option: 'cid',
						type: 'string',
						value: '',
						desc: '控件选择',
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
				label: '表单列表更新',
				value: 'updateListOptions',
				message: 'mpl.api.updateListOptions(nodeKey: string)',
				code: (nodeKey: string) => `mpl.api.updateListOptions("${nodeKey}")`,
				params: [
					{
						option: 'cid',
						type: 'string',
						value: '',
						desc: '表单选项型列表数据更新',
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
				label: '弹窗提示',
				value: 'messageBox',
				message: 'mpl.api.messageBox(nodeKey: string)',
				code: (nodeKey: string) => `mpl.api.messageBox("${nodeKey}")`,
				params: [
					{
						option: 'cid',
						type: 'string',
						value: '',
						desc: '表单选项型列表数据更新',
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
				label: '弹框验证', // 简化版本的弹窗dialog验证。内置基础输入框等常规组件
				value: 'validateDialog',
				message: 'mpl.api.validateDialog(nodeKey: string, [k]: string)',
				code: (nodeKey: string) => `mpl.api.validateDialog("${nodeKey}")`,
				params: [ // 可添加常规表单类型
					{
						option: ['mpl-password'],
						type: 'string',
						value: '',
						desc: '表单选项型列表数据更新',
						required: true
					}
				]
			}
		]
	},
	{
		label: '服务交互',
		value: 'serviceInteractive',
		children: [
			{
				label: '自定义服务',
				value: 'customService',
				message: 'mpl.api.fetch(url:string, {header, body})',
				code: '',
				params: []
			},
			{
				label: '挂载平台服务',
				value: 'platformService',
				message: 'mpl.api.fetch(url:string, {header, body})',
				code: '',
				params: []
			},
			{
				label: 'MPL服务',
				value: 'mplService',
				message: 'mpl.api.fetch(url:string, {header, body})',
				code: '',
				params: []
			},
			{
				label: '三方服务',
				value: 'thirdService',
				message: 'mpl.api.fetch(url:string, {header, body})',
				code: '',
				params: []
			}
		]
	},
	{
		// 与挂载平台的交互
		label: '平台交互',
		value: 'platformInteractive',
		children: [
			{
				label: '退出登录',
				value: 'thirdService',
				message: '',
				code: '',
				params: []
			},
			{
				label: '切换主题',
				value: 'changeTheme',
				message: '',
				code: '',
				params: []
			},
			{
				label: '开启菜单栏',
				value: 'openMenu',
				message: '',
				code: '',
				params: []
			},
			{
				label: '关闭菜单栏',
				value: 'closeMenu',
				message: '',
				code: '',
				params: []
			},
			{
				label: '反向菜单栏',
				value: 'triggerMenu',
				message: '',
				code: '',
				params: []
			},
			{
				label: '扫码分享弹窗',
				value: 'openQrCodeDialog',
				message: '',
				code: '',
				params: []
			},
		]
	},
	{
		// if for、else else-if else while + 浏览器的交互
		label: '其他交互',
		value: 'othersInteractive',
		children: [
			{
				label: '开启新窗口',
				value: 'openWindow',
				message: '',
				code: '',
				params: []
			},
			{
				label: '关闭窗口',
				value: 'closeWindow',
				message: '',
				code: '',
				params: []
			},
			{
				label: '下载文件',
				value: 'downloadFile',
				message: '',
				code: '',
				params: []
			},
			{
				label: '上传文件',
				value: 'uploadFile',
				message: '',
				code: '',
				params: []
			},
		]
	}
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

// 系统变量值获取
export const systemVarList = [
	{ label: '当前主题', value: 'currentTheme' },
	{ label: '主题列表', value: 'themeList' },
	{ label: '用户信息', value: 'userInfo' },
	{ label: '用户名', value: 'userName' },
	{ label: '用户密码', value: 'userPassword' },
	{ label: '用户邮箱', value: 'userEmail' },
	{ label: '用户最近登录时间', value: 'latestLoginDate' },
	{ label: '系统当前版本', value: 'currentVersion' },
	{ label: '系统历史版本列表', value: 'historyVersionList' },
]
