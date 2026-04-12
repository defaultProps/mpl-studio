<script lang="ts" setup>
import { ref } from 'vue'
import FormItem from '../../../components/FormItem.vue'
import { Paragraph } from './define'
import SliderNode from '../../../components/SliderNode.vue'

const props = defineProps<{ value: Paragraph }>()
const activeNode = ref<Paragraph>(props.value)
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <NodeLabel v-model="activeNode.label" :cid="activeNode.cid" />
    <div class="mpl-divider">内容设置</div>
  </div>
</template>
