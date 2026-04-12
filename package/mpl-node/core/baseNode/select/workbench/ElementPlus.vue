<script lang="ts" setup>
import { inject, ref, onBeforeUnmount } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import SlotRenderNode from '../../../../components/SlotRenderNode.vue'
import { watchDebounced } from '@vueuse/core'
import { type SelectFormProp, getDefaultSelectOptions } from '../define'

const props = defineProps<{ node: SelectFormProp }>()
const selectValue = ref<string>(props.node.select.model || '')
const updateNodeProp = inject('updateNodeProp') as any

const stopWatcher = watchDebounced(() => selectValue, model => {
  updateNodeProp(props.node.cid, { input: { model } })
}, { debounce: 500 })

onBeforeUnmount(() => {
  stopWatcher()
})
</script>


<template>
  <el-form-item theme="mpl" :required="props.node.select.required" class="mpl-form-item" :cid="props.node.cid"
    :class="[{ 'mpl-none': !props.node.label.show, 'is-note': props.node.note.open }, labelPosWithClassName.get(props.node.label.pos)]"
    :label-width="props.node.label.width === 0 ? 80 : props.node.label.width">
    <template #label>
      <div v-show="props.node.label.show" class="mpl-label" @click.stop.prevent>
        <span class="mpl-label-editable">{{ props.node.label.text }}</span>
        <div v-if="props.node.label.icon" class="mpl-label-icon">
          <component :is="props.node.label.icon" :style="{ color: props.node.label.iconTheme }" />
        </div>
      </div>
    </template>
    <div class="mpl-content" :class="[formContentPosClassName.get(props.node.select.pos)]">
      <SlotRenderNode :nodes="props.node.slotNodes.filter(v => v.pos === 'l')" />
      <el-select v-model="selectValue" popper-class="mpl-select-popper" class="mr-5"
        :style="{ width: props.node.select.width ? `${props.node.select.width}px` : '100%' }"
        :placeholder="props.node.select.placeholder" :clearable="props.node.select.clearable" style="user-select: none">
        <el-option v-for="(p, index) in getDefaultSelectOptions()" v-show="props.node.select.service.mode === 'static'"
          :key="index" :label="p.label" :value="p.value" />
        <template #empty>
          <div class="service-dynamic">
            动态数据，预览生效
          </div>
        </template>
      </el-select>
      <SlotRenderNode :nodes="props.node.slotNodes.filter(v => v.pos === 'r')" />
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
</template>

<style lang="less">
.mpl-select-popper .service-dynamic {
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  user-select: none;
  color: #1E1E1E;
  font-size: 14px;
}
</style>
