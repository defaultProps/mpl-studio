# 组件全局指令

- `v-watermark` 水印。使用 `watermark-plus` `社区版`
- `v-number` 仅允许输入数字。 选择范围时 `v-number="{min, max}"` 等价于 `v-input="['number']"`
- `v-number_char` 仅允许输入数字英文 等价于 `v-input="['char', 'number']"`
- `v-number_char_upper` 仅允许数字英文大小写 等价于 `v-input="['input', 'char', 'upper']"`
- `v-char` 仅允许输入英文字母  等价于 `v-input="['char']"`
- `v-char_lower` 仅允许输入英文小写 等价于 `v-input="['char', 'lower']"`
- `v-char_upper` 仅允许输入英文大写 等价于 `v-input="['char', 'upper']"`
- `v-password` 中英文特殊字符大小写 等价于 `v-input="['password']"` 特殊字符 &%$#@*()-=_+!`|\'"?<>.,
- `v-input="['number', 'char', 'upper', 'password', {min, max}]`
- `v-copy` 赋值内容 `v-copy="mpl.var.rg4th5.input.value"` // 复制输入框内容
- `v-download` 按钮点击下载 `v-download="url"`
- `v-md` 文档内控件使用，显示markdown文档 `v-md="{theme: '', text: ''}"`
- `v-code` 文档内控件使用。显示vscode源码
- `v-bg` 设置背景图片 `v-bg="{url, animation: boolean // 鼠标移入放大缩小背景图片}"`
- `v-paste` 粘贴内容 仅输入类控件
- `v-share` 剪贴内容。仅输入类控件

- `v-custom` // 自定义接入控件、输入名称组件内容等

-------

## 自定义指令管理

自定义指令内容：

- `v-customName` // 指令名称
- `params` 指令参数列表【名称、数据类型，必填、描述】
- `api` 指令对应的处理回调逻辑