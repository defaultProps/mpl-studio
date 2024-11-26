<script lang="ts" setup>
  import { ref } from 'vue'
 import { CollapseProp } from './define'
  import FormItem from "../../../components/FormItem.vue";
  import SliderNode from "../../../components/SliderNode.vue";

  const props = defineProps<{ value: CollapseProp }>()
  const activeNode = ref<CollapseProp>(props.value)
</script>

<template>
  <div class="right-bar-collapse-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.w}`">
      <SliderNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <FormItem label="单面板展开" var="mpl.rg5fv6.collapse.accordion">
      <input type="checkbox" class="mpl-input" v-model="activeNode.accordion" />
    </FormItem>
    <div v-for="item in activeNode.options" :key="item.value" class="item-box">
      <button class="drag-btn icon icon-drag1" />
      <input v-model="item.title" class="mpl-input" size="small" />
      <button class="delete-btn icon icon-qingkongshanchu" />
    </div>
    <button class="mpl-btn icon icon-plus" />
  </div>
</template>

<style lang="less" scoped>
  .right-bar-collapse-setting--box {
    padding: 5px;
    font-size: 12px;
    box-sizing: border-box;

    .item-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .el-input {
        flex: 1;
        margin: 0 5px;
      }

      .el-checkbox {
        margin-right: 5px;
      }

      button {
        outline: 0;
        border: 0;
        background-color: transparent;
        font-size: 12px;
        color: var(--color-1);
        font-weight: 600;
        height: 22px;
        border-radius: 1px;
        width: 26px;
        text-align: center;

        +button {
          margin-left: 5px;
        }

        &.drag-btn:hover {
          background-color: #535353;
          color: var(--primary-color);
        }

        &.delete-btn {
          color: #c3002f;

          &:hover {
            background-color: #535353;
          }
        }
      }
    }
  }
</style>
