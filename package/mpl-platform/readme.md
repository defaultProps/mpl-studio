# 应用平台

使用方法 

```javascript
import mplPlatform from '@mpl/platform'
import type { WorkbenchStore } from '@mpl/typings'

function init(params: WorkbenchStore) {
  ///
}

// 参数类型 WorkbenchStore
mplPlatform.init({
  themeType: '', // 主题
  grid: 24 | 12, // 显示纵向排版
  visibleComment: false, // 是否显示评论
  visibleEventFlow: false, // 是否显示事件流
  visibleWorkflow: false, // 是否显示工作流
  visibleDraft: false, // 是否显示草稿
  visibleNote: false, // 是否显示注解
  visibleGuildLine: true, // 辅助线
  visibleNodeCalloutLine: true, // 控件之间距线
  platform: [], // 挂载平台
  noteList: [], // 注解列表
  nodeList: [], // 节点列表 
}).mount('#app')

// 更新属性
mplPlatform.update({
  [key]: [value]
})

// 调用API
mplPlatform[methodName]

// DOM更新回调
import { watchNodeListCallBack } from '@mpl/platform'

watchNodeListCallBack(() => {
  ///
})

// 切换平台
mplPlatform.changePlatform(params: WorkbenchStore)
// 高亮控件
import type { Node } from '@mpl/typings'
mplPlatform.activeNode(node: Node)

```

- `vue2` `vue3` `react`
- 营销领域平台，展示表格、表单交互
- 文档平台，展示排版、markdown类
- 工作流平台。展示一套操作俩套代码，移动PC多平台兼容
- 在线表格操作。展示操作ag-grid组件
- 大屏展示平台。展示图表炫酷UI、排版能力
- 简历平台。展示简历组件，boss直聘平台简历功能借鉴。