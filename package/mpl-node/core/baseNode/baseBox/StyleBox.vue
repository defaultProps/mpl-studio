<script lang="ts" setup>
import FormItem from '../../../components/FormItem.vue'
import { BaseBoxProp } from './define'
import { ref } from 'vue'

const props = defineProps<{ value: BaseBoxProp }>()
const activeNode = ref<BaseBoxProp>(props.value)

console.log(activeNode)
</script>

<template>
  <div class="right-bar-style--box">
    <FormItem label="内间距">

    </FormItem>
  </div>
</template>

<style lang="less" scoped>
.right-bar-style--box {
  padding: 5px;
  box-sizing: border-box;
  color: var(--color-1);
  font-size: 12px;
}
</style>
