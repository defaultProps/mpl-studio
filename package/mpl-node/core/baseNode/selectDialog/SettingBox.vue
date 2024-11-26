<script lang="ts" setup>
import { ref } from "vue";
import { watchDebounced } from "@vueuse/core";
import { SelectDialogFormProp } from "./define";

const props = defineProps<{ value: SelectDialogFormProp, isMobile: boolean }>();
const emit = defineEmits(["changeNode"]);
const activeNode = ref<SelectDialogFormProp>(props.value);

watchDebounced(activeNode.value, (val) => {
  emit("changeNode", val);
});

</script>

<template>
  <div class="right-bar-setting--box"></div>
</template>

<style lang="less" scoped>
.right-bar-setting--box {
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
}
</style>
