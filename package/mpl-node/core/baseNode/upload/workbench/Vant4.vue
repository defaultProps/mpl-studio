<script lang="ts" setup>
  import { inject, ref, watch } from 'vue'
  import { VISIBLE_NOTE } from '../../../../libs'
  import { UploadInputFormProp } from '../define'
  import type { UploadUserFile } from 'element-plus'

  const props = defineProps<{ node: UploadInputFormProp }>()
  const inputValue = ref<UploadUserFile[]>(props.node.upload.model || [])

  watch(
    () => props.node.upload.model,
    (value: any) => {
      inputValue.value = value
    },
  )

  const visibleNote = inject(VISIBLE_NOTE, ref(false))
</script>

<template>
  <van-field v-model="inputValue" :placeholder="props.node.upload.placeholder" label-align="top" clearable
             class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
      <mpl-note v-if="visibleNote"></mpl-note>
    </template>
  </van-field>
</template>
