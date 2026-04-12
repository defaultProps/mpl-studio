<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getBaseComponentList, type CoreNodeList } from '@/utils/constant'
import { dragNewCompStart } from '@/utils/dom'
import { viewStore, workbenchStore, userStore } from '@mpl/store'
import { NODE_TAG, Authority } from '@mpl/typings'
import { mapNodeSetting } from '@mpl/node'
import { newCid, insertNodeRight } from '@mpl/libs'
import { mplIframePostMessage } from '@mpl/const'
import ContextMenu from '@imengyu/vue3-context-menu'

const workbench = workbenchStore()
const baseComponentList = getBaseComponentList()
const view = viewStore()
const user = userStore()
const searchComponentList = ref<CoreNodeList[]>([])
function handleContextmenu(event: MouseEvent, key: string, authority: Authority) {
  event.stopPropagation()
  event.preventDefault()

  if (disabledComponent(authority)) {
    return
  }

  const contextmenu = [
    {
      label: '复制',
      icon: '',
      divider: true,
      disabled: false,
      value: 'copy',
      onClick: () => { }
    },
    {
      label: '文档',
      value: 'docs',
      icon: '',
      divider: false,
      disabled: false,
      onClick: () => { }
    },
    {
      label: '主题',
      value: 'docs',
      icon: '',
      divider: false,
      disabled: false,
      onClick: () => { }
    },
    {
      label: '相关模板',
      value: 'docs',
      icon: '',
      divider: false,
      disabled: false,
      onClick: () => {
        view.$patch({
          visibleDisplayNodeBox: true
        })
      }
    },
    {
      label: '历史版本',
      value: 'docs',
      icon: '',
      divider: false,
      disabled: false,
      onClick: () => { }
    }
  ]

  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    items: contextmenu
  })
}

onMounted(() => {
  searchComponentList.value = baseComponentList.filter(v => v.children.length)
})

function formatTitle() {
  const version = `🔰 控件版本：3.1.12\n`
  const moduleTotal = `🔰 相关模板数量：42\n`
  const useTotal = `🔰 总下载量：2697`

  return `${version}${moduleTotal}${useTotal}`
}

// 双击时,选中节点右侧插入.  shift + 双击 选中节点左侧插入
function insertNodeWithActiveNode(value: NODE_TAG, authority: Authority) {
  if (disabledComponent(authority)) {
    return
  }

  const activeNode: any = workbench.activeNode
  const cid = newCid()
  const targetNode = mapNodeSetting[value]
  if (!targetNode) {
    return
  }
  const newNode = targetNode.newNode(cid)

  // insert body root node
  if (!activeNode || activeNode.tag === 'mpl-body') {
    workbench.addNode(newNode, '')
    return
  }

  const allowTags: NODE_TAG[] = ['mpl-input', 'mpl-btn', 'mpl-password', 'mpl-select-dialog', 'mpl-number-input', 'mpl-rate', 'mpl-slider', 'mpl-time-range-picker', 'mpl-date-range-picker', 'mpl-color-picker', 'mpl-switch', 'mpl-checkbox', 'mpl-radio', 'mpl-select', 'mpl-date-picker', 'mpl-time-picker']

  // 基础容器插入节点
  if (activeNode.tag === 'mpl-base-box') {
    workbench.addNode(newNode, activeNode.cid)
  }

  // 插槽容器插入节点
  else if (activeNode.tag === 'mpl-slot-box') {
    if (Array.isArray(activeNode.selectNodePos)) {
      // 仅允许插入表单, 按钮组件
      if (!allowTags.includes(value)) {
        alert('仅允许插入按钮, 表单组件')
        return
      }

      // 当前位置已存在节点
      if (activeNode.layoutMapNode[`${activeNode.selectNodePos[0]}-${activeNode.selectNodePos[1]}`]) {
        alert('当前位置已存在节点')
        return
      }

      activeNode.mpl_children.push(newNode)
      activeNode.layoutMapNode[`${activeNode.selectNodePos[0]}-${activeNode.selectNodePos[1]}`] = cid
      workbench.selectNodeByCid(newNode.cid)
    } else {
      // 未选择插槽容器的插槽节点.
      console.error('请手动点击插槽节点, 双击触发插入节点')
    }
  }

  // 双击非容器节点, 默认向节点右侧插入新节点
  else {
    if (allowTags.includes(value)) {
      insertNodeRight(workbench.nodeList, newNode, activeNode.cid)
      workbench.selectNodeByCid(newNode.cid)
    }
  }

  mplIframePostMessage.workbench.updateNodeListWorkbench(workbench.nodeList)
}

// 拖到画板或者目录树结束后触发
function dragEnd() {
  mplIframePostMessage.workbench.dragEndElement()
}

function disabledComponent(authority: Authority) {
  return authority === 'enterprise' && user.authority !== 'enterprise'
}

</script>

<template>
  <div class="base-node-list mpl-scroll-none">
    <template v-for="group in searchComponentList">
      <div class="group-title">
        {{ group.label }}
      </div>
      <div v-for="item in group.children" :key="item.label" class="component"
        :class="{ disabled: disabledComponent(item.authority) }" :draggable="!disabledComponent(item.authority)"
        :label="item.label" :title="formatTitle()" @dragstart="dragNewCompStart($event, item.value)" @dragend="dragEnd"
        @dblclick="insertNodeWithActiveNode(item.value, item.authority)"
        @contextmenu="handleContextmenu($event, item.value, item.authority)">
        <svg-icon name="component" />
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.base-node-list {
  overflow: hidden auto;
  flex: 1;
  width: 100%;
  padding-bottom: 20px;
}
</style>
