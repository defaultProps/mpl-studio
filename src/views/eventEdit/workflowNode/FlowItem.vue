<script setup lang="ts">
const props = defineProps<{
  label?: string
  size?: string,
  isLabel?: boolean
}>()

</script>

<template>
  <div class="line-box" :class="{ 'line-box__small': props.size === 'small', 'is-label': props.isLabel }">
    <div v-if="props.label" class="label">
      {{ props.label }}：
    </div>
    <div class="content" :class="{ 'flex-center': !props.label }">
      <slot />
    </div>
  </div>
</template>
<style lang="less" scoped>
.line-box {
  height: 30px;

  &.line-box__small {
    height: 18px;
  }

  &.is-label {
    align-items: center;

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>