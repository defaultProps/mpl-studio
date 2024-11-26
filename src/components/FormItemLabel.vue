<script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps<{
    variable?: string
    placement?: string
  }>()
  const isClipboard = ref<boolean>(false)

  function onCopy(text?: string) {
    navigator.clipboard.writeText(text || '')
    isClipboard.value = true

    setTimeout(() => {
      isClipboard.value = false
    }, 300)
  }
</script>

<template>
  <div class="mpl-form-item--label" @click.stop="onCopy(props.variable)">
    <span v-if="props.variable" class="label">
      <el-tooltip class="box-item" effect="dark" :placement="props.placement || 'left'" :show-after="300"
                  :show-arrow="false">
        <template #content>
          <span class="tooltip-copy-text">{{
            isClipboard ? '已复制' : props.variable
          }}</span>
        </template>
        <span class="label">
          <slot />
        </span>
      </el-tooltip>
    </span>
    <slot v-else />
  </div>
</template>

<style lang="less" scoped>
  .mpl-form-item--label {
    width: 100%;
    text-align: left;
    padding-right: 5px;
    box-sizing: border-box;
    color: var(--color-1);
    cursor: default;

    .label {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      width: fit-content;
    }

    &[variable] .label {
      text-decoration: underline var(--primary-color);
    }
  }
</style>
