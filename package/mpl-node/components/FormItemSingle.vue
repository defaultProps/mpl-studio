<script setup lang="ts">
import { ref } from 'vue'

const isCopy = ref(false)
const visibleTooltip = ref(false)
const props = defineProps<{
  label?: string
  var?: string
}>()

function onCopy(text: string) {
  navigator.clipboard.writeText(text)
  isCopy.value = true
  setTimeout(() => {
    isCopy.value = false
  }, 300)
}
</script>

<template>
  <div class="form-item-single">
    <span v-if="props.var"
      v-tooltip.left="{ content: isCopy ? '已复制' : props.var, shown: visibleTooltip, triggers: [], autoHide: false }"
      class="label var" @mouseenter.stop="visibleTooltip = true" @mouseleave.stop="visibleTooltip = false"
      @click.stop="onCopy(props.var)">
      {{ props.label }}
    </span>
    <template v-else>
      {{ props.label }}
    </template>
    <slot />
  </div>
</template>