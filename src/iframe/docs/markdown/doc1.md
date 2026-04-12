# 🎄 项目操作指南

项目组确认挂载平台后，准备进入 `MPL Studio` 的项目操作步骤：

## ⭐️ 1、填入项目基本信息

- 项目名称
- 项目简称【用于源码仓库、代码提交、平台展示、推广演示等】
- 项目描述信息
- 项目人员权限分配【1 个项目经理管理员权限 + 20 个普通用户权限，关于人员权限细节更多请[点击查看](https://www.baidu.com)】
- 选择应用平台【`MPL Studio`会自动加载选择平台的相关资源数据，包括：主题、服务 API、平台脚本库、样式图片图标库等】
- 选择应用类型【应用平台可能挂载多种类型应用，基础应用/工作流应用/大屏展示应用/文档展示型应用等]
- <i class='mpl-VIP mpl'></i>选择三方服务【系统内置第三方付费服务，包括：付费模板库、付费组件库、付费主题、付费服务 API 等】
- <i class='mpl-VIP mpl'></i>选择源码仓库【可选系统内置源码仓库 & 外链源码存储仓库】
- <i class='mpl-VIP mpl'></i>选择资源存储库【可选系统内置资源存储库、外链资源存储仓库】

## 📦 2、工时监控

为了计算项目人员工作饱和程度，需要实时监控用户工作内容。

## 💡 3、服务购买

满足中途的业务开发需求，需要购买定制化的系统服务时，需要项目经理权限购买。

系统内置的服务氛围三种：

- 社区免费版本的基础服务，包含：基础控件、高级控件、客户端 SDK、服务端 SDK、主题库、通用静态资源库、企业版演示服务等
- 已购买企业版本的默认基础服务，包含所有社区版的基础服务，更加丰富扩展的基础服务、业务模板
- 系统提供的另加付费服务，包括：excel 付费控件、二维码 SDK、地图 SDK、签名、3D 动画、大屏图表控件、一键部署站点服务

确认新建项目填充项目基本信息:

项目组确认<a href="http://localhost:5173/docs?id=前置条件" target='_blank'>前置需求条件</a>后，开始使用 `MPL Studio`的

