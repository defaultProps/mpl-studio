<script setup lang="ts">
import { ref } from 'vue'
import InteractivePane from './InteractivePane.vue'
import SettingPane from './SettingPane.vue'

const navList = [
  { label: '交互', value: 'interactive' },
  { label: '设置', value: 'setting' }
]

const activePane = ref<string>('interactive')
const visibleCollapse = ref<boolean>(true)

function tabClick(v: string) {
  visibleCollapse.value = !(activePane.value === v && visibleCollapse.value)
  activePane.value = v
}
</script>

<template>
  <div class="quick-config-page--box">
    <div class="left-nav">
      <span v-for="p in navList" :key="p.value" :class="{ select: activePane === p.value }" @click="tabClick(p.value)">
        {{ p.label }}
      </span>
    </div>
    <InteractivePane v-show="activePane === 'interactive'" :activeCollapse="visibleCollapse" />
    <SettingPane v-show="activePane === 'setting'" />
  </div>
</template>

<style lang="less" scoped>
.quick-config-page--box {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 12px;
  color: #000;

  .left-nav {
    height: 100%;
    width: 25px;
    background: #e6e6e6;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    box-shadow: -1px 0 0 var(--color-1) inset;

    span {
      cursor: default;
      text-orientation: sideways-right;
      writing-mode: tb-rl;
      padding: 10px 0;
      font-size: 12px;
      display: inline-block;
      width: 25px;
      line-height: 25px;
      transform: rotate(-180deg);
      user-select: none;

      &.disabled {
        display: none;
      }

      i {
        font-size: 12px;
      }

      &:hover {
        background-color: #b3b3b36f;
      }

      &.select {
        color: var(--primary-color);
        background-color: #b3b3b3;
        font-weight: 600;
        box-shadow: 2px 0 0 0 var(--primary-color) inset
      }
    }
  }
}
</style>
