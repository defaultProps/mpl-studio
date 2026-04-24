<script lang="ts" setup>
import { workbenchStore, userStore, viewStore } from '@mpl/store'
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import NodeIDE from '@/views/eventEdit/NodeIDE.vue'
import FlowRoot from '@/views/eventEdit/FlowRoot.vue'
import type { EventNode, IDE_FOOTER_MODEL } from '@mpl/typings'
import { queryNodeByCid, insertMethodIntoNestedObject } from '@mpl/libs'
import { ElTree, ElMessageBox } from 'element-plus'
import { pageIDEOptions } from '@mpl/const'
import { getBaseComponentList, getSeniorComponentList } from '@/utils/constant'
import ContextMenu from '@imengyu/vue3-context-menu'
import AIChat from '@/views/workbench/ai/AIChat.vue'

interface CategoryTreeNode {
  name: string
  id: string
  children: Array<{ name: string, tag: string, id: string, cid?: string, children: Array<EventNode & { id: string }> }>
}

const user = userStore()
const view = viewStore()
const baseComponentList = getBaseComponentList().map(v => v.children.map(v => ({ tag: v.value, label: v.label }))).flat()
const seniorComponentList = getSeniorComponentList().map(v => v.children.map(v => ({ tag: v.value, label: v.label }))).flat()
const allComponentList = [...baseComponentList, ...seniorComponentList]
const props = defineProps<{ activeCollapse: boolean }>()
const workbench = workbenchStore()
const interactiveEventMode = ref<'category' | 'level' | 'event'>('category')
const eventVisibleMode = ref<'allEvents' | 'bindEvents'>('allEvents')
const eventTreeList = ref<CategoryTreeNode[]>([])
const treeRef = ref<InstanceType<typeof ElTree>>()
const editModel = ref<'IDEMode' | 'workflowMode'>('IDEMode')
const errorMsg = ref('')

function messageEventList(event: MessageEvent<any>) {
  // 外部直接跳转到对于高亮事件
  if (event.data.type === 'FOCUS_CATEGORY_METHOD') {
    treeRef.value?.setCurrentKey(event.data.payload)
  }
  // 监听全局事件更新列表
  if (event.data.type === 'UPDATE_EVENT_NODE_LIST') {
    initEventTreeList()
  }
  // 更新页面Javascript
  if (event.data.type === 'UPDATE_PAGE_JAVASCRIPT') {
    //
  }
}

// 直接展开选中节点
watch(() => workbench.activeNodeId, (newVal) => {
  if (newVal) {
    const node = document.querySelector(`.custom-tree-node[aria-node-cid="${newVal}"]`)
    nextTick(() => {
      treeRef.value?.setCurrentKey(newVal)
      node?.scrollIntoView({ block: 'center' })
    })
  }
})

onMounted(() => {
  window.addEventListener('message', messageEventList)
  initEventTreeList()
})

function getNameByTag(tag: string) {
  return allComponentList.find(v => v.tag === tag)?.label || ''
}

