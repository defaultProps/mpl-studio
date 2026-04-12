<template>
  <VueDraggable v-if="limit.length" v-model="limit" :animation="300" handle=".mpl-baseInput-limit-sort-handler"
    tag="div">
    <FormItem v-for="(item, i) in limit" hidden-label>
      <button type="button" :class="{ 'is-active': item.value === activeLimit?.value }" class="mr-5 mpl-btn icon icon-edit5"
        @click="editMoreLimit(item)" />
      <button type="button" class="mr-5 mpl-btn mpl-baseInput-limit-sort-handler icon icon-drag" />
      <select v-model="item.value" class="mpl-select" @change="changeLimitItemValue(item.value)">
        <option v-for="p in limitInputOption" :disabled="limit.some(v => v.value === p.value)" :label="p.label"
          :value="p.value" :title="p.message" />
      </select>
      <button type="button" class="ml-5 mpl-btn del-btn icon icon-close" @click="removeLimit(item.value, i)" />
    </FormItem>
  </VueDraggable>
  <button type="button" class="mpl-btn plus-btn icon icon-plus mt-5" @click="addInputLimit">
    添加限制
  </button>
  <div v-if="activeLimit" class="mpl-sub-form-block">
    <FormItem label="校验代码">
      <InputNode v-model="activeLimit.meta.regexp" :disabled="!editable" />
      <button type="button" class="mpl-btn ml-5 icon" :class="editable ? 'icon-check' : 'icon-edit5'" @click="editable = !editable" />
    </FormItem>
  </div>
</template>
<script lang="ts" setup>
import { limitInputOption } from '@mpl/const'
import { VueDraggable } from 'vue-draggable-plus'
import FormItem from './FormItem.vue'
import { ref } from 'vue'
import InputNode from './InputNode.vue'

interface LimitItem {
  label: string
  value: string
  meta: any
}

const limit = defineModel<Array<LimitItem>>({ default: () => [] })
const activeLimit = ref<LimitItem | null>(null)
const editable = ref(false)

function removeLimit(val: string, i: number) {
  if (val === activeLimit.value?.value) {
    activeLimit.value = null
  }
  limit.value.splice(i, 1)
}

function editMoreLimit(item: LimitItem) {
  activeLimit.value = item
  editable.value = false
}

function changeLimitItemValue(val: string) {
  const obj = limitInputOption.find(v => v.value === val)
  if (activeLimit.value && obj) {
    activeLimit.value.label = obj.label
    activeLimit.value.meta = { ...obj.meta }
  }
}

function addInputLimit() {
  const values = limit.value.map(v => v.value)
  const obj = limitInputOption.find(v => !values.includes(v.value))
  editable.value = false

  if (obj) {
    limit.value.push({
      label: obj.label,
      value: obj.value,
      meta: { ...obj.meta }
    })
  }
}

</script>
