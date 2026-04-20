<!-- 服务绑定 -->
<script setup lang="ts">
import type { ServicePostMan } from '@mpl/typings'
import { onMounted, ref, onUnmounted } from 'vue'
import { beautifyCode } from '@mpl/const'
import * as beautify from 'js-beautify'
import { viewStore } from '@mpl/store'
import { EditorView } from '@codemirror/view'
import { EditorState } from "@codemirror/state"
import { defaultCodeMirrorExtensions } from '@mpl/libs'

const servicePostMan = defineModel<ServicePostMan>({ default: { url: '', methods: 'get', params: [] } })
const modelValue = ref('')
const emit = defineEmits(['close'])
const editorRef = ref(null)
let editorView: EditorView | null = null

onUnmounted(() => {
  editorView?.destroy()
})

onMounted(() => {
  const state = EditorState.create({
    doc: beautify.js(modelValue.value, beautifyCode.js),
    extensions: defaultCodeMirrorExtensions()
  })

  editorView = new EditorView({
    state,
    parent: editorRef.value!
  })
})

const mplServiceTree = [
  {
    label: 'mpl标准服务 - 模拟',
    value: 'mpl',
    children: [
      {
        label: '获取用户列表',
        url: '/mpl/platform/getUserList',
        method: 'get',
        query: [],
        params: []
      }
    ]
  }
]

const serviceTree = ref<any[]>([
  {
    label: '用户基础接口',
    value: 'qa',
    // 自动补全请求头和其他校验字段。通过平台的第三方接入SDK完成。
    children: [
      {
        label: '获取平台用户信息',
        value: 'q1',
        params: [
          { key: 'username', desc: '账户名' },
          { key: 'email', desc: '邮箱' },
          { key: 'zh', desc: '中文名' },
          { key: 'py', desc: '拼音' },
          { key: 'age', desc: '年龄' },
          { key: 'registerDate', desc: '注册日期【以毫秒时间返回】' },
          { key: 'lastLoginDate', desc: '最近登录日期【以毫秒时间返回】' },
          { key: 'gender', desc: '性别 man woman' },
          { key: 'telephone', desc: '电话号码【11位】' },
          { key: 'address', desc: '居住地址' },
          { key: 'avatar', desc: '头像【base64】' },
          { key: 'userId', desc: '用户id【唯一key】' },
          { key: 'weChatBind', desc: '是否绑定了微信【true/false】' },
        ],
        url: '/mpl/platform/getUserInfo',
        method: 'get'
      },
      { label: '获取用户历史登录记录列表', value: 'q2' },
      { label: '获取平台用户权限列表', value: 'q3' },
      {
        label: '用户',
        value: 'q4',
        children: [
          { label: '接口2-1', value: 'q11' },
          { label: '接口2-2', value: 'q22' },
          { label: '接口2-3', value: 'q33' },
          { label: '接口2-4', value: 'q44' }
        ]
      }
    ]
  }
])

function handleCancel() {
  emit('close')
  viewStore().$patch({
    subBoxSettingModel: '',
    subBoxSettingModelId: ''
  })
}

</script>
<template>
  <div class="service-interface--box mpl-scroll-none">
    <div class="service-header">
      <div class="service-tree">
        <el-tree :data="serviceTree" highlight-current>
          <template #default="{ data }">
            <div class="mpl-tree-line-node">
              <img v-if="data.type === 'folder'" src="@/assets/file.png" alt="">
              <img v-else src="@/assets/logo.png" alt="logo">
              <span class="tree-node--title">
                {{ data.label }}
              </span>
            </div>
          </template>
        </el-tree>
      </div>
      <div class="service-params">
        服务参数【参数绑定】 => ui[apifox]
      </div>
    </div>
    <div ref="editorRef" class="code-editor mb-5" />
    <div class="service-footer">
      <button type="button" class="mr-5 icon icon-close del-btn" @click="handleCancel">
        取消
      </button>
      <button type="button" class="icon icon-check">
        确认
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.service-interface--box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;

  .service-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex: 1;

    .service-tree {
      width: 250px;
      height: 100%;
      overflow: hidden auto;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      display: inline-block;
    }

    .service-params {
      flex: 1;
      display: inline-block;
      overflow: auto;
      box-sizing: border-box;
      padding: 5px;
    }
  }

  .code-editor {
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
  }

  .service-footer {
    border-top: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    text-align: right;
  }
}
</style>
