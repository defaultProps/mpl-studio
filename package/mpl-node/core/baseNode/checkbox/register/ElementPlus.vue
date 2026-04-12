<script lang="ts" setup>
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import type { CheckboxFormProp } from '../define'

const el = defineModel<CheckboxFormProp>()
const props = defineProps<{ w: string | number, h: number | string }>()
</script>

<template>
  <template v-if="el">
    <el-form-item theme="mpl" :required="el.checkbox.required" class="mpl-form-item" :cid="el.cid"
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
      <div class="mpl-content" :class="[formContentPosClassName.get(el.checkbox.pos)]">
        <el-checkbox-group v-model="el.checkbox.model">
          <el-checkbox value="1">
            男
          </el-checkbox>
          <el-checkbox value="2">
            女
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <template #error>
        <div class="mpl-form-item-error">
          错误信息提示
        </div>
      </template>
    </el-form-item>
  </template>
</template>