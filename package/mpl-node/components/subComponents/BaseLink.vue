<script setup lang="ts">
import FormItem from '../FormItem.vue'
import InputNode from '../InputNode.vue'

const activeNode = defineModel<any>()
</script>
<template>
  <template v-if="activeNode">
    <FormItem label="链接文本">
      <InputNode v-model="activeNode.txt" />
    </FormItem>
    <FormItem label="链接地址" var="mpl.rg5fv6.link.url">
      <input v-model="activeNode.link" class="mpl-input">
    </FormItem>
    <FormItem label="窗口方法">
      <select v-model="activeNode.target" class="mpl-select">
        <option value="_blank">新窗口</option>
        <option value="_self">当前窗口</option>
      </select>
    </FormItem>
  </template>
</template>