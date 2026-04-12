<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const form = ref({
  file: ''
})
</script>
<template>
  <el-dialog v-model="visible" title="导入Excel" width="500px">
    <el-form :model="form" label-width="120px">
      <el-form-item label="文件">
        <el-input v-model="form.file" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>