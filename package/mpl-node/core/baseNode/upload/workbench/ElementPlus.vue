<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { UploadInputFormProp } from '../define'
import type { UploadUserFile } from 'element-plus'

const props = defineProps<{ node: UploadInputFormProp }>()
const inputValue = ref<UploadUserFile[]>(props.node.upload.model || [])

watch(
  () => props.node.upload.model,
  (value: UploadUserFile[]) => {
    inputValue.value = value
  }
)
</script>

<template>
  <el-form-item theme="mpl" :required="props.node.upload.required" class="mpl-form-item" :cid="props.node.cid"
    :class="[{ 'mpl-none': !props.node.label.show }, labelPosWithClassName.get(props.node.label.pos)]"
    :label-width="props.node.label.width === 0 ? 80 : props.node.label.width">
    <template #label>
      <div v-show="props.node.label.show" class="mpl-label">
        <span :title="props.node.label.text">
          {{ props.node.label.text }}
        </span>
        <span v-if="props.node.label.icon" class="mpl-label-icon">
          <i class="mpl icon" :class="[props.node.label.icon]" :style="{ color: props.node.label.iconTheme }" />
        </span>
      </div>
    </template>
    <div class="mpl-content" :class="[formContentPosClassName.get(props.node.upload.pos)]">
      上传文件类型
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
</template>
<style lang="less" scoped>
  .mpl-form-item {
    height: 100%;
    align-items: flex-start !important;

    .mpl-content>button {
      margin-left: 5px;
    }
  }
</style>
