<template>
  <VueDraggable v-if="limit.length" v-model="limit" :animation="300" handle=".mpl-baseInput-limit-sort-handler"
    tag="div">
    <FormItem v-for="(item, i) in limit" hidden-label>
      <button type="button" :class="{ 'is-active': item.value === activeLimit?.value }"
        class="mr-5 mpl-btn icon icon-edit5" @click="editMoreLimit(item)" />
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
  <button type="button" class="mpl-btn plus-btn icon icon-select5 ml-5" @click="addInputLimit">
    添加AI限制
  </button>
  <div v-if="activeLimit" class="mpl-sub-form-block">
    <MiniMonacoJs v-model="activeLimit.callback" style="width: 100%;height: 130px;"
      @change="changeLimitItemValue(activeLimit.callback)" />
    <button type="button" class="mpl-btn ml-5 icon icon-check" @click="openAIEditor" />
  </div>
</template>
<script lang="ts" setup>
import { limitInputOption } from '@mpl/const'
import { VueDraggable } from 'vue-draggable-plus'
import FormItem from './FormItem.vue'
import MiniMonacoJs from './MiniMonacoJs.vue'
import { ref } from 'vue'

interface LimitItem {
  label: string
  value: string
  callback: string
}

const limit = defineModel<Array<LimitItem>>({ default: () => [] })
const activeLimit = ref<LimitItem | null>(null)

function removeLimit(val: string, i: number) {
  if (val === activeLimit.value?.value) {
    activeLimit.value = null
  }
  limit.value.splice(i, 1)
}

function editMoreLimit(item: LimitItem) {
  activeLimit.value = item
}

function openAIEditor() {
  //
}

function changeLimitItemValue(val: string) {
  const obj = limitInputOption.find(v => v.value === val)
  if (activeLimit.value && obj) {
    activeLimit.value.label = obj.label
    activeLimit.value.callback = obj.callback
  }
}

function addInputLimit() {
  const values = limit.value.map(v => v.value)
  const obj = limitInputOption.find(v => !values.includes(v.value))

  if (obj) {
    limit.value.push({
      label: obj.label,
      value: obj.value,
      callback: obj.callback
    })
  }
}

</script>
