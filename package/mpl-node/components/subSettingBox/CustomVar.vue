<script setup lang="ts">
import SubSettingHeaderUI from '../SubSettingHeaderUI.vue'
import { ref } from 'vue'

const props = defineProps<{
  modelValue: {
    label: string
    value: string
    callback: string
  } | null
}>()
const emit = defineEmits(['update'])
const formVar = ref({
  label: '',
  desc: '',
  initValue: '',
})
const rules = ref({
  label: [
    { required: true, message: '请输入变量名', trigger: 'blur' },
  ],
  callback: [
    { required: true, message: '请输入回调函数', trigger: 'blur' },
  ],
})

</script>

<template>
  <div class="custom-var-dialog--box mpl-scroll-none">
    <SubSettingHeaderUI label="页面变量" @close="emit('update', 'cancel')" />
    <el-form ref="formRef" :model="formVar" :rules="rules" label-width="60px">
      <el-form-item label="变量名" prop="label">
        <el-input v-model="formVar.label" maxlength="40" clearable />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="formVar.desc" type="textarea" clearable />
      </el-form-item>
      <el-form-item label="初始值" prop="initValue">
        <el-input v-model="formVar.initValue" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.custom-var-dialog--box {
  width: 300px;
  height: 100%;
  position: absolute;
  z-index: 100;
  right: 300px;
  top: 0;
  color: #000;
  height: 100%;
  bottom: 0;
  overflow: hidden auto;
  border: 1px solid #ccc;
  background: #fff;
  display: flex;
  flex-direction: column;
}
</style>
