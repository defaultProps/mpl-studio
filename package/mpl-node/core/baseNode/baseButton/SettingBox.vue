<script lang="ts" setup>
  import { ref } from 'vue'
  import { newCid } from '@mpl/const'
  import FormItem from '../../../components/FormItem.vue'
  import InputNode from '../../../components/InputNode.vue'
  import { ButtonProp } from './define'
  import { workbenchStore } from '@mpl/store'

  const props = defineProps<{ value: ButtonProp }>()
  const activeNode = ref<ButtonProp>(props.value)
  const workbench = workbenchStore()
  function handleRemoveClickName() {
    workbench.singleEventReduce(activeNode.value.clickName)
    activeNode.value.clickName = ''
  }

  function addClickName() {
    if (activeNode.value.clickName) {
      // todo
      // 画板底部显示当前组件的事件IDE可视化
    }
    else {
      const clickName = `mplBaseBtnClick_${newCid()}`
      activeNode.value.clickName = clickName
      workbench.singleEventPlus({
        name: clickName,
        code: '',
        type: 'flow',
        desc: '基础按钮 - 点击事件',
      })
    }
  }

  function handleRemoveVisibleName() {
    workbench.singleEventReduce(activeNode.value.visibleName)
    activeNode.value.visibleName = ''
  }

  function addVisibleName() {
    if (activeNode.value.visibleName) {
      // todo
      // 画板底部显示当前组件的事件IDE可视化
    }
    else {
      const visibleName = `mplBaseBtnVisible_${newCid()}`
      activeNode.value.visibleName = visibleName
      workbench.singleEventPlus({
        name: visibleName,
        code: '',
        type: 'flow',
        desc: '基础按钮 - 点击事件',
      })
    }
  }

  function handleRemoveDisabledName() {
    workbench.singleEventReduce(activeNode.value.disabledName)
    activeNode.value.disabledName = ''
  }

  function addDisabledName() {
    if (activeNode.value.disabledName) {
      // todo
      // 画板底部显示当前组件的事件IDE可视化
    }
    else {
      const disabledName = `mplBaseBtnDisabled_${newCid()}`
      activeNode.value.disabledName = disabledName
      workbench.singleEventPlus({
        name: disabledName,
        code: '',
        type: 'flow',
        desc: '基础按钮 - 禁用事件',
      })
    }
  }
</script>

<template>
  <div class="right-bar-base-button--box">
    <FormItem label="按钮标题" var="mpl.button.dv2gr3.title">
      <InputNode v-model="activeNode.title" />
    </FormItem>
    <FormItem v-model="activeNode.icon" var="mpl.button.dv2gr3.icon" label="图标" icon />
    <div class="mpl-divider" label="按钮事件"></div>
    <FormItem label="点击事件" :var="activeNode.clickName">
      <InputNode v-model="activeNode.clickName" disabled />
      <button v-if="activeNode.clickName" class="mpl-btn icon icon-close1 del-btn ml-5" @click="handleRemoveClickName" />
      <button class="mpl-btn icon icon-add ml-5" @click="addClickName" />
    </FormItem>
    <FormItem label="显示/隐藏" :var="activeNode.visibleName">
      <InputNode v-model="activeNode.visibleName" disabled />
      <button v-if="activeNode.visibleName" class="mpl-btn icon icon-close1 del-btn ml-5"
              @click="handleRemoveVisibleName" />
      <button class="mpl-btn icon icon-add ml-5" @click="addVisibleName" />
    </FormItem>
    <FormItem label="禁用事件" :var="activeNode.disabledName">
      <InputNode v-model="activeNode.disabledName" disabled />
      <button v-if="activeNode.disabledName" class="mpl-btn icon icon-close1 del-btn ml-5"
              @click="handleRemoveDisabledName" />
      <button class="mpl-btn icon icon-add ml-5" @click="addDisabledName" />
    </FormItem>
  </div>
</template>

<style lang="less" scoped>
  .right-bar-base-button--box {
    padding: 5px;
    box-sizing: border-box;
  }
</style>
