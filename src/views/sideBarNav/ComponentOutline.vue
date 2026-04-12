<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, watch, nextTick } from 'vue'
import { workbenchStore, viewStore } from '@mpl/store'
import { watchDebounced } from '@vueuse/core'
import type { Node } from '@mpl/typings'
import { ElTree } from 'element-plus'

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

const workbench = workbenchStore()
const coreView = viewStore()
const searchNode = ref<string>('')
const treeNodeList = ref<MiniNode[] | MiniNodeCategory[]>([])
const treeRef = ref<InstanceType<typeof ElTree>>()

// 直接展开选中节点
watch(() => workbench.activeNodeId, (newVal) => {
  if (newVal) {
    treeRef.value?.setCurrentKey(newVal)
    nextTick(() => {
      document.querySelector(`.node-label[aria-outline-node-cid="${newVal}"]`)?.scrollIntoView({ block: 'center' })
    })
  }
})

// 获取nodeList部分字段生成tree数据结构 - 层级结构
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

// 获取nodeList部分字段生成tree数据结构 - 类别结构
function getNodeListPartFieldsToTreeByCategory(nodeList: Node[]) {
  // 一般来说, 弹框, 抽屉, 业务组件是常用组件, 首要放在前位置
  const tags = ['mpl-dialog', 'mpl-drawer', 'mpl-bc']
  const result: MiniNodeCategory[] = []

  function _miniNode(node: Node) {
    const _obj = {
      tag: node.tag,
      cid: node.cid,
      mpl_title: node.mpl_zh || node.mpl_title,
      mpl_children: Array.isArray(node.mpl_children) ? [] : undefined
    }
    const p = result.find(s => s.tag === _obj.tag)
    if (p) {
      p.mpl_children?.push(_obj)
    } else {
      result.push({
        tag: node.tag,
        mpl_title: node.mpl_title,
        cid: node.tag === 'mpl-body' ? node.cid : undefined,
        mpl_children: node.tag === 'mpl-body' ? undefined : [_obj]
      })
    }

    if (Array.isArray(node.mpl_children)) {
      node.mpl_children.forEach(child => {
        _miniNode(child)
      })
    }
  }

  nodeList.forEach(node => {
    _miniNode(node)
  })

  return result
}

// nodeList更新监听
const stopNodeListWatcher = watchDebounced(workbench.nodeList, () => {
  changeOutlineMod()
}, { debounce: 500 })

onBeforeUnmount(() => {
  stopNodeListWatcher()
})

onMounted(() => {
  changeOutlineMod()
})

function changeOutlineMod() {
  const mod = coreView.activeOutlineMod

  // 层级结构- nodeList基础结构
  if (mod === 'directory') {
    treeNodeList.value = getNodeListPartFieldsToTree(workbench.nodeList)
  }

  // 类别结构 - 根据组件类型分类. 常用语查询某些组件的数量和类别可视化统计展示.
  else if (mod === 'category') {
    treeNodeList.value = getNodeListPartFieldsToTreeByCategory(workbench.nodeList)
  }
}

function clickTreeNode(node: MiniNode) {
  workbench.selectNodeByCid(node.cid)
  window.postMessage({ type: 'SELECT_NODE_INTER_ACTIVE_PANE', payload: node.cid })
}

// 开始拖动保存treeList数据, 拖动结束后, 对比treeList数据, 如果有数据变化则更新画板和NodeList, 没有变化则不更新.
// 减少NodeList和画板的更新频率, 提高性能.
let stashTreeNodeListStr = ''
function nodeDragStart(event: any) {
  stashTreeNodeListStr = JSON.stringify(treeNodeList.value)
}

function nodeDrop(event: any) {
  // body节点禁止拖动
  if (event.data.tag === 'mpl-body') {
    return
  }

  // 未正确拖拽节点, 直接返回.
  if (JSON.stringify(treeNodeList.value) == stashTreeNodeListStr) return

  // 正确拖拽节点, 更新画板和NodeList.
  workbench.updateNodeList(JSON.parse(JSON.stringify(treeNodeList.value)))

}
</script>

<template>
  <div class="mpl-outline--container">
    <div class="header-box">
      <span class="label">大纲目录</span>
      <select v-model="coreView.activeOutlineMod" class="mpl-select" @change="changeOutlineMod">
        <option value="directory">
          层级
        </option>
        <option value="category">
          类别
        </option>
      </select>
    </div>
    <!-- 组件统计、分类、过滤查询、级联选择 floating-vue -->
    <div class="node-cascader-box">
      <input v-model.trim="searchNode" class="search-input" placeholder="控件搜索（名称，标识，事件）">
      <el-tree ref="treeRef" :data="treeNodeList" highlight-current node-key="cid" draggable class="mpl-scroll-none"
        :expand-on-click-node="false" :props="{ children: 'mpl_children', label: 'mpl_title' }"
        @node-drag-start="nodeDragStart" @node-drop="nodeDrop">
        <template #empty>
          <div class="empty-box">
            <img src="@/assets/empty.svg" alt="">
            <span>无节点</span>
          </div>
        </template>
        <template #default="{ node, data }">
          <span class="custom-tree-node-label" :aria-outline-node-cid="data.cid" @click="clickTreeNode(data)">
            <img v-if="data.mpl_children" src="@/assets/file.png" alt="">
            <span class="node-title">{{ data.mpl_title }}</span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mpl-outline--container {
  width: 100%;
  color: #333;
  background: #ffffff;
  height: 100%;
  flex-direction: column;
  display: flex;

  .header-box {
    height: 30px;
    padding: 0 2px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    width: 100%;
    color: #333;
    background: #e6e6e6;
    border-bottom: 1px solid #cccccc;

    .label {
      flex: 1;
      height: 100%;
      line-height: 26px;
      text-indent: 5px;
      display: flex;
      align-items: center;
      font-weight: 600;
      user-select: none;
    }

    select {
      max-width: 70px;
      width: 110px;
    }
  }

  .node-cascader-box {
    font-size: 12px;
    padding: 5px 0 5px 5px;
    box-sizing: border-box;
    flex-direction: column;
    display: flex;
    overflow: hidden;
    flex: 1;

    >.search-input {
      background: #f6f8fa;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: var(--radius-2);
      font-size: 12px;
      background: #efefef;
      height: 30px;
      text-indent: 5px;
      width: 190px;

      &:hover,
      &:focus,
      &:focus-visible {
        border: 1px solid var(--primary-color);
        border-radius: var(--radius-2);
        animation: gradientInput 0.3s forwards;
        outline: 1px solid var(--primary-color)
      }
    }

    >.el-tree {
      margin-top: 5px;
      flex: 1;
      overflow: hidden auto;

      .el-tree-node.is-current.is-focusable>.el-tree-node__content>.mpl-btn {
        display: block;
      }

      .el-tree-node__content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        >.mpl-btn {
          display: none;
        }

        .custom-tree-node-label {
          display: flex;
          align-items: center;
          flex: 1;

          img {
            width: 16px;
            height: 16px;
          }

          .node-title {
            flex: 1;
            height: 100%;
            line-height: 26px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }

      .el-text {
        font-size: 12px;
      }

      .empty-box {
        pointer-events: none;
        text-align: center;
        user-select: none;
        font-size: 12px;
        color: #606266;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 108px;
        }
      }
    }
  }
}
</style>
