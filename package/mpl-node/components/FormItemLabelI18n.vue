<script setup lang="ts">
import { ref, useId } from 'vue'
import { viewStore, userStore } from '@mpl/store'
import InputNode from './InputNode.vue'
import I18nSub from './subSettingBox/I18nSub.vue'
import FormItem from './FormItem.vue'

const user = userStore()
const view = viewStore()
const emit = defineEmits(['blur'])
const id = useId()
const props = defineProps<{
  label: string
  var?: string
}>()
const labelText = defineModel<string>({default: ''})

function handleSelectI18n() {
  view.$patch({
    subBoxSettingModel: 'i18n',
    subBoxSettingModelId: id
  })
}

function handleBlurLabel() {
  emit('blur')
}

</script>

<template>
  <FormItem :label="props.label" :var="props.var || ''">
    <InputNode v-model="labelText" @blur="handleBlurLabel" />
    <button v-if="user.authority === 'enterprise'" class="icon-in1 icon mpl-btn ml-5" type="button"
      :class="{ 'is-active': view.subBoxSettingModel === 'i18n' && view.subBoxSettingModelId === id }"
      @click="handleSelectI18n" />
    <I18nSub v-if="view.subBoxSettingModel === 'i18n' && view.subBoxSettingModelId === id" v-model="labelText" />
  </FormItem>
</template>