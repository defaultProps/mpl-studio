<script setup lang="ts">
import { ref, inject } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import ToolBtnGroup from '../ToolBtnGroup.vue'

const nodes = [
  { label: '单选1', value: 'a' },
  { label: '单选2', value: 'sd2gr6' },
  { label: '单选3', value: 'bf3ht5' }
]
const removeFlowNode = inject('removeFlowNode') as any
const props = defineProps<{ value: any }>()

const flowNodeObj = ref({
  selectNode: '',
  val: ''
})
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="set-model-node mpl-event-flow-node" :class="{ 'is-error': !flowNodeObj.selectNode, 'is-collapse': isCollapse }">
    <Handle type="target" :position="Position.Top" />
    <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" />
    <div class="line-box">
      <div class="label">
        描述：
      </div>
      <div class="content">
        单选控件选项更新
      </div>
    </div>
    <div class="line-box">
      <div class="label">
        选择控件：
      </div>
      <select v-model="flowNodeObj.selectNode" class="mpl-select full-w">
        <option v-for="item in nodes" :key="item.value" :label="item.label" :value="item.value" />
      </select>
    </div>
    <div class="line-box">
      <div class="label">
        选项值：
      </div>
      <input v-model="flowNodeObj.val" type="text" class="mpl-input full-w">
      <button type="button" class="mpl-btn ml-5 icon icon-select5" />
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style lang="less" scoped>
.set-model-node {
  width: 300px;
}
</style>
