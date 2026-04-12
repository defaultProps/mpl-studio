<script lang="ts" setup>
import type { CollapseProp } from '../define'

const el = defineModel<CollapseProp>()
const props = defineProps<{ w: string | number, h: number | string }>()
</script>

<template>
  <template v-if="el">
    <el-collapse v-model="el.model" :accordion="el.accordion" :class="[`w-${props.w}`, `h-${props.h}`]">
      <el-collapse-item v-for="p in el.itemList" :key="p.value" :title="p.title" :name="p.value">
        <el-empty description="请拖入控件或点击" class="mpl-empty-collapse" />
      </el-collapse-item>
    </el-collapse>
  </template>
  <template v-else>
    组件数据参数错误
  </template>
</template>