function initCategoryTreeList() {
  const categoryTreeList: CategoryTreeNode[] = [
    {
      name: '基础组件',
      id: 'baseComponent',
      children: []
    },
    {
      name: '高级组件',
      id: 'seniorComponent',
      children: []
    },
    {
      name: '引用组件',
      id: 'referenceComponent',
      children: []
    },
    {
      name: '业务模板',
      id: 'businessTemplate',
      children: []
    },
    {
      name: '其他事件',
      id: 'others',
      children: [
        {
          name: '自定义事件',
          tag: 'custom',
          id: 'custom',
          children: []
        },
        {
          name: '系统事件',
          tag: 'system',
          id: 'system',
          children: []
        }
      ]
    }
  ]

  workbench.eventList.forEach(v => {
    // 基础组件
    if (v.type === 'baseComponent') {
      const child = categoryTreeList[0]!.children
      const obj = child.find(s => s.tag === v.tag && s.id === v.cid)
      if (obj) {
        obj.children.push({ ...v, id: v.name })
      } else {
        child.push({
          name: getNameByTag(v.tag) + (v.mpl_zh ? `- ${v.mpl_zh}` : ''),
          tag: v.tag,
          id: v.cid,
          cid: v.cid,
          children: [{ ...v, id: v.name }]
        })
      }
    }
    // 高级组件
    else if (v.type === 'seniorComponent') {
      const child = categoryTreeList[1]!.children
      const obj = child.find(s => s.tag === v.tag && s.id === v.cid)
      if (obj) {
        obj.children.push({ ...v, id: v.name })
      } else {
        child.push({
          name: getNameByTag(v.tag),
          tag: v.tag,
          id: v.cid,
          cid: v.cid,
          children: [{ ...v, id: v.name }]
        })
      }
    }
    // 引用组件
    else if (v.type === 'referenceComponent') {
      const child = categoryTreeList[2]!.children
      const obj = child.find(s => s.tag === v.tag && s.id === v.cid)
      if (obj) {
        obj.children.push({ ...v, id: v.name })
      } else {
        child.push({
          name: getNameByTag(v.tag),
          tag: v.tag,
          id: v.cid,
          cid: v.cid,
          children: [{ ...v, id: v.name }]
        })
      }
    }
    // 业务模板
    else if (v.type === 'businessTemplate') {
      const child = categoryTreeList[3]!.children
      const obj = child.find(s => s.tag === v.tag && s.id === v.cid)
      if (obj) {
        obj.children.push({ ...v, id: v.name })
      } else {
        child.push({
          name: getNameByTag(v.tag),
          tag: v.tag,
          id: v.cid,
          cid: v.cid,
          children: [{ ...v, id: v.name }]
        })
      }
    }
    // 自定义事件
    else if (v.type === 'others') {
      categoryTreeList[4]!.children.find(v => v.tag === v.tag)!.children.push({ ...v, id: v.name })
    }
  })

  eventTreeList.value = categoryTreeList

  if (eventVisibleMode.value === 'bindEvents') {
    // eventTreeList.value = categoryTreeList
  }
}

function initEventTreeList() {
  // 类别树. 根据组件类别进行配置. 基础组件, 高级组件, 引用组件, 业务模板
  if (interactiveEventMode.value === 'category') {
    initCategoryTreeList()
  }
}

onUnmounted(() => {
  window.removeEventListener('message', messageEventList)
  eventTreeList.value = []
})

const defaultProps = {
  label: 'name',
  value: 'cid',
  children: 'children'
}

function nodeClick(data: any) {
  if (data.open) {
    workbench.ideModel = 'javascript'
    window.postMessage({ type: 'FOCUS_IDE_METHOD', payload: data.name }, '*')
  }
}

function handleRemoveEvent(data: any) {
  const eventName = data.name
  ElMessageBox.confirm('确定删除该事件吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showClose: false,
    type: 'warning',
  }).then(() => {
    // 删除事件
    workbench.singleEventReduce(eventName)
    // 同步更新IDE
    window.postMessage({ type: 'REMOVE_IDE_METHOD', payload: eventName }, '*')
  }).catch(() => {
    // 取消删除
  })
}

function handleAddEvent(data: EventNode, node: any) {
  let currentEventNodeCode = ''
  // 一般来说activeNode就是当前选中的节点概率高,为了提高效率先校验选中高亮组件
  if (workbench.activeNode && workbench.activeNode.cid === node.data.cid) {
    const obj = workbench.activeNode.defaultEvents.find(s => s.name === data.name)!
    currentEventNodeCode = obj.code
  } else {
    // nodeList中查找Node
    const { node: selectNode } = queryNodeByCid(workbench.nodeList, node.data.cid)
    const obj = selectNode!.defaultEvents.find(s => s.name === data.name)!
    currentEventNodeCode = obj.code
  }
  if (!currentEventNodeCode) {
    console.error('该事件未绑定代码，无法新增')
    return
  }

  // 更新 pageJs
  const result = insertMethodIntoNestedObject(workbench.pageJs, 'mpl', ['methods'], currentEventNodeCode)
  if (result.success) {
    workbench.pageJs = result.code
    // 更新eventList
    workbench.eventList.forEach(v => {
      if (v.name === data.name) {
        v.open = true
      }
    })
    node.data.open = true
    // 切换到脚本IDE + scrollIntoView 聚焦新增方法
    workbench.ideModel = 'javascript'
    window.postMessage({ type: 'UPDATE_IDE_PAGE_JAVASCRIPT', payload: { focusName: data.name } }, '*')
  } else {
    // 增加日志, 推送后台钉钉群
    console.error(result.error)
  }
}

