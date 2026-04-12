<script lang="ts" setup>
import { ref, inject } from 'vue'
import { DrawerProp } from '../define'
import { DRAG_START_NODE } from '../../../../libs'
import RenderNodeList from '../../../../components/RenderNodeList.vue'
import type { Fn, Fn1 } from '@mpl/typings'

const props = defineProps<{ node: DrawerProp }>()
const activeNode = ref<DrawerProp>(JSON.parse(JSON.stringify({ ...props.node, mpl_children: [] })))
const drawerVisible = ref<boolean>(true)
const dragStartNode = inject(DRAG_START_NODE, ref(null))
const isDragoverBox = ref<boolean>(false)
const dropNodePlus = inject<Fn>('dropNodePlus', () => { })
const dragover = inject<Fn1>('dragover', () => { })
const nodeClick = inject('nodeClick') as any

function selectModule() { }

function drop() {
  isDragoverBox.value = false
  dropNodePlus(props.node.cid)
}

const dragoverBaseBox = (el: DragEvent) => {
  if (!isDragoverBox.value && dragStartNode.value) {
    isDragoverBox.value = true
    dragover(el)
  }
}

function dragleave() {
  isDragoverBox.value = false
}
</script>

<template>
  <el-drawer v-model="drawerVisible" append-to-body :size="activeNode.width" class="mpl-drawer" direction="ltr"
    :show-close="false">
    <template #header>
      <div class="drawer-title">
        {{ activeNode.header.title }}
      </div>
      <div class="button-group">
        <el-button v-for="btn in activeNode.header.btnGroup" :key="btn.cid">
          {{ btn.title }}
        </el-button>
        <el-button v-if="activeNode.header.showClose" class="icon icon-close" link />
      </div>
      <slot />
    </template>
    <div class="mpl-body-content" @click.stop="nodeClick(props.node.cid)">
      <div v-if="activeNode.mpl_children.length === 0 && !dragStartNode" class="empty-block"
        :class="{ 'is-empty-events': dragStartNode }">
        请拖入控件或&nbsp;
        <button type="button" @click="selectModule">
          选择模板
        </button>
      </div>
      <div v-else class="drag-drawer-container" :class="{ dragover: isDragoverBox }" @dragleave.prevent="dragleave"
        @drop.stop.prevent="drop" @dragover.stop.prevent="dragoverBaseBox">
        <RenderNodeList :node-list="props.node.mpl_children" ui="elementPlus" />
      </div>
    </div>
    <template #footer>
      <div class="button-group">
        <el-button v-for="btn in activeNode.footer.btnGroup" :key="btn.cid">
          {{ btn.title }}
        </el-button>
      </div>
      <slot />
    </template>
  </el-drawer>
</template>

<style lang="less">
.mpl-drawer {
  .el-drawer__header {
    padding: 0 10px;
    height: 45px;
    display: flex;
    margin: 0;
    color: #1E1E1E;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;

    .drawer-title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      flex: 1;
      margin-right: 20px;
      font-weight: 600;
    }
  }

  .el-drawer__body {
    padding: 0;
  }

  .mpl-body-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;

    .drag-drawer-container {
      width: 100%;
      height: 100%;
      overflow: hidden auto;
      box-sizing: border-box;
      text-align: left;
    }

    .empty-block {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
      font-size: 12px;

      button {
        font-size: 12px;
        color: #1E1E1E
      }
    }
  }

  .el-drawer__footer {
    padding: 0 10px;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    color: #1E1E1E;
    border-top: 1px solid #ccc;
  }
}
</style>
