<script setup lang="ts">
type Options = { label: string; value: string }

const props = withDefaults(defineProps<{ modelValue: string | string[]; disabled?: boolean; option?: Options[]; checkbox?: boolean }>(), {
  modelValue: '',
  disabled: false,
  option: () => []
})
const modelInput = defineModel<string | string[]>()
const emit = defineEmits(['change'])

function changeOpt(val: string) {
  if (props.checkbox && Array.isArray(modelInput.value)) {
    const index = modelInput.value.indexOf(val)
    if (index === -1) {
      modelInput.value.push(val)
    } else if (modelInput.value.length !== 1) {
      modelInput.value.splice(index, 1)
    }
  } else {
    modelInput.value = val
  }
  emit('change', modelInput.value)
}
</script>

<template>
  <div class="mpl-radio-group">
    <button v-for="opt in props.option" :key="opt.value" type="button" class="mpl-btn" :disabled="props.disabled"
      :class="{ 'is-active': props.checkbox ? Array.isArray(modelInput) && modelInput.includes(opt.value) : modelInput === opt.value }"
      @click="changeOpt(opt.value)">
      {{ opt.label }}
    </button>
  </div>
</template>
<style lang="less" scoped>
.mpl-radio-group {
  border: 1px solid #767676;
  background: buttonface;

  button {
    border-radius: 0;
    border: none;
    padding: 0 5px;
    &.is-active:hover {
      border: none;
      outline: none;
    }

    &:not(.is-active):hover {
      border: none;
      outline: none;
      background: rgb(30 30 30 / 10%)
    }
  }
}
</style>
