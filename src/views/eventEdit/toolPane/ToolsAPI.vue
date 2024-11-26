<script setup lang="ts">
import { ref } from 'vue'
import { flowNodes } from '@mpl/const'

const expandPane = ref(false)
const activePane = ref('clientAPI')
const paneOptions = [
  { label: '前端交互', value: 'clientAPI' },
  { label: '服务接口', value: 'serviceAPI' },
  { label: '通用SDK', value: 'sdk' },
]
</script>

<template>
  <div class="ide-tool mpl-scroll-none" :class="{ 'expand': expandPane }">
    <div class="header-tabs">
      <button class="mpl-btn mr-2 icon" :class="[expandPane ? 'icon-arrow-up-filling' : 'icon-arrow-down-filling']"
        @click="expandPane = !expandPane" />
      <button v-for="pane in paneOptions" :key="pane.value" class="mpl-btn"
        :class="{ 'is-active': pane.value === activePane }" @click="activePane = pane.value">
        {{ pane.label }}
      </button>
    </div>
    <div v-if="expandPane" class="tool-pane">
      <el-tree :data="flowNodes" accordion class="client-api">
        <template #default="{ node, data }">
          <span class="api-node">
            <!-- <img src="@/assets/logo.png" alt="-"> -->
            <span>{{ node.label }}</span>
            <button v-if="!data.children" class="mpl-btn edit-btn icon icon-select5"></button>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<style lang="less" scoped>
.ide-tool {
  position: absolute;
  right: 35px;
  top: 18px;
  z-index: 20;
  width: fit-content;
  height: 23px;
  color: var(--color-1);

  &.expand {
    height: calc(100% - 50px);
    background-color: var(--color-1);
    outline: 1px solid var(--color-1);
  }

  .header-tabs {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 2px 3px;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: var(--color-1);
  }

  .tool-pane {
    border-top: 1px solid #404040;
    color: #000;
    padding: 5px;
    box-sizing: border-box;
    font-size: 12px;

    .el-tree {
      background-color: transparent;
      font-size: 12px;
      color: #000;
      --el-tree-node-hover-bg-color: #70707069;
      --el-tree-expand-icon-color: #000;

      .api-node {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        padding-right: 3px;
        box-sizing: border-box;
        > span {
          flex: 1;
        }
      }

      button.icon {
        width: 20px;
        height: 20px;
        font-size: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 16px;
        height: 16px;
        display: inline-block;
        overflow: hidden;
        margin-right: 4px;
      }
    }
  }
}
</style>