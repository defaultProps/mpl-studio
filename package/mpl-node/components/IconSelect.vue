<script setup lang="ts">
import { commonIcons, projectIcons, systemIcons } from "@mpl/node";

const props = defineProps<{
  modelValue: string; // 图标
}>();
const emit = defineEmits(["update:modelValue", "change", "close"]);
function submitIcon(icon: string) {
  emit("update:modelValue", icon);
  emit("change", icon);
}

function handleIconPlus() {
  // 编辑图标列表 todo
}
</script>

<template>
  <div class="icon-select--box">
    <div class="header-title">
      <span class="title">图标库</span>
      <button class="mpl-btn pure-btn icon icon-close" @click="submitIcon(props.modelValue)" />
    </div>
    <div class="icon-main mpl-scroll-none">
      <div class="icon-title">
        <button class="mpl-btn icon icon-edit2" @click="handleIconPlus" />
        常用图标
      </div>
      <div class="icon-item">
        <div v-for="p in commonIcons" :key="p.icon" :class="[{ select: props.modelValue === p.icon }, p.icon]"
          class="icon" @click="submitIcon(p.icon)" />
      </div>
      <div class="icon-title">
        <button class="mpl-btn icon icon-edit2" @click="handleIconPlus" />
        项目图标
      </div>
      <div v-if="projectIcons.length" class="icon-item">
        <div v-for="p in projectIcons" :key="p.icon" :class="[{ select: props.modelValue === p.icon }, p.icon]"
          class="icon" @click="submitIcon(p.icon)" />
      </div>
      <div v-else class="empty-block-link">暂无数据，编辑图标</div>
      <div class="icon-title">系统图标</div>
      <div class="icon-item">
        <div v-for="p in systemIcons" :key="p.icon" :class="[{ select: props.modelValue === p.icon }, p.icon]"
          class="icon" @click="submitIcon(p.icon)" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.icon-select--box {
  width: 300px;
  height: 100%;
  position: absolute;
  z-index: 100;
  left: -300px;
  top: 0;
  height: 100%;
  bottom: 0;
  overflow: hidden auto;
  background-color: var(--color-7);

  .header-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    box-sizing: border-box;
    height: 30px;
    width: 100%;
    color: var(--color-1);
    background: #252526;
    position: sticky;
    top: 0;
    z-index: 12;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 1px 0 0 0 var(--color-1) inset;
    button {
      color: var(--color-1);
      &:hover {
        background-color: var(--color-1);
        color: var(--primary-color);
      }
    }
  }

  .icon-main {
    height: calc(100% - 30px);
    overflow: hidden auto;
    box-shadow: 1px 0 0 0 var(--color-1) inset;

    .icon-title {
      font-size: 12px;
      text-indent: 5px;
      margin: 0 0 9px 0;
      line-height: 30px;
      user-select: none;
      color: #000;
      border-top: 1px solid #2c2c2c;
      background: #f6f8fa;
      box-shadow: 1px 0 0 0 var(--color-1) inset;
    }

    .icon-item {
      display: inline-grid;
      grid-template-columns: repeat(7, 34px);
      grid-gap: 8px;
      padding: 0 8px 8px;
      box-sizing: border-box;

      svg {
        width: 20px;
        height: 20px;
        fill: #000;
      }

      >div {
        width: 100%;
        height: 30px;
        outline: 1px dashed #606266;
        border-radius: 4px;
        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        color: #000;
        background-color: var(--color-7);

        i {
          font-size: 16px;
        }

        &.select {
          background: var(--primary-color);
          color: var(--color-7);
          font-size: 22px;

          svg {
            fill: var(--color-7);
          }
        }

        &:hover {
          outline: 1px dashed var(--primary-color);
          font-size: 22px;
          color: var(--primary-color);
          transform: scale(1.3);
        }
      }
    }
  }

  .empty-block-link {
    width: 100%;
    text-align: center;
    user-select: none;
    margin: 100px 0;
    display: inline-block;
    color: var(--primary-color);
    font-size: 12px;
    text-decoration: underline;
  }
}
</style>
