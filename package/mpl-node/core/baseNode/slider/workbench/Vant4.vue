<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { VISIBLE_NOTE } from '../../../../libs'
import { SliderFormProp } from '../define'

const props = defineProps<{ node: SliderFormProp }>()
const defaultValue = ref<number>(props.node.slider.model)

watch(
  () => props.node.slider.model,
  (value: any) => {
    defaultValue.value = value
  },
)

const visibleNote = inject(VISIBLE_NOTE, ref(false))
</script>

<template>
  <van-field :value="defaultValue" type="number" label-align="top" clearable class="mpl-no-pointer">
    <template #label>
      {{ props.node.label.text }}
      <mpl-note v-if="visibleNote"></mpl-note>
    </template>
    <template #input>
      <van-slider bar-height="4px" active-color="#196eff" v-model="defaultValue" />
    </template>
  </van-field>
</template>