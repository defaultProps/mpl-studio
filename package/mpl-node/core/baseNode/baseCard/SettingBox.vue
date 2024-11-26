<script lang="ts" setup>
  import { ref } from 'vue'
  import FormItem from '../../../components/FormItem.vue'
  import SliderNode from '../../../components/SliderNode.vue'
 import { BaseCard } from './define'

  const props = defineProps<{ value: BaseCard }>()
  const activeNode = ref<BaseCard>(props.value)
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
  </div>
</template>

<style lang="less">
  .right-bar-setting--box {
    padding: 5px;
    box-sizing: border-box;
    font-size: 12px;
  }
</style>
