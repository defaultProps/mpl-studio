<script setup lang="ts">
import { layouts } from '@mpl/node'
import SubSettingHeaderUI from './SubSettingHeaderUI.vue'
import { viewStore } from '@mpl/store'
import { ref } from 'vue'

const modelValue = defineModel<string>({ default: '' })
function submitIcon(layout = '') {
  modelValue.value = layout
  viewStore().$patch({
    subBoxSettingModel: '',
    subBoxSettingModelId: ''
  })
}
const currentLayout = ref(modelValue.value)
</script>

<template>
  <div class="layout-select--box mpl-scroll-none">
    <SubSettingHeaderUI label="排版布局" @close="submitIcon(modelValue || '')" />
    <template v-for="layout in layouts" :key="layout.label">
      <div class="view-box">
        {{ layout.label }}
      </div>
      <div class="setting-group-btn">
        <button v-for="p in layout.category" :key="p.value" type="button" class="mpl-btn ml-5 icon icon-line"
          :class="{ 'is-select': currentLayout === p.value }" @click="currentLayout = p.value">
          {{ p.label }}
        </button>
        <button v-if="layout.category.findIndex(v => v.value === currentLayout) >= 0" type="button"
          class="mpl-btn mr-5 float-r icon icon-check" @click="submitIcon(currentLayout)">
          确认
        </button>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.layout-select--box {
  width: 300px;
  height: 100%;
  position: absolute;
  z-index: 100;
  left: -300px;
  top: 0;
  height: 100%;
  bottom: 0;
  overflow: hidden auto;
  border-left: 1px solid #2c2c2c;
  padding-bottom: 20px;
  box-sizing: border-box;
  background: #fff;

  .view-box {
    margin: 5px;
    width: 290px;
    box-sizing: border-box;
    border: 1px solid #606266;
    border-radius: var(--radius-3);
    padding: 5px;
    height: 120px;
    font-size: 12px;
    background-size: cover;
    color: #1E1E1E;
    font-weight: 600;
    background-repeat: no-repeat;
    background: #f0f0f0;
    position: relative;

    &::after {
      position: absolute;
      content: '布局.gif';
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-weight: normal;
    }
  }
}
</style>
