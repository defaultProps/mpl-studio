<script lang="ts" setup>
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { SelectDialogFormProp, SelectDialogNodeProp } from '../define'
import SlotRenderNode from '../../../../components/SlotRenderNode.vue'
import { inject, ref } from 'vue'
import { IS_DRAGGER } from '@mpl/node'
import type { Fn, Fn1 } from '@mpl/typings'
import RenderNodeList from '../../../../components/RenderNodeList.vue'

const props = defineProps<{ node: SelectDialogFormProp }>()
const selectDialog = ref<SelectDialogNodeProp>(props.node.selectDialog)
const dialogVisible = ref<boolean>(false)
const isDragger = inject(IS_DRAGGER, ref(false))
const isDragoverBox = ref<boolean>(false)
const dropNodePlus = inject<Fn>('dropNodePlus', () => { })
const dragover = inject<Fn1>('dragover') as any

function handleSelectModule() {
  //
}

function drop() {
  isDragoverBox.value = false
  dropNodePlus(props.node.cid)
}

function dragleave() {
  isDragoverBox.value = false
}
</script>

<template>
  <el-form-item theme="mpl" :required="selectDialog.required" class="mpl-form-item" :cid="props.node.cid"
    :class="[{ 'mpl-none': !props.node.label.show }, labelPosWithClassName.get(props.node.label.pos)]"
    :label-width="props.node.label.width === 0 ? 80 : props.node.label.width">
    <template #label>
      <div v-show="props.node.label.show" class="mpl-label">
        <span :title="props.node.label.text">
          {{ props.node.label.text }}
        </span>
        <div v-if="props.node.label.icon" class="mpl-label-icon">
          <i class="mpl icon" :class="[props.node.label.icon]" :style="{ color: props.node.label.iconTheme }" />
        </div>
      </div>
    </template>
    <div class="mpl-content" :class="[formContentPosClassName.get(selectDialog.pos)]">
      <SlotRenderNode :nodes="props.node.slotNodes.filter(v => v.pos === 'l')" />
      <el-input theme="mpl" readonly :style="{ width: selectDialog.width ? `${selectDialog.width}px` : '100%' }"
        :placeholder="selectDialog.placeholder" :clearable="selectDialog.clearable">
        <template v-if="selectDialog.prefixIcon" #prefix>
          <component :is="selectDialog.prefixIcon" style="width: 14px" />
        </template>
        <template v-if="selectDialog.suffixIcon" #suffix>
          <component :is="selectDialog.suffixIcon" style="width: 14px" />
        </template>
      </el-input>
      <el-button class="ml-5" @click="dialogVisible = true">选择</el-button>
      <SlotRenderNode :nodes="props.node.slotNodes.filter(v => v.pos === 'r')" />
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
  <el-dialog v-model="dialogVisible" draggable class="mpl-dialog lcs-select-dialog no-padding" :show-close="false"
    :destroy-on-close="true" :title="selectDialog.dialog.header.title"
    :width="`${selectDialog.dialog.width}${selectDialog.dialog.widthType}`" append-to-body>
    <div class="dialog--content">
      <div v-if="isDragger" class="search-box">
        拖入组件或
        <button type="button" class="ml-5" @click="handleSelectModule">
          选择模板
        </button>
      </div>
      <div v-else class="drag-dialog-container" @dragleave.prevent="dragleave" @drop.stop.prevent="drop"
        @dragover.stop.prevent="dragover($event)">
        <RenderNodeList :node-list="props.node.mpl_children" ui="elementPlus" />
      </div>
    </div>
    <!-- 分页展示 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
    <div class="table-search-box" />
    <div class="table-box" />
  </el-dialog>
</template>
<style lang="less">
.lcs-select-dialog.el-dialog {
  &.no-padding .el-dialog__body {
    padding: 0;
  }

  .dialog--content {
    width: 100%;
    height: 500px;

    .search-box {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      width: 100%;
      height: 100%;

      button {
        font-size: 12px;
      }
    }

    .drag-dialog-container {
      width: 100%;
      height: 100%;
      text-align: left;
      overflow: auto;
      background-size: calc(100% / 12) 12px;
      background-position: -1px 0;
      background-image: linear-gradient(90deg, #60626612 0.1rem, rgba(0, 0, 0, 0) 0.1rem), linear-gradient(#60626612 0.1rem, rgba(0, 0, 0, 0) 0.1rem);
    }
  }
}
</style>
