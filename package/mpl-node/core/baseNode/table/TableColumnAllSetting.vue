<script lang="ts" setup>
import { TableColumn } from './define'
import { getTableColumnUIOptions, newColumn } from './constant'
import SubSettingHeaderUI from '../../../components/SubSettingHeaderUI.vue'
import InputNode from '../../../components/InputNode.vue'
import InputNumber from '../../../components/InputNumber.vue'
import { VueDraggable } from 'vue-draggable-plus'
import { textAlignPosition } from '../../../libs'
import { ref } from 'vue'
import { ColumnUIType } from './define'

const columns = defineModel<TableColumn[]>({ default: [] })
const tableColumnFieldType = [
  { label: '标题', value: 'labelTitle' },
  { label: '控件', value: 'renderNode' },
  { label: '绑定字段', value: 'field' },
  { label: '列宽', value: 'labelWidth' },
  { label: '标题位置', value: 'labelPos' },
  { label: '内容位置', value: 'labelAlign' },
]
const multipleValue = ref<string>('') // 批量设置值
const multipleFieldType = ref<string>('labelTitle') // 批量设置控件类型

function addColumn() {
  columns.value.push(newColumn())
}

function removeColumn(i: number) {
  columns.value.splice(i, 1)
}

function multipleChange() {
  if(multipleFieldType.value === 'labelTitle') {
    columns.value.forEach(item => {
      item.label.text = multipleValue.value
    })
  }
  if(multipleFieldType.value === 'renderNode') {
    columns.value.forEach(item => {
      item.renderNode = multipleValue.value as ColumnUIType
    })
  }
  if(multipleFieldType.value === 'field') {
    columns.value.forEach(item => {
      item.prop = multipleValue.value
    })
  }
  if(multipleFieldType.value === 'labelWidth') {
    columns.value.forEach(item => {
      item.label.width = multipleValue.value === '' ? '' : +multipleValue.value
    })
  }
  if(multipleFieldType.value === 'labelPos') {
    columns.value.forEach(item => {
      item.label.pos = multipleValue.value as ('l' | 'c' | 'r')
    })
  }
}



</script>
<template>
  <div class="table-column-all-setting-sub-box">
    <SubSettingHeaderUI label="表格列设置" />
    <div class="lien-block">
      <div class="label">
        批量设置
      </div>
      <select v-model="multipleFieldType" class="mpl-select mr-5" style="max-width: 100px; min-width: 100px;">
        <option v-for="item in tableColumnFieldType" :label="item.label" :value="item.value" />
      </select>

      <!-- 标题 -->
      <template v-if="multipleFieldType === 'labelTitle'">
        <InputNode v-model="multipleValue" style="width: 100px; max-width: 100px" />
      </template>

      <!-- 控件 -->
      <template v-if="multipleFieldType === 'renderNode'">
        <select v-model="multipleValue" class="mpl-select" style="max-width: 100px; min-width: 100px;">
          <optgroup v-for="t in getTableColumnUIOptions()" :label="t.label">
            <option v-for="p in t.children" :label="p.label" :value="p.value" />
          </optgroup>
        </select>
      </template>
      <!-- 绑定字段 -->
      <template v-if="multipleFieldType === 'field'">
        <InputNode v-model="multipleValue" style="width: 100px; max-width: 100px" />
      </template>

      <!-- 列宽 -->
      <template v-if="multipleFieldType === 'labelWidth'">
        <InputNumber v-model="multipleValue" style="max-width: 100px; min-width: 100px;" />
      </template>

      <!-- 标题位置 -->
      <template v-if="multipleFieldType === 'labelPos'">
        <select v-model="multipleValue" class="mpl-select" style="width: 100px; max-width: 100px">
          <option v-for="t in textAlignPosition" :label="t.label" :value="t.value" />
        </select>
      </template>

      <!-- 内容位置 -->
      <template v-if="multipleFieldType === 'labelAlign'">
        <select v-model="multipleValue" class="mpl-select" style="max-width: 100px; min-width: 100px;">
          <option v-for="t in textAlignPosition" :label="t.label" :value="t.value" />
        </select>
      </template>
      <button type="button" class="mpl-btn ml-5 text-btn" @click="multipleChange">
        确定
      </button>
    </div>
    <div class="table-header">
      <span style="width: 108px;margin-left: 62px;">标题</span>
      <span style="width: 113px;">显示控件</span>
      <span style="width: 113px;">绑定字段</span>
      <span style="width: 113px;">列宽</span>
      <span style="width: 110px;">标题位置</span>
      <span style="width: 110px;">内容位置</span>
      <span style="width: 30px;">过滤</span>
      <span style="width: 108px">过滤组件</span>
      <button type="button" class=" mpl-btn del-btn icon icon-close1" />
    </div>
    <VueDraggable v-if="columns.length" v-model="columns" handle=".mpl-table-all-column-sort-handler" :animation="300">
      <div v-for="(n, i) in columns" class="slot-btn-line">
        <input type="checkbox" class="mpl-input">
        <button type="button" class="mpl-btn ml-5 mr-5 icon icon-drag mpl-table-all-column-sort-handler" />
        <InputNode v-model="n.label.text" class="mr-5 flex-1" style="min-width: 103px; max-width: 103px;" />
        <select v-model="n.renderNode" class="mpl-select mr-5" style="min-width: 103px; max-width: 103px;">
          <optgroup v-for="t in getTableColumnUIOptions()" :label="t.label">
            <option v-for="p in t.children" :label="p.label" :value="p.value" />
          </optgroup>
        </select>
        <InputNode v-model="n.prop" class="mr-5 flex-1" style="min-width: 103px; max-width: 103px;" />
        <InputNumber v-model="n.label.width" class="mr-5 flex-1" placeholder="默认自适应" style="min-width: 103px; max-width: 103px;" />
        <select v-model="n.label.pos" class="mpl-select mr-5" style="min-width: 103px; max-width: 103px;">
          <option v-for="t in textAlignPosition" :label="t.label" :value="t.value" />
        </select>
        <select v-model="n.label.align" class="mpl-select mr-5" style="min-width: 103px; max-width: 103px;">
          <option v-for="t in textAlignPosition" :label="t.label" :value="t.value" />
        </select>
        <input type="checkbox" class="mpl-input">
        <select v-model="n.label.align" class="mpl-select ml-5 mr-5" style="min-width: 103px; max-width: 103px;">
          <option v-for="t in textAlignPosition" :label="t.label" :value="t.value" />
        </select>
        <button type="button" class="mpl-btn del-btn icon icon-close1" @click="removeColumn(i)" />
      </div>
    </VueDraggable>
    <button type="button" class="mpl-btn plus-btn icon icon-plus ml-5 mt-5" @click="addColumn">
      添加列
    </button>
  </div>
</template>
<style lang="less" scoped>
.table-column-all-setting-sub-box {
  width: 900px;
  max-width: 900px;
  min-width: 900px;
  position: absolute;
  z-index: 100;
  right: 300px;
  top: 0;
  height: 100%;
  bottom: 0;
  overflow: hidden auto;
  border: 1px solid #ccc;
  background: #fff;

  .lien-block {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    height: 40px;

    .label {
      text-align: right;
      padding: 0 5px;
      box-sizing: border-box;
    }
  }

  header {
    display: flex;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .slot-btn-line {
    padding: 0 5px;
    box-sizing: border-box;
    border-bottom: 1px dashed #ccc;
  }
}
</style>