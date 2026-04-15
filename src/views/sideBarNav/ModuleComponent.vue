<script lang="ts" setup>
import { ref } from 'vue'
import { getSeniorComponentList } from '@/utils/constant'
import { dragNewCompStart } from '@/utils/dom'
import ContextMenu from '@imengyu/vue3-context-menu'
import { viewStore, userStore } from '@mpl/store'
import type { Authority } from '@mpl/typings'

let searchComponentList = getSeniorComponentList()
const searchNode = ref<string>('')
const view = viewStore()
const user = userStore()

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

// function formatTitle() {
//   const version = `🔰 控件版本：3.1.12\n`
//   const moduleTotal = `🔰 模板数量：42\n`
//   const useTotal = `🔰 总下载量：2697`

//   return `${version}${moduleTotal}${useTotal}`
// }

function handleSearchNode() {
  if (searchNode.value) {
    searchComponentList = getSeniorComponentList()
      .map(p => {
        p.children = p.children.filter(t => t.value.includes(searchNode.value) || t.label.includes(searchNode.value))

        return p
      })
      .filter(v => v.children.length)
  } else {
    searchComponentList = getSeniorComponentList()
  }
}
function disabledComponent(authority: Authority) {
  return authority === 'enterprise' && user.authority !== 'enterprise'
}
</script>

<template>
  <div class="senior-node-list mpl-scroll-none">
    <template v-for="group in searchComponentList">
      <div class="group-title">
        {{ group.label }}
      </div>
      <div v-for="item in group.children" :key="item.label" class="component"
        :class="{ disabled: disabledComponent(item.authority) }" :label="item.label"
        :draggable="!disabledComponent(item.authority)" @dragstart="dragNewCompStart($event, item.value)"
        @dragover="dragover" @contextmenu="handleContextmenu($event, item.value, item.authority)">
        <svg-icon name="component" />
      </div>
    </template>
  </div>
</template>

<style lang="less">
.senior-node-list {
  overflow: hidden auto;
  flex: 1;
  width: 100%;
  padding-bottom: 20px;
}
</style>
