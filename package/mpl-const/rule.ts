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
]