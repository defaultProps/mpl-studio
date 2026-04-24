<script lang="ts" setup>
import { CollapseProp } from '../define'
import { inject, ref } from 'vue'
import RenderNodeList from '../../../../components/RenderNodeList.vue'
import { DRAG_START_NODE } from '../../../../libs'
import type { Fn, Fn1 } from '@mpl/typings'

const nodeClick = inject('nodeClick') as any
const dragover = inject<Fn1>('dragover', () => { })
const props = defineProps<{ node: CollapseProp }>()
const activeNames = ref<string[]>(props.node.itemList.filter((_, i) => i === 0).map(v => v.value))
const dragStartNode = inject(DRAG_START_NODE, ref(null))
const dropNodeCollapsePlus = inject<Fn>('dropNodeCollapsePlus', () => { })

function drop(cid: string, paneId: string) {
  dropNodeCollapsePlus(cid, paneId)
}

const dragoverBaseBox = (el: DragEvent) => {
  dragover(el)
}

</script>
<template>
  <div class="mpl-collapse" @click.stop="nodeClick(props.node.cid)">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="p in props.node.itemList" :key="p.value" :title="p.title" :name="p.value">
        <div v-if="p.mpl_children.length === 0 && !dragStartNode" class="mpl-empty-collapse">
          请拖入控件或&nbsp;
          <button class="mpl-empty-collapse-btn" type="button">
            选择模板
          </button>
        </div>
        <div v-else class="drag-collapse-container" @drop.stop.prevent="drop(props.node.cid, p.value)"
          @dragover.stop.prevent="dragoverBaseBox">
          <RenderNodeList :node-list="p.mpl_children" ui="elementPlus" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="less">
.mpl-collapse {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .el-collapse {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .el-collapse-item {
      width: 100%;

      .drag-collapse-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        min-height: 200px;
        text-align: left;
      }

      .el-collapse-item__wrap {
        width: 100%;
        flex: 1;
      }

      .mpl-empty-collapse {
        font-size: 12px;
        -webkit-user-drag: none;
        user-select: none;
        height: 200px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;

        .mpl-empty-collapse-btn {
          font-size: 12px;
          padding: 0 4px;
        }
      }
    }
  }

  .el-collapse-item__header {
    padding-left: 10px;
    box-sizing: border-box;
  }
}
</style>
