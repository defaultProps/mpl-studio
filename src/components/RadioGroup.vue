<script setup lang="ts">
const props = defineProps<{
  options: { label: string, value: string }[]
}>()

const selectRadio = defineModel<string>()

const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()

function handleClick(value: string) {
  selectRadio.value = value
}
</script>

<template>
  <div class="radio-group">
    <div v-for="option in props.options" class="radio-item" :class="{ 'is-active': option.value === selectRadio }"
      @click="handleClick(option.value)">
      {{ option.label }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.radio-group {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  .radio-item {
    &.is-active {
      background-color: var(--primary-color);
      color: #fff;
    }
  }
}
</style>