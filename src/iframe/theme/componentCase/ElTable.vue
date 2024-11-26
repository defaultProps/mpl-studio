<script lang="ts" setup>
import { ref } from 'vue'
import CardBox from '../CardBox.vue'

const tableData = ref<any[]>([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: '深圳市'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: '深圳市'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: '深圳市'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: '深圳市'
  }
])
</script>

<template>
  <CardBox title="基础表格">
    <el-table :data="tableData">
      <el-table-column
        prop="date"
        label="Date"
        width="180"
      />
      <el-table-column
        prop="name"
        label="Name"
        width="180"
      />
      <el-table-column
        prop="address"
        label="Address"
      />
    </el-table>
    <template #setting>
      none
    </template>
  </CardBox>
</template>
