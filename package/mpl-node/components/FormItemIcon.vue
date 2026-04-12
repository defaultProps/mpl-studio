<script lang="ts" setup>
import FormItem from './FormItem.vue'

const icon = defineModel<string>('modelValue', { default: '' })

function cancelIcon() {
  icon.value = ''
}

</script>

<template>
  <FormItem label="图标">
    <div class="icon-select--line">
      <div class="selected-icon-box">
        <i class="mpl" :class="[icon]" />
        <span v-if="icon" class="btn icon icon-close1" @click="cancelIcon" />
      </div>
      <span class="right-btn icon icon-select5" />
    </div>
  </FormItem>
</template>

<style lang="less" scoped>
.icon-select--line {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;

  .selected-icon-box {
    margin-right: 65px;

    >i.icon {
      font-size: 20px;
    }

    .btn {
      margin-left: 2px;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      color: #ccc9;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: var(--radius-3);

      &:hover {
        background: #535353;

        i {
          color: var(--primary-color);
        }
      }
    }
  }

  .right-btn {
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color: #ccc9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-3);

    &:hover {
      background: #535353;

      i {
        color: var(--primary-color);
      }
    }
  }
}
</style>
