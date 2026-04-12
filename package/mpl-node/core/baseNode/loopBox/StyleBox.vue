<script lang="ts" setup>
import FormItem from '../../../components/FormItem.vue'
import { LoopBoxProp } from './define'
import { ref } from 'vue'

const props = defineProps<{ value: LoopBoxProp }>()
const activeNode = ref<LoopBoxProp>(props.value)

console.log(activeNode)
</script>

<template>
  <div class="right-bar-style--box">
    <FormItem label="内间距" />
  </div>
</template>

<style lang="less" scoped>
.right-bar-style--box {
  padding: 5px;
  box-sizing: border-box;
  color: #ccc;
  font-size: 12px;
}
</style>
