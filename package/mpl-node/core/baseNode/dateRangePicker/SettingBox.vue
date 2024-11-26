<script lang="ts" setup>
  import { ref } from 'vue'
  import FormItemLabel from '../../../components/FormItem.vue'
  import NodeLabel from '../../../components/NodeFormLabel.vue'
 import { DateRangePickerFormProp } from './define'

  const props = defineProps<{ value: DateRangePickerFormProp }>()
  const activeNode = ref<DateRangePickerFormProp>(props.value)
  const modelInput = ref<string[] | Date[] | number[] | null>(
    activeNode.value.dateRangePicker.model,
  )
  const pxWidthMode = ref<boolean>(false)

  function blurModelInput() {
    // activeNode.value.dateRangePicker.model = modelInput.value || null
  }
</script>

<template>
  <div class="right-bar-setting--box password-setting">
    <div class="form-item-box">
      <FormItemLabel>宽度比例 {{ activeNode.pos.pc.w }}</FormItemLabel>
      <div class="content">
        <el-slider v-model="activeNode.pos.pc.w" :step="1" :min="1" :max="24" />
        <span class="mpl op-btn mpl-shujutongbu" :show-tooltip="false" @click="pxWidthMode = !pxWidthMode" />
      </div>
    </div>
    <NodeLabel v-model="activeNode.label" />
    <div class="mpl-divider" label="按钮事件"></div>
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
        <input type="checkbox" class="mpl-input" v-model="activeNode.dateRangePicker.required" />
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
