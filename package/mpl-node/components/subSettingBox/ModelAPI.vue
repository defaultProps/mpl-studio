<!-- 自动计算绑定值 -->
<script setup lang="ts">
import InputNode from '../InputNode.vue'
import { ref, watch, onMounted } from 'vue'
import { workbenchStore } from '@mpl/store'
import { filterNodeListWithClientAPI, getAllVarsByNodeList } from '@mpl/libs'
import type { Node, NODE_TAG, SENIOR_TAG } from '@mpl/typings'
import SubSettingHeaderUI from '../SubSettingHeaderUI.vue'

interface MiniNode {
  tag: string
  cid: string
  mpl_title: string
  mpl_children: MiniNode[] | undefined
}

interface MiniNodeCategory {
  tag: string
  mpl_title: string
  cid: string | undefined
  mpl_children: MiniNode[] | undefined
}

const props = defineProps<{
  tag: NODE_TAG | SENIOR_TAG // 绑定组件标签
  type: string // 绑定支值类型
  desc: string // 绑定值的描述
}>()
const emit = defineEmits(['change', 'close'])
const modelValue = ref<string>('')
const searchNode = ref('')
const workbench = workbenchStore()
const allVarList = ref<any[]>([])

function submitClient() {
  modelValue.value = ''
  emit('close')
}

onMounted(() => {
  allVarList.value = getAllVarsByNodeList(workbench.nodeList)
  const vars = [
    {
      label: '页面变量',
      children: [
        {
          label: '页面禁用',
          value: 'disabledPage'
        },
        {
          label: '页面加载状态',
          value: 'loadingPage'
        },
        {
          label: '页面所有表单规则',
          value: 'rules'
        }
      ]
    },
    {
      label: '系统方法',
      children: [
        {
          label: '提交前校验',
          value: 'validatePageBeforeSubmit'
        },
        {
          label: '页面加载前',
          value: 'pageBeforeLoad'
        },
        {
          label: '清空页面表单校验',
          value: 'clearAllValidate'
        },
        {
          label: '重置页面表单值',
          value: 'resetAllFormValues'
        },
        {
          label: '页面加载完成后',
          value: 'pageAfterLoad'
        },
        {
          label: '页面提交后',
          value: 'pageAfterSubmit'
        },
        {
          label: '页面销毁前',
          value: 'pageBeforeDestroy'
        }
      ]
    },
    {
      label: '平台变量',
      // 通过文档导入平台变量。 这个需要挂载平台和mpl-studio平台对接。
      children: [
        {
          label: '用户信息{userInfo包含用户信息字段： username, password, email, phone, role, id}',
          value: 'getPlatformUserInfo()', // 该方法是第三方平台提供。存在value字段表示可以使用。
          children: [
            {
              label: '用户名',
              value: 'getPlatformUserInfo().username'
            },
            {
              label: '密码',
              value: 'getPlatformUserInfo().password'
            },
            {
              label: '邮箱',
              value: 'getPlatformUserInfo().email'
            },
            {
              label: '手机号',
              value: 'getPlatformUserInfo().phone'
            },
            {
              label: '角色',
              value: 'getPlatformUserInfo().role'
            },
            {
              label: '用户ID',
              value: 'getPlatformUserInfo().id'
            },
          ]
        },
        {
          label: '平台token',
          value: 'getTokenPlatform()'
        },
        {
          label: '平台所有表单规则',
          value: 'rulesPlatform'
        }
      ]
    }
  ]
})

</script>

<template>
  <div id="modelClientAPIBox" class="model-api--box">
    <SubSettingHeaderUI :label="`公式计算 ${props.desc}`" @close="emit('close')" />
    <div class="content-box">
      <div class="left-form-node">
        <div class="title-bar flex">
          <span class="flex-1">页面字段</span>
          <select class="mpl-select mr-5" style="max-width: 100px">
            <option value="currentPage">组件字段</option>
            <option value="otherPage">类别字段</option>
          </select>
          <InputNode v-model="searchNode" class="fff-input" style="max-width: 200px;" placeholder="查询字段" />
        </div>
        <el-tree :data="allVarList" default-expand-all />
      </div>
      <div class="right-client-api">
        <div class="title-bar flex">
          公式列表
          <InputNode v-model="searchNode" class="fff-input" style="max-width: 200px;" placeholder="查询公式" />
        </div>
        {{ props.tag }}
      </div>
    </div>
    <div class="footer-ide">
      <div class="title-bar">
        基础输入框-账号df4rg5
        <button class="mpl-btn icon icon-setting" />
      </div>
      底部IDE展示
      <div class="btn-group">
        <button type="button" class="mpl-btn is-medium  mr-5 icon icon-close cancel-btn" @click="emit('close')">
          取消
        </button>
        <button type="button" class="mpl-btn is-medium icon icon-check is-active" @click="submitClient">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.model-api--box {
  width: 800px;
  height: 100%;
  position: absolute;
  right: 300px;
  top: 0;
  bottom: 0;
  z-index: 20;
  overflow: hidden auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;

  .title-bar {
    white-space: nowrap;
    overflow: hidden;
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    background: #e6e6e6;
    padding: 0 5px;
  }

  .content-box {
    width: 100%;
    flex: 1;
    overflow: hidden;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid #ccc;
    display: flex;

    .left-form-node,
    .right-client-api {
      flex: 1;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .right-client-api {
      border-left: 1px solid #ccc;
    }
  }

  .footer-ide {
    height: 200px;
    width: 100%;

    .btn-group {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}
</style>
