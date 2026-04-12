<script lang="ts" setup>
import { QrCodeBox } from './define'
import { ref } from 'vue'

const props = defineProps<{ value: QrCodeBox }>()
const activeNode = ref<QrCodeBox>(props.value)
</script>
<template>
  <div class="right-bar-setting--box">
    二维码配置
  </div>
</template>