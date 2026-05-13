<script setup lang="ts">
import SubSettingHeaderUI from '../SubSettingHeaderUI.vue'
import { InteractiveProp, SUB_BOX_SETTING_MODEL } from '@mpl/typings'

const props = defineProps<{
  modelValue: InteractiveProp
}>()
const emit = defineEmits(['update'])

</script>

<template>
  <div class="interactive-dialog--box mpl-scroll-none">
    <SubSettingHeaderUI label="可视化交互" @close="emit('update', 'cancel')" />
    //
  </div>
</template>

<style lang="less" scoped>
.interactive-dialog--box {
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
