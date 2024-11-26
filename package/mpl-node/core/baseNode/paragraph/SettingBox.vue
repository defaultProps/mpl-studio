<script lang="ts" setup>
  import { ref } from 'vue'
  import FormItem from "../../../components/FormItem.vue";
 import { Paragraph } from './define'
  import { watchDebounced } from "@vueuse/core";
  import RichTextNode from "../../../components/RichTextNode.vue";
  import SliderNode from "../../../components/SliderNode.vue";

  const props = defineProps<{ value: Paragraph, isMobile: boolean }>()
  const activeNode = ref<Paragraph>(props.value)
  const emit = defineEmits(["changeNode"]);

  watchDebounced(activeNode.value, (val) => {
    emit("changeNode", val);
  });
</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem v-if="!props.isMobile" :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <NodeLabel v-model="activeNode.label" />
    <div class="mpl-divider" label="内容设置"></div>
    <RichTextNode v-model="activeNode.model" />
  </div>
</template>

<style lang="less">
  .right-bar-setting--box {
    padding: 5px;
    box-sizing: border-box;
    font-size: 12px;
  }
</style>
