## 开发基准线

- 首要以完成功能为主，性能问题后期版本统一处理。
- 采用原生标签 + `unoCSS` 减少DOM数量、CSS代码量
- 跳转时使用a标签，使用链接可拖拽新窗口
- 全面拥抱 vue3 & react PC为主，工作流辅助，移动端次之

## 任务

- 逐步移除 `element-plus`
- `package/*` 尝试rollup.js压缩包，UI平台所有静态数据全部迁移到package包统一管理
- 逐步删除代码中所有的中文文档，采用英文文档
- 使用浏览器默认样式，减少flex布局，增加grid布局

## Feature

- 页面提供分享功能
- 一键切换主题、主题平台【使用多个、画板主题下拉默认】、一个平台提供至少1个主题
- 基础组件增加推荐模板，`企业版模板、社区版模板` 并增加使用文档
- `MPL Studio` 提供三种权限划分，企业版、社区版，企业版提供 `项目经理` `普通用户`
- 注解功能：`富文本、页面注解、组件组件、交互注解、分享`
- 评论功能：`富文本、页面评论、组件评论、分享`
- 预览页面：`移动端、PC端、事件流显示、注解、评论、分享`
- 图层暂存: 暂存区、拖拉拽、配置、UI绝对定位排版【主要服务于组件UI排版自定义】
- 增加自定义组件【使用 `web container`，可在线导入第三方库-nodejs离线解析】迭代升级【UI组件 => 表单组件 => 库组件 => 源码组件】
- 平台切换：查看使用的API是否兼容【显示所有使用API】
- 图标管理 `symbol` `iconfont` 大部分使用class-icon 部分图表需要颜色则使用 `symbol`，减少DOM数量
- 图片管理：系统图片库，项目图片库
- 自定义上传静态资源 - JS管理接入常用npm包，系统内置部分常用包：file-saver.js excel.js、sortable.js、watermark.js、qs.js、axios.js、vue.js、babel.js & lodash.js & day.js & js-cookie.js & flv.js & anime.js & eCharts.min.js、url地址[提供开发、测试、生成【前缀 `BASE_URL`】、jquery.js、moment.js、
- 【尝试接入 `web container` 接入`nodejs`环境】在线提供`postman`功能  

- 所有临时悬浮组件、弹窗类组件、在线IDE、iframe等关闭时必须销毁
- 文档管理：组件文档、用户指南，功能注释企业版标识
- 服务管理：系统服务提供多种资源SDK`graphQL`、免费在线api接口、视频、音频、网易云、可视化调试postman
- 源码管理
- 组件库：`vue3/element-plus` `react/ant-design` `vue3/vant4` `react/ant-design-mobile`
- 模板市场。企业版、社区版、业务功能模板、页面模板、项目模板
- 前端API列表提供 & 相关文档
- monaco导出的css样式过多，建议懒加载 & 仅加载所需样式文件【静态、本地】
- 非可视化区域的组件全部隐藏[v-if="false"]，减少DOM数量
- 使用自定义的 unoCSS 统计全部css代码，减少重复代码量

### 具体细节

- `mpl Studio` 固定区域使用 `web-components` 提供性能
- 后台上线腾讯云服务
- 源码管理接入 `github`
- 增加监控功能，大屏展示用户操作习惯热点图
- `client-api` 提供300+节点，企业版、社区版 `@mpl/client-api`
- `service-api` 提供200+节点，企业版、社区版 `@mpl/service-api`
- 增加国际化功能，预先提供中文简体、英文、日文
- 接入AI模型
- 登录注册服务。微信、电话号码、邮箱、账号密码、Demo账号密码 `mpl studio` `mpl studio`
- 组件提供less-IDE编辑模式
- 组件提供event-IDE编辑模式：目录模式、工作流模式、IDE模式【提供API服务选择】
- 大纲展示页面组件统计： cascader级联展示 + 组件统计数量 + 组件搜索【组件已绑定的事件数量、告警数量、错误代码数量等】
- 智能检测组件内部交互【工作流模式】
- 提供自定义组件功能。 `vue3-sfc-loader` 远程加载文件或者本地开发-提供 `postMessage` 参数消息传递
- 提供 `spin-loading`，过渡动画
- 组件拖入画板，增加过度动画，展示放置区域的UI排版大小
- 文档：私有化部署文档
- 内置PC端平台：4+种`标准云平台[MPL-SCP]展示中台应用` `表操作平台[MPL-TABLE]展示ag-grid能力` `大屏展示[MPL-DFG]` `商城类平台[MPL-SCP]`
- 内置Mobile端平台：4+种 `购物类平台[MPL-SCP]` `MPL-H5 活动页平台` `聊天类平台[MPL-Chart]` `文档社区类MPL-DOC`
- 项目信息详情：项目名称、参与人员、权限展示、gitlab地址、在线人员、项目类型、挂载平台、工时统计
- mpl studio 增加错误监控推送到钉钉群
- 页面信息：名称、描述、路由地址、参与人员
- 内存优化 【浏览器开发工具快照 + chrome性能分析工具】
- 使用了企业版功能的组件增加水印模式
- 组件增加合并图层功能。方便拖拉拽、转为模板
- 所有的右键绑定 focus, 移除所有的mouseWheel

-----------------
### 3D组件

### 前端API

提供常用 `https://juejin.cn/post/7019090370814279693`

- 字符串处理
- 日期处理
- 数字处理
- 存储处理
- 请求处理
- 正则校验
- 数组操作
- 格式化【大写、小写、金额】
- 挂载平台提供SDK
- url参数获取、跳转处理


### 自定义组件

- 使用第三方库

```javascript
import('https://xxx.min.js').then()
```
- 远程加载 `defineAsyncComponent` `Suspense` `async setup`

## 移动端

- 增加 `popup` 组合控件，低代码的辅助选择、高级地址本控件。满足：搜索、下拉查询、暂存区域、删除、查看、弹窗内弹窗、等。主要满足中间缓存状态。


## 2024/09 任务列表

- `开源 & Demo` 开源项目 package 不开放。所有提交流程 commit 均遵循 angular commit规范。所有源码注解更换为英文。
- [x] 移除 `gitlab` 源码仓库
- 项目Demo初始化三个。PC端、移动端、跨平台。 element-plus & vant4
- 主题导出、页面导出Schema、图标导出
- 继续增加 Element-plus 10个组件 vant4 10+
- 已有的组件功能完善
- 设计已有组件的事件列表。代码编辑、工作流【目录模式和流模式】

## 2024/10 任务列表

- `github Demo` 更换为云部署仓库，接入 `nodejs` & `mysql`
- 演示项目demo增加 React[ant-design] [ant-design-mobile] 桌面 & 移动 & 跨平台
- 所有数据接口请求 `用户账号信息、主题、图标、脚本、图片、样式、自定义脚本、模板库、项目Demo、推送源码`
- 继续增加 Element-plus 10个组件 vant4 10个组件 ant-design 10+  ant-design-mobile 10+

## 画板优化

- 双击容器组件。容器组件变为唯一监听拖入的组件。这样其他组件就不会出现过渡动画。
- 组件右键功能齐全
- 任何文本类型均可直接编辑
- 拖动无动画。拖动暂停1s后，出现最终效果。
- 撤销动作仅仅撤销组件数量和排序。组件内部逻辑无撤销重做功能。
- 所有组件UI以所见即所得目标靠拢。

```javascript
{
  { label: "复制 ctrl+c 向上复制、向下复制" },
  { label: "复制标识" },
  { label: "剪切ctrl+x" },
  { label: "锁定[禁止操作]、对折[减少排版占位]" },
  { label: "删除 delete" },
  { label: "替换" },
  { label: "初始化 ctrl+delete" },
  { label: "样式" }, // 展示template层级 + div层级、样式层级、系统样式、自定义样式IDE[less变量最外层]
  { label: "位置更换：前移、后移、外移" },
  { label: "内部插入，末尾插入、首部插入" },
  { label: "周边插入 前插入 后插入" },
  { label: "变量列表:复制变量、跳转变量" },
  { label: '事件列表: 移除事件、复制事件、编辑事件、跳转事件、事件文档、事件内部引入资源列表' },
  { label: "注解列表" },
  { label: "源码 模板源码、样式源码、脚本源码、组件源码、页面源码、下载源码、查看schema、下载schema、跳转到xx编辑" },
  { label: "历史记录" },
  { label: "转到外层组件" },
  { label: "转到操作文档" },
  { label: "引入的第三方资源列表：前端API、服务API、SDK列表" },
  { label: "模板推荐。组件推荐、相似组件" },
  // ---- 页面操作
  { label: "当前锁定用户、强制解除锁定" },
  { label: "复制页面" },
  { label: "删除页面" },
  { label: "初始化页面" },
  { label: "页面下载：源码下载、schema下载[可导入]" },
  { label: "页面信息：历史记录、使用三方资源、版本、创建时间、修改时间、大小、文件类型" },
}
```