<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import { watchDebounced } from '@vueuse/core'
import FormItemLabel from '../../../components/FormItem.vue'
import NodeLabel from '../../../components/NodeFormLabel.vue'
import { SliderFormProp } from './define'

const pxWidthMode = ref<boolean>(false)
const props = defineProps<{ value: SliderFormProp }>()
const activeNode = ref<SliderFormProp>(props.value)
const changeNode = inject('changeNode') as any
const inputWidth = ref<number | null>(activeNode.value.slider.width)
const modelInput = ref<number>(activeNode.value.slider.model)

function blurModelInput() {
  activeNode.value.slider.model = modelInput.value
}

function blurInputWidth() {
  activeNode.value.slider.width = inputWidth.value
  activeNode.value.slider.pos = 'l'
}

const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

onBeforeUnmount(() => {
  stopWatcher()
})

</script>

<template>
  <div class="right-bar-setting--box">
    <div class="form-item-box">
      <FormItemLabel>宽度比例 {{ activeNode.pos.pc.w }}</FormItemLabel>
      <div class="content">
        <el-slider v-model="activeNode.pos.pc.w" :step="1" :min="1" :max="24" />
        <span class="mpl op-btn mpl-shujutongbu" :show-tooltip="false" @click="pxWidthMode = !pxWidthMode" />
      </div>
    </div>
    <NodeLabel v-model="activeNode.label" :cid="activeNode.cid" />
    <div class="mpl-divider">
      滑块配置
    </div>
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
    <div v-if="activeNode.slider.width" class="form-item-box">
      <FormItemLabel>滑块位置</FormItemLabel>
      <div class="content">
        <div class="content">
          <el-radio-group v-model="activeNode.slider.pos" size="small">
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
        <input v-model="activeNode.slider.required" type="checkbox" class="mpl-input">
      </div>
    </div>
  </div>
</template>