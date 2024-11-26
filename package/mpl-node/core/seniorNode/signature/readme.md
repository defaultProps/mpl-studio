# Intro

- 签名控件
- 企业版控件

## 功能点：

- 支持PC端查看、扫码、移动端签名
- PC端查看轮询获取签名、移动端签名保存签名

```javascript
import { mplSignature } from '@mpl/node-enterprise'

// PC端查看签名
<mplSignature mod="PC" url="扫码url地址" watermark="水印文字" v-model="签名图片base64" />

// 移动端签名
<mplSignature mod="mobile" @confirm="确认回调" @reset="重置回调" @cancel="取消回调" watermark="水印文字" v-model="签名图片base64" />

```