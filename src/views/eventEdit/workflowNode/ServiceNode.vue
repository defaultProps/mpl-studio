<script setup lang="ts">
import { inject, ref } from 'vue'
import ToolBtnGroup from '../ToolBtnGroup.vue'

const selectNode = ref<string>('a')
const removeFlowNode = inject('removeFlowNode') as any
const props = defineProps<{ value: any }>()
const isCollapse = ref(true)

function collapseFlowNode(collapse: boolean) {
  isCollapse.value = collapse
}
</script>

<template>
  <div class="set-model-node mpl-event-flow-node" :class="{ 'is-error': !selectNode, 'is-collapse': isCollapse }">
    <ToolBtnGroup copy @delete="removeFlowNode(props.value.id)" @collapse="collapseFlowNode" />
    <div class="line-box">
      <div class="label">
        选择服务：
      </div>
      <div class="content">
        接口参数
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.set-model-node {
  width: 300px;
}
</style>
