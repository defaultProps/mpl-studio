<script lang="ts" setup>
import { ref } from 'vue'
import FormItem from '../../../components/FormItem.vue'
import InputNode from '../../../components/InputNode.vue'

const color = ref('#ffffff')
const bodyNode = ref({
  layout: '默认布局',
  note: true,
})

</script>
<template>
  <div class="right-bar-body-setting--box">
    <div class="mpl-divider">页面设置</div>
    <FormItem label="背景颜色">
      <InputNode v-model="color" />
    </FormItem>
    <FormItem label="页面布局">
      <InputNode v-model="bodyNode.layout" disabled />
      <button type="button" class="mpl-btn ml-5 icon icon-select5" />
    </FormItem>
  </div>
</template>

<style lang="less">
.right-bar-body-setting--box {
  padding: 5px;
  box-sizing: border-box;
}
</style>
