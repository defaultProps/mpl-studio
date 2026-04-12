<script lang="ts" setup>
import { inject, ref } from 'vue'
import { DialogProp } from '../define'
import type { NodeClickInject } from '@mpl/typings'
import type { Fn, Fn1 } from '@mpl/typings'
import RenderNodeList from '../../../../components/RenderNodeList.vue'
import { DRAG_START_NODE } from '../../../../libs'


const dragStartNode = inject(DRAG_START_NODE, ref(null))
const props = defineProps<{ node: DialogProp }>()
const dialogVisible = ref<boolean>(true)
const nodeClick = inject<NodeClickInject>('nodeClick')
const dropNodePlus = inject<Fn>('dropNodePlus', () => { })
const dragover = inject<Fn1>('dragover') as any

function drop() {
  dropNodePlus(props.node.cid)
}

</script>

<template>
  <el-dialog v-model="dialogVisible" append-to-body destroy-on-close :close-on-click-modal="true" class="mpl-dialog"
    :close-on-press-escape="false" lock-scroll draggable width="1000" :show-close="false"
    :class="[props.node.cid, { 'is-hidden-header': !props.node.header.visible }]" top="40px"
    @click="nodeClick?.(props.node.cid)" @close="nodeClick?.('body')">
    <template v-if="props.node.header.visible" #header>
      <div class="drawer-title">
        {{ props.node.header.title }}
      </div>
      <div class="button-group">
        <button v-for="btn in props.node.header.btnGroup" class="mpl-btn" type="button" :class="`mpl-btn-${btn.theme}`">
          {{ btn.title }}
        </button>
        <button v-if="props.node.header.showClose" type="button" class="icon-close icon mpl-dialog-header-close-btn" />
      </div>
      <slot />
    </template>
    <div class="mpl-body-content" :style="{ height: `${props.node.body.height}px` }">
      <div v-if="props.node.mpl_children.length === 0 && !dragStartNode" class="mpl-empty-container" description="">
        请拖入控件或&nbsp;
        <button class="mpl-empty-collapse-btn" type="button">
          选择模板
        </button>
      </div>
      <div v-else class="drag-dialog-container" @drop.stop.prevent="drop" @dragover.stop.prevent="dragover($event)">
        <RenderNodeList :node-list="props.node.mpl_children" ui="elementPlus" />
      </div>
    </div>
    <template v-if="props.node.footer.visible" #footer>
      <el-button v-for="btn in props.node.footer.btnGroup" :key="btn.cid" :type="btn.theme">
        {{ btn.title }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="less">
.mpl-dialog {
  padding: 0;

  .mpl-dialog-header-close-btn {
    width: 35px;
    height: 30px;
    display: inline-block;
    border: none;
    border-radius: 2px;
    margin-left: 5px;

    &:hover {
      background: #dedfe0;
      color: var(--el-color-primary);
      font-weight: 600;

    }
  }

  &.is-hidden-header .el-dialog__header {
    display: none;
  }

  .el-dialog__header {
    padding: 0 10px;
    height: 45px;
    display: flex;
    margin: 0;
    color: #1E1E1E;
    border-bottom: 1px solid #ccc;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    overflow: hidden;

    .dialog-close-btn i {
      color: #666;
    }
  }

  .el-dialog__body {
    padding: 0;
  }

  .mpl-body-content {
    width: 100%;
    height: 100%;
    overflow: hidden auto;
    box-sizing: border-box;

    .drag-dialog-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
      min-height: 200px;
      text-align: left;
    }

    .mpl-empty-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
      font-size: 12px;
      -webkit-user-drag: none;
      user-select: none;
    }
  }

  .el-dialog__footer {
    padding: 0 10px;
    height: 50px;
    display: flex;
    margin: 0;
    color: #1E1E1E;
    border-top: 1px solid #ccc;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