- 文档与在线预览：[传送门](https://imzbf.github.io/md-editor-v3)

- 在线尝试示例：[传送门](https://codesandbox.io/s/epic-bird-2znqo)

- 同系列`react`版本：[md-editor-rt](https://github.com/imzbf/md-editor-rt)

## ⭐️ 功能一览

- 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等；
- 内置的白色主题和暗黑主题，支持绑定切换；
- 支持快捷键插入内容； 支持使用 `prettier` 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）；
- 多语言，支持自行扩展语言；
- 粘贴上传图片，图片裁剪上传；
- 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）；
- 预览主题，内置`default`、`vuepress`、`github` 、`cyanosis`、`mk-cute`、`smart-blue` 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）；
- `mermaid`绘图（>=1.8.0），`katex`数学公式（>=1.9.0）；
- 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉选择类型及弹窗类型）等。
- 按需引用(>=4.0.0)。

## 📦 安装

```shell
yarn add md-editor-v3
```

使用已存在的语言、主题扩展，例如：日语

```shell
yarn add @vavt/cm-extension
```

使用更多的扩展工具栏组件，例如：导出内容为 PDF

```shell
yarn add @vavt/v3-extension
```

更多使用及贡献方式参考：[md-editor-extension](https://github.com/imzbf/md-editor-extension)

## 💡 用法

### ✍🏻 编辑器模式

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
  import { ref } from 'vue'
  import { MdEditor } from 'md-editor-v3'
  import 'md-editor-v3/lib/style.css'

  const text = ref('# Hello Editor')
</script>
```

> 从`v4.0.0`开始，内部组件支持按需引用。

> 如果页面存在多个编辑器，请给组件设置不相同的`editorId`。

### 📖 仅预览模式

```vue

<template>
  <MdPreview :editorId="id" :modelValue="text" />
  <MdCatalog :editorId="id" :scrollElement="scrollElement" />
</template>

<script setup>
  import { ref } from 'vue'
  import { MdPreview, MdCatalog } from 'md-editor-v3'
  import 'md-editor-v3/lib/preview.css'

  const id = 'preview-only'
  const text = ref('# Hello Editor')
  const scrollElement = document.documentElement
</script>
```

## 🗺 预览图

| 默认模式                                                         | 暗黑模式                                                        | 仅预览                                                                 |
| ---------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ![](https://imzbf.github.io/md-editor-v3/imgs/preview-light.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-dark.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-previewOnly.png) |

输入提示和自定义简单的标记、表情扩展预览

![](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

## 🎁 Apis

### 🔖 MdPreivew Props

| 名称                 | 类型                                                                                                    | 默认值                            | 说明                                                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| modelValue           | `string`                                                                                                | ''                                | md 编辑内容，vue 模板支持双向绑定（v-model="value"）                                                                                                                                 |
| theme                | `light \| dark`                                                                                         | 'light'                           | 主题切换                                                                                                                                                                             |
| class                | `string`                                                                                                | ''                                | 编辑器类名                                                                                                                                                                           |
| language             | `string`                                                                                                | 'zh-CN'                           | 内置中英文('zh-CN','en-US')，可自行扩展其他语言，同时可覆盖内置的中英文                                                                                                              |
| editorId             | `string`                                                                                                | 'md-editor-v3'                    | 编辑器唯一标识，非必须项，当相同页面存在两个编辑器时，请务必区别该属性                                                                                                               |
| showCodeRowNumber    | `boolean`                                                                                               | false                             | 代码块是否显示行号                                                                                                                                                                   |
| previewTheme         | `'default' \| 'github' \| 'vuepress' \| 'mk-cute' \| 'smart-blue' \| 'cyanosis'`                        | 'default'                         | 预览内容主题，自定义主题规则见下方                                                                                                                                                   |
| style                | `string \| CSSProperties`                                                                               | {}                                | 编辑器内联样式                                                                                                                                                                       |
| noMermaid            | `boolean`                                                                                               | false                             | 如果你不希望使用图表展示内容，可以设置关闭                                                                                                                                           |
| noKatex              | `boolean`                                                                                               | false                             | 不使用 katex 展示数学公式                                                                                                                                                            |
| codeTheme            | `'atom' \| 'a11y' \| 'github' \| 'gradient' \| 'kimbie' \| 'paraiso' \| 'qtcreator' \| 'stackoverflow'` | 'atom'                            | 代码块 highlight 样式名称，扩展更多见下方                                                                                                                                            |
| mdHeadingId          | `(text: string, level: number, index: number) => string`                                                | (text) => text                    | 标题`ID`计算方式                                                                                                                                                                     |
| sanitize             | `(html: string) => string`                                                                              | (html) => html                    | 通过该方法移除危险内容，比如 xss 相关。3.x 以后已内置危险代码处理，非特殊需求请勿使用该属性                                                                                          |
| noIconfont           | `boolean`                                                                                               | false                             | 不插入 iconfont 链接，你可以下载[SVG 版](https://at.alicdn.com/t/c/font_2605852_prouiefeic.js)或[Font Class 版](https://at.alicdn.com/t/c/font_2605852_prouiefeic.css)到本地自行引入 |
| formatCopiedText     | `(text: string) => string`                                                                              | (text: string) => text            | 格式化复制代码                                                                                                                                                                       |
| codeStyleReverse     | `boolean`                                                                                               | true                              | 代码块为暗色背景的预览主题，将代码风格设置为暗色风格                                                                                                                                 |
| codeStyleReverseList | `Array<string>`                                                                                         | ['default', 'mk-cute']            | 代码块为暗色背景的预览主题                                                                                                                                                           |
| noHighlight          | `boolean`                                                                                               | false                             | 是否不高亮代码                                                                                                                                                                       |
| noImgZoomIn          | `boolean`                                                                                               | false                             | 是否关闭编辑器默认的放大功能                                                                                                                                                         |
| customIcon           | `CustomIcon`                                                                                            | {}                                | 自定义的图标                                                                                                                                                                         |
| sanitizeMermaid      | `(h: string) => Promise<string>`                                                                        | (h: string) => Promise.resolve(h) | 转换生成的 mermaid 代码                                                                                                                                                              |

### 🔩 MdEditor Props

除去和`MdPreivew`相同的以外：

| 名称            | 类型                                                        | 默认值                                 | 说明                                                                         |
| --------------- | ----------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------- |
| pageFullscreen  | `boolean`                                                   | false                                  | 页面内全屏                                                                   |
| preview         | `boolean`                                                   | true                                   | 是否预览                                                                     |
| htmlPreview     | `boolean`                                                   | false                                  | 是否 html 预览(如果是 true，preview 需要设置为 false)                        |
| toolbars        | `Array<ToolbarNames \| number>`                             | [toolbars]                             | 选择性展示工具栏，可选内容<sup>见下方`toolbars`</sup>                        |
| toolbarsExclude | `Array<ToolbarNames \| number>`                             | []                                     | 选择性不展示工具栏，内容同`toolbars`                                         |
| noPrettier      | `boolean`                                                   | false                                  | 是否启用 prettier 优化 md 内容                                               |
| tabWidth        | `number`                                                    | 2                                      | 编辑器 TAB 键位等于空格数                                                    |
| tableShape      | `[number, number]`                                          | [6, 4]                                 | 标题栏添加表格时，预设待选表格大小，第一个代表最大列数，第二个代表最大行数。 |
| placeholder     | `string`                                                    | ''                                     |                                                                              |
| footers         | `Array<'markdownTotal' \| '=' \| 'scrollSwitch' \| number>` | ['markdownTotal', '=', 'scrollSwitch'] | 页脚显示内容，`=`左右分割，设置为`[]`不显示页脚                              |
| scrollAuto      | `boolean`                                                   | true                                   | 默认左右滚动状态                                                             |
| noUploadImg     | `boolean`                                                   | false                                  | 不展示上传图片选项                                                           |
| autoFocus       | `boolean`                                                   | false                                  | 文本区域自动获得焦点                                                         |
| disabled        | `boolean`                                                   | false                                  | 禁用文本区域                                                                 |
| readOnly        | `boolean`                                                   | false                                  | 文本区域为只读                                                               |
| maxLength       | `number`                                                    |                                        | 文本区域允许的最大字符数                                                     |
| autoDetectCode  | `boolean`                                                   | false                                  | 是否启用自动识别粘贴代码类别，目前仅支持从`vscode`复制的内容                 |
| completions     | `Array<CompletionSource>`                                   | []                                     | `@codemirror/autocomplete`匹配关键词的方法列表                               |
| showToolbarName | `boolean`                                                   | false                                  | 是否在工具栏下面显示对应的文字名称                                           |
| inputBoxWitdh   | `string`                                                    | '50%'                                  | 输入框默认的宽度                                                             |

> 如果你重新定义了标题，请务必通过`mdHeadingId`告诉编辑器你生成标题 ID 的算法。以便生成的内部目录能够正确导航。

<details>
 <summary>『toolbars』</summary>

```js
;[
  'bold',
  'underline',
  'italic',
  '-',
  'strikeThrough',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task', // ^2.4.0
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'catalog',
  'github'
]
```

</details>

> 你可以随意排序工具栏，通过`'-'`分割两个工具，通过`'='`实现左右放置！

> 你可以自定义工具栏，将`defToolbars`中自定义工具项的下标穿插在`toolbars`实现展示（这并不规范），更多请参考[文档](https://imzbf.github.io/md-editor-v3/docs)。

<details>
 <summary>『StaticTextDefaultValue』</summary>

自定义语言，需要替换的下面的全部内容（某些字段若不主动提供，会造成页面不美观）：

```ts
export interface ToolbarTips {
  bold?: string
  underline?: string
  italic?: string
  strikeThrough?: string
  title?: string
  sub?: string
  sup?: string
  quote?: string
  unorderedList?: string
  orderedList?: string
  task?: string // ^2.4.0
  codeRow?: string
  code?: string
  link?: string
  image?: string
  table?: string
  mermaid?: string
  katex?: string
  revoke?: string
  next?: string
  save?: string
  prettier?: string
  pageFullscreen?: string
  fullscreen?: string
  catalog?: string
  preview?: string
  htmlPreview?: string
  github?: string
  '-'?: string
  '='?: string
}

export interface StaticTextDefaultValue {
  // 工具栏hover提示
  toolbarTips?: ToolbarTips
  // 标题下拉框内容
  titleItem?: {
    h1?: string
    h2?: string
    h3?: string
    h4?: string
    h5?: string
    h6?: string
  }
  imgTitleItem?: {
    link: string
    upload: string
    clip2upload: string
  }
  // 添加链接或图片时弹窗提示
  linkModalTips?: {
    linkTitle?: string
    imageTitle?: string
    descLabel?: string
    descLabelPlaceHolder?: string
    urlLabel?: string
    urlLabelPlaceHolder?: string
    buttonOK?: string
  }
  // 裁剪图片弹窗提示，v1.2.0
  clipModalTips?: {
    title?: string
    buttonUpload?: string
  }
  // 预览代码中复制代码提示
  copyCode?: {
    text?: string
    successTips?: string
    failTips?: string
  }
  mermaid?: {
    // 流程图
    flow?: string
    // 时序图
    sequence?: string
    // 甘特图
    gantt?: string
    // 类图
    class?: string
    // 状态图
    state?: string
    // 饼图
    pie?: string
    // 关系图
    relationship?: string
    // 旅程图
    journey?: string
  }
  katex?: {
    // 行内公式
    inline: string
    // 块级公式
    block: string
  }
  footer?: {
    markdownTotal: string
    scrollAuto: string
  }
}
```

</details>

### 🧵 MdPreview 绑定事件

| 名称          | 类型                    | 说明                                      |
| ------------- | ----------------------- | ----------------------------------------- |
| onHtmlChanged | `html: string`          | html 变化回调事件，用于获取预览 html 代码 |
| onGetCatalog  | `list: Array<HeadList>` | 获取`markdown`目录                        |

### 🪢 MdEditor 绑定事件

除去和`MdPreivew`相同的以外：

| 名称        | 类型                                                                                      | 说明                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| onChange    | `value: string`                                                                           | 内容变化事件（当前与`textare`的`oninput`事件绑定，每输入一个单字即会触发）                                        |
| onSave      | `value: string, html: Promise<string>`                                                    | 保存事件，快捷键与保存按钮均会触发                                                                                |
| onUploadImg | `files: Array<File>, callback: (urls: Array<string>) => void`                             | 上传图片事件，弹窗会等待上传结果，务必将上传后的 urls 作为 callback 入参回传                                      |
| onError     | `err: { name: 'Cropper' \| 'fullscreen' \| 'prettier' \| 'overlength'; message: string }` | 运行错误反馈事件，目前包括`Cropper`、`fullscreen`、`prettier`实例未加载完成操作错误，以及输入内容超出限制长度错误 |
| onBlur      | `event: FocusEvent`                                                                       | 输入框失去焦点时触发事件                                                                                          |
| onFocus     | `event: FocusEvent`                                                                       | 输入框获得焦点时触发事件                                                                                          |
| onInput     | `event: Event`                                                                            | 输入框键入内容事件                                                                                                |
| onDrop      | `event: DragEvent`                                                                        | 拖放所选内容触发事件                                                                                              |

### 🎍 插槽

| 名称        | 类型                                                      | 默认值 | 说明                           |
| ----------- | --------------------------------------------------------- | ------ | ------------------------------ |
| defToolbars | `Array<DropdownToolbar \| NormalToolbar \| ModalToolbar>` | null   | 使用内置的组件自定义扩展工具栏 |
| defFooters  | `Array<string \| VNode \| JSX.Element>`                   | null   | 自定义扩展页脚                 |

使用内置的 3 个组件（说明见下方），自定义工具栏，简单示例：

```vue
<template>
  <MdEditor>
    <template #defToolbars>
      <NormalToolbar title="mark" @onClick="handler">
        <template #trigger>
          <svg class="md-editor-icon" aria-hidden="true">
            <use xlink:href="#md-editor-icon-mark"></use>
          </svg>
        </template>
      </NormalToolbar>
    </template>
  </MdEditor>
</template>

<script setup lang="ts">
  import { MdEditor, NormalToolbar } from 'md-editor-v3'
  import 'md-editor-v3/lib/style.css'

  const handler = () => {
    console.log('NormalToolbar clicked!')
  }
</script>
```

## 🤱🏼 实例暴露

编辑器暴露了若干方法在组件实例上，用来快捷监听编辑器内部状态或对调整内部状态。

```vue
<template>
  <MdEditor ref="editorRef" />
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { MdEditor } from 'md-editor-v3'
  import type { ExposeParam } from 'md-editor-v3'
  import 'md-editor-v3/lib/style.css'

  const editorRef = ref<ExposeParam>()

  onMounted(() => {
    editorRef.value?.on('catalog', console.log)
  })
</script>
```

> 触发方法不设置入参切换为相反状态

### 👂🏼 on

监听编辑器内部状态，包括：屏幕全屏、浏览器全屏、预览文本、预览 html、目录等。

- pageFullscreen

  ```js
  editorRef.value?.on('pageFullscreen', status => console.log(status))
  ```

- fullscreen

  ```js
  editorRef.value?.on('fullscreen', status => console.log(status))
  ```

- preview

  ```js
  editorRef.value?.on('preview', status => console.log(status))
  ```

- htmlPreview

  ```js
  editorRef.value?.on('htmlPreview', status => console.log(status))
  ```

- catalog

  ```js
  editorRef.value?.on('catalog', status => console.log(status))
  ```

### 💻 togglePageFullscreen

切换页面内全屏。

```js
editorRef.value?.togglePageFullscreen(true)
```

### 🖥 toggleFullscreen

切换屏幕全屏。

```js
editorRef.value?.toggleFullscreen(true)
```

### 📖 togglePreview

切换是否显示预览。

```js
editorRef.value?.togglePreview(true)
```

### 📼 toggleHtmlPreview

切换是否显示 html 预览。

```js
editorRef.value?.toggleHtmlPreview(true)
```

### 🧬 toggleCatalog

切换是否显示目录。

```js
editorRef.value?.toggleCatalog(true)
```

### 💾 triggerSave

触发保存。

```js
editorRef.value?.triggerSave()
```

### 💉 insert

手动向文本框插入内容。

```js
/**
 * @params selectedText 选中的内容
 */
editorRef.value?.insert(selectedText => {
  /**
   * @return targetValue    待插入内容
   * @return select         插入后是否自动选中内容，默认：true
   * @return deviationStart 插入后选中内容鼠标开始位置，默认：0
   * @return deviationEnd   插入后选中内容鼠标结束位置，默认：0
   */
  return {
    targetValue: `${selectedText}`,
    select: true,
    deviationStart: 0,
    deviationEnd: 0
  }
})
```

示例参考文档源码中的[扩展组件](https://github.com/imzbf/md-editor-v3/blob/dev-docs/src/components/MarkExtension/index.vue)

### 🎯 focus

手动聚焦输入框。

```ts
import type { FocusOption } from 'md-editor-v3'

const option: FocusOption | undefined = 'start'

// 聚焦时光标的位置，不提供默认上次失焦时的位置
editorRef.value?.focus(option)
```

## 💴 编辑器配置

使用`config(option: ConfigOption)`方法，可以对构建实例进行定制。

### codeMirrorExtensions

根据主题和内部默认的 codeMirror 扩展自定义新的扩展。

使用示例：编辑器默认不显示输入框的行号，需要手动添加扩展

```js
import { config } from 'md-editor-v3'
import { lineNumbers } from '@codemirror/view'

config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()]
  }
})
```

### markdownItConfig

自定义 markdown-it 核心库扩展、属性等。

```ts
type MarkdownItConfig = (
  md: markdownit,
  options: {
    editorId: string
  }
) => void
```

使用示例：配置使用`markdown-it-anchor`并在标题右侧显示一个超链接符号

```js
import { config } from 'md-editor-v3'
import ancher from 'markdown-it-anchor'

