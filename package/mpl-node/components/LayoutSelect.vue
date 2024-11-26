<script setup lang="ts">
import { layouts } from "@mpl/node";
import { ref } from "vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue", "change", "close"]);
const selectCategory = ref<string>(props.modelValue);
function submitIcon(layout: string) {
  emit("update:modelValue", layout);
  emit("change", layout);
}
</script>

<template>
  <div class="layout-select--box mpl-scroll-none">
    <div class="header-title">
      排版布局
      <button
        class="mpl-btn pure-btn icon icon-close"
        @click="submitIcon(props.modelValue)"
      />
    </div>
    <template v-for="layout in layouts" :key="layout.label">
      <div class="view-box">{{ layout.label }}</div>
      <div class="setting-group-btn">
        <button
          v-for="p in layout.category"
          :key="p.value"
          class="mpl-btn ml-5"
          :class="{ 'is-select': selectCategory === p.value }"
          @click="selectCategory = p.value"
        >
          {{ p.label }}
        </button>
        <button
          v-if="
            layout.category.findIndex((v) => v.value === selectCategory) >= 0
          "
          class="mpl-btn mr-5 float-r icon icon-check"
          @click="submitIcon(selectCategory)"
        >
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
    color: var(--color-1);
    font-weight: 600;
    button {
      color: var(--color-1);
    }
  }

  .view-box {
    margin: 5px;
    width: 290px;
    box-sizing: border-box;
    border: 1px solid #606266;
    border-radius: 3px;
    padding: 5px;
    height: 120px;
    font-size: 12px;
    background-size: cover;
    color: #000;
    font-weight: 600;
    background-repeat: no-repeat;
    background-color: #f0f0f0;
  }
}
</style>
