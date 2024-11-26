<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getBaseComponentList, type CoreNodeList } from '@/utils/constant'
import { complexContextmenu, dragNewCompStart } from '@/utils/dom'
import mplStore from '@mpl/store'

const baseComponentList = getBaseComponentList()
const coreView = mplStore.viewStore()
const searchNode = ref<string>('')
const searchComponentList = ref<CoreNodeList[]>([])
function handleContextmenu(event: MouseEvent, key: string) {
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
    },
    {
      label: '历史版本',
      value: 'docs',
      icon: '',
      divider: false,
      disabled: false,
      onclick: () => { }
    }
  ]
  complexContextmenu(event, contextmenu, key)
}

function dragover(el: any) {
  el.dataTransfer.effectAllowed = 'move'
  el.dataTransfer.dropEffect = 'move'
}

onMounted(() => {
  searchComponentList.value = baseComponentList.filter(v => v.children.length)
})

function formatTitle() {
  const version = `🔰 控件版本：3.1.12\n`
  const moduleTotal = `🔰 模板数量：42\n`
  const useTotal = `🔰 总下载量：2697`

  return `${version}${moduleTotal}${useTotal}`
}

function handleSearchNode() {
  console.log(searchNode.value.trim(), !!searchNode.value.trim())
  if (searchNode.value.trim()) {
    searchComponentList.value = getBaseComponentList()
      .map((p) => {
        p.children = p.children.filter(
          t =>
            t.value.includes(searchNode.value)
            || t.label.includes(searchNode.value)
        )

        return p
      })
      .filter(v => v.children.length)
  }
  else {
    searchComponentList.value = getBaseComponentList()
  }
}
</script>

<template>
  <div class="base-node-list mpl-scroll-none">
    <div class="header-search">
      <input name="search-node" class="mpl-input" v-model.trim="searchNode" style="width: 176px;font-size: 12px"
        placeholder="控件搜索" @input="handleSearchNode" />
    </div>
    <div v-for="group in searchComponentList" :key="group.label" class="component-group">
      <div class="group-title">
        {{ group.label }}
      </div>
      <div v-for="item in group.children" :key="item.label" class="component">
        <span class="component-title icon mpl-icon" :class="item.icon" draggable="true" :mpl-c-id="item.value"
          :title="formatTitle()" @dblclick="coreView.visibleDisplayNodeBox = true"
          @dragstart="dragNewCompStart($event, item.value)" @dragover="dragover"
          @contextmenu="handleContextmenu($event, item.value)">
          {{ item.label }}
        </span>
      </div>
    </div>
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
