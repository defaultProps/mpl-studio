<script lang="ts" setup>
import { ref, inject, onBeforeUnmount } from 'vue'
import FormItem from '../../../components/FormItem.vue'
import SliderNode from '../../../components/SliderNode.vue'
import SlotBtnGroup from '../../../components/SlotBtnGroup.vue'
import { BaseTableProp } from './define'
import TableColumnSetting from './TableColumnSetting.vue'
import NestedColumn from './NestedColumn.vue'
import InputNode from '../../../components/InputNode.vue'
import ServiceSetting from '../../../components/ServiceSetting.vue'
import { watchDebounced } from '@vueuse/core'
import FormItemSingle from '../../../components/FormItemSingle.vue'
import RadioBtnGroup from '../../../components/RadioBtnGroup.vue'

const props = defineProps<{ value: BaseTableProp }>()
const activeNode = ref<BaseTableProp>(props.value)
const changeNode = inject('changeNode') as any
const selectionModOption = [
  { label: '默认', value: '' },
  { label: '单选', value: 'radio' },
  { label: '多选', value: 'checkbox' }
]

const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

onBeforeUnmount(() => {
  stopWatcher()
})

</script>

<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem label="显示隐藏" :var="`mpl.var.${activeNode.cid}_visible`" cid />
    <FormItemSingle label="数据行选项">
      <RadioBtnGroup v-model="activeNode.selectionMod" :option="selectionModOption" />
    </FormItemSingle>
    <FormItem v-if="activeNode.selectionMod !== ''" label="选项禁用字段">
      <InputNode v-model="activeNode.selectionModField" />
    </FormItem>
    <FormItem label="边框">
      <input v-model="activeNode.border" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="斑马纹UI">
      <input v-model="activeNode.stripe" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="序号列">
      <input v-model="activeNode.tableIndex.visible" type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem v-if="activeNode.tableIndex.visible" label="序号列定位">
      <select v-model="activeNode.tableIndex.fixed" class="mpl-select">
        <option value="">
          默认
        </option>
        <option value="l">
          固定左侧
        </option>
        <option value="r">
          固定右侧
        </option>
      </select>
    </FormItem>
    <div class="mpl-divider">辅助按钮设置</div>
    <SlotBtnGroup v-model="activeNode.headerBtnGroup" :cid="activeNode.cid" />
    <div class="mpl-divider">表头辅助功能设置</div>
    <FormItem label="显示辅助功能">
      <input v-model="activeNode.auxiliaryBtnGroup.visible" type="checkbox" class="mpl-input">
    </FormItem>
    <template v-if="activeNode.auxiliaryBtnGroup.visible">
      <template v-for="item in activeNode.auxiliaryBtnGroup.list">
        <FormItem :label="item.label">
          <input v-model="item.visible" type="checkbox" class="mpl-input">
        </FormItem>
      </template>
    </template>
    <div class="mpl-divider">数据配置</div>
    <FormItem label="数据赋值" :var="`mpl.var.table.${activeNode.cid}_list`" cid />
    <ServiceSetting v-model="activeNode.service" label="表格-数据接口服务设置" />
    <TableColumnSetting v-model="activeNode.columns" :cid="activeNode.cid" />
    <div class="mpl-divider">多级表头-拖拽层级</div>
    <NestedColumn v-if="activeNode.columns.length" v-model="activeNode.columns" class="nested-column-wrapper" />
    <div class="mpl-divider">分页配置</div>
  </div>
</template>
<style scoped lang="less">
.nested-column-wrapper {
  position: relative;
  padding: 5px 0 5px 10px;
  box-sizing: border-box;
  margin: 5px 0;
  border-radius: 3px;
  outline: 1px solid #666;

  &::after {
    content: '';
    position: absolute;
    z-index: -3;
    background: #f6f8fa;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>