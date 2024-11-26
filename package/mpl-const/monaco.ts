import type * as monaco from 'monaco-editor'

export const monacoIDE: {
  less: monaco.editor.IStandaloneEditorConstructionOptions
  js: monaco.editor.IStandaloneEditorConstructionOptions
  html: monaco.editor.IStandaloneEditorConstructionOptions
} = {
  less: {
    language: 'less',
    minimap: {
      enabled: true
    },
    tabSize: 2,
    fontSize: 14,
    folding: true,
    theme: 'vs-dark',
    automaticLayout: true,
    readOnly: true
  },
  js: {
    language: 'javascript',
    minimap: {
      enabled: false
    },
    tabSize: 2,
    fontSize: 14,
    folding: true,
    theme: 'vs-dark',
    automaticLayout: true,
    readOnly: true
  },
  html: {
    ariaLabel: 'v', // 自定义指令
    language: 'html',
    minimap: {
      enabled: false
    },
    tabSize: 2,
    fontSize: 14,
    folding: true,
    theme: 'vs-dark',
    automaticLayout: true,
    readOnly: true
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
    }
  `,
  globalMethod: `
    // 全局方法
    export const mplGlobal = {
      // 使用常用js库。lodash.js, day.js, moment.js, qs.js, echarts.js, vueuse.js
      // 增加一个文档[monaco-hover-tooltip]跳转到 mpl系统库的文档列表
      // 列出常用库的常用方法列表
      formatDate: () => {},
    }
    export mplPlatform = {
      // 获取平台用户token
      getToken: () => {
        return String(token) || ''
      },
      // 获取用户信息
      getUserInfo: () => {
        return {
          userName: '', // 用户名
          userId: '', // 用户唯一标识
          loginToken: '', // 登录时的token
          authority: '', // 权限
          avatar: '', // 头像url
          telephone: '' , // 电话号码
        } || null
      },
      // 获取平台当前主题
      getCurrentTheme: () => {
        return themeId || ""
      },
      // 获取平台所有主题列表
      getThemes: () => {
        return [
          { themeName: '', themeId: '', url: '' }, // 主题名称、主题唯一标识、主题下载地址
        ] || []
      },
      // 切换平台主题
      updateTheme: (themeId) => boolean,
      // 格式化平台信息并跳转到登陆页
      goLoginPage:() => void,
    }
  `,
  evtCode: `
    // use node event[system event]
    // mpl.node.fb4rg5.input("123")
    // 禁止使用动态变量名写法 mpl.node["fb4rg5"] 或者 name = "fb4rg5"; mpl.node[name] 
    // IDE中删除方法 => 提示用户 + 保存 + 校验[是否存在其他区域使用过此方法]格式化代码 + 更新视图绑定
    // IDE中删除业务代码 => 保存 + 校验格式化代码
    //redo.push(mpl.node.fb4rg5)
    export const node = {
      fb4rg5: {
        blur(event) {
          const value = mpl.variable.get('fb4rg5.input.vModel')
          mpl.http.get(mpl.service.getCounterURL, value).then(obj => {
            // todo
          })
        },
        input(value) {
          const val = mpl.variable.set('fb4rg5', 'input.vModel')
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

export const beautifyCode = {
  html: {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: -1,
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 160,
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false
  },
  css: {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: -1,
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'keep',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 160,
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false
  },
  js: {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: -1,
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'keep',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 160,
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false
  }
}
