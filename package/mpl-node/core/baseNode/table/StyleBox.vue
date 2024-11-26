<script lang="ts" setup>
import { ref } from 'vue'

const styleConfig = ref<any>({
  size: 'small',
  bottom: 'p24',
  border: 'baseline',
})
</script>

<template>
  <div class="right-bar-style--box">
    <div class="form-item-box">
      <div class="label">
        尺寸
      </div>
      <div class="content">
        <el-radio-group
          v-model="styleConfig.size"
          size="small"
        >
          <el-radio-button value="small">
            紧凑
          </el-radio-button>
          <el-radio-button value="medium">
            舒适
          </el-radio-button>
          <el-radio-button value="large">
            宽松
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="form-item-box">
      <div class="label">
        底部占位
      </div>
      <div class="content">
        <el-radio-group
          v-model="styleConfig.bottom"
          size="small"
        >
          <el-radio-button value="p8">
            紧凑
          </el-radio-button>
          <el-radio-button value="p24">
            舒适
          </el-radio-button>
          <el-radio-button value="p30">
            宽松
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="form-item-box">
      <div class="label">
        边框
      </div>
      <div class="content">
        <el-radio-group
          v-model="styleConfig.border"
          size="small"
        >
          <el-radio-button value="border">
            线框
          </el-radio-button>
          <el-radio-button labevaluel="baseline">
            底线
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .right-bar-style--box {
    padding: 5px;
    box-sizing: border-box;
    color: var(--color-1);
    font-size: 12px;
  }
</style>
