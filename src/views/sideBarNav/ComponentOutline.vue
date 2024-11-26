<script setup lang="ts">
  import {
    type OutlineCascadeOptions,
    formatNodeListToCascade,
    formatNodeListToTree,
  } from "@mpl/node";
  import { ref, watch } from "vue";
  import type MPL from "@mpl/typings";
  import { workbenchStore, viewStore } from '@mpl/store'

  const workbench = workbenchStore()
  const coreView = viewStore();
  const nodeTree = ref<MPL.TreeNodeList[]>(formatNodeListToTree(workbench.nodeList));
  const searchNode = ref<string[]>([]);
  const nodeListCascadeOptions = ref<OutlineCascadeOptions[]>(
    formatNodeListToCascade(workbench.nodeList)
  );
  const renderKeyCascade = ref<number>(1000);
  watch(
    () => workbench.nodeList.length,
    () => {
      nodeTree.value = formatNodeListToTree(workbench.nodeList);
      nodeListCascadeOptions.value = formatNodeListToCascade(workbench.nodeList);
    }
  );

  watch(
    () => workbench.activeNode?.cid,
    () => {
      if (workbench.activeNode?.cid) {
        searchNode.value = [
          workbench.activeNode.mpl_group,
          workbench.activeNode.mpl_title,
          workbench.activeNode.cid,
        ];
        renderKeyCascade.value++;
      } else {
        searchNode.value = [];
      }
    }
  );

  interface Tree {
    cid: string;
    mpl_title: string;
    mpl_children?: Tree[];
  }

  const defaultProps = {
    label: "mpl_title",
    value: "cid",
    children: "mpl_children",
    class: (data: Tree) => {
      return data.cid === workbench.activeNode?.cid ? "mpl-active" : "";
    },
  };

  function nodeClick(node: MPL.Node) {
    workbench.selectNodeById(node.cid);
  }

  function handleSelectNode() {
    if (searchNode.value?.length > 0)
      workbench.selectNodeById(searchNode.value.slice(-1)[0]);
    else workbench.selectNodeById("");
  }
</script>

<template>
  <div class="mpl-outline--container" :class="coreView.outlineExpandSize">
    <div class="header-box">
      <button v-if="coreView.outlineExpandSize !== 'medium'" class="mpl-btn icon icon-arrow-up-filling"
              @click="coreView.updateOutlineExpandSize('up')" />
      <button v-if="coreView.outlineExpandSize !== 'mini'" class="mpl-btn icon icon-arrow-down-filling"
              @click="coreView.updateOutlineExpandSize('down')" />
      <span class="label">大纲目录</span>
      <button v-show="coreView.outlineExpandSize !== 'mini'" class="mpl-btn close-btn icon icon-close"
              @click="coreView.outlineExpandSize = 'mini'" />
    </div>
    <!-- 组件统计、分类、过滤查询、级联选择 float-vue -->
    <div class="total-node--box">
      <el-cascader :key="renderKeyCascade" v-model="searchNode" clearable :show-all-levels="false" placeholder="Search"
                   check-strictly popper-class="mpl-cascader" :props="{
                    label: 'outline_label',
                    value: 'outline_value',
                    children: 'children'
                  }" size="small" style="color: var(--color-1)" :options="nodeListCascadeOptions" @change="handleSelectNode">
        <template #default="{ data }">
          {{ data.outline_label }}
          {{ data.children ? `【${data.total}】` : '' }}
        </template>
      </el-cascader>
    </div>
    <div v-show="coreView.outlineExpandSize !== 'mini'" class="tree-outline mpl-scroll-none">
      <el-tree draggable :expand-on-click-node="false" default-expand-all :data="nodeTree" :props="defaultProps"
               @node-click="nodeClick" />
    </div>
  </div>
</template>

<style lang="less">
  .mpl-outline--container {
    height: 300px;
    width: 100%;
    color: var(--color-2);
    background-color: var(--color-7);
    user-select: none;

    &.mini {
      height: 25px;
    }

    &.small {
      height: 400px;
    }

    &.medium {
      height: 650px;
    }

    .header-box {
      height: 25px;
      padding: 0 2px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      width: 100%;
      color: var(--color-2);
      background-color: #e6e6e6;
      border-top: 1px solid var(--color-1);
      border-bottom: 1px solid var(--color-1);

      .label {
        flex: 1;
        height: 100%;
        font-weight: 600;
        line-height: 26px;
        text-indent: 5px;
      }
    }

    .total-node--box {
      height: 50px;
      width: 100%;
      color: var(--primary-color);
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tree-outline {
      height: calc(100% - 26px);
      box-sizing: border-box;
      overflow: auto;

      .el-tree {
        font-size: 12px;
        color: #000;
      }
    }
  }
</style>
