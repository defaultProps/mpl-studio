<script setup lang="ts">
import { ref, onBeforeUnmount, computed } from 'vue'
import PageCode from './PageCode.vue'
import QuickConfigModel from './quickConfig/index.vue'
import ServiceConfigModel from './ServiceConfigModel.vue'
import SchemaPane from './SchemaPane.vue'
import ThirdPkgPane from './ThirdPkgPane.vue'
import IntelligentDetectionPane from './IntelligentDetectionPane.vue'
import { workbenchViewList } from '@/utils/constant'
import { viewStore } from '@mpl/store'
import { projectStore } from '@mpl/store'

const coreView = viewStore()
const visibleAllModel = ref<boolean>(false)
const project = projectStore()
</script>

<template>
  <div class="operation-banner--box">
    <div class="menu-view--box">
      <!-- 全局遮罩层 -->
      <span v-for="(item, i) in workbenchViewList" v-show="i <= 2 || visibleAllModel" :key="item.value" class="list"
        :class="{
          active: item.value === coreView.activeWorkbenchModel
        }"
        @click="coreView.$patch({ activeWorkbenchModel: item.value === coreView.activeWorkbenchModel ? '' : item.value })">
        {{ item.label }}
      </span>
      <span class="list icon" :class="[visibleAllModel ? 'icon-double-arrow-left' : 'icon-double-arro-right']"
        @click="visibleAllModel = !visibleAllModel" />
      <span style="flex: 1" />
    </div>
    <div class="content-box">
      <PageCode v-show="coreView.activeWorkbenchModel === 'pageCodePaneModel'" />
      <QuickConfigModel v-if="coreView.activeWorkbenchModel === 'quickConfigPaneModel' && project.activeFile" />
      <ServiceConfigModel v-show="coreView.activeWorkbenchModel === 'serviceConfigPaneModel'" />
      <IntelligentDetectionPane v-show="coreView.activeWorkbenchModel === 'intelligentDetection'" />
      <SchemaPane v-show="coreView.activeWorkbenchModel === 'schemaPaneModel'" />
      <ThirdPkgPane v-show="coreView.activeWorkbenchModel === 'packagePaneModel'" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.operation-banner--box {
  width: 100%;
  height: 100%;
  background: #fff;

  .content-box {
    height: calc(100% - 30px);
    width: 100%;
    overflow: hidden;
  }

  .menu-view--box {
    width: 100%;
    height: 30px;
    z-index: 100;
    background: #e6e6e6;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    color: #1E1E1E;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;

    .list {
      cursor: default;
      font-size: 12px;
      padding: 0 10px;
      user-select: none;
      height: 30px;
      line-height: 30px;

      i {
        font-size: 12px;
      }

      &:hover {
        background: #b3b3b36f;
      }

      &.active {
        color: var(--primary-color);
        position: relative;
        background: #b3b3b3;
        font-weight: 600;
        box-shadow: 0 -2px 0 0 var(--primary-color) inset;
      }
    }
  }
}
</style>
