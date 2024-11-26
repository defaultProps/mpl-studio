<script lang="ts" setup>
const props = defineProps<{ title: string }>()
</script>

<template>
  <div class="mpl-card-component--container">
    <div class="mpl-card--box" style="flex: 1">
      <div class="mpl-title">
        <img src="https://cn.vitejs.dev/logo-with-shadow.png" alt="">
        {{ props.title }}
      </div>
      <div class="mpl-content__body">
        <slot />
      </div>
    </div>
    <div class="mpl-card--box setting--box">
      <div class="mpl-title">
        <img src="https://cn.vitejs.dev/logo-with-shadow.png" alt="">
        配置 - {{ props.title }}
        <div class="mpl-right-btn--group">
          <slot name="btn" />
        </div>
      </div>
      <div class="mpl-content__body">
        <slot name="setting" />
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import url('./theme.less');

.mpl-card-component--container {
  margin: 10px 0 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 12px;
  padding-right: 10px;

  .mpl-card--box {
    border: 1px solid var(--color-1);
    font-size: 12px;
    background-color: var(--color-7);

    &.setting--box {
      min-width: 450px;
      max-width: 450px;
      width: 450px;
      margin-left: 10px;

      .el-radio-group {
        .el-radio-button.is-disabled {
          cursor: not-allowed;
        }

        .el-radio-button__original-radio:checked+.el-radio-button__inner {
          background-color: var(--primary-color);
          border-color: var(--primary-color);

          &:hover {
            color: var(--color-7);
          }
        }

        .el-radio-button__inner {
          cursor: default;

          &:hover {
            color: var(--primary-color);
          }
        }
      }

      .el-checkbox__inner:hover {
        border-color: var(--primary-color);
      }

      .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
      }

      .mpl-form-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 35px;

        .mpl-label {
          margin-right: 10px;
        }

        h3 {
          margin-block-start: 0;
          margin-block-end: 0;
          font-size: 14px;
          padding: 4px 0;
        }
      }
    }

    .mpl-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 40px;
      padding-left: 5px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 600;
      color: #606266;
      background-color: #ebeef5;
      border-bottom: 1px solid var(--color-1);
      position: relative;

      img {
        height: 20px;
        margin-right: 5px;
      }

      .mpl-right-btn--group {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 200px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 10px;
      }
    }

    .mpl-content__body {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      height: 300px;
      overflow: hidden auto;
      &::-webkit-scrollbar {
        width: 0;
      }

      .component-setting {
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }

  .mr-10 {
    margin-right: 10px;
  }
}
</style>
