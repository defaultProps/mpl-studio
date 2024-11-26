<script lang="ts" setup>
import { pageComponentList } from '@/utils/constant'
</script>

<template>
  <div style="flex: 1">
    <div
      v-for="group in pageComponentList"
      :key="group.label"
      class="component-group"
    >
      <div class="group-title">
        {{ group.label }}
      </div>
      <div
        v-for="item in group.children"
        :key="item.label"
        class="component"
      >
        <span
          class="component-title"
          draggable="true"
        >
          <i class="icon" />
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>
