<script lang="ts" setup>
import { inject, ref, onBeforeUnmount } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import type { NumberInputFormProp } from '../define'
import SlotRenderNode from '../../../../components/SlotRenderNode.vue'
import { watchDebounced } from '@vueuse/core'

const props = defineProps<{ node: NumberInputFormProp }>()
const inputValue = ref<string>(props.node.input.model || '')
const updateNodeProp = inject('updateNodeProp') as any

const stopWatcher = watchDebounced(() => inputValue, val => {
  updateNodeProp(props.node.cid, {
    input: {
      model: val
    }
  })
}, { debounce: 500 })

onBeforeUnmount(() => {
  stopWatcher()
})
</script>

<template>
  <el-form-item theme="mpl" :required="props.node.input.required" class="mpl-form-item" :cid="props.node.cid"
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
    <div class="mpl-content" :class="[formContentPosClassName.get(props.node.input.pos)]">
      <SlotRenderNode :nodes="props.node.slotNodes.filter(v => v.pos === 'l')" />
      <el-input-number v-model="inputValue" controls-position="right" class="mr-5" :autofocus="false"
        :show-word-limit="props.node.input.showLimit" :maxlength="props.node.input.maxlength"
        :style="{ width: props.node.input.width ? `${props.node.input.width}px` : '100%' }"
        :placeholder="props.node.input.placeholder" :clearable="props.node.input.clearable">
        <template v-if="props.node.input.prefixIcon" #prefix>
          <component :is="props.node.input.prefixIcon" style="width: 14px" />
        </template>
        <template v-if="props.node.input.suffixIcon" #suffix>
          <component :is="props.node.input.suffixIcon" style="width: 14px" />
        </template>
      </el-input-number>
      <SlotRenderNode :nodes="props.node.slotNodes.filter(v => v.pos === 'r')" />
    </div>
    <template #error>
      <div class="mpl-form-item-error">
        错误信息提示
      </div>
    </template>
  </el-form-item>
</template>