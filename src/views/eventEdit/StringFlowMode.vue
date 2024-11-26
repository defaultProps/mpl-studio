<script setup lang="ts">
  // 目录弦展示的方式
  // 优点：
  // - 更加流畅的排序、插入【向下复制节点】更新
  // - 后期的迭代版本使用更加便利
  // - 局部的流程清晰。整理不明了
  // 缺点：
  // - 整体的流程不清晰。局部不方便处理
  import { ref } from 'vue'
  import { edges } from './stringFlowNode/init'
  import NestedComponent from './stringFlowNode/NestedComponent.vue'
  import ToolBtnGroup from './ToolBtnGroup.vue'

  const list = ref(edges())
</script>
<template>
  <div class="string-flow mpl-scroll-none">
    <div class="flow-node">
      开始节点
      <ToolBtnGroup lock close collapse />
    </div>
    <NestedComponent v-model="list" style="margin-left: 0" />
    <div class="flow-node">结束节点</div>
  </div>
</template>
<style lang="less" scoped>
  .string-flow {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 40px 10px 10px;

    .flow-node {
      color: #000;
      height: 30px;
      border-radius: 0;
      width: 200px;
      box-sizing: border-box;
      border: 1px solid #606266;
      background-color: #e6e6e6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      cursor: default;
      position: relative;
      margin-top: 5px;
    }
  }
</style>