<script lang="ts" setup>
import { ref } from 'vue'
import FormItemLabel from '../../../components/FormItem.vue'

const inputValue = ref<string>('')
</script>

<template>
  <div class="right-bar-style--box">
    <div class="form-item-box">
      <FormItemLabel>宽度</FormItemLabel>
      <div class="content flex-end">
        <el-input
          v-model="inputValue"
          maxlength="20"
          size="small"
        />
      </div>
    </div>
    <div class="form-item-box">
      <FormItemLabel>高度</FormItemLabel>
      <div class="content flex-end">
        <el-input
          v-model="inputValue"
          maxlength="20"
          size="small"
        />
      </div>
    </div>
    <div class="form-item-box">
      <FormItemLabel>背景色</FormItemLabel>
      <div class="content flex-end">
        <el-input
          v-model="inputValue"
          maxlength="20"
          size="small"
        />
      </div>
    </div>
    <div class="form-item-box">
      <FormItemLabel>圆角</FormItemLabel>
      <div class="content flex-end">
        <el-input
          v-model="inputValue"
          maxlength="20"
          size="small"
        />
      </div>
    </div>
    <div class="form-item-box">
      <FormItemLabel>线宽</FormItemLabel>
      <div class="content flex-end">
        <el-input
          v-model="inputValue"
          maxlength="20"
          size="small"
        />
      </div>
    </div>
    <div class="form-item-box">
      <FormItemLabel>线色</FormItemLabel>
      <div class="content flex-end">
        <el-input
          v-model="inputValue"
          maxlength="20"
          size="small"
        />
      </div>
    </div>
    <div class="form-item-box">
      <FormItemLabel>透明度</FormItemLabel>
      <div class="content flex-end">
        <el-input
          v-model="inputValue"
          maxlength="20"
          size="small"
        />
      </div>
    </div>
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
