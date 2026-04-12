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
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
  </div>
</template>