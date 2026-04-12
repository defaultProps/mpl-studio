<script setup lang="ts">
import FormItem from '../FormItem.vue'
import InputNode from '../InputNode.vue'

const activeNode = defineModel<any>()

</script>
<template>
  <template v-if="activeNode">
    <FormItem label="文本内容" flex-start>
      <textarea v-model="activeNode.txt" class="mpl-textarea" rows="5" maxlength="200"
          style="resize: none" />
    </FormItem>
  </template>
</template>