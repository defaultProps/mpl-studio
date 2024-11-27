<template>
  <el-tree :data="data" :props="defaultProps" />
</template>

<script lang="ts" setup>
  interface Tree {
    label: string
    value: string
    children?: Tree[]
  }

  const data: Tree[] = [
    {
      label: '容器类',
      value: 'mpl-container',
      children: [
        { label: '基础容器', value: 'mpl-base-box' },
        { label: '弹窗', value: 'mpl-dialog' },
        { label: '抽屉', value: 'mpl-drawer' },
        { label: '折叠面板', value: 'mpl-collapse' },
        { label: '卡片', value: 'mpl-card' },
      ],
    },
    {
      label: '表单类',
      value: 'mpl-form',
      children: [
        { label: '基础输入', value: 'mpl-bas-input' },
        { label: '密码输入', value: 'mpl-password' },
        { label: '下拉菜单', value: 'mpl-select' },
        { label: '日期范围', value: 'mpl-dat-picker-range' },
        { label: '滑块', value: 'mpl-slider' },
      ],
    },
  ]

  const defaultProps = {
    children: 'children',
    label: 'label',
  }
</script>

<style lang="less">
  .el-tree {
    width: 100%;
    height: 100%;
    color: #333;
    overflow: auto;
  }
</style>
