<script lang="ts" setup>
  import { ref } from 'vue'
  import { workbenchStore } from '@mpl/store'
  import FormItemLabel from '../../../components/FormItem.vue'
  import NodeLabel from '../../../components/NodeFormLabel.vue'
  import { RateFormProp } from './define'

  const store = workbenchStore()
  const rateFormItem = ref<RateFormProp>(store.activeNode as RateFormProp)
  const pxWidthMode = ref<boolean>(false)
</script>

<template>
  <div class="right-bar-setting--box password-setting">
    <div class="form-item-box">
      <FormItemLabel>宽度比例 {{ rateFormItem.pos.pc.w }}</FormItemLabel>
      <div class="content">
        <el-slider v-model="rateFormItem.pos.pc.w" :step="1" :min="1" :max="24" />
        <span class="mpl op-btn mpl-shujutongbu" :show-tooltip="false" @click="pxWidthMode = !pxWidthMode" />
      </div>
    </div>
    <NodeLabel v-model="rateFormItem.label" />
    <div class="mpl-divider">分数设置</div>
    <div class="form-item-box">
      <FormItemLabel var="mpl.rg5fv6.checkbox.required">
        必填
      </FormItemLabel>
      <div class="content">
        <input type="checkbox" class="mpl-input" v-model="rateFormItem.rate.required" />
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .right-bar-setting--box {
    padding: 5px;
    box-sizing: border-box;
    font-size: 12px;
  }
</style>
