<script lang="ts" setup>
import { PanelProp } from '../define'
import type { Fn, Fn1 } from '@mpl/typings'
import RenderNodeList from '../../../../components/RenderNodeList.vue'
import { DRAG_START_NODE } from '../../../../libs'
import { inject, ref } from 'vue'

const props = defineProps<{ node: PanelProp }>()
const dropNodePlus = inject<Fn>('dropNodePlus', () => { })
const dragover = inject<Fn1>('dragover') as any
const dragStartNode = inject(DRAG_START_NODE, ref(null))

function selectModule() { }

function drop() {
  dropNodePlus(props.node.cid)
}
</script>

<template>
  <div class="mpl-panel">
    <div class="mpl-panel-content">
      <div v-if="props.node.header.visible" class="mpl-header"
        :class="{ 'show-border-bottom': props.node.header.showBorderBottom }">
        <div class="mpl-title">
          {{ props.node.header.label }}
        </div>
        <div class="mpl-meta">
          <el-button v-for="item in props.node.header.slotNodes" :key="item.cid">
            {{ item.title }}
          </el-button>
          <el-button v-if="props.node.header.expandable" text class="icon icon-arrow-right" />
        </div>
      </div>
      <div class="mpl-body" :class="[props.node.body.paddingSize, { 'fit-content': props.node.body.autoHeight }]"
        @drop.stop.prevent="drop" @dragover.stop.prevent="dragover($event)">
        <div v-if="props.node.mpl_children.length === 0" class="empty-block"
          :class="{ 'is-empty-events': dragStartNode }">
          请拖入控件或&nbsp;
          <button type="button" @click="selectModule">
            选择模板
          </button>
        </div>
        <RenderNodeList :node-list="props.node.mpl_children" ui="elementPlus" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mpl-panel {
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #1E1E1E;
  box-sizing: border-box;
  overflow: hidden;

  &.small {
    padding: 10px;
  }

  &.medium {
    padding: 15px;
  }

  .mpl-panel-content {
    box-shadow: 0px 0px 1px 1px #ccc inset;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }

  .mpl-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: hidden;

    &.show-border-bottom {
      box-shadow: 0px -1px 0 0 #ccc inset;
    }

    .mpl-title {
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      text-indent: 10px;
      font-weight: 600;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 5px;
        height: 12px;
        width: 3px;
        background: #c3002f;
      }
    }

    .mpl-meta {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      flex: 1;

      button+button {
        margin-left: 10px;
      }
    }
  }

  .mpl-body {
    box-sizing: border-box;
    text-align: left;
    flex: 1;
    width: 100%;
    position: relative;
    overflow-y: auto;

    >.empty-block {
      display: flex;
      align-items: center;
      height: 80px;
      justify-content: center;
      font-size: 12px;
      color: #333;
      pointer-events: none;

      &.is-empty-events {
        pointer-events: none;
        display: none;
      }

      button {
        color: #333;
        font-size: 12px;
      }
    }

    &.fit-content {
      // min-height: fit-content;
    }

    &.small {
      padding: 10px;
    }

    &.standard {
      padding: 20px;
    }
  }
}
</style>
