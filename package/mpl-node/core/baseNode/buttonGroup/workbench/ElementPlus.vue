<template>
  <el-button-group>
    <el-button type="primary">标题</el-button>
    <el-button type="primary">标题</el-button>
    <el-button type="primary">标题</el-button>
  </el-button-group>
</template>

<style lang="less" scoped>
  button.note-btn {
    height: 32px;
    line-height: 32px;
    user-select: none;

    &.mpl-primary-btn {
      position: relative;
      pointer-events: none;
      width: calc(100% - 10px);

      .mpl-btn--note.mpl-note[mpl='note'] {
        position: absolute;
        top: -9px;
        left: -5px;
        min-width: fit-content;
        background: var(--primary-color);
        padding: 2px 3px;
        color: var(--color-7);
        text-align: center;
        cursor: pointer;
      }

      span {
        overflow: hidden;
      }
    }
  }
</style>
