<script lang="ts" setup>
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import type { SelectDialogFormProp } from '../define'
import SlotRenderNode from '../../../../components/SlotRenderNode.vue'
import { ref } from 'vue'

const el = defineModel<SelectDialogFormProp>()
const props = defineProps<{ w: string | number, h: number | string }>()
const dialogVisible = ref(false)
</script>

<template>
  <template v-if="el">
    <el-form-item theme="mpl" :required="el.selectDialog.required" class="mpl-form-item" :cid="el.cid"
      :prop="el.selectDialog.prop"
      :class="[{ 'mpl-none': !el.label.show }, `w-${props.w}`, `h-${props.h}`, labelPosWithClassName.get(el.label.pos)]"
      :label-width="el.label.width === 0 ? 80 : el.label.width">
      <template #label>
        <div v-show="el.label.show" class="mpl-label">
          <span :title="el.label.text">
            {{ el.label.text }}
          </span>
          <div v-if="el.label.icon" class="mpl-label-icon">
            <i class="mpl icon" :class="[el.label.icon]" :style="{ color: el.label.iconTheme }" />
          </div>
        </div>
      </template>
      <div class="mpl-content" :class="[formContentPosClassName.get(el.selectDialog.pos)]">
        <SlotRenderNode :nodes="el.slotNodes.filter(v => v.pos === 'l')" />
        <el-input theme="mpl" readonly :style="{ width: el.selectDialog.width ? `${el.selectDialog.width}px` : '100%' }"
          :placeholder="el.selectDialog.placeholder" :clearable="el.selectDialog.clearable">
          <template #prefix>
            <i class="mpl icon" :class="[el.selectDialog.prefixIcon]" />
          </template>
          <template #suffix>
            <i class="icon" :class="[el.selectDialog.suffixIcon]" />
          </template>
        </el-input>
        <button class="ml-5 mr-5" type="button" style="height: 30px;font-size: 12px;color: #1E1E1E;"
          @click="dialogVisible = true">
          选择
        </button>
        <SlotRenderNode :nodes="el.slotNodes.filter(v => v.pos === 'r')" />
      </div>
      <template #error>
        <div class="mpl-form-item-error">
          错误信息提示
        </div>
      </template>
    </el-form-item>
    <el-dialog v-model="dialogVisible" draggable class="mpl-dialog lcs-select-dialog" :show-close="false"
      :destroy-on-close="true" :title="el.selectDialog.dialog.header.title"
      :width="`${el.selectDialog.dialog.width}${el.selectDialog.dialog.widthType}`" append-to-body>
      <div class="dialog-content" />
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
</template>