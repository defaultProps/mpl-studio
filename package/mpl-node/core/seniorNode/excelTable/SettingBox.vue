<script lang="ts" setup>
import { ref } from 'vue'
import { ExcelTableProp } from './define'
import FormItem from '../../../components/FormItem.vue'
import InputNode from '../../../components/InputNode.vue'

const props = defineProps<{ value: ExcelTableProp }>()
const activeNode = ref<ExcelTableProp>(props.value)
</script>

<template>
  <div class="right-bar-setting--box">
    <div class="mpl-divider">基础设置</div>
    <FormItem var="mpl.rg5fv6.input.text" label="初始值" init-value>
      <InputNode v-model="activeNode.license" class="reduce-80" />
    </FormItem>
  </div>
</template>
<style scoped lang="less">
.nested-column-wrapper {
  position: relative;
  padding: 5px 0 5px 10px;
  box-sizing: border-box;
  margin: 5px 0;
  border-radius: 3px;
  outline: 1px solid #666;

  &::after {
    content: '';
    position: absolute;
    z-index: -3;
    background: #f6f8fa;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>