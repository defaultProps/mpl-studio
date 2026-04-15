<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { dragNewCompStart } from '@/utils/dom'
import { viewStore } from '@mpl/store'
import ContextMenu from '@imengyu/vue3-context-menu'


interface PlatformNode {
  label: string
  value: string
  children: Array<{ label: string, value: string, icon: string, type: string[] }>
}
const baseComponentList: PlatformNode[] = [
  {
    label: '表单服务类',
    value: 'container',
    children: [
      {
        label: '登录表单', // 初始化UI功能, 支持多种登录模式配置
        value: 'mpl-uu0pp1',
        icon: '',
        type: ['elementPlus']
      },
      {
        label: '单表excel编辑', // 单独窗口-编辑excel文件.
        value: 'mpl-ee4uu8',
        icon: '',
        type: ['elementPlus']
      },
      {
        label: 'AI聊天页',
        value: 'mpl-df5jy7',
        icon: '',
        type: ['elementPlus']
      },
      {
        label: 'AI聊天页',
        value: 'mpl-df5jy7',
        icon: '',
        type: ['elementPlus']
      },
      {
        label: 'AI聊天页',
        value: 'mpl-df5jy7',
        icon: '',
        type: ['elementPlus']
      },
      {
        label: 'AI聊天页',
        value: 'mpl-df5jy7',
        icon: '',
        type: ['elementPlus']
      },
      {
        label: 'AI聊天页',
        value: 'mpl-df5jy7',
        icon: '',
        type: ['elementPlus']
      },
      {
        label: 'AI聊天页',
        value: 'mpl-df5jy7',
        icon: '',
        type: ['elementPlus']
      },
      {
        label: 'AI聊天页',
        value: 'mpl-df5jy7',
        icon: '',
        type: ['elementPlus']
      },
      {
        label: 'AI聊天页',
        value: 'mpl-df5jy7',
        icon: '',
        type: ['elementPlus']
      },
      {
        label: 'AI聊天页',
        value: 'mpl-df5jy7',
        icon: '',
        type: ['elementPlus']
      }
    ]
  }
]
const view = viewStore()
const searchComponentList = ref<PlatformNode[]>([])
function handleContextmenu(event: MouseEvent, key: string) {
  event.stopPropagation()
  event.preventDefault()

  const contextmenu = [
    {
      label: '复制',
      icon: '',
      divider: true,
      disabled: false,
      value: 'copy',
      onclick: () => { }
    },
    {
      label: '文档',
      value: 'docs',
      icon: '',
      divider: false,
      disabled: false,
      onclick: () => { }
    },
    {
      label: '主题',
      value: 'docs',
      icon: '',
      divider: false,
      disabled: false,
      onclick: () => { }
    }
  ]

  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    items: contextmenu
  })
}

function dragover(el: any) {
  el.dataTransfer.effectAllowed = 'move'
  el.dataTransfer.dropEffect = 'move'
}

onMounted(() => {
  searchComponentList.value = baseComponentList.filter(v => v.children.length)
})

function formatTitle(obj: {
  label: string;
  value: string;
  icon: string;
  type: string[]
}) {
  const name = `🔰 名称：${obj.label}\n`
  const version = `🔰 控件版本：3.1.12\n`
  const moduleTotal = `🔰 相关模板数量：42\n`
  const useTotal = `🔰 总下载量：2697`

  return `${name}${version}${moduleTotal}${useTotal}`
}

function insertNodeWithActiveNode(value: string) { }

</script>

<template>
  <div class="base-node-list mpl-scroll-none">
    <template v-for="group in searchComponentList">
      <div class="group-title">
        {{ group.label }}
      </div>
      <div v-for="item in group.children" :key="item.label" class="component" draggable="true" :label="item.label"
        :title="item.label" @dragstart="dragNewCompStart($event, item.value)" @dragover="dragover"
        @dblclick="insertNodeWithActiveNode(item.value)" @contextmenu="handleContextmenu($event, item.value)" />
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
