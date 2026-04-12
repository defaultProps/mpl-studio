// src/editor.js
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

// 只加载你需要的语言
import 'monaco-editor/esm/vs/language/json/jsonMode.js'
import 'monaco-editor/esm/vs/language/css/cssMode.js'
import 'monaco-editor/esm/vs/language/html/htmlMode.js'

// 自定义配置
monaco.editor.defineTheme("quiet", {
  base: "vs",
  inherit: true,
  colors: {
    // 编辑器主体
    'editor.background': '#F7F8FA',
    'editor.foreground': '#2E3141',

    // 行号、 gutter
    'editorLineNumber.foreground': '#9499B3',
    'editorLineNumber.activeForeground': '#3E4259',
    'editorGutter.background': '#F7F8FA',

    // 光标、选中
    'editorCursor.foreground': '#3E54D3',
    'editor.selectionBackground': '#DCDFFC',
    'editor.selectionHighlightBackground': '#DCDFFC80',

    // 当前行高亮
    'editor.lineHighlightBackground': '#EDEFF6',

    // 滚动条
    'scrollbarSlider.background': '#D0D3E6',
    'scrollbarSlider.hoverBackground': '#BABED4',

    // 提示、括号匹配
    'editorSuggestWidget.background': '#FFFFFF',
    'editorSuggestWidget.selectedBackground': '#EDEFF6',
    'editorBracketMatch.background': '#DCDFFC',
    'editorBracketMatch.border': '#3E54D3'
  },
  rules: [
    // ==============================================
    // 🔥 注释优化（核心）
    // ==============================================
    // 普通单行/多行注释：柔和灰蓝（护眼、对比度高）
    { token: 'comment', foreground: '#5A7B94', fontStyle: 'italic' },
    // 文档注释（JSDoc/TSDoc）：偏绿灰，更温和
    { token: 'comment.doc', foreground: '#6A9955', fontStyle: 'italic' },
    // 文档注释内关键字（@param/@returns）：紫灰，突出但不刺眼
    { token: 'comment.doc.keyword', foreground: '#9370DB', fontStyle: 'bold italic' },

    // 其他语法（保持 trae 风格）
    { token: 'keyword', foreground: '#3E54D3', fontStyle: 'bold' },
    { token: 'string', foreground: '#2DAE6F' },
    { token: 'number', foreground: '#B564FF' },
    { token: 'type', foreground: '#D35E9A' },
    { token: 'function', foreground: '#4C84E7' },
    { token: 'variable', foreground: '#2E3141' },
    { token: 'operator', foreground: '#3E54D3' },
    { token: 'delimiter', foreground: '#6B7292' }
  ]
})