function handleDescEvent(data: any) {
  const name = `🔰 事件名称：${data.name}\n`
  const desc = `🔰 事件描述：${data.desc}\n`
  const status = `🔰 事件状态：${data.open ? '已绑定' : '未绑定'}\n`
  const params = [
    `🔰@param value {String} - 控件值\n`,
    `🔰@param event {Object} - 事件对象\n`
  ].join('')
  const returnValue = `🔰 返回值：无返回值\n`
  return `${name}${desc}${status}${params}${returnValue}`
}

function handleEventVisibleModeChange() {
  if (interactiveEventMode.value === 'category') {
    initCategoryTreeList()
  }
}

function changeIDEModel(val: any) {
  workbench.ideModel = val
}

function handleInteractiveEventModeChange(e: Event) {
  // 类别树 根据组件类别进行分类. 用户可以通过组件分类进行查询组件相关事件
  // 层级树 根据组件层级进行分类. 用户可以通过页面的组件层级进行查询组件相关事件
  // 事件树 根据事件进行分类. 用户可以通过事件名称进行查询事件相关组件
}

function handleNodeContextmenu(event: any, data: any) {
  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    items: [
      {
        label: "折叠所有节点",
        icon: 'icon-tishikuang icon',
        onClick: () => {
          treeRef.value?.store.root.childNodes.forEach(node => {
            node.collapse()
          })
        }
      },
      {
        label: "右键菜单1",
        icon: 'icon-tishikuang icon',
        onClick: () => { }
      },
      {
        label: "右键菜单2",
        icon: 'icon-tishikuang icon',
        onClick: () => { },
        children: [
          {
            label: "右键菜单2.1",
            icon: 'icon-tishikuang icon',
            onClick: () => { }
          }
        ]
      },
      {
        label: "右键菜单3",
        icon: 'icon-tishikuang icon',
        onClick: () => { }
      }
    ]
  });
}

function clickTreeNode(cid: string) {
  if (cid) {
    workbench.selectNodeByCid(cid)
  }
}

function openAISidebar() {
  view.visibleAISidebar = !view.visibleAISidebar
}
</script>

