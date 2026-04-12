<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import type { CollapseProp, CollapseItem } from './define'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'
import { ElMessageBox } from 'element-plus'
import { VueDraggable } from 'vue-draggable-plus'
import { watchDebounced } from '@vueuse/core'
import { newCid } from '@mpl/libs'

const controller = new AbortController()
const selectCollapse = ref<CollapseItem | null>(null)
const props = defineProps<{ value: CollapseProp }>()
const _props = JSON.parse(JSON.stringify(props.value))
let deleteOptionIndex = -1
_props.itemList.forEach((item: CollapseItem) => {
  item.mpl_children = []
})
const activeNode = ref<CollapseProp>(_props)
const changeNode = inject('changeNode') as any
const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

function handleDeleteCollapseOptionReceive(event: any) {
  if (event.data.type === 'DELETE_COLLAPSE_OPTION_RECEIVE') {
    if (event.data.payload.isMultipleCollapseChildren) {
      ElMessageBox.confirm('该面板下存在子节点，确定删除该面板吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false
      }).then(() => {
        activeNode.value.itemList.splice(deleteOptionIndex, 1)
      })
    } else {
      activeNode.value.itemList.splice(deleteOptionIndex, 1)
    }
  }
}

window.addEventListener('message', handleDeleteCollapseOptionReceive, { signal: controller.signal })

onBeforeUnmount(() => {
  controller.abort()
  stopWatcher()
})

function removeNode(item: any, i: number) {
  // postMessage 查看删除节点的子节点是否存在, 存在则提示.
  deleteOptionIndex = i
  window.parent.postMessage({
    type: 'DELETE_COLLAPSE_OPTION_CONFIRM',
    payload: {
      cid: props.value.cid,
      paneValue: item.value
    }
  }, '*')
}

function addCollapse() {
  activeNode.value.itemList.push({
    title: '面板',
    value: newCid('mpl_collapse'),
    disabled: false,
    visible: true,
    mpl_children: []
  })
}

function handleSelectCollapse(item: any) {
  selectCollapse.value = item
}

</script>

<template>
  <div class="right-bar-collapse-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem label="单面板展开" var="mpl.rg5fv6.collapse.accordion">
      <input v-model="activeNode.accordion" type="checkbox" class="mpl-input">
    </FormItem>
    <VueDraggable v-if="activeNode.itemList.length" v-model="activeNode.itemList" :animation="300"
      handle=".mpl-collapse-item-handler">
      <div v-for="(item, i) in activeNode.itemList" :key="i" class="slot-collapse-line">
        <button type="button" class="mpl-btn mr-5 icon icon-edit5" :class="{ 'is-active': selectCollapse?.value === item.value }"
          @click="handleSelectCollapse(item)" />
        <button type="button" class="mpl-btn mr-5 icon icon-drag mpl-collapse-item-handler" />
        <input v-model="item.title" class="mpl-input">
        <input :value="item.value" class="mpl-input ml-5" readonly>
        <button type="button" class="mpl-btn del-btn icon ml-5 icon-close1" @click="removeNode(item, i)" />
      </div>
    </VueDraggable>
    <button type="button" class="mpl-btn plus-btn icon icon-plus" @click="addCollapse">
      添加面板
    </button>
  </div>
</template>

<style lang="less" scoped>
.right-bar-collapse-setting--box {
  padding: 5px;
  font-size: 12px;
  box-sizing: border-box;

  .slot-collapse-line {
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
