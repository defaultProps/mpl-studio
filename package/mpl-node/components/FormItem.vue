<script setup lang="ts">
  import { ref } from "vue";
  import IconSelect from "./IconSelect.vue";
  import LayoutSelect from "./LayoutSelect.vue";
  import RadioBtnGroup from "./RadioBtnGroup.vue";
  import { layouts } from "@mpl/node";

  const props = defineProps<{
    label?: string;
    var?: string;
    placement?: string;
    modelValue?: string; // 图标
    icon?: boolean; // 图标类型
    layout?: boolean; // 排版类型
    service?: boolean; // 服务类型
    serviceType?: string; // 服务值
    initVal?: boolean // v-model绑定初始值
  }>();
  const emit = defineEmits(["change", "update:modelValue", "update:serviceType"]);
  const modelValue = ref<string>(props.modelValue || "");
  const visibleSelectIcon = ref(false);
  const visibleLayoutSelect = ref(false);
  const currentServiceType = ref("static");
  const isCopy = ref(false)

  // 复制操作
  function onCopy(text: string) {
    navigator.clipboard.writeText(text);
    isCopy.value = true
    setTimeout(() => {
      isCopy.value = false
    }, 300);
  }

  function changeIcon(icon: string) {
    visibleSelectIcon.value = false;
    modelValue.value = icon;
    emit("change", icon);
    emit("update:modelValue", icon);
  }

  function cancelIcon() {
    visibleSelectIcon.value = false;
  }

  function formatLayoutLabel(val: string): string {
    let str = ''

    layouts.find(v => {
      const index = v.category.findIndex(v => v.value == val)

      if (index >= 0) {
        str = `${v.label}[${val}]`
      }
    })

    return str
  }

  function changeLayout(layout: string) {
    layouts.find(v => {
      const index = v.category.findIndex(v => v.value == layout)

      if (index >= 0) {
        modelValue.value = `${v.label}[${layout}]`
      }
    })
    visibleLayoutSelect.value = false;
    modelValue.value = layout
    emit("change", layout);
    emit("update:modelValue", layout);
  }

  function cancelLayout() {
    visibleLayoutSelect.value = false;
  }
</script>

<template>
  <div class="form-item-node">
    <div class="form-item--label">
      <el-tooltip v-if="props.var" effect="dark" placement="left" :show-arrow="false">
        <template #content>{{ isCopy ? '已复制' : props.var }}</template>
        <span class="label var" @click.stop="onCopy(props.var)">
          {{ props.label }}
        </span>
      </el-tooltip>
      <span v-else class="label">{{ props.label }}</span>
    </div>
    <div class="form-item--content">
      <div v-if="props.icon" class="icon-select-line">
        <IconSelect v-if="visibleSelectIcon" v-model="modelValue" @change="changeIcon" @cancel="cancelIcon" />
        <span class="mpl-icon-view icon" :class="props.modelValue" />
        <button v-if="props.modelValue" class="mpl-btn mr-5 del-btn icon icon-close1" @click="changeIcon('')" />
        <button class="mpl-btn edit-btn icon icon-select5" @click="visibleSelectIcon = true" />
      </div>
      <div v-else-if="props.layout" class="layout-line">
        <LayoutSelect v-if="visibleLayoutSelect" v-model="modelValue" @change="changeLayout" @cancel="cancelLayout" />
        <div class="label">
          {{ formatLayoutLabel(modelValue) }}
        </div>
        <button v-if="props.modelValue && !props.layout" class="mpl-btn mr-5 del-btn icon icon-close1"
                @click="changeIcon('')" />
        <button class="mpl-btn edit-btn icon icon-select5" @click="visibleLayoutSelect = true" />
      </div>
      <template v-else-if="props.service">
        <RadioBtnGroup v-model="currentServiceType" style="flex: 1" :option="[]"
                       @update="emit('update:serviceType', currentServiceType)" />
        <slot />
      </template>
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
      color: #000;
      cursor: default;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .el-tooltip__trigger {
        text-decoration: underline;
      }

      .label {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        width: fit-content;
        position: relative;

        &.var {
          text-decoration: underline;
          cursor: pointer;
        }

        &.var:hover {
          color: var(--primary-color);
        }
      }

      &[var] .label {
        text-decoration: underline;
        position: relative;
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

        .mpl-icon-view {
          font-size: 16px;
          color: var(--color-2);
          flex: 1;
          display: flex;
          text-align: left;
          align-items: center;
          height: 20px;
          justify-content: flex-start;

          svg {
            fill: #000;
            width: 18px;
            height: 18px;
          }
        }
      }

      .layout-line {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .label {
          flex: 1;
          color: var(--color-2);
          font-weight: 600;
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
