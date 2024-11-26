<script setup lang="ts">
  import { ref } from 'vue'
  import IconSelect from './IconSelect.vue'

  const props = defineProps<{
    label?: string
    var?: string
    placement?: string
    modelValue?: string // 图标
    icon?: boolean // 图标类型
  }>()
  const emit = defineEmits(['change', 'update:modelValue'])
  const selectIcon = ref<string>(props.modelValue || '')
  const visibleSelectIcon = ref<boolean>(false)
  const isClipboard = ref<boolean>(false)
  function onCopy(text?: string) {
    navigator.clipboard.writeText(text || '')
    isClipboard.value = true

    setTimeout(() => {
      isClipboard.value = false
    }, 300)
  }

  function changeIcon(icon: string) {
    visibleSelectIcon.value = false
    selectIcon.value = icon
    emit('change', icon)
    emit('update:modelValue', icon)
  }

  function cancelIcon() {
    visibleSelectIcon.value = false
  }
</script>

<template>
  <div class="form-item-node">
    <div class="form-item--label" @click.stop="onCopy(props.var)">
      <span v-if="props.var" class="label var">
        <el-tooltip class="box-item" effect="dark" :placement="props.placement || 'left'" :show-after="300">
          <template #content>
            <span class="tooltip-copy-text">{{ isClipboard ? '已复制' : props.var }}</span>
          </template>
          <span class="label">{{ props.label }}</span>
        </el-tooltip>
      </span>
      <span v-else class="label">{{ props.label }}</span>
    </div>
    <div class="form-item--content">
      <div v-if="props.icon" class="icon-select-line">
        <IconSelect v-if="visibleSelectIcon" v-model="selectIcon" @change="changeIcon" @cancel="cancelIcon" />
        <span class="model-icon">
          <i class="icon icon-icon" :class="props.modelValue" />
          <button v-if="props.modelValue" class="mpl-btn icon icon-close1" @click="changeIcon('')" />
        </span>
        <button class="mpl-btn edit-btn icon icon-select5" @click="visibleSelectIcon = true" />
      </div>
      <slot v-else />
    </div>
  </div>
</template>

<style lang="less">
  .form-item-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #000;
    height: 28px;
    user-select: none;
    width: 100%;
    --el-checkbox-input-height: 18px;
    --el-checkbox-input-width: 18px;

    .el-checkbox__inner::after {
      border: 2px solid transparent;
      height: 8px;
      left: 4px;
      top: 0px;
      border-left: 0;
      border-top: 0;
    }

    .form-item--label {
      width: 80px;
      text-align: left;
      padding-right: 5px;
      box-sizing: border-box;
      cursor: default;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .label {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        width: fit-content;
      }
    }

    .el-color-picker__trigger {
      border-radius: 0;
      padding: 2px;
      width: 50px;
      height: 20px;
    }

    .el-color-picker__color,
    .el-color-picker__color-inner {
      border-radius: 0;

      svg {
        display: none;
      }
    }

    .el-color-picker__color {
      padding: 2px;
      box-sizing: border-box;
      background: transparent;
    }

    .el-checkbox {
      cursor: default;
    }

    .el-slider {
      border-radius: 0;
      margin-right: 15px;

      .el-slider__button {
        width: 12px;
        height: 12px;
        border-radius: 0;
        border: 1px solid var(--primary-color);
      }

      .el-slider__runway {
        border-radius: 0;
      }

      .el-slider__bar {
        border-radius: 0;
        background-color: var(--primary-color);
      }
    }

    .form-item--content {
      flex: 1;
      max-width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      &.flex-end {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      &.flex-sp {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .icon-select-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .mpl-icon {
          font-size: 20px;
          color: var(--color-7);
        }
      }

      .el-radio-button--small .el-radio-button__inner {
        padding: 5px 6px;
        color: var(--color-3);
      }

      .el-radio-button:first-child .el-radio-button__inner,
      .el-radio-button:last-child .el-radio-button__inner {
        border-radius: 0;
      }

      .el-input-number.is-controls-right .el-input__wrapper {
        padding: 0 8px;
      }

      .el-color-picker.is-disabled {
        opacity: 0.4;
      }

      .el-color-picker__mask {
        background-color: transparent;
      }

      .el-link {
        cursor: default;
      }

      .c-p {
        color: #ccc9;

        &:hover {
          color: var(--primary-color);
        }
      }

      .icon-select i {
        font-size: 14px;
      }

      &.flex-sb {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &.flex-end {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      .icon-setting-btn {
        padding: 0;
        margin-left: 10px;

        img {
          width: 20px;
        }
      }

      .w-f {
        width: 100%;
      }

      .el-input {
        .el-input__wrapper {
          background: #535353;
          box-shadow: none;
          border-radius: 0;

          &::after {
            position: absolute;
            content: '';
            left: 0;
            right: 0;
            bottom: 0;
            height: 2px;
            width: 100%;
            box-shadow: none;
            background-color: var(--primary-color);
            transform: scaleX(0);
            transition: transform 0.5s ease-in-out;
            transform-origin: bottom right;
          }

          &.is-focus {
            &::after {
              transform-origin: bottom left;
              transform: scaleX(1);
            }
          }

          input.el-input__inner {
            color: var(--color-7);
          }

          .el-input__count .el-input__count-inner {
            background-color: transparent;
          }
        }
      }

      .el-checkbox {
        .el-checkbox__input {
          cursor: default;

          &.is-checked .el-checkbox__inner {
            background: var(--primary-color);
            border-color: var(--primary-color);
          }

          .el-checkbox__inner {
            background-color: var(--color-7);

            &:hover {
              border-color: transparent;
            }
          }
        }
      }

      .el-radio-button__original-radio:disabled+.el-radio-button__inner {
        pointer-events: none;
        color: var(--color-1);
      }

      // 单选组件
      .el-radio-button__original-radio:checked+.el-radio-button__inner {
        box-shadow: none;
        color: var(--color-7);
      }

      // 数字输入框
      .el-input-number.is-controls-right .el-input-number__decrease,
      .el-input-number.is-controls-right .el-input-number__increase {
        display: none;
        // background-color: transparent;
        // color: var(--color-7);
        // cursor: default;
        // border: none;
        // &:hover {
        //   color: var(--primary-color);
        // }
      }

      .el-input-number.is-controls-right .el-input__wrapper {
        padding-right: 15px;

        .el-input__inner {
          text-align: left;
        }
      }
    }
  }
</style>
