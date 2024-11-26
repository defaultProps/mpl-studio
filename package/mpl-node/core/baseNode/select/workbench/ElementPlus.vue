<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import {
  type SelectFormProp,
  type SelectNode,
  getDefaultSelectOptions,
} from '../define'

const props = defineProps<{ node: SelectFormProp }>()
const select = ref<SelectNode>(props.node.select)
const selectValue = ref<string>(props.node.select.model)

watch(
  () => props.node.select.model,
  (value: any) => {
    selectValue.value = value
  },
)
</script>

<template>
  <el-form-item theme="mpl" :required="select.required" class="mpl-form-item" :cid="props.node.cid" :class="[
    { 'mpl-none': !props.node.label.show },
    labelPosWithClassName.get(props.node.label.pos),
  ]" :label-width="props.node.label.width === 0 ? 80 : props.node.label.width">
    <template #label>
      <div v-show="props.node.label.show" class="mpl-label">
        <span :title="props.node.label.text">
          {{ props.node.label.text }}
        </span>
        <div v-if="props.node.label.icon" class="mpl-label-icon">
          <i class="mpl icon" :class="[props.node.label.icon]" :style="{ color: props.node.label.iconTheme }" />
        </div>
      </div>
    </template>
    <div class="mpl-content" :class="[formContentPosClassName.get(select.pos)]">
      <el-select v-model="selectValue" popper-class="mpl-select-popper" theme="lcs"
        :style="{ width: select.width ? `${select.width}px` : '100%' }" :placeholder="select.placeholder"
        :clearable="select.clearable" style="user-select: none">
        <el-option v-for="(p, index) in getDefaultSelectOptions()" v-show="select.service.mode === 'static'"
          :key="index" :label="p.label" :value="p.value" />
        <template #empty>
          <div class="service-dynamic">
            动态数据，预览生效
          </div>
        </template>
      </el-select>
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
</template>

<style lang="less">
.mpl-select-popper .service-dynamic {
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  user-select: none;
  color: #000;
  font-size: 14px;
}
</style>
