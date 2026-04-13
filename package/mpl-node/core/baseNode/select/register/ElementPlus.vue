<script lang="ts" setup>
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import type { SelectFormProp } from '../define'
import SlotRenderNode from '../../../../components/SlotRenderNode.vue'

const el = defineModel<SelectFormProp>()
const props = defineProps<{ w: string | number, h: number | string }>()
</script>

<template>
  <template v-if="el">
    <el-form-item theme="mpl" :required="el.select.required" class="mpl-form-item" :cid="el.cid"
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
      <div class="mpl-content" :class="[formContentPosClassName.get(el.select.pos)]">
        <SlotRenderNode :nodes="el.slotNodes.filter(v => v.pos === 'l')" />
        <el-select v-model="el.select.model" popper-class="mpl-select-popper" class="mr-5"
          :style="{ width: el.select.width ? `${el.select.width}px` : '100%' }" :placeholder="el.select.placeholder"
          :clearable="el.select.clearable" style="user-select: none">
          静态数据，预览生效
        </el-select>
        <SlotRenderNode :nodes="el.slotNodes.filter(v => v.pos === 'r')" />
      </div>
      <template #error>
        <div class="mpl-form-item-error">
          错误信息提示
        </div>
      </template>
    </el-form-item>
  </template>
</template>
