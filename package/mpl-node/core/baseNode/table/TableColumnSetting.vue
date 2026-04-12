<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import InputNode from '../../../components/InputNode.vue'
import { getTableColumnUIOptions, tableColumnValueFormatOptions, newColumn } from './constant'
import type { TableColumn } from './define'
import { ref } from 'vue'
import FormItem from '../../../components/FormItem.vue'
import { viewStore } from '@mpl/store'
import TableColumnAllSetting from './TableColumnAllSetting.vue'
import RadioBtnGroup from '../../../components/RadioBtnGroup.vue'
import { textAlignPosition } from '../../../libs'
import { ElMessageBox } from 'element-plus'

const columns = defineModel<TableColumn[]>({ default: [] })
const { cid } = defineProps<{ cid: string }>()
const view = viewStore()
const columnUIOptions = getTableColumnUIOptions()

function addColumn() {
  columns.value.push(newColumn())
}

const activeColumn = ref<TableColumn | null>(null)

function handleSelectColumn(n: TableColumn) {
  if (!activeColumn.value || n.cid !== activeColumn.value.cid) {
    activeColumn.value = n
  }
}

function handleOpenTableAllColumnSetting() {
  view.$patch({
    subBoxSettingModel: 'tableColumnSetting',
    subBoxSettingModelId: cid
  })
  activeColumn.value = null
}

function removeColumn(cid: string, i: number) {
  if (activeColumn.value?.cid === cid) {
    activeColumn.value = null
  }
  columns.value.splice(i, 1)
}

function removeAllColumn() {
  ElMessageBox.confirm('移除所有列将无法恢复，确定继续吗？', '提示', { confirmButtonText: '确定', showClose: false, cancelButtonText: '取消', type: 'warning' }).then(() => {
    view.$patch({
      subBoxSettingModel: '',
      subBoxSettingModelId: ''
    })
    columns.value = []
    activeColumn.value = null
  })
}
</script>
<template>
  <div class="mpl-divider">表格列设置</div>
  <FormItem label="批量设置" flex-end>
    <button type="button" class="mpl-btn mr-5 icon icon-jurassic_setup"
      :class="{ 'is-active': view.subBoxSettingModel === 'tableColumnSetting' && view.subBoxSettingModelId === cid }"
      @click="handleOpenTableAllColumnSetting" />
    <button type="button" class="mpl-btn del-btn icon icon-close1" title="全部删除" @click="removeAllColumn" />
  </FormItem>
  <TableColumnAllSetting
    v-if="columns.length && view.subBoxSettingModel === 'tableColumnSetting' && view.subBoxSettingModelId === cid"
    v-model="columns" :cid="cid" />
  <VueDraggable v-if="columns.length" v-model="columns" handle=".mpl-tableColumn-sort-handler" :animation="300">
    <div v-for="(n, i) in columns" class="slot-btn-line">
      <button type="button" class="mpl-btn mr-5 icon icon-edit5" :class="{ 'is-active': activeColumn?.cid === n.cid }"
        @click="handleSelectColumn(n)" />
      <button type="button" class="mpl-btn mr-5 icon icon-drag mpl-tableColumn-sort-handler" />
      <InputNode v-model="n.label.text" class="mr-5 flex-1" style="width: 60px;" />
      <button type="button" class="mpl-btn del-btn icon icon-close1" @click="removeColumn(cid, i)" />
    </div>
  </VueDraggable>
  <button type="button" class="mpl-btn plus-btn icon icon-plus" @click="addColumn">
    添加列
  </button>
  <div v-if="activeColumn" class="mpl-sub-form-block">
    <FormItem label="标题">
      <InputNode v-model="activeColumn.label.text" />
    </FormItem>
    <FormItem label="标题位置">
      <RadioBtnGroup v-model="activeColumn.label.pos" :option="textAlignPosition" />
    </FormItem>
    <FormItem v-model="activeColumn.label.icon" label="标题图标" icon />
    <template v-if="activeColumn.label.icon">
      <FormItem label="图标颜色">
        <input v-model="activeColumn.label.iconTheme" type="color" class="mpl-input mr-5">
        <InputNode v-model="activeColumn.label.iconTheme" :readonly="true" />
      </FormItem>
      <FormItem var="mpl.rg5fv6.label.icon.info" label="图标信息">
        <InputNode v-model="activeColumn.label.iconText" />
        <button type="button" class="icon-in1 icon mpl-btn ml-5" />
      </FormItem>
    </template>
    <FormItem label="内容字段">
      <InputNode v-model="activeColumn.prop" />
    </FormItem>
    <FormItem label="内容组件">
      <select v-model="activeColumn.renderNode" class="mpl-select" disabled>
        <optgroup v-for="item in columnUIOptions" :label="item.label">
          <option v-for="p in item.children" :value="p.value">
            {{ p.label }}
          </option>
        </optgroup>
      </select>
      <button v-if="activeColumn.renderNode === 'c'" type="button" class="icon-select5 icon mpl-btn ml-5" disabled />
    </FormItem>
    <template v-if="activeColumn.renderNode !== 'c'">
      <FormItem label="内容数据格式">
        <select v-model="activeColumn.formatterType" class="mpl-select full-w">
          <option v-for="t in tableColumnValueFormatOptions" :label="t.label" :value="t.value" :title="t.title" />
        </select>
      </FormItem>
      <FormItem label="内容提示">
        <input v-model="activeColumn.showTip" type="checkbox" class="mpl-input">
      </FormItem>
      <FormItem label="内容位置">
        <RadioBtnGroup v-model="activeColumn.label.align" :option="textAlignPosition" />
      </FormItem>
    </template>
  </div>
</template>
<style lang="less" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  pointer-events: none;

  div {
    text-indent: 5px;
  }

  .title-1 {
    margin-left: 50px;
    width: 105px;
  }

  .title-2 {
    margin-left: 5px;
  }
}
</style>
