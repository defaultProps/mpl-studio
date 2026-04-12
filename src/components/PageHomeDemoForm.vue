<template>
  <div class="mpl-pane-box">
    <div class="item-group">
      <button type="button" class="mpl-btn mpl-btn-primary">
        暗色
      </button>
      <button type="button" class="mpl-btn mpl-btn-primary">
        亮色
      </button>
      <button type="button" class="mpl-btn mpl-btn-primary">
        彩色
      </button>
    </div>
    <!-- 一个表单[表单组件], 一个表格[ag-grid表格内容]. 一个面板[面板排版] -->
    <div class="demo-block">
      <!-- 演示表单组件, 包含基础输入,密码输入框, 数字, 单选, 多选, 下拉选择, 日期选择, 时间选择, 开关, 滑块, 上传, 图片,  -->
      <el-form ref="ruleFormRef" :model="ruleForm" inline label-width="70px">
        <el-form-item label="基础输入" prop="input" style="width: 400px;">
          <el-input v-model="ruleForm.input" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="密码输入" prop="password" style="width: 400px;">
          <el-input v-model="ruleForm.password" type="password" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="数字输入" prop="number" style="width: 400px;">
          <el-input-number v-model="ruleForm.number" style="width: 100%" placeholder="请输入" controls-position="right"
            clearable />
        </el-form-item>
        <el-form-item label="单选" prop="radio">
          <el-radio-group v-model="ruleForm.radio">
            <el-radio value="dark" style="width: 120px;">
              暗色
            </el-radio>
            <el-radio value="light" style="width: 120px;">
              亮色
            </el-radio>
            <el-radio value="color" style="width: 120px;">
              彩色
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="多选" prop="checkbox">
          <el-checkbox-group v-model="ruleForm.checkbox">
            <el-checkbox value="1" style="width: 120px;">
              组件模板
            </el-checkbox>
            <el-checkbox value="2" style="width: 120px;">
              主题资源
            </el-checkbox>
            <el-checkbox value="3" style="width: 120px;">
              功能扩展
            </el-checkbox>
            <el-checkbox value="4" style="width: 120px;">
              静态资源
            </el-checkbox>
            <el-checkbox value="5" style="width: 120px;">
              图标库
            </el-checkbox>
            <el-checkbox value="6" style="width: 120px;">
              操作文档
            </el-checkbox>
            <el-checkbox value="7" style="width: 120px;">
              多语言
            </el-checkbox>
            <el-checkbox value="8" style="width: 120px;">
              挂载平台
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="下拉选择" style="width: 400px;">
          <el-select v-model="ruleForm.select" style="width: 100%" placeholder="请选择" multiple clearable collapse-tags>
            <el-option label="MPL 标准桌面应用中台" value="MPL-DFN" />
            <el-option label="MPL 标准移动端平台" value="MPL-MHS" />
            <el-option label="MPL 标准大屏展示平台" value="MPL-LPT" />
            <el-option label="MPL 标准桌面应用中台" value="MPL-WFP" />
            <el-option label="MPL 标准移动端平台" value="MPL-TP" />
            <el-option label="MPL 标准大屏展示平台" value="MPL-RPL" />
          </el-select>
        </el-form-item>
        <el-form-item label="虚拟下拉">
          <el-select-v2 v-model="ruleForm.select" :options="options2" placeholder="Please select"
            style="width: 240px" />
        </el-form-item>
        <el-form-item label="日期" />
        <el-form-item label="日期范围" />
        <el-form-item label="开关" />
        <el-form-item label="颜色选择" />
        <el-form-item label="文件上传" />
        <el-form-item label="下拉选择" />
        <el-form-item label="表格 + 内置表单组件" />
        <el-form-item label="弹框选择" />
      </el-form>
    </div>
    <div class="demo-block">
      表格[ag-grid表格内容
    </div>
    <div class="demo-block">
      面板[面板排版]
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  input: string
  password: string
  number: number | null
  radio: 'dark' | 'light' | 'color' | ''
  checkbox: string[]
  select: string[]
}

const ruleForm = reactive<RuleForm>({
  input: '',
  password: '',
  number: null,
  radio: '',
  select: [],
  checkbox: []
})

const options2 = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>
<style scoped lang="less">
.mpl-pane-box {
  background-color: #fff;
  position: relative;
  padding: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  border-radius: var(--radius-5);

  .item-group {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 2;
  }


  .demo-block+.demo-block {
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }
}
</style>