config({
  markdownItConfig(mdit) {
    mdit.use(ancher, {
      permalink: true
    })
  }
})
```

### markdownItPlugins

挑选、新增 markdown-it 核心库已预设的扩展。

```ts
type MarkdownItPlugins = (
  plugins: Array<MarkdownItConfigPlugin>,
  options: {
    editorId: string
  }
) => Array<MarkdownItConfigPlugin>
```

使用示例：修改图片的类名

```js
import { config } from 'md-editor-v3'

config({
  markdownItPlugins(plugins) {
    return plugins.map(p => {
      if (p.type === 'image') {
        return {
          ...p,
          options: {
            ...p.options,
            classes: 'my-class'
          }
        }
      }

      return p
    })
  }
})
```

### editorConfig

编辑器常规配置，语言、`mermaid`默认模板和渲染延迟：

```js
import { config } from 'md-editor-v3'

config({
  editorConfig: {
    // 语言
    languageUserDefined: { lang: StaticTextDefaultValue },
    // mermaid模板
    mermaidTemplate: {
      flow: `flow tempalte`,
      ...more
    },
    // 输入渲染延迟，默认500ms。当仅预览模式时，未设置此项默认0ms
    renderDelay: 500
  }
})
```

### editorExtensions

类型如下，用于配置编辑器内部的扩展

```typescript
import { config } from 'md-editor-v3'

