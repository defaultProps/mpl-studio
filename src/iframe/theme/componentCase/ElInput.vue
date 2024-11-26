<script lang="ts" setup>
import { ref } from 'vue'
import CardBox from '../CardBox.vue'

const inputValue = ref<string>('')
</script>

<template>
  <CardBox title="基础输入">
    <div class="mpl-form-item">
      <div class="mpl-label">
        标题
      </div>
      <div class="mpl-content">
        <el-input
          v-model="inputValue"
          placeholder="请输入标题"
        />
      </div>
    </div>
    <template #setting />
  </CardBox>
</template>
