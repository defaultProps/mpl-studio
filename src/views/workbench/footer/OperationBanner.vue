<script setup lang="ts">
import { ref } from 'vue'
import PageCode from './PageCode.vue'
import QuickConfigModel from './quickConfig/index.vue'
import ServiceConfigModel from './ServiceConfigModel.vue'
import SchemaPane from './SchemaPane.vue'
import ThirdPkgPane from './ThirdPkgPane.vue'
import IntelligentDetectionPane from './IntelligentDetectionPane.vue'
import { workbenchViewList } from '@/utils/constant'
import mplStore from '@mpl/store'

const coreView = mplStore.viewStore()
const visibleAllModel = ref<boolean>(false)
</script>

<template>
  <div class="operation-banner--box">
    <div class="menu-view--box">
      <div class="left-btn-box">
        <button v-if="coreView.workbenchFooterToolSize !== 'large'" class="mpl-btn icon mr-2 icon-arrow-up-filling"
          @click="coreView.updateWorkbenchFooterTool('up')" />
        <button @click="coreView.updateWorkbenchFooterTool('down')" class="mpl-btn icon icon-arrow-down-filling"
          v-if="coreView.workbenchFooterToolSize !== 'mini'" />
      </div>
      <span v-for="(item, i) in workbenchViewList" v-show="i <= 2 || visibleAllModel" :key="item.value" class="list"
        :class="{
          active:
            item.value === coreView.activeWorkbenchModel
            && coreView.workbenchFooterToolSize !== 'mini'
        }" @click="coreView.updateActiveWorkbenchModel(item.value)">
        {{ item.label }}
      </span>
      <span class="list icon" @click="visibleAllModel = !visibleAllModel" :class="[
        visibleAllModel ? 'icon-double-arrow-left' : 'icon-double-arro-right'
      ]" />
      <div class="right-btn-box">
        <button v-show="coreView.workbenchFooterToolSize !== 'mini'" class="btn icon icon-line"
          @click="coreView.workbenchFooterToolSize = 'mini'" />
      </div>
    </div>
    <div class="content-box">
      <PageCode v-show="coreView.activeWorkbenchModel === 'pageCodePaneModel'" />
      <QuickConfigModel v-if="coreView.activeWorkbenchModel === 'quickConfigPaneModel'" />
      <ServiceConfigModel v-show="coreView.activeWorkbenchModel === 'serviceConfigPaneModel'" />
      <IntelligentDetectionPane v-show="coreView.activeWorkbenchModel === 'intelligentDetection'" />
      <SchemaPane v-show="coreView.activeWorkbenchModel === 'schemaPaneModel'" />
      <ThirdPkgPane v-show="coreView.activeWorkbenchModel === 'packagePaneModel'" />
      <!-- <template v-else>empty file</template> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.operation-banner--box {
  font-size: 12px;
  color: #000;
  height: 100%;
  width: 100%;

  .content-box {
    height: calc(100% - 26px);
    width: 100%;
    overflow: hidden;
  }

  .menu-view--box {
    width: 100%;
    height: 25px;
    z-index: 100;
    background: #e6e6e6;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    color: #000;
    box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0 -1px 0 0 var(--color-1) inset, 0 1px 0 0 var(--color-1) inset;

    .left-btn-box {
      margin-right: 5px;

      i {
        color: #909399;
        height: 8px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        text-align: center;

        &.top {
          position: relative;
          height: 8px;
          display: inline-block;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          top: 0px;
          font-size: 12px;

          &::before {
            height: 10px;
            width: 10px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }

          &.medium {
            display: none;
          }
        }

        &.bottom {
          left: 0;
          height: 10px;
          display: inline-block;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          bottom: 0;
          font-size: 12px;

          &::before {
            height: 10px;
            width: 10px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }

          &.mini {
            display: none;
          }
        }

        &:hover {
          color: var(--primary-color);
        }
      }
    }

    .list {
      cursor: default;
      font-size: 12px;
      padding: 0 10px;
      user-select: none;
      height: 24px;
      line-height: 24px;

      i {
        font-size: 12px;
      }

      &:hover {
        background-color: #b3b3b36f;
      }

      &.active {
        color: var(--primary-color);
        position: relative;
        background-color: #b3b3b3;
        font-weight: 600;
        box-shadow: 0 -2px 0 0 var(--primary-color) inset
      }
    }

    .right-btn-box {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 5px;
      box-sizing: border-box;
    }
  }
}
</style>
