<!-- 自定义校验rule -->
<script setup lang="ts">
import SubSettingHeaderUI from '../SubSettingHeaderUI.vue'

const emit = defineEmits(['close'])

function handleCancel() {
  emit('close')
}

</script>
<template>
  <div class="custom-validate--box">
    <SubSettingHeaderUI label="自定义校验方法" @close="handleCancel" />
    <div class="content-box">
      自定义校验IDE-monaco. 提供一个前端client-api, 快捷校验.
    </div>
    <div class="footer-box">
      <button type="button" class="mpl-btn">确定</button>
      <button type="button" class="mpl-btn" @click="handleCancel">取消</button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.custom-validate--box {
  width: 300px;
  height: 100%;
  position: absolute;
  z-index: 10;
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

  >.content-box {
    flex: 1;
    padding: 5px;
    box-sizing: border-box;
  }

  >.footer-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 5px;
  }
}
</style>
