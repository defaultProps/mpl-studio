<script lang="ts" setup>
import { ref, onBeforeUnmount, inject } from 'vue'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'
import InputNode from '../../../components/InputNode.vue'
import { Tabs, TabsPaneProp, newTabPane } from './define'
import { watchDebounced } from '@vueuse/core'

const props = defineProps<{ value: Tabs }>()
const activeNode = ref<Tabs>(props.value)
const changeNode = inject('changeNode') as any
const activePane = ref<TabsPaneProp | null>()

const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

onBeforeUnmount(() => {
  stopWatcher()
})

function deletePane(index: number, pane: TabsPaneProp) {
  if (pane.cid === activePane.value?.cid) activePane.value = null

  // 删除面板 + 内部所有组件
  activeNode.value.itemList.splice(index, 1)
}

function handleActivePane(pane: TabsPaneProp) {
  activePane.value = pane
}

// 新增页签
function addPane() {
  activeNode.value.itemList.push(newTabPane())
}

</script>

<template>
  <div class="right-bar-tabs-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem label="显示隐藏" :var="`mpl.var.${activeNode.visible}`">
      <input v-model="activeNode.visible" type="checkbox" class="mpl-input">
    </FormItem>
    <div v-for="(pane, index) in activeNode.itemList" :key="pane.cid" class="pane-setting">
      <button type="button" :class="{ 'is-active': activePane?.cid === pane.cid }" class="mpl-btn icon icon-edit5 mr-5"
        @click="handleActivePane(pane)" />
      <button type="button" class="mpl-btn icon icon-drag mr-5" />
      <InputNode v-model="pane.label" class="mr-5" />
      <label class="tabs-active-pane-radio-label mpl-radio-label">
        <input v-model="activeNode.activeModel" type="radio" name="tabs-active-pane-radio-label" class="mr-5"
          :value="pane.value">
      </label>
      <button type="button" class="mpl-btn del-btn icon icon-close1 ml-5" @click="deletePane(index, pane)" />
    </div>
    <button type="button" class="mpl-btn mb-5 plus-btn icon icon-plus" @click="addPane">
      添加页签
    </button>
    <div v-if="activePane" class="select-edit-pane">
      选中页签设置
    </div>
  </div>
</template>

<style lang="less" scoped>
.right-bar-tabs-setting--box {
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;

  .pane-setting {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
  }

  .select-edit-pane {
    background: #f6f8fa;
    padding: 5px 3px 5px 5px;
    box-sizing: border-box;
    margin: 5px 0;
    border-radius: 3px;
    outline: 1px solid #666;
  }

  .footer-btn-line {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
  }
}
</style>
