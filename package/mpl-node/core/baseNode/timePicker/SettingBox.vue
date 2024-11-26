<script lang="ts" setup>
  import { ref } from 'vue'
  import { workbenchStore } from '@mpl/store'
  import FormItemLabel from '../../../components/FormItem.vue'
  import NodeLabel from '../../../components/NodeFormLabel.vue'
  import { TimePickerFormProp } from './define'

  const store = workbenchStore()
  const timePickerFormItem = ref<TimePickerFormProp>(store.activeNode as TimePickerFormProp)
  const modelInput = ref<string>(timePickerFormItem.value.timePicker.model)
  const pxWidthMode = ref<boolean>(false)

  function blurModelInput() {
    timePickerFormItem.value.timePicker.model = modelInput.value || ''
  }
</script>

<template>
  <div class="right-bar-setting--box password-setting">
    <div class="form-item-box">
      <FormItemLabel>宽度比例 {{ timePickerFormItem.pos.pc.w }}</FormItemLabel>
      <div class="content">
        <el-slider v-model="timePickerFormItem.pos.pc.w" :step="1" :min="1" :max="24" />
        <span class="mpl op-btn mpl-shujutongbu" :show-tooltip="false" @click="pxWidthMode = !pxWidthMode" />
      </div>
    </div>
    <NodeLabel v-model="timePickerFormItem.label" />
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
        <input type="checkbox" class="mpl-input" v-model="timePickerFormItem.timePicker.required" />
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
