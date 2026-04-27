<script setup lang="ts">
import FormItem from '../FormItem.vue'
import InputNode from '../InputNode.vue'
import InputNumber from '../InputNumber.vue'

const activeNode = defineModel<any>()
</script>
<template>
  <template v-if="activeNode">
    <FormItem label="提示信息" var="mpl.rg5fv6.input.placeholder">
      <InputNode v-model="activeNode.placeholder" />
    </FormItem>
    <FormItem label="显示长度限制">
      <input v-model="activeNode.showLimit" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="最大长度">
      <InputNumber v-model="activeNode.maxlength" placeholder="默认无限制" />
    </FormItem>
    <FormItem v-model="activeNode.prefixIcon" var="mpl.rg5fv6.input.prefixIcon" label="前置图标" icon />
    <!-- <FormItem v-model="activeNode.suffixIcon" var="mpl.rg5fv6.input.suffixIcon" label="后置图标" icon /> -->
    <FormItem label="可清空" var="mpl.rg5fv6.input.clearable">
      <input v-model="activeNode.clearable" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="必填">
      <input v-model="activeNode.required" type="checkbox" class="mpl-input">
    </FormItem>
  </template>
</template>