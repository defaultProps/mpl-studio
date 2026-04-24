// src/editor.js
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
// 只加载你需要的语言
import 'monaco-editor/esm/vs/language/json/jsonMode.js'
import 'monaco-editor/esm/vs/language/css/cssMode.js'
import 'monaco-editor/esm/vs/language/html/htmlMode.js'
import 'monaco-editor/esm/vs/language/css/monaco.contribution'; // 确保 CSS 语言已注册
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api'

// 自定义配置
monaco.editor.defineTheme("quiet", {
  base: "vs",
  inherit: true,
  rules: [],
  "colors": {
    "editor.background": "#f5f5f5",
    "editor.foreground": "#333333",
    "editorCursor.foreground": "#aaa",
    "editorWhitespace.foreground": "#ebebeb",
    "editorRuler.foreground": "#ebebeb",
    "editorIndentGuide.background": "#ebebeb",
    "editorIndentGuide.activeBackground": "#dcdcdc",
    "editor.lineHighlightBackground": "#e4f6d4",
    "activityBar.background": "#e0e9f6",
    "activityBar.foreground": "#4b83cd",
    "activityBarBadge.background": "#448c27",
    "badge.background": "#448c27",
    "badge.foreground": "#fff",
    "sideBar.background": "#f2f2f2",
    "sideBarSectionHeader.background": "#e0e9f6",
    "editorLineNumber.activeForeground": "#333333",
    "editorLineNumber.foreground": "#aaa",
    "statusBar.background": "#4b83cd",
    "statusBar.debuggingBackground": "#aa3731",
    "statusBar.noFolderBackground": "#aa3731",
    "button.background": "#4b83cd",
    "dropdown.background": "#f5f5f5",
    "errorForeground": "#600",
    "editor.selectionBackground": "#c1f5b0",
    "editor.selectionHighlightBackground": "#c1f5b044",
    "editor.selectionHighlightBorder": "#c1f5b0",
    "editor.inactiveSelectionBackground": "#dcdcdcaa",
    "editor.findMatchBackground": "#fef935",
    "editor.findMatchHighlightBackground": "#fef93533",
    "editor.findRangeHighlightBackground": "#dcdcdc55",
    "editorLink.activeForeground": "#4b83cd",
    "selection.background": "#c1f5b0",
    "editor.wordHighlightBackground": "#c1f5b044",
    "editor.wordHighlightStrongBackground": "#c1f5b044",
    "list.activeSelectionBackground": "#4b83cd",
    "list.activeSelectionForeground": "#fff",
    "list.inactiveSelectionBackground": "#91b3e0",
    "list.inactiveSelectionForeground": "#fff",
    "list.focusBackground": "#91b3e0",
    "list.inactiveFocusBackground": "#91b3e0",
    "list.hoverBackground": "#e0e0e0",
    "list.highlightForeground": "#7a3e9d",

    "editorGroup.dropBackground": "#c9d0d988",
    "focusBorder": "#a6b39b",
    "inputOption.activeBorder": "#adafb7",
    "inputValidation.errorBackground": "#ffeaea",
    "inputValidation.errorBorder": "#f1897f",
    "inputValidation.infoBackground": "#f2fcff",
    "inputValidation.infoBorder": "#4ec1e5",
    "inputValidation.warningBackground": "#fffee2",
    "inputValidation.warningBorder": "#ffe055",
    "panel.background": "#f5f5f5",
    "peekView.border": "#705697",
    "peekViewEditor.background": "#f2f8fc",
    "peekViewEditor.matchHighlightBackground": "#c2dfe3",
    "peekViewResult.background": "#f2f8fc",
    "peekViewResult.matchHighlightBackground": "#93c6d6",
    "peekViewTitle.background": "#f2f8fc",
    "pickerGroup.border": "#749351",
    "pickerGroup.foreground": "#a6b39b",
    "progressBar.background": "#705697",
    "tab.modifiedBorder": "#f1897f",
    "titleBar.activeBackground": "#c4b7d7",
    "walkThrough.embeddedEditorBackground": "#00000014"
  }
})


export const monacoFormatter: {
  css: editor.IStandaloneEditorConstructionOptions
  js: editor.IStandaloneEditorConstructionOptions
  html: editor.IStandaloneEditorConstructionOptions,
  json: editor.IStandaloneEditorConstructionOptions
} = {
  css: {
    language: 'css',
    minimap: {
      enabled: false
    },
    tabSize: 2,
    theme: 'quiet',
    fontSize: 14,
    folding: true,
    automaticLayout: true,
    readOnly: false
  },
  json: {
    language: 'json',
    minimap: {
      enabled: false
    },
    tabSize: 2,
    theme: 'quiet',
    fontSize: 14,
    folding: true,
    automaticLayout: true,
    readOnly: false
  },
  js: {
    language: 'javascript',
    minimap: {
      enabled: false
    },
    tabSize: 2,
    theme: 'quiet',
    fontSize: 14,
    folding: true,
    automaticLayout: true,
    readOnly: false,
    stickyScroll: {
      enabled: false, // 关闭滚动时, 上下文的占位, 在小屏幕时不需要
    }
  },
  html: {
    language: 'html',
    minimap: {
      enabled: false
    },
    theme: 'quiet',
    tabSize: 2,
    fontSize: 14,
    folding: true,
    automaticLayout: true,
    readOnly: false
  }
}

