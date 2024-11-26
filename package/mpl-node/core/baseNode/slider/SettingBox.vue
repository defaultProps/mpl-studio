<script lang="ts" setup>
  import { ref } from 'vue'
  import { workbenchStore } from '@mpl/store'
  import FormItemLabel from '../../../components/FormItem.vue'
  import NodeLabel from '../../../components/NodeFormLabel.vue'
  import { SliderFormProp } from './define'

  const store = workbenchStore()
  const sliderFormItem = ref<SliderFormProp>(store.activeNode as SliderFormProp)
  const inputWidth = ref<number | null>(sliderFormItem.value.slider.width)
  const modelInput = ref<number>(sliderFormItem.value.slider.model)
  const pxWidthMode = ref<boolean>(false)

  function blurModelInput() {
    sliderFormItem.value.slider.model = modelInput.value
  }

  function blurInputWidth() {
    sliderFormItem.value.slider.width = inputWidth.value
    sliderFormItem.value.slider.pos = 'l'
  }
</script>

<template>
  <div class="right-bar-setting--box">
    <div class="form-item-box">
      <FormItemLabel>宽度比例 {{ sliderFormItem.pos.pc.w }}</FormItemLabel>
      <div class="content">
        <el-slider v-model="sliderFormItem.pos.pc.w" :step="1" :min="1" :max="24" />
        <span class="mpl op-btn mpl-shujutongbu" :show-tooltip="false" @click="pxWidthMode = !pxWidthMode" />
      </div>
    </div>
    <NodeLabel v-model="sliderFormItem.label" />
    <div class="mpl-divider">滑块配置</div>
    <div class="form-item-box">
      <FormItemLabel var="mpl.rg5fv6.input.text">
        初始值
      </FormItemLabel>
      <div class="content">
        <el-input-number v-model="modelInput" size="small" controls-position="right" show-word-limit maxlength="50"
                         style="width: 200px" @blur="blurModelInput" />
      </div>
    </div>
    <div class="form-item-box">
      <FormItemLabel>滑块宽度</FormItemLabel>
      <div class="content">
        <el-input-number v-model.number="inputWidth" size="small" :precision="0" :min="60" :max="10000"
                         style="width: 150px" controls-position="right" placeholder="默认全宽" @blur="blurInputWidth" />
      </div>
    </div>
    <div v-if="sliderFormItem.slider.width" class="form-item-box">
      <FormItemLabel>滑块位置</FormItemLabel>
      <div class="content">
        <div class="content">
          <el-radio-group v-model="sliderFormItem.slider.pos" size="small">
            <el-radio-button value="l">
              居左
            </el-radio-button>
            <el-radio-button value="c">
              居中
            </el-radio-button>
            <el-radio-button value="r">
              居右
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="form-item-box">
      <FormItemLabel var="mpl.rg5fv6.input.required">
        必填
      </FormItemLabel>
      <div class="content">
        <input type="checkbox" class="mpl-input" v-model="sliderFormItem.slider.required" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .right-bar-setting--box {
    padding: 5px;
    box-sizing: border-box;
  }
</style>
