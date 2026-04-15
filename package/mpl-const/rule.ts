// 系统规则列表
export const systemRuleOption = [
	{ label: '必填', value: 'required', message: '无数据' },
	{ label: '仅数字', value: 'onlyNumber', message: '仅允许输入数字0-9' },
	{ label: '仅字母', value: 'onlyChar', message: '仅允许字母a-z或A-Z' },
	{ label: '仅数字字母', value: 'onlyNumberChar', message: '仅允许数字0-9或字母a-z大小写' },
	{ label: '仅数字字母下划线', value: 'OnlyNumberCharUnderline', message: '仅允许数字0-9或字母a-z大小写或下划线' },
	{ label: '合法变量名', value: 'legalVar', message: '仅允许数字0-9或字母a-z大小写或下划线，且首位非数字' },
	{ label: '合法用户名1【字母数字中文】', value: 'legalName', message: '允许输入字母大小写、数字、中文，且首位非数字' },
	{ label: '邮箱', value: 'email', message: '请输入合法邮箱' },
	{ label: '电话号码11位', value: 'telephone', message: '请输入合法电话号码' },
	{ label: '姓名', value: 'name', message: '中文姓名不合法' },
	{ label: '性别', value: 'sex', message: '性别仅允许输入: 男、女' },
	{ label: '强密码', value: 'strongPassword', message: '标准强密码输入【长度11位且字母大写、字母小写、数字、_*&%$#@!()/.-_~`四种必须满足】' },
	{ label: '轻密码', value: 'weakPassword', message: '常规轻密码输入【长度11位且字母大写、字母小写、数字、_*&%$#@!()/.-_~`四种满足其二】' },
	{ label: '弱密码', value: 'lightPassword', message: '长度为8位且允许输入字母数字_*&%$#@!()/.-_~' },
	{ label: '自定义规则', value: 'custom', message: '满足async-validate书写规范' }
]

// 下拉规则列表
export const systemSelectRuleOption = [
	{ label: '必填', value: 'required', message: '无数据' },
	{ label: '自定义规则', value: 'custom', message: '满足async-validate书写规范' }
]

// 输入限制列表
export const limitInputOption = [
	{
		label: '仅数字',
		value: 'mplOnlyNumber',
		message: '仅允许数字0-9',
		callback: `
			function limit(str: string) {
				return str.replace(/\D/g, '')
			}
		`
	},
	{
		label: '仅字母',
		value: 'mplOnlyChar',
		message: '仅允许字母a-z或A-Z',
		callback: `
			function limit(str: string) {
				return str.replace(/[^a-zA-Z]/g, '');
			}
		`
	},
	{
		label: '禁止前后空格',
		value: 'mplTrimSpace',
		message: '禁止前后空格',
		callback: `
			function callback(str: string) {
				return str.trim()
			}
		`
	},
	{
		label: '仅中文',
		value: 'mplOnlyChinese',
		message: '仅允许中文字符',
		callback: `
			function limit(str: string) {
				return str.replace(/[^\u4e00-\u9fa5]/g, '')
			}
		`
	},
	{
		label: '仅数字字母',
		value: 'mplOnlyNumberChar',
		message: '仅允许数字0-9或字母a-z大小写',
		callback: `
			function limit(str: string) {
				return str.replace(/[^a-zA-Z0-9]/g, '')
			}
		`
	},
	{
		label: '仅数字字母下划线',
		value: 'mplOnlyNumberCharUnderline',
		message: '仅允许数字0-9或字母a-z大小写或下划线',
		callback: `
			function limit(str: string) {
				return str.replace(/\W/g, '')
			}
		`
	},
	{
		label: '合法变量名',
		value: 'mplLegalVar',
		message: '合法变量名, 数字字母下划线,首位非数字, 不能为关键字',
		callback: `
			function limit(str: string) {
				// ECMAScript 标准保留字
				const jsKeywords = new Set([
					'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
					'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for',
					'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface', 'let',
					'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'static',
					'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void',
					'while', 'with', 'yield', 'await', 'arguments'
				])

				// 仅允许数字、字母、下划线
				let validName = str.replace(/\W/g, '')

				// 处理空字符串或全非法字符的情况
				if (!validName) {
					return '_mpl_empty_var';
				}

				// 首位不能是数字
				if (/^[0-9]/.test(validName)) {
					validName = '_' + validName
				}

				// 不能为 JS 关键字
				if (jsKeywords.has(validName)) {
					validName = '_' + validName
				}

				return validName
			}
		`
	},
	{
		label: '自定义限制',
		value: 'mplCustomLimit',
		message: '自定义输入限制, 绑定input事件',
		callback: `
			function limit(str: string) {
				// todo: 实现自定义限制逻辑
				return str
			}
		`
	}
]

// 表单控件规则通用校验
export function mplSystemRule() {
	return {
		required: (rule: any, value: any, callback: any) => {
			if (value === '') {
				callback(new Error('不能为空'))
			} else {
				callback()
			}
		}
	}
}
