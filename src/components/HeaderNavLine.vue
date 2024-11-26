<template>
  <div class="header-popover-line">
    <div class="prefix-box">
      <slot name="prefix" />
    </div>
    <div class="title">
      <slot />
    </div>
    <div class="suffix-box">
      <slot name="suffix" />
    </div>
  </div>
</template>

<style scoped lang="less">
  .header-popover-line {
    width: 100%;
    cursor: default;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 5px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 28px;
    &.divider {
      border-bottom: 1px solid #d9d9d9;
    }
    &[aria-describedby] {
      background-color: var(--primary-color);
      color: var(--color-7);
    }
    &.disabled {
      cursor: not-allowed;
      color: #9ca3af;
    }
    .prefix-box {
      width: 20px;
    }
    .title {
      text-align: left;
      flex: 1;
      text-indent: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      user-select: none;
    }
    &:not(.disabled)&:hover {
      background: var(--primary-color);
      color: #f0f0f0;
    }
  }
</style>