export const workbenchNodeCodeTest = {
  html: `
    <!-- 基础输入框 template 节点源码 -->
    <div class="mpl-form-item mpl-input--fb4rg5">
      <div class="mpl-label">{{ mpl.variable.fb4rg5.label }}</div>
      <div class="mpl-content">
        <el-input @input="mpl.fb4rg5.input" v-model="mpl.variable.fb4rg5.input" @focus="mpl.fb4rg5.focus"></el-input>
      </div>
    </div>
  `,
  variable: `
    // get/set variable
    // mpl.variable.fb4rg5.visible = false
    // 删除操作。不处理变量和事件。
    // 保存操作：递归删除无效变量。只要代码中存在 mpl.variable.fb4rg5 禁止删除变量 delete [边界问题 后期todo]
    // 单独存储在一个文件中。针对value较大的情况直接存储在服务器中[特别是数据量较大的表格] [后期todo]
    // vue不需要这么多的变量。proxy影响性能。需要剪裁掉未使用的变量[大后期todo]
    const mplVar = {
      fb4rg5: {
        visible: true,
        label: {
          visible: true,
          icon: {
            tooltip: "label tooltip"
          }
        },
        input: {
          visible: true,
          vModel: "",
          disabled: false,
        }
      }
    }
  `,
  url: `
    // use: mpl.url.getUserInfo
    // protocol 系统配置文件中 system.config.js. 由研发人员配置 开发环境 + 测试环境 + 生产环境三套地址
    const url = {
      getUserInfo: protocol + '/mpl/user',
      getScoresList: '/mpl/getScoresList',
      updateAvatar: 'mpl/updateAvatar'
    }
  `,
  api: `
    // mpl system api
    // mpl.api.getToken()
    // mpl.api.aesEncrypt(k:string):string
    // mpl.api.aesDecrypt(k:string):string
    export const api = {
      getToken: () => {},
      aesEncrypt: () => {},
      aesDecrypt: () => {}
    }
  `,
  platform: `
    // 第三方平台的api存放使用。内部的API由平台提供。每个平台的API互不干预
    // mpl.platform
    export const platform = {

    }  // mpl_cloud
    export const platform = {}  // tx_game
  `,
  globalVars: `
    // 使用操作
    const globalVars = {
      // 基础输入框 - 账号
      fb4rg5: {
        visible: true,
        label: {
          visible: true,
          icon: {
            tooltip: "label tooltip"
          }
        },
        input: {
          visible: true,
          vModel: "",
          disabled: false,
        }
      },
      // 基础输入框 - 密码
      eg5ku8: {},
      // 基础输入框 - 再次输入密码
      wr4jt6: {},
    }  `,

  //   export const mplGlobal = {
  //   // 使用常用js库。lodash.js, day.js, moment.js, qs.js, echarts.js, vueuse.js
  //   // 增加一个文档[monaco-hover-tooltip]跳转到 mpl系统库的文档列表
  //   // 列出常用库的常用方法列表
  //   formatDate: () => {},
  // }
  // export mplPlatform = {
  //   // 获取平台用户token
  //   getToken: () => {
  //     return String(token) || ''
  //   },
  //   // 获取用户信息
  //   getUserInfo: () => {
  //     return {
  //       userName: '', // 用户名
  //       userId: '', // 用户唯一标识
  //       loginToken: '', // 登录时的token
  //       authority: '', // 权限
  //       avatar: '', // 头像url
  //       telephone: '' , // 电话号码
  //     } || null
  //   },
  //   // 获取平台当前主题
  //   getCurrentTheme: () => {
  //     return themeId || ""
  //   },
  //   // 获取平台所有主题列表
  //   getThemes: () => {
  //     return [
  //       { themeName: '', themeId: '', url: '' }, // 主题名称、主题唯一标识、主题下载地址
  //     ] || []
  //   },
  //   // 切换平台主题
  //   updateTheme: (themeId) => boolean,
  //   // 格式化平台信息并跳转到登陆页
  //   goLoginPage:() => void,
  // }
  pageScript: `
    // 页面脚本
    export default {
      setup(props, {attrs, slots, emits, expose }) {
        return {
          mpl: ref(mpl.var), // 页面组件变量集合
          // 用户自定义变量集合
        }
      }
    }
  `,
  evtCode: `
    var mpl = {
      fb4rg5: {
        blur(event) {
          const value = mpl.var.get('fb4rg5.input.vModel')
          const url = '/a/b?k=1&k1=2'
          mpl.http.get(url).then(response => {
            if (response.data.result === '1') {
              // success code
            }
          })
        },
        input(value) {
          mpl.var.set('fb4rg5.input.vModel', '输入值')
          mpl.var.fb4rg5.input.vModel = '输入值'

          console.log(variable === value) // true
        },
        change() {},
        focus() {},
      }
    }
  `,
  style: `
    .mpl-input--fb4rg5 {
      .mpl-label {
        font-size: 12px;
      }
    }
  `
}