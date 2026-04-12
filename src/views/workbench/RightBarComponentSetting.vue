<script lang="ts" setup>
import { provide, markRaw } from 'vue'
import { workbenchStore, projectStore, viewStore } from '@mpl/store'
import { componentToolOptions } from '@/utils/constant'
import { Node, EventNode } from '@mpl/typings'
import { mplBodyRoot } from '@mpl/node'

const workbench = workbenchStore()
const project = projectStore()
const coreView = viewStore()

function addActiveNodeEvent(event: EventNode & { cid?: string }) {
  workbench.singleNodeEventPlus(event)
}

provide('addActiveNodeEvent', addActiveNodeEvent)

</script>

<template>
  <nav v-if="project.lockedFileList.includes(project.activeFileId)" class="sidebar-component-setting">
    <component :is="coreView.asyncSubSettingComponent" />
    <div class="node-bar-tool-line">
      <button v-for="item in componentToolOptions" :key="item.value" class="tool-btn" :class="{
        active: item.value === workbench.activeComponentSettingModel && coreView.visibleRightBarComponentSetting
      }" :title="item.label" :disabled="item.disabled" @click.stop="workbench.updateShallComponentSettingRef(item.value)">
        {{ item.label }}
      </button>
      <div class="tool-btn icon trigger-right-btn"
        :class="[coreView.visibleRightBarComponentSetting ? 'icon-arrow-up-filling' : 'icon-arrow-down-filling']"
        @click.stop="coreView.triggerVisibleRightBarComponentSetting()" />
    </div>
    <div v-if="coreView.visibleRightBarComponentSetting" class="component-setting-sidebar mpl-scroll-none">
      <component :is="workbench.shallComponentSettingRef || markRaw(mplBodyRoot.componentModel)"
        v-if="workbench.activeNode" :value="workbench.activeNode"
        :is-mobile="!project.activeProject?.platformList.find(v => v.id.includes('MPL-DFN'))" />
    </div>
  </nav>
</template>
<style lang="less" scoped>
.sidebar-component-setting {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  position: relative;

  .node-bar-tool-line {
    width: 20px;
    height: 100%;
    font-size: 12px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #e6e6e6;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;

    .tool-btn {
      text-orientation: sideways-right;
      writing-mode: tb-rl;
      user-select: none;
      width: 100%;
      line-height: 20px;
      padding: 8px 0;
      font-size: 12px;
      text-align: center;
      color: #1E1E1E;
      min-width: fit-content;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      border: none;
      outline: none;
      &[disabled] {
        cursor: not-allowed;
        color: #73767a;
      }
      &:not([disabled]):hover {
        color: var(--primary-color);
        background: #8b8b8b6b;
      }

      &.trigger-right-btn {
        position: absolute;
        bottom: 0;
      }

      &.active {
        color: var(--primary-color);
        position: relative;
        font-weight: 600;
        background: #8b8b8b6b;

        &::before {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--primary-color);
        }
      }
    }
  }
}
</style>