config({
  editorExtensions: { iconfont: 'https://xxx.cc' }
})
```

<details>
  <summary>『EditorExtensions』</summary>

```ts
export interface EditorExtensions {
  highlight?: {
    instance?: any
    js?: string
    css?: {
      [key: string]: {
        light: string
        dark: string
      }
    }
  }
  prettier?: {
    standaloneJs?: string
    parserMarkdownJs?: string
  }
  cropper?: {
    instance?: any
    js?: string
    css?: string
  }
  iconfont?: string
  screenfull?: {
    instance?: any
    js?: string
  }
  mermaid?: {
    instance?: any
    js?: string
  }
  katex?: {
    instance?: any
    js?: string
    css?: string
  }
}
```

</details>

### 🫨 iconfontType

固定使用那种方式展示图标，可以切换展示的方式

- `svg`: symbol 方式
- `class`: font-class 方式

如果通过属性`customIcon`自定义的图标，会优先使用自定义的

### 🎨 mermaidConfig

mermaid 配置项，[配置详情](https://mermaid.js.org/config/schema-docs/config.html)

```js
import { config } from 'md-editor-v3'

config({
  mermaidConfig(base: any) {
    return {
      ...base,
      logLevel: 'error'
    }
  }
})
```

## 🪡 快捷键

主要以`CTRL`搭配对应功能英文单词首字母，冲突项添加`SHIFT`，再冲突替换为`ALT`。

_请注意，快捷键仅在输入框获取到焦点时可用！_

| 键位                   | 功能       | 说明                                                                   |
| ---------------------- | ---------- | ---------------------------------------------------------------------- |
| TAB                    | 空格       | 通过`tabWidth`属性预设 TAB 键位新增空格长度，默认 2，支持多行          |
| SHIFT + TAB            | 取消空格   | 同上，一次取消两个空格，支持多行                                       |
| CTRL + C               | 复制       | 选中时复制选中内容，未选中时复制当前行内容                             |
| CTRL + X               | 剪切       | 选中时剪切选中内容，未选中时剪切当前行                                 |
| CTRL + D               | 删除       | 选中时删除选中内容，未选中时删除当前行                                 |
| CTRL + S               | 保存       | 触发编辑器的`onSave`回调                                               |
| CTRL + B               | 加粗       | `**加粗**`                                                             |
| CTRL + U               | 下划线     | `<u>下划线</u>`                                                        |
| CTRL + I               | 斜体       | `*斜体*`                                                               |
| CTRL + 1-6             | 1-6 级标题 | `# 标题`                                                               |
| CTRL + ↑               | 上角标     | `<sup>上角标</sup>`                                                    |
| CTRL + ↓               | 下角标     | `<sub>下角标</sub>`                                                    |
| CTRL + O               | 有序列表   | `1. 有序列表`                                                          |
| CTRL + L               | 链接       | `[链接](https://github.com/imzbf/md-editor-v3)`                        |
| CTRL + Z               | 撤回       | 触发编辑器内内容撤回，与系统无关                                       |
| CTRL + SHIFT + S       | 删除线     | `~删除线~`                                                             |
| CTRL + SHIFT + U       | 无序列表   | `- 无序列表`                                                           |
| CTRL + SHIFT + C       | 块级代码   | 多行代码块                                                             |
| CTRL + SHIFT + I       | 图片链接   | `![图片](https://imzbf.github.io/md-editor-v3/imgs/preview-light.png)` |
| CTRL + SHIFT + Z       | 前进一步   | 触发编辑器内内容前进，与系统无关                                       |
| CTRL + SHIFT + F       | 美化内容   |                                                                        |
| CTRL + ALT + C         | 行内代码   | 行内代码块                                                             |
| CTRL + SHIFT + ALT + T | 表格       | `\|表格\|`                                                             |

