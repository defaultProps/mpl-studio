<script lang="ts" setup>
  import { ref } from 'vue'
  import { workbenchStore } from '@mpl/store'
  import FormItemLabel from '../../../components/FormItem.vue'
  import NodeLabel from '../../../components/NodeFormLabel.vue'
  import { TimeRangePickerFormProp } from './define'

  const store = workbenchStore()
  const timeRangePickerFormItem = ref<TimeRangePickerFormProp>(store.activeNode as TimeRangePickerFormProp)
  const modelInput = ref<string[] | null>(
    timeRangePickerFormItem.value.timeRangePicker.model,
  )
  const pxWidthMode = ref<boolean>(false)

  function blurModelInput() {
    timeRangePickerFormItem.value.timeRangePicker.model
      = modelInput.value || null
  }
</script>

<template>
  <div class="right-bar-setting--box password-setting">
    <div class="form-item-box">
      <FormItemLabel>
        宽度比例 {{ timeRangePickerFormItem.pos.pc.w }}
      </FormItemLabel>
      <div class="content">
        <el-slider v-model="timeRangePickerFormItem.pos.pc.w" :step="1" :min="1" :max="24" />
        <span class="mpl op-btn mpl-shujutongbu" :show-tooltip="false" @click="pxWidthMode = !pxWidthMode" />
      </div>
    </div>
    <NodeLabel v-model="timeRangePickerFormItem.label" />
    <div class="mpl-divider">单时间配置</div>
    <div class="form-item-box">
      <FormItemLabel var="mpl.rg5fv6.radio.text">
        初始值
      </FormItemLabel>
      <div class="content">
        <el-input v-model="modelInput" size="small" show-word-limit maxlength="50" style="width: 200px"
                  @blur="blurModelInput" />
      </div>
    </div>
    <div class="form-item-box">
      <FormItemLabel var="mpl.rg5fv6.radio.required">
        必填
      </FormItemLabel>
      <div class="content">
        <input type="checkbox" class="mpl-input" v-model="timeRangePickerFormItem.timeRangePicker.required" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .right-bar-setting--box {
    padding: 5px;
    box-sizing: border-box;
    font-size: 12px;
  }
</style>
