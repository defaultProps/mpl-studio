<script lang="ts" setup>
	import { ref } from 'vue'
	import CardBox from '../CardBox.vue'

	const disabled = ref<boolean>(false)
	const visibleIcon = ref<boolean>(false)
</script>

<template>
  <CardBox title="链接">
    <el-link>链接文字</el-link>
    <template #setting>
      <div class="mpl-form-item">
        <div class="mpl-label">
          禁用
        </div>
        <input v-model="disabled" type="checkbox" class="mpl-input">
      </div>
      <div class="mpl-form-item">
        <div class="mpl-label">
          图标
        </div>
        <input v-model="visibleIcon" type="checkbox" class="mpl-input">
      </div>
    </template>
  </CardBox>
</template>