<template>
  <div class="quick-config-interactive--panel">
    <div v-if="props.activeCollapse" class="nodes-select--box mpl-scroll-none">
      <div class="header-pane">
        <select v-model="interactiveEventMode" class="mpl-select flex-1" @change="handleInteractiveEventModeChange">
          <option value="category">
            类别树
          </option>
          <option value="level">
            层级树
          </option>
          <option value="event">
            事件树
          </option>
        </select>
        <select v-model="eventVisibleMode" class="mpl-select flex-1 ml-5" @change="handleEventVisibleModeChange">
          <option value="allEvents">
            全部事件
          </option>
          <option value="bindEvents">
            已绑定事件
          </option>
        </select>
      </div>
      <el-tree ref="treeRef" :default-expand-all="false" :expand-on-click-node="false" :props="defaultProps"
        node-key="id" highlight-current :data="eventTreeList" style="width: 200px"
        @node-contextmenu="handleNodeContextmenu">
        <template #default="{ data, node }">
          <!-- 组件描述 -->
          <div v-if="data.open === undefined" class="custom-tree-node" :aria-node-cid="data.id"
            @click="clickTreeNode(node.cid)">
            <img src="@/assets/file.png" alt="">
            <span class="event-label" :title="data.name">{{ data.name }}</span>
            <span v-if="data.id && !['custom', 'system'].includes(data.id) && eventVisibleMode === 'allEvents'"
              class="event-count">
              {{ `${data.children.filter((v: any) => v.open).length}/${data.children.length}` }}
            </span>
          </div>
          <!-- 事件列表 -->
          <div v-else class="custom-tree-node-event" :title="handleDescEvent(data)">
            <img v-if="data.open" src="@/assets/event-node.svg" alt="">
            <img v-else src="@/assets/node-event-close.svg" alt="">
            <span @click="nodeClick(data)">{{ data.desc }}</span>
            <button v-if="data.open" class="mpl-btn plaintext-btn del-btn icon icon-close1 mr-5" type="button"
              @click.stop="handleRemoveEvent(data)" />
            <button v-else class="mpl-btn plaintext-btn icon icon-plus mr-5" type="button"
              @click="handleAddEvent(data, node)" />
          </div>
        </template>
      </el-tree>
    </div>
    <div class="event-edit-box" :class="{ 'open-ai-sidebar': view.visibleAISidebar }">
      <div class="header-tool-line">
        <select v-model="editModel" class="mpl-select mr-5" disabled>
          <option label="流程模式" value="workflowMode" />
          <option label="目录模式" value="catalogMode" />
          <option label="IDE模式" value="IDEMode" />
        </select>
        <div v-if="editModel === 'IDEMode'">
          <template v-for="item in pageIDEOptions">
            <button class="mpl-btn mr-5" :class="[{ 'is-active': item.value === workbench.ideModel }]"
              @click="changeIDEModel(item.value)">
              {{ item.label }}
            </button>
          </template>
        </div>
        <div class="error-msg" :title="errorMsg">
          {{ errorMsg }}
        </div>
        <button type="button" :class="{ 'is-active': view.visibleAISidebar }" title="AI侧栏"
          class="fixed-right mpl-btn icon icon-youcelan" @click="openAISidebar" />
      </div>
      <FlowRoot v-if="['workflowMode', 'catalogMode'].includes(editModel)" v-model="editModel" />
      <NodeIDE v-else-if="editModel === 'IDEMode'" v-model:error-msg="errorMsg"
        v-model:ide-model="workbench.ideModel" />
      <AIChat v-if="user.authority === 'enterprise' && view.visibleAISidebar" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.quick-config-interactive--panel {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;

  .statistics-body {
    width: 100%;
    height: 100%;
    overflow: hidden auto;
    padding: 10px;
    box-sizing: border-box;
  }

  .nodes-select--box {
    width: 200px;
    min-width: 200px;
    max-width: 200px;
    height: 100%;
    overflow: hidden auto;
    text-align: center;
    background: #fff;
    border-right: 1px solid #ccc;

    .header-pane {
      position: sticky;
      top: 0;
      z-index: 1;
      grid-column-start: span 2;
      background-color: #f0f0f0;
      border-bottom: 1px solid #ccc;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5px;
      box-sizing: border-box;
    }

    .el-tree {
      border-right: 1px solid #f0f0f0;
      overflow: hidden auto;
      font-size: 12px;
    }

    .el-tree {
      font-size: 12px;
      padding-bottom: 20px;
      color: #1E1E1E;
      flex: 1;
      overflow: hidden auto;

      img {
        width: 16px;
        height: 16px;
        margin-right: 2px;
      }

      .el-tree-node.is-hidden {
        display: none;
      }

      .custom-tree-node-event {
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        width: 100%;
        height: 100%;
        line-height: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
          display: none;
        }

        span {
          flex: 1;
        }

        .del-btn {
          display: none;
        }

        &:hover button {
          display: inline-block;
        }
      }

      .custom-tree-node {
        overflow: hidden;
        width: 100%;
        height: 100%;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .event-label {
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          width: 100%;
          height: 100%;
          line-height: 26px;
          flex: 1;
        }

        .event-count {
          margin: 0 5px;
          color: #999;
          font-size: 12px;
        }

        .event-group-btn {
          display: none;
          align-items: center;
          justify-content: flex-end;
        }

        &.is-checked {
          font-weight: bolder;
          font-size: 14px;
          color: var(--primary-color);

          .event-group-btn {
            display: inline-flex;
          }
        }
      }
    }
  }

  .event-edit-box {
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 35px auto;
    grid-template-areas:
      "top-dynamic top-dynamic"
      "bottom-left-dynamic bottom-right-dynamic";
    box-sizing: border-box;

    &.open-ai-sidebar {
      grid-template-columns: 1fr 300px;
    }
  }

  .header-tool-line {
    grid-area: top-dynamic;
    height: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 5px;
    box-sizing: border-box;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
    font-size: 12px;

    .error-msg {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      color: #c3002f;
    }

    select {
      width: 80px;
      max-width: 80px;
      min-width: 80px;
    }
  }
}
</style>
