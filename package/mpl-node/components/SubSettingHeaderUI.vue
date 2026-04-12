<script lang="ts" setup>
  import { viewStore } from '@mpl/store'

  const props = defineProps<{ label: string }>()
  const emit = defineEmits(['close'])

  function handleClick() {
    emit('close')
    viewStore().$patch({
      subBoxSettingModel: '',
      subBoxSettingModelId: ''
    })
  }
</script>

<template>
  <header>
    {{ props.label }}
    <button type="button" class="mpl-btn del-btn icon icon-close1" @click="handleClick" />
  </header>
</template>
<style scoped>
  header {
    background: var(--primary-color);
    color: #ffffff;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 12;
    font-size: 14px;
    user-select: text;
    padding: 0 5px;
    box-sizing: border-box;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
  }
</style>