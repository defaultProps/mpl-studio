<script lang="ts" setup>
import { ref } from 'vue'
import FormItem from '../../../components/FormItem.vue'
import { borderTypeOptions, sizeOptions } from '../../../libs'
import RadioBtnGroup from '../../../components/RadioBtnGroup.vue'

const styleConfig = ref<any>({
  size: 'small',
  border: 'line',
})
</script>

<template>
  <div class="right-bar-style--box">
    <FormItem label="尺寸">
      <RadioBtnGroup
        v-model="styleConfig.size"
        :option="sizeOptions"
      />
    </FormItem>
    <FormItem label="边框类型">
      <RadioBtnGroup
        v-model="styleConfig.border"
        :option="borderTypeOptions"
      />
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
