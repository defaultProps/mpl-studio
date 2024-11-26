<script lang="ts" setup>
import FormItem from './FormItem.vue';
import { ref } from "vue";

type Options = { label: string; value: string }

const props = withDefaults(defineProps<{ modelValue: string, ruleOption: Options[] }>(), {
  modelValue: '',
  option: () => []
})
const emit = defineEmits(["update:modelValue"]);
const modelInput = ref<string>(props.modelValue);

</script>
<template>
  <div class="mpl-rule-select form-block">
    <FormItem label="规则类型">
      <RadioBtnGroup :option="ruleOption" v-model="modelValue" />
    </FormItem>
  </div>
</template>