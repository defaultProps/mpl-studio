## 导出到项目源码中使用

```javascript
// 请保持俩者版本一致。否则企业版无效，内部检测非相同版本则报错失效
// npm install @mpl/node-enterprise@10.4.12 仅包含付费 基础控件 + 模板控件 + 高级控件
// npm install @mpl/node-community@10.4.12 包含免费 基础控件 + 模板控件 + 高级控件

import mplNodeEnterprise from '@mpl/node-enterprise'
import mplNodeCommunity from '@mpl/node-community'
import '@mpl/style/mpl-community.css'
import '@mpl/style/mpl-enterprise.css'
import '@mpl/style/mpl-theme.css'
import { smsPlatform, dfnPlatform, appPlatform, emptyPlatform } from '@mpl/platform'

mplNodeEnterprise.init({
  sign: '' // 解码签名 - 付费购买，关闭动态动画水印 & dev-tool报错
})

createApp(App).use(mplNodeCommunity)
createApp(App).use(mplNodeEnterprise)

```