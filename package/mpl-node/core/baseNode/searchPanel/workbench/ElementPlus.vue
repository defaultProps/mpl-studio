<script lang="ts" setup>
import { PanelProp } from '../define'
import type { Fn, Fn1, Node, SettingMap } from '@mpl/typings'
import RenderNodeList from '../../../../components/RenderNodeList.vue'
import { useThrottleFn } from '@vueuse/core'
import { DRAG_START_NODE } from '../../../../libs'
import { inject, markRaw, ref } from 'vue'

const props = defineProps<{ node: PanelProp & { mpl_children: Node[] } }>()
const dropNodePlus = inject<Fn>('dropNodePlus', () => { })
const dragover = inject<Fn1>('dragover')
const dragStartNode = inject(DRAG_START_NODE, ref(null))
const updateNodeProp = inject('updateNodeProp') as any

function selectModule() { }

function drop() {
  dropNodePlus?.(props.node.cid, {
    area: 'panelBody'
  })
}

const dragoverBaseBox = useThrottleFn((el: DragEvent) => {
  dragover?.(el)
}, 200)

function shadowRowComponent(p: SettingMap | undefined) {
  return p ? markRaw(p.workbench.elementPlus) : null
}

// function triggerExpandBody() {
//   updateNodeProp(props.node.cid, {
//     header: {
//       expandable: !props.node.header.expandable
//     }
//   })
// }
</script>

<template>
  <div class="mpl-panel" :class="props.node.marginSize">
    <div class="mpl-panel-content">
      <div v-if="props.node.header.visible" class="mpl-header">
        <div class="mpl-title">
          {{ props.node.header.label }}
        </div>
        <div class="mpl-meta">
          <template v-for="item in props.node.header.slotNodes">
            <!-- <template v-if="nodeList.find(node => node.cid === item.cid)">
              <component :is="shadowRowComponent(mapNodeSetting[nodeList.find(node => node.cid === item.cid)!.tag])"
                :node="nodeList.find(node => node.cid === item.cid)" />
            </template> -->
          </template>
          <i v-if="props.node.header.expandable" class="icon-arrow-right icon" style="font-size: 16px;" />
        </div>
      </div>
      <div v-show="props.node.header.expandable" class="mpl-body"
        :class="[props.node.body.paddingSize, { 'fit-content': props.node.body.autoHeight }]" @drop.stop.prevent="drop"
        @dragover.stop.prevent="dragoverBaseBox">
        <div v-if="props.node.body.slotNodes.length === 0" class="empty-block"
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
    box-shadow: 0px -1px 0 0 #ccc inset;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: hidden;

    .mpl-title {
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      text-indent: 10px;
      border-left: 2px solid #c3002f;
    }

    .mpl-meta {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      flex: 1;

      .el-select {
        max-width: 200px;
        width: 200px;
        margin-left: 10px;
      }

      .el-button+.el-button {
        margin-left: 10px;
      }

      .el-button-group {
        margin-left: 10px;

        .el-button {
          margin-left: 0;
        }

        .el-button+.el-button {
          margin-left: 0;
        }
      }

      .el-button {
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
      padding: 5px;
    }

    &.standard {
      padding: 10px;
    }
  }
}
</style>
