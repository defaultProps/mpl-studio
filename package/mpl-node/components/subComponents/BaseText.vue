<script setup lang="ts">
import FormItem from '../FormItem.vue'
import InputNode from '../InputNode.vue'

const activeNode = defineModel<any>()
const stylePlaceholder = `举例:
.xxx {
  color: red;
}
`

</script>
<template>
  <template v-if="activeNode">
    <FormItem label="文本内容" flex-start>
      <InputNode v-model="activeNode.txt" />
    </FormItem>
    <FormItem label="自定义样式" flex-start>
      <textarea v-model="activeNode.style" class="mpl-textarea" :placeholder="stylePlaceholder" rows="5" maxlength="200"
        style="resize: none" />
    </FormItem>
  </template>
</template>