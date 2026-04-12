<script lang="ts" setup>
import type { BaseTableProp, TableColumn } from '../define'
import { inject, ref } from 'vue'

// import mplPagination from '../../pagination/workbench/ElementPlus.vue'
// 演示：文本、链接、按钮、按钮组、输入框、日期、弹框选择、文件上传、级联、图片展示
// 无操作按钮
const props = defineProps<{ node: BaseTableProp }>()
const updateNodeProp = inject('updateNodeProp') as any
const activeNode = ref<BaseTableProp>(props.node)

function blurTableHeader(e: any, column: TableColumn) {
  column.label.text = e.target.textContent
  updateNodeProp(activeNode.value.cid, { ...activeNode.value })
}

</script>

<template>
  <div class="mpl-table is-workbench" draggable="false" @dragover.stop.prevent @dragstart.stop.prevent
    @dragleave.stop.prevent @drop.stop.prevent @dragenter.stop.prevent>
    <div class="mpl-table-header-bar">
      <div class="left-tool-btn">
        <el-button v-for="btn in props.node.headerBtnGroup" :aria-theme="btn.theme">
          {{ btn.title }}
        </el-button>
      </div>
      <div
        v-if="props.node.auxiliaryBtnGroup.visible && props.node.auxiliaryBtnGroup.list.findIndex(s => s.visible) >= 0"
        class="auxiliary-table-btn">
        <template v-for="btn in props.node.auxiliaryBtnGroup.list">
          <button v-if="btn.value === 'size' && btn.visible" class="icon-chengkaidaohang icon" type="button" />
          <button v-if="btn.value === 'stripe' && btn.visible" class="icon-banmaxian icon" type="button" />
          <button v-if="btn.value === 'full' && btn.visible" class="icon-quanping1 icon" type="button" />
          <button v-if="btn.value === 'setting' && btn.visible" class="icon-setting1 icon" type="button" />
        </template>
      </div>
    </div>
    <el-table :stripe="props.node.stripe" :border="props.node.border"
      :data="props.node.service.staticData" :resizable="false" style="height: 100%">
      <el-table-column v-if="props.node.selectionMod !== ''" type="selection" width="55" />
      <el-table-column v-if="props.node.tableIndex.visible" type="index" width="60">
        <template #header>
          <span class="mpl-editable" contenteditable="true">
            序号
          </span>
        </template>
      </el-table-column>
      <!-- 所有列都没有时，自动添加一列空 -->
      <el-table-column v-else-if="props.node.columns.length === 0" label="" min-width="60" />
      <el-table-column v-for="column in props.node.columns" :prop="column.prop" :label="column.label.text"
        :width="column.label.width">
        <template #header>
          <span class="mpl-editable" contenteditable="true" @blur="blurTableHeader($event, column)">
            {{ column.label.text }}
          </span>
          <!-- 过滤 -->
          <el-icon v-if="column.label.filter.visible">
            <Filter />
          </el-icon>
          <!-- 排序 -->
          <el-icon v-if="column.label.sort.visible">
            <DCaret />
          </el-icon>
        </template>
        <template #default="scope">
          <!-- 点击文本变输入框，失去焦点变文本 -->
          <input :value="scope.row[column.prop]" class="mpl-editable">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="170" fixed="right">
        <el-button link size="small">
          编辑
        </el-button>
        <el-button link size="small" type="danger">
          删除
        </el-button>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 50]"
      :total="1000" />
    <!-- <mplPagination :node="props.node.pagination" /> -->
    <!-- 遮罩层 - 禁止操作表格 -->
    <!-- <div class="mask-table-workbench" /> -->
  </div>
</template>