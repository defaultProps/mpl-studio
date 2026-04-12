<script lang="ts" setup>
import { ref, watch } from 'vue'
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
  <van-field v-model="inputValue" :placeholder="props.node.upload.placeholder" label-align="top" clearable
    class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
    </template>
  </van-field>
</template>
