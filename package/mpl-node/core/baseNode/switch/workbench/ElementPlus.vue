<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formContentPosClassName, labelPosWithClassName } from '../../../../libs'
import { SwitchFormProp, SwitchNode } from '../define'

const props = defineProps<{ node: SwitchFormProp }>()
const mplSwitch = ref<SwitchNode>(props.node.switch)
const switchValue = ref<boolean>(props.node.switch.model)

watch(
  () => props.node.switch.model,
  (value: any) => {
    switchValue.value = value
  },
)
</script>

<template>
  <el-form-item theme="mpl" :required="mplSwitch.required" class="mpl-form-item" :cid="props.node.cid"
    :class="[{ 'mpl-none': !props.node.label.show }, labelPosWithClassName.get(props.node.label.pos)]"
    :label-width="props.node.label.width === 0 ? 80 : props.node.label.width">
    <template #label>
      <div v-show="props.node.label.show" class="mpl-label">
        <span :title="props.node.label.text">
          {{ props.node.label.text }}
        </span>
        <div v-if="props.node.label.icon" class="mpl-label-icon">
          <i class="mpl icon" :class="[props.node.label.icon]" :style="{ color: props.node.label.iconTheme }" />
        </div>
      </div>
    </template>
    <div class="mpl-content" :class="[formContentPosClassName.get(mplSwitch.pos)]">
      <el-switch v-model="switchValue" />
    </div>
  </el-form-item>
</template>
