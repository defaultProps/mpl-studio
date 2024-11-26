<script setup lang="ts">
import { ref } from 'vue'
import InputNumber from './InputNumber.vue'

const paddings = ref({
  left: 8,
  right: 8,
  top: 8,
  bottom: 8
})
</script>

<template>
  <div class="mpl-padding--box">
    <InputNumber v-model="paddings.top" class="padding-top" />
    <InputNumber v-model="paddings.right" class="padding-right" />
    <InputNumber v-model="paddings.bottom" class="padding-bottom" />
    <InputNumber v-model="paddings.left" class="padding-left" />
    <div class="content-box"></div>
  </div>
</template>
<style lang="less" scoped>
.mpl-padding--box {
  position: relative;
  width: 100%;
  .content-box {
    width: 250px;
    height: 250px;
    background-color: #1e1e1e;
  }
  .padding-top {
    position: absolute;
    top: 0;
    left: 50%;
    width: 20px;
    height: 20px;
  }
  .padding-right {
    position: absolute;
    top: 50%;
    right: 0;
    width: 20px;
    height: 20px;
  }
  .padding-left {
    position: absolute;
    top: 50%;
    left: 0;
    width: 20px;
    height: 20px;
  }
  .padding-bottom {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 20px;
    height: 20px;
  }
}

</style>