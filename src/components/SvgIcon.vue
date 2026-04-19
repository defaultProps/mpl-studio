<template>
  <svg aria-hidden="true" class="svg-icon" :style="{ height: size + 'px', width: size + 'px' }">
    <use :xlink:href="symbolId" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  //图标大小
  size: {
    type: [Number, String],
    default: '16'
  },
  //图标前缀，默认icon
  prefix: {
    type: String,
    default: 'icon'
  },
  //图标名称
  name: {
    type: String,
    default: ""
  }
});
// 注意： symbolId 的值需要与 vite.config.ts中配置的 symbolId 保持一致。 最终symbolId的值格式为#icon-svgName。
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>