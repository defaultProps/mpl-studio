<script lang="ts" setup>
import FormItem from '../../../components/FormItem.vue'
import { ref } from 'vue'
import RadioBtnGroup from '../../../components/RadioBtnGroup.vue'

const styleConfig = ref({
  size: 'small',
  border: 'line'
})

const paddingOptions = ref([
  { label: '紧凑', value: 'small' },
  { label: '标准', value: 'medium' },
  { label: '宽松', value: 'large' }
])
</script>
<template>
  <div class="collapse-style-box">
    <FormItem label="内间距">
      <RadioBtnGroup v-model="styleConfig.size" :option="paddingOptions" />
    </FormItem>
  </div>
</template>

<style lang="less" scoped>
.collapse-style-box {
  padding: 5px;
  font-size: 12px;
  box-sizing: border-box;
}
</style>
