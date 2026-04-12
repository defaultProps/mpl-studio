# 签名控件

社区版功能

- 基础签名
- 固定颜色, 背景


企业版功能

- 自定义签名颜色, 背景颜色, 水印
- 可导出签名[png jpg svg svg+background]


## 代码方式
```javascript
import { mplSignature } from '@mpl/node-community'

// PC端查看签名
<mpl-signature mod="PC" url="扫码url地址" watermark="水印文字" v-model="签名图片base64" />

// 移动端签名
<mpl-signature mod="mobile" @confirm="确认回调" @reset="重置回调" @cancel="取消回调" watermark="水印文字" v-model="签名图片base64" />

```