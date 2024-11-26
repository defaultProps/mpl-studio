<script setup lang="ts">
import { ref} from 'vue'
type Options = { label: string; value: string }

// const modelInput = defineModel()
const props = withDefaults(defineProps<{ modelValue: string | string[], option: Options[], checkbox?: boolean }>(), {
  modelValue: '',
  option: () => []
})
const emit = defineEmits(["update:modelValue"]);
const modelInput = ref<string | string[]>(props.modelValue);

function changeOpt(val: string) {
  if (props.checkbox && Array.isArray(modelInput.value)) {
    const index = modelInput.value.indexOf(val)
    if (index === -1) {
      modelInput.value.push(val)
    } else {
      modelInput.value.splice(index, 1)
    }
  } else {
    modelInput.value = val
  }
  console.log(modelInput.value, props.checkbox, Array.isArray(modelInput.value))
  emit("update:modelValue", modelInput.value);
}
</script>

<template>
  <div class="mpl-radio-group">
    <button v-for="opt in props.option" :key="opt.value" class="mpl-btn ml-5"
      :class="{ 'is-active': props.checkbox ? modelInput.includes(opt.value) : modelInput === opt.value }"
      @click="changeOpt(opt.value)">
      {{ opt.label }}
    </button>
  </div>
</template>