## 🪤 内部组件

按需引入内部扩展组件：

```vue
<script lang="ts" setup>
  import { NormalToolbar } from 'md-editor-v3'
</script>
```

使用参考：[文档页面](https://imzbf.github.io/md-editor-v3)

### 🐣 普通扩展工具栏

`NormalToolbar`

- **props**

  - `title`: `string`，非必须，作为工具栏上的 hover 提示。

- **events**

  - `onClick`: `(e: MouseEvent) => void`，必须，点击事件。

- **slots**

  - `trigger`: `VNode | JSX.Element`，必须，通常是个图标，用来展示在工具栏上。

### 🐼 下拉扩展工具栏

`DropdownToolbar`

- **props**

  - `title`: `string`，非必须，作为工具栏上的 hover 提示。
  - `visible`: `boolean`，必须，下拉状态。

- **events**

  - `onChange`: `(visible: boolean) => void`，必须，状态变化事件。

- **slots**

  - `trigger`: `VNode | JSX.Element`，必须，通常是个图标，用来展示在工具栏上。
  - `overlay`: `VNode | JSX.Element`，必须，下拉框中的内容。

### 🦉 弹窗扩展工具栏

`ModalToolbar`

- **props**

  - `title`: `string`，非必须，作为工具栏上的 hover 提示。
  - `modalTitle`: `string`，非必须，弹窗的标题。
  - `visible`: `boolean`，必须，弹窗显示状态。
  - `width`: `string`，非必须，弹窗宽度，默认`auto`。
  - `height`: `string`，同`width`。
  - `showAdjust`: `boolean`，非必须，是否显示弹窗全屏按钮。
  - `isFullscreen`: `boolean`，显示全屏按钮时必须，弹窗全屏状态。

- **events**

  - `onClick`: `() => void`，必须，工具栏点击事件。
  - `onClose`: `() => void`，必须，弹窗点击关闭事件。
  - `onAdjust`: `(val: boolean) => void`，弹窗全屏按钮点击事件。

- **slots**

  - `trigger`: `VNode | JSX.Element`，必须，通常是个图标，用来展示在工具栏上。
  - `default`: `VNode | JSX.Element`，必须，弹窗中的内容。

### 🐻 目录导航

`MdCatalog`

- **props**

  - `editorId`: `string`，必须，对应编辑器的`editorId`，在内部注册目录变化监听事件。
  - `class`: `string`，非必须，目录组件最外层类名。
  - `mdHeadingId`: `MdHeadingId`，非必须，特殊化编辑器标题的算法，与编辑器相同。
  - `scrollElement`: `string | HTMLElement`，非必须，为字符时应是一个元素选择器。仅预览模式中，整页滚动时，设置为`document.documentElement`。
  - `theme`: `'light' | 'dark'`，非必须，当需要切换主题时提供，同编辑器的`theme`。
  - `offsetTop`: `number`，非必须，标题距离顶部该像素时高亮当前目录项，默认 20 像素。
  - `scrollElementOffsetTop`: `number`，非必须，滚动区域的固定顶部高度，默认 0。

- **events**

  - `onClick`: `(e: MouseEvent, t: TocItem) => void`，非必须，导航点击事件。
  - `onActive`: `(heading: HeadList | undefined) => void`，非必须，高亮的标题变化事件。

### 🛸 弹窗组件

`MdModal`

- **props**

  - `title`: `string`，非必须，弹窗标题栏。
  - `visible`: `boolean`，必须，弹窗显示状态。
  - `width`: `string`，非必须，弹窗宽度，默认`auto`。
  - `height`: `string`，同`width`。
  - `showAdjust`: `boolean`，非必须，是否显示弹窗全屏按钮。
  - `isFullscreen`: `boolean`，显示全屏按钮时必须，弹窗全屏状态。
  - `className`: `string`，非必须，类名。
  - `style`: `CSSProperties`，非必须，样式。

- **events**

  - `onClose`: `() => void`，必须，弹窗点击关闭事件。
  - `onAdjust`: `(val: boolean) => void`，弹窗全屏按钮点击事件。

- **slots**

  - `default`: `VNode | JSX.Element`，必须，弹窗中的内容。

## 🪤 内部配置

```js
import { iconfontClassUrl, iconfontSvgUrl, allToolbar, allFooter, zh_CN, en_US } from 'md-editor-v3'

console.log(iconfontClassUrl, iconfontSvgUrl, allToolbar, allFooter, zh_CN, en_US)
```

## 🗂 部分示例

### 🎸 Jsx 模板

```jsx
import { defineComponent, reactive } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

export default defineComponent({
  setup() {
    const md = reactive({
      text: '# Hello Editor'
    })
    return () => <MdEditor modelValue={md.text} onChange={value => (md.text = value)} />
  }
})
```

### 🥹 上传图片

默认可以选择多张图片，支持粘贴板上传图片。

> 注意：粘贴板上传时，如果是网页上的 gif 图，无法正确上传为 gif 格式！

```vue
<template>
  <MdEditor v-model="text" @onUploadImg="onUploadImg" />
</template>

<script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { MdEditor } from 'md-editor-v3'
  import 'md-editor-v3/lib/style.css'

  const text = ref('# Hello Editor')

  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map(file => {
        return new Promise((rev, rej) => {
          const form = new FormData()
          form.append('file', file)

          axios
            .post('/api/img/upload', form, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(res => rev(res))
            .catch(error => rej(error))
        })
      })
    )

    callback(res.map(item => item.data.url))
  }
</script>
```

### 🧙‍♂️ 调整编辑器样式

2.x 使用 css 变量定义了大部分内容：

```less
.css-vars(@isDark) {
  --md-color: if(@isDark, #999, #222);
  --md-hover-color: if(@isDark, #bbb, #000);
  --md-bk-color: if(@isDark, #000, #fff);
  --md-bk-color-outstand: if(@isDark, #111, #f6f6f6);
  --md-bk-hover-color: if(@isDark, #1b1a1a, #f5f7fa);
  --md-border-color: if(@isDark, #2d2d2d, #e6e6e6);
  --md-border-hover-color: if(@isDark, #636262, #b9b9b9);
  --md-border-active-color: if(@isDark, #777, #999);
  --md-modal-mask: #00000073;
  --md-scrollbar-bg-color: if(@isDark, #0f0f0f, #e2e2e2);
  --md-scrollbar-thumb-color: if(@isDark, #2d2d2d, #0000004d);
  --md-scrollbar-thumb-hover-color: if(@isDark, #3a3a3a, #00000059);
  --md-scrollbar-thumb-active-color: if(@isDark, #3a3a3a, #00000061);
}

.md-editor {
  .css-vars(false);
}

.md-editor-dark {
  .css-vars(true);
}
```

只需要调整对应的 css 变量，比如调整暗夜模式下的背景：

```css
.md-editor-dark {
  --md-bk-color: #333 !important;
}
```

[enterprise-logo]: https://xuxx-1257225282.cos.ap-nanjing.myqcloud.com/image/VIP.svg?q-sign-algorithm=sha1&q-ak=AKIDf8rVs10V0YOOXnXf8TYuyQyK4Oaze4HsqKbJ8c0yZj84MaCglwo_bGeJKqdYwuvq&q-sign-time=1706497792;1706501392&q-key-time=1706497792;1706501392&q-header-list=host&q-url-param-list=&q-signature=463b65d2eeb1a144fe73d6cba4f016e94dca490f&x-cos-security-token=9d7PSZOZDbjspM2CS0bscvADy8g9pTka39e5f9ec1af69b889dbcc6deb3198029rv0W0S_gAIWfHl6lVR8-faJ7dbMxctttSKgJHP2F55MsyfWadjzjEQviKhXWDJqwJS6qBAT7anDLbm1I1l6rGlieFfrEs6u0rflYIzGxicbaV5EmcpEYHPTsOfS6ZfbH0kJhAusvApQJop1Ujo9n9j755vNPe2f3BS1HUiDXk6MNcixLqXFpcARRQDBEy66z
