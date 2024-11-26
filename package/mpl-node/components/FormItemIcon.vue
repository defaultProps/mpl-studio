<script lang="ts" setup>
/**
 * @desc: 仅适用于表单组件标题配置
 */
import FormItem from './FormItem.vue'

const props = defineProps<{ modelValue: MPL.FormLabelProp }>()
const emit = defineEmits(['update:modelValue'])

function cancelIcon() {
  emit('update:modelValue', '')
}
</script>

<template>
  <FormItem label="图标">
    <div class="icon-select--line">
      <div class="selected-icon-box">
        <i
          class="mpl"
          :class="[props.modelValue]"
        />
        <span
          v-if="props.modelValue"
          class="btn icon icon-close1"
          @click="cancelIcon"
        />
      </div>
      <span
        class="right-btn icon icon-select5"
        @click="handleOpenIconSelect(props.modelValue)"
      />
    </div>
  </FormItem>
</template>

<style lang="less" scoped>
.icon-select--line {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  .selected-icon-box {
    margin-right: 65px;
    > i.icon {
      font-size: 20px;
    }
    .btn {
      margin-left: 2px;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      color: #ccc9;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      &:hover {
        background: #535353;
        i {
          color: var(--primary-color);
        }
      }
    }
  }
  .right-btn {
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color: #ccc9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    &:hover {
      background: #535353;
      i {
        color: var(--primary-color);
      }
    }
  }
}
</style>
