<script setup lang="ts">
import SubSettingHeaderUI from '../SubSettingHeaderUI.vue'

const props = defineProps<{
  modelValue: {
    label: string
    value: string
    callback: string
  }
}>()
const emit = defineEmits(['update'])


function submitIcon(event: MouseEvent | 'cancel') {
  //
}
</script>

<template>
  <div class="computed-var-dialog--box mpl-scroll-none">
    <SubSettingHeaderUI label="自动计算变量" @close="emit('update', 'cancel')" />
    //
  </div>
</template>

<style lang="less" scoped>
.computed-var-dialog--box {
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
