<script lang="ts" setup>
  import { ref } from 'vue'
  import { Tabs } from '../define'

  const props = defineProps<{ node: Tabs }>()
  const activeModel = ref<string>('')
</script>

<template>
  <el-tabs v-model="activeModel" class="mpl-tabs" type="border-card">
    <el-tab-pane v-for="pane in props.node.tabs.panes" :key="pane.value" :label="pane.label" :name="pane.value">
      mpl tabs content
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped>
  .mpl-tabs {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 14px;
    color: #000;
    .el-tab-pane {
      width: 100%;
      height: 100%;
      text-align: left;
    }
  }
</style>
