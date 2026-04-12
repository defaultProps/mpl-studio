<script lang="ts" setup>
import FormItem from './FormItem.vue'
import { ServiceTableBindNode } from '@mpl/typings'
import { serviceTypeOption } from '../libs/index'
import IdeJson from './subSettingBox/IdeJson.vue'
import { viewStore } from '@mpl/store'
import { useId } from 'vue'
import SubSettingHeaderUI from './SubSettingHeaderUI.vue'
import ServiceInterface from './subSettingBox/ServiceInterface.vue'
import { SERVICE_MODE } from '@mpl/const'

const props = defineProps<{ label: string }>()
const service = defineModel<ServiceTableBindNode>({
  default: {
    mode: SERVICE_MODE.STATIC,
    defaultValue: []
  }
})
const view = viewStore()
const id = useId()

function openSubSettingBox(model: SERVICE_MODE) {
  view.$patch({
    subBoxSettingModel: model === SERVICE_MODE.STATIC ? 'staticJSON' : 'serviceMode',
    subBoxSettingModelId: id
  })
}

function changeServiceMode() {
  view.$patch({
    subBoxSettingModel: '',
    subBoxSettingModelId: ''
  })
}
</script>

<template>
  <FormItem label="数据来源" :msg="service.mode === SERVICE_MODE.DYNAMICS ? '未绑定接口或该接口已失效' : ''">
    <select v-model="service.mode" class="flex-1 mpl-select" @change="changeServiceMode">
      <option v-for="item in serviceTypeOption" :value="item.value">
        {{ item.label }}
      </option>
    </select>
    <button type="button" class="mpl-btn ml-5 icon icon-select5" @click="openSubSettingBox(service.mode)" />
  </FormItem>
  <div v-if="view.subBoxSettingModel === 'staticJSON' && view.subBoxSettingModelId === id && service.mode === 'static'"
    class="service-sub-setting--box">
    <SubSettingHeaderUI label="静态数据设置" />
    <IdeJson v-model="service.staticData" />
  </div>
  <div
    v-else-if="view.subBoxSettingModel === 'serviceMode' && view.subBoxSettingModelId === id && service.mode === 'dynamics'"
    class="service-sub-setting--box">
    <SubSettingHeaderUI :label="props.label" />
    <ServiceInterface v-model="service.postman" />
  </div>
</template>
<style lang="less" scoped>
.service-sub-setting--box {
  width: 800px;
  height: 100%;
  position: absolute;
  right: 300px;
  top: 0;
  height: 100%;
  bottom: 0;
  z-index: 100;
  overflow: hidden auto;
  border: 1px solid #ccc;
  background: #fff;
  display: flex;
  flex-direction: column;
}
</style>