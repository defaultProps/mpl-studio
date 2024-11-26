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
        <input type="checkbox" class="mpl-input" v-model="disabled" />
      </div>
      <div class="mpl-form-item">
        <div class="mpl-label">
          图标
        </div>
        <input type="checkbox" class="mpl-input" v-model="visibleIcon" />
      </div>
    </template>
  </CardBox>
</template>
