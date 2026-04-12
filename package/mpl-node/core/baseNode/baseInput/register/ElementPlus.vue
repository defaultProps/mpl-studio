<script lang="ts" setup>
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import type { SingleInputFormProp } from '../define'
import SlotRenderNode from '../../../../components/SlotRenderNode.vue'

const el = defineModel<SingleInputFormProp>()
const props = defineProps<{ w: string | number, h: number | string }>()
</script>

<template>
  <template v-if="el">
    <el-form-item theme="mpl" :required="el.input.required" class="mpl-form-item" :cid="el.cid" :prop="el.input.prop"
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
      <div class="mpl-content" :class="[formContentPosClassName.get(el.input.pos)]">
        <SlotRenderNode :nodes="el.slotNodes.filter(v => v.pos === 'l')" />
        <el-input v-model="el.input.model" theme="mpl" class="mr-5" :autofocus="false"
          :show-word-limit="el.input.showLimit" :maxlength="el.input.maxlength"
          :style="{ width: el.input.width ? `${el.input.width}px` : '100%' }" :placeholder="el.input.placeholder"
          :clearable="el.input.clearable">
          <template #prefix>
            <i class="mpl icon" :class="[el.input.prefixIcon]" />
          </template>
          <template #suffix>
            <i class="icon" :class="[el.input.suffixIcon]" />
          </template>
        </el-input>
        <SlotRenderNode :nodes="el.slotNodes.filter(v => v.pos === 'r')" />
      </div>
      <template #error>
        <div class="mpl-form-item-error">
          请输入
        </div>
      </template>
    </el-form-item>
  </template>
</template>
