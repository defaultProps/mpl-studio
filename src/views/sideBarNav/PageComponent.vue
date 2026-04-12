<script lang="ts" setup>
import { pageComponentList } from '@/utils/constant'
</script>

<template>
  <div style="flex: 1" class="mpl-scroll-none">
    <template v-for="group in pageComponentList">
      <div class="group-title">
        {{ group.label }}
      </div>
      <div v-for="item in group.children" :key="item.label" class="component" draggable="true" :label="item.label" />
    </template>
  </div>
</template>
