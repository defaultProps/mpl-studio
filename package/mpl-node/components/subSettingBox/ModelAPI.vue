<!-- 自动计算绑定值 -->
<script setup lang="ts">
import InputNode from '../InputNode.vue'
import { ref, watch, onMounted } from 'vue'
import { workbenchStore } from '@mpl/store'
import { filterNodeListWithClientAPI } from '@mpl/libs'
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

function getNodeListPartFieldsToTree(nodeList: Node[]) {
  const result: MiniNode[] = []

  function _miniNode(node: Node, target: MiniNode) {
    const _obj = {
      tag: node.tag,
      cid: node.cid,
      mpl_title: node.mpl_title,
      mpl_children: Array.isArray(node.mpl_children) ? [] : undefined
    }
    target.mpl_children?.push(_obj)
    if (Array.isArray(node.mpl_children)) {
      node.mpl_children.forEach(child => {
        _miniNode(child, _obj)
      })
    }
  }

  nodeList.forEach(node => {
    const obj: MiniNode = {
      tag: node.tag,
      cid: node.cid,
      mpl_title: node.mpl_title,
      mpl_children: Array.isArray(node.mpl_children) ? [] : undefined
    }
    result.push(obj)
    if (Array.isArray(node.mpl_children)) {
      node.mpl_children.forEach(child => {
        _miniNode(child, obj)
      })
    }
  })

  return result
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
const treeNodeList = ref<any[]>([])

function submitClient() {
  modelValue.value = ''
  emit('close')
}

onMounted(() => {
  treeNodeList.value = getNodeListPartFieldsToTree(workbench.nodeList)
  console.log(treeNodeList.value, workbench.nodeList)
})
</script>

<template>
  <div id="modelClientAPIBox" class="model-api--box">
    <SubSettingHeaderUI :label="`自动计算值绑定 ${props.desc}`" @close="emit('close')" />
    <div class="content-box">
      <div class="left-form-node">
        <div class="title-bar flex">
          <span class="flex-1">页面变量</span>
          <select class="mpl-select mr-5" style="max-width: 100px">
            <option value="currentPage">组件变量</option>
            <option value="otherPage">类别变量</option>
          </select>
          <InputNode v-model="searchNode" class="fff-input" style="max-width: 100px;" placeholder="查询变量" />
        </div>
        <div v-for="node in treeNodeList" class="node-item">
          {{ node.mpl_zh }}
        </div>
      </div>
      <div class="right-client-api">
        <div class="title-bar flex">
          <span class="flex-1">公式列表</span>
          <select class="mpl-select mr-5" style="max-width: 100px">
            <option value="currentPage">组件变量</option>
            <option value="otherPage">类别变量</option>
          </select>
          <InputNode v-model="searchNode" class="fff-input" style="max-width: 100px;" placeholder="查询变量" />
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
