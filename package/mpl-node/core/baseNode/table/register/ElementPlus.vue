<script lang="ts" setup>
import type { BaseTableProp } from '../define'

const el = defineModel<BaseTableProp>()
const props = defineProps<{ w: string | number, h: number | string }>()
</script>

<template>
  <template v-if="el">
    <div class="mpl-table">
      <div class="mpl-table-header-bar">
        <div class="left-tool-btn">
          <el-button v-for="btn in el.headerBtnGroup" :aria-theme="btn.theme">
            {{ btn.title }}
          </el-button>
        </div>
        <div v-if="el.auxiliaryBtnGroup.visible && el.auxiliaryBtnGroup.list.findIndex(s => s.visible) >= 0"
          class="auxiliary-table-btn">
          <template v-for="btn in el.auxiliaryBtnGroup.list">
            <button v-if="btn.value === 'size' && btn.visible" class="icon-chengkaidaohang icon" type="button" />
            <button v-if="btn.value === 'stripe' && btn.visible" class="icon-banmaxian icon" type="button" />
            <button v-if="btn.value === 'full' && btn.visible" class="icon-quanping1 icon" type="button" />
            <button v-if="btn.value === 'setting' && btn.visible" class="icon-setting1 icon" type="button" />
          </template>
        </div>
      </div>
      <el-table stripe border :data="JSON.parse(el.service.staticData)" :resizable="false" style="height: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column v-if="el.tableIndex.visible" type="index" width="60" label="序号" />
        <!-- 所有列都没有时，自动添加一列空 -->
        <el-table-column v-else-if="el.columns.length === 0" label="" min-width="60" />
        <el-table-column v-for="column in el.columns" :prop="column.prop" :label="column.label.text"
          :width="column.label.width">
          <template #default="scope">
            <div :title="column.label.text" class="pure-line-text">
              {{ scope.row[column.prop] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170">
          <button class="table-op-btn mr-5" type="button">
            编辑
          </button>
          <button class="table-op-btn del-btn" type="button">
            删除
          </button>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 50]"
        :total="1000" />
      <!-- <mplPagination :node="el.pagination" /> -->
      <!-- 遮罩层 - 禁止操作表格 -->
      <!-- <div class="mask-table-workbench" /> -->
    </div>
  </template>
</template>
