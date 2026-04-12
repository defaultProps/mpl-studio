<template>
  <div ref="editorRef" class="code-editor" />
</template>

<script lang="ts" setup>
import { checkPageScript } from './core'
import {
  parseVueOptions,
  updateNodeListByMethodsCode,
  updateEventListByNodeList,
  removeMethodFromVueOptions,
  defaultCodeMirrorExtensions,
  getVariableNameAtPosition
} from '@mpl/libs'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { EditorState } from "@codemirror/state"
import * as beautify from 'js-beautify'
import { beautifyCode } from '@mpl/const'
import { workbenchStore } from '@mpl/store'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import { searchNodeListVarsByFullPath } from '@mpl/node'
import { EditorView, ViewUpdate, ViewPlugin } from '@codemirror/view'
import { undo, redo } from '@codemirror/commands'
import { useDebounceFn } from '@vueuse/core'

const workbench = workbenchStore()
const editorRef = ref(null)
let editorView: EditorView | null = null
const codeStr = ref(workbench.pageJs)

watch(() => workbench.pageJs, newVal => {
  if (editorView && newVal !== editorView.state.doc.toString()) {
    codeStr.value = beautify.js(newVal, beautifyCode.js) || ''
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: codeStr.value
      }
    })
  }
})

// 监听光标变化 和 选区变化
const cursorPlugin = ViewPlugin.fromClass(
  class {
    throttleUpdate: any
    constructor() {
      this.throttleUpdate = useDebounceFn(this.realUpdate.bind(this), 350);
    }
    update(update: ViewUpdate) {
      // 只拦截 选区/光标 变化
      if (update.selectionSet) {
        // 空值选中不处理
        // if (update.state.selection.main.empty) {
        //   return
        // }
        this.throttleUpdate(update);
      }
    }
    realUpdate(update: ViewUpdate) {
      const state = update.state;
      const selection = state.selection.main;
      const head = selection.head;
      const line = state.doc.lineAt(head);
      const obj = getVariableNameAtPosition(codeStr.value, line.number);
      // 空值不处理
      if (!obj.variableName || !obj.fullPath) {
        return
      }

      // 光标在方法内
      if (obj.variableName && obj.fullPath.indexOf('mpl.methods.') === 0) {
        // 跳转到左侧事件节点
        window.postMessage({
          type: 'FOCUS_CATEGORY_METHOD',
          payload: obj.variableName
        }, '*')
      }
      // 光标在props内
      else if (obj.variableName && obj.fullPath.indexOf('mpl.props.') === 0) {
        //
      }
      // 光标在watch位置
      else if (obj.variableName && obj.fullPath.indexOf('mpl.watch.') === 0) {
        //
      }
      // 光标在created位置
      else if (obj.variableName && obj.fullPath.indexOf('mpl.created.') === 0) {
        //
      }
    }
  }
);

onMounted(() => {
  const state = EditorState.create({
    doc: beautify.js(codeStr.value, beautifyCode.js),
    extensions: defaultCodeMirrorExtensions([
      EditorView.domEventHandlers({
        keydown(_e: KeyboardEvent) {
          if ((_e.ctrlKey || _e.metaKey) && _e.key === 'z') {
            undo(editorView!)
            return true
          }
          if ((_e.ctrlKey || _e.metaKey) && _e.key === 'y') {
            redo(editorView!)
            return true
          }
          return false
        }
      }),
      cursorPlugin
    ])
  })

  editorView = new EditorView({
    state,
    parent: editorRef.value!
  })
})

onMounted(() => {
  window.addEventListener('message', messageIDE)
})

function messageIDE(event: MessageEvent<any>) {
  // 删除事件
  if (event.data.type === 'REMOVE_IDE_METHOD') {
    if (editorView) {
      // 删除事件
      const code = editorView.state.doc.toString()
      // 删除code中的，eventName方法
      const eventName = event.data.payload
      const newCode = removeMethodFromVueOptions(code, eventName)
      editorView.dispatch({
        changes: { from: 0, to: editorView.state.doc.length, insert: newCode },
      });
      workbench.pageJs = newCode
    }
  }

  // 外部更新脚本IDE模式
  else if (event.data.type === 'UPDATE_IDE_PAGE_JAVASCRIPT') {
    const { code = '', focusName = '' } = event.data.payload
    if (editorView) {
      //只读模式只需要覆盖.
      if (!code) {
        // 不存在则默认取workbench.pageJs
        editorView.dispatch({
          changes: {
            from: 0,
            to: editorView.state.doc.length,
            insert: beautify.js(workbench.pageJs, beautifyCode.js) || ''
          }
        })
      }

      // focusName有值则聚焦到具体方法
      if (focusName) {
        focusOnMethod(focusName)
      }
    } else {
      workbench.ideModel = 'var'
    }
  }

  // 外部聚焦到脚本IDE模式
  else if (event.data.type === 'FOCUS_IDE_METHOD') {
    focusOnMethod(event.data.payload)
  }
}

function focusOnMethod(methodName: string) {
  if (!editorView || !methodName) return;

  const doc = editorView.state.doc;
  const text = doc.toString();
  const index = text.indexOf(methodName);

  if (index === -1) return false;

  // 找到字符所在的行
  const line = doc.lineAt(index);
  // 核心：把光标设置为【该行最后一列】
  editorView.dispatch({
    selection: {
      anchor: line.to, // 行尾位置
      head: line.to,
    },
    scrollIntoView: true,
  });

  editorView.focus()

  return true;

}

// 脚本内容保存
async function saveCode() {
  // 更改事件名称 = 删除事件 + 增加页面级别事件.
  // 删除事件同步组件UI
  // 事件代码格式不正确时不保存同步代码.
  if (!editorView) return


  const code = editorView.state.doc.toString()
  let msg = ''

  try {
    new Function(`${code}; return mpl`)()
  } catch (err) {
    msg = String(err)
  }

  // 根据methodsCode的增加删除同步NodeList节点. 更新事件左侧目录节点.
  // 会更新画板. 优化为只更新画板一次
  const parsed = parseVueOptions(code)
  // 同步更新nodeList事件
  workbench.updateNodeList(updateNodeListByMethodsCode(workbench.nodeList, parsed))
  // 同步更新eventList事件列表
  workbench.updateEventList(updateEventListByNodeList(parsed, workbench.eventList))
}

// 销毁
onUnmounted(() => {
  editorView?.destroy()
  window.removeEventListener('message', messageIDE)
})
</script>
<style lang="less" scoped>
.code-editor {
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: none;
}
</style>