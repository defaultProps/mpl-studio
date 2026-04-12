<script setup lang="ts">
import { provide, ref, inject, onBeforeUnmount } from 'vue'
import InputNode from '../../../components/InputNode.vue'
import FormItem from '../../../components/FormItem.vue'
import { type DialogProp, dialogPaddingOptions } from './define'
import SliderNode from '../../../components/SliderNode.vue'
import SlotBtnGroup from '../../../components/SlotBtnGroup.vue'
import { watchDebounced } from '@vueuse/core'

const props = defineProps<{ value: DialogProp }>()
const activeNode = ref<DialogProp>(props.value)
const changeNode = inject('changeNode') as any

const stopWatcher = watchDebounced(activeNode.value, val => { changeNode(val) }, { debounce: 500 })

onBeforeUnmount(() => {
  stopWatcher()
})
</script>

<template>
  <div class="right-bar-dialog-setting--box">
    <FormItem :label="`宽度比例 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem label="唯一标识" :var="activeNode.cid" cid />
    <FormItem label="显示隐藏" :var="`mpl.dialog.${activeNode.cid}`" cid />
    <div class="mpl-divider">弹框顶部区域</div>
    <FormItem label="弹框顶部">
      <input v-model="activeNode.header.visible" type="checkbox" class="mpl-input">
    </FormItem>
    <template v-if="activeNode.header.visible">
      <FormItem label="标题" var="mpl.dialog.df4gt5.title">
        <InputNode v-model="activeNode.header.title" />
      </FormItem>
      <FormItem label="关闭按钮">
        <input v-model="activeNode.header.showClose" type="checkbox" class="mpl-input">
      </FormItem>
      <SlotBtnGroup v-model="activeNode.header.btnGroup" :cid="activeNode.cid" />
    </template>
    <div class="mpl-divider">弹窗内容区域</div>
    <FormItem label="高度">
      <InputNode v-model="activeNode.body.height" />
    </FormItem>
    <FormItem label="内间距">
      <select v-model="activeNode.body.padding" class="mpl-select">
        <option v-for="p in dialogPaddingOptions" :label="p.label + 'px'" :value="p.value" />
      </select>
    </FormItem>
    <div class="mpl-divider">弹框底部区域</div>
    <FormItem label="弹框底部">
      <input v-model="activeNode.footer.visible" type="checkbox" class="mpl-input">
    </FormItem>
    <template v-if="activeNode.footer.visible">
      <SlotBtnGroup v-model="activeNode.footer.btnGroup" :cid="activeNode.cid" />
    </template>
  </div>
</template>

<style lang="less" scoped>
.right-bar-dialog-setting--box {
  padding: 5px;
  box-sizing: border-box;

  .btn-setting-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    width: 100%;
  }

  .header-group {
    display: flex;
    height: 30px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
