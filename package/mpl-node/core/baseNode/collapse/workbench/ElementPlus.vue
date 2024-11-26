<script lang="ts" setup>
import { ref } from 'vue'
import { CollapseProp } from '../define'

const props = defineProps<{ node: CollapseProp }>()
const activeNames = ref<string[]>([])
</script>

<template>
  <div class="mpl-collapse">
    <el-collapse v-model="activeNames" :accordion="props.node.accordion">
      <el-collapse-item v-for="p in props.node.options" :key="p.value" :title="p.title" :name="p.value">
        <el-empty description="请拖入控件" class="mpl-empty-collapse" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="less">
.mpl-collapse {
  width: 100%;
  height: 100%;
  overflow: auto;

  .el-collapse {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;

    .el-collapse-item {
      width: 100%;

      &.is-active {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        box-sizing: border-box;
        overflow: hidden;
        height: 100%;
      }
      .el-collapse-item__wrap {
        width: 100%;
        flex: 1;
      }
    }
  }

  .el-collapse-item__header {
    padding-left: 10px;
    box-sizing: border-box;
  }

  .el-empty.mpl-empty-collapse {
    padding: 0;

    .el-empty__image {
      width: 100px;
    }

    .el-empty__description {
      margin: 0;

      p {
        font-size: 12px;
      }
    }
  }
}
</style>
