<script setup lang="ts">
import { onMounted, ref } from 'vue'

const editable = ref<boolean>(false)
const text = defineModel<string>({ default: '' })
const label = ref<string>('')
onMounted(() => {
  label.value = text.value
})
const emit = defineEmits(['change'])

function trigger(bool = true) {
  editable.value = bool
}

function blur() {
  editable.value = false
  emit('change', label.value)
}
</script>
<template>
  <input v-if="editable" v-model="text" autocomplete="off" maxlength="100" @blur="blur">
  <span v-else :title="label" @click="trigger(true)">
    {{ label }}
  </span>
</template>
<style lang="less" scoped>
input {
  display: inline-block;
  flex: 1;
  height: 32px;
  box-sizing: border-box;
  outline: none;
  padding-block: 0;
  padding-inline: 0;
  min-width: calc(100% - 30px);
}
</style>