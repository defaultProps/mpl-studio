<script setup lang="ts">
import { ref } from 'vue'
import { flowNodes } from '@mpl/const'

const expandPane = ref(false)
const activePane = ref('clientAPI')
const paneOptions = [
  { label: '前端交互', value: 'clientAPI' },
  { label: '服务接口', value: 'serviceAPI' },
  { label: '通用SDK', value: 'sdk' }
]

function addEvent(data: any) {
  console.log(data)
}
</script>

<template>
  <div class="ide-tool mpl-scroll-none" :class="{ expand: expandPane }">
    <div class="header-tabs">
      <button type="button" class="mpl-btn mr-5 icon" :class="[expandPane ? 'icon-arrow-down-filling' : 'icon-arrow-right-filling']"
        @click="expandPane = !expandPane" />
      <button v-for="pane in paneOptions" :key="pane.value" type="button" class="mpl-btn mr-5"
        :class="{ 'is-active': pane.value === activePane }" @click="activePane = pane.value">
        {{ pane.label }}
      </button>
    </div>
    <div v-if="expandPane" class="tool-pane">
      <el-tree :data="flowNodes" accordion>
        <template #default="{ node, data }">
          <span class="api-node">
            <img src="@/assets/logo.png" alt="-">
            <span :title="node.label">{{ node.label }}</span>
            <button v-if="!data.children" type="button" class="mpl-btn edit-btn icon icon-select5" @click="addEvent(data)" />
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<style lang="less" scoped>
.ide-tool {
  position: absolute;
  right: 25px;
  top: 50px;
  z-index: 20;
  width: fit-content;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;

  &.expand {
    height: calc(100% - 70px);
  }

  .header-tabs {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 5px 0 5px 5px;
    position: sticky;
    top: 0;
    z-index: 2;
    background: #e6e6e6;
  }

  .tool-pane {
    color: #1E1E1E;
    padding: 5px;
    box-sizing: border-box;
    font-size: 12px;

    .el-tree {
      font-size: 12px;
      background-color: #fff;
      color: #000;

      .api-node {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        box-sizing: border-box;
        padding-right: 5px;
        img {
          width: 16px;
        }

        >span {
          font-size: 12px;
          flex: 1;
        }
      }
    }
  }
}
</style>
