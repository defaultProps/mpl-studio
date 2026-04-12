<script lang="ts" setup>
import { ref } from 'vue'
import InputNode from '../../../components/InputNode.vue'
import SliderNode from '../../../components/SliderNode.vue'
import FormItem from '../../../components/FormItem.vue'
import RadioBtnGroup from '../../../components/RadioBtnGroup.vue'
import InputNumberRange from '../../../components/InputNumberRange.vue'

import {
  BaseSearchModule1Prop,
  BaseBtnSearchModule1,
  newBaseSearchModule1SubmitBtn,
  newBaseSearchModule1ResetBtn,
  newBaseSearchModule1ExpandBtn
} from './define'
import { VueDraggable } from 'vue-draggable-plus'
import { newCid } from '@mpl/libs'
import { workbenchStore } from '@mpl/store'
import { textAlignPosition } from '../../../libs/constant'

const props = defineProps<{ value: BaseSearchModule1Prop }>()
const activeNode = ref<BaseSearchModule1Prop>(props.value)
const activeBtn = ref<BaseBtnSearchModule1 | null>(null)

function removeBtn(cid: string, i: number) {
  activeNode.value.slotBtn.splice(i, 1)

  if (activeBtn.value?.cid === cid) {
    activeBtn.value = null
  }
}

function selectSlotBtn(n: BaseBtnSearchModule1) {
  activeBtn.value = n
}

function addClickName(btn: BaseBtnSearchModule1) {
  if (btn.clickName) {
    // todo
    // 画板底部显示当前组件的事件IDE可视化
  } else {
    const clickName = `mplBaseInputSlotBtnClick_${newCid()}`
    btn.clickName = clickName
    const store = workbenchStore()

    store.singleNodeEventPlus({
      name: clickName,
      code: '',
      mpl_zh: '点击事件',
      desc: '基础输入 - 辅助按钮 - 点击事件',
      cid: activeNode.value.cid,
      type: 'seniorComponent',
      flowType: 'ide',
      tag: 'mpl-baseSearchModule1',
      open: true
    })
  }
}

function handleRemoveClickName() {
  if (!activeBtn.value) return

  const store = workbenchStore()
  store.singleEventReduce(activeBtn.value.clickName)
  activeBtn.value.clickName = ''
}

function changeBtnType(btn: BaseBtnSearchModule1, i: number) {
  activeBtn.value = null

  if (btn.type === 'c') {
    const _btn = newSlotBtn()
    activeNode.value.slotBtn.splice(i, 1, _btn)
  } else if (btn.type === 'searchSubmit') {
    const _btn = newBaseSearchModule1SubmitBtn()
    activeNode.value.slotBtn.splice(i, 1, _btn)
  } else if (btn.type === 'searchReset') {
    const _btn = newBaseSearchModule1ResetBtn()
    activeNode.value.slotBtn.splice(i, 1, _btn)
  } else if (btn.type === 'searchExpand') {
    const _btn = newBaseSearchModule1ExpandBtn()
    activeNode.value.slotBtn.splice(i, 1, _btn)
  }
}

function addSlotBtn() {
  const btn = newSlotBtn()
  activeNode.value.slotBtn.push(btn)
  activeBtn.value = btn
}

function newSlotBtn(btnCid = newCid()): BaseBtnSearchModule1 {
  const cid = activeNode.value.cid
  return {
    title: '标题',
    icon: '',
    visibleName: `visible_${btnCid}_${cid}`,
    disabledName: `disabled_${btnCid}_${cid}`,
    clickName: `onclick_${btnCid}_${cid}`,
    theme: '',
    type: 'c',
    cid: btnCid,
    className: '',
    pos: 'l'
  }
}
</script>
<template>
  <div class="right-bar-setting--box">
    <FormItem :label="`宽度 ${activeNode.pos.pc.wType === '%' ? activeNode.pos.pc.w : ''}`">
      <SliderNode v-model:slider="activeNode.pos.pc.w" v-model:unit="activeNode.pos.pc.wType" />
    </FormItem>
    <FormItem label="显示/隐藏" :var="`mpl.var.${activeNode.cid}_visible`" />
    <div class="mpl-divider">查询组件设置</div>
    <FormItem label="自动查询">
      <input type="checkbox" class="mpl-input">
    </FormItem>
    <FormItem label="行数">
      <InputNumberRange v-model="activeNode.seniorNode.rowSpan" placeholder="默认1行" />
    </FormItem>
    <FormItem label="列数">
      <InputNumberRange v-model="activeNode.seniorNode.colSpan" placeholder="默认1行" />
    </FormItem>
    <button type="button" class="mpl-btn icon icon-jurassic_setup" style="float: right" title="批量设置" />
    <div class="mpl-divider">底部按钮设置</div>
    <FormItem label="显示">
      <input type="checkbox" class="mpl-input">
    </FormItem>
    <VueDraggable v-if="activeNode.slotBtn.length" v-model="activeNode.slotBtn" handle=".mpl-baseSearchModule1-slotBtn-sort-handler" :animation="300">
      <div v-for="(n, i) in activeNode.slotBtn" :key="n.cid" class="slot-btn-line">
        <button type="button" class="mpl-btn mr-5 icon icon-drag mpl-baseSearchModule1-slotBtn-sort-handler" />
        <button v-if="!['searchExpand', 'searchReset'].includes(n.type)" type="button" class="mpl-btn mr-5 icon icon-edit5"
          :class="{ 'is-active': activeBtn?.cid === n.cid }" @click="selectSlotBtn(n)" />
        <select v-model="n.type" class="mpl-select mr-5" @change="changeBtnType(n, i)">
          <option value="searchExpand">
            展开/收起
          </option>
          <option value="searchReset">
            重置
          </option>
          <option value="searchSubmit">
            表单提交
          </option>
          <option value="c">
            默认
          </option>
        </select>
        <InputNode v-if="n.type !== 'searchExpand'" v-model="n.title" class="mr-5" />
        <button type="button" class="mpl-btn del-btn icon icon-close1" @click="removeBtn(n.cid, i)" />
      </div>
    </VueDraggable>
    <button type="button" class="mpl-btn plus-btn icon icon-plus" @click="addSlotBtn()">
      添加按钮
    </button>
    <button type="button" class="mpl-btn icon icon-jurassic_setup" style="float: right" title="批量设置" />

    <!-- 提交查询 -->
    <div v-if="activeBtn?.type === 'searchSubmit'" class="slot-btn-setting">
      <FormItem label="标题" :var="activeBtn.title">
        <InputNode v-model="activeBtn.title" />
      </FormItem>
      <FormItem label="点击事件">
        <InputNode v-model="activeBtn.clickName" disabled />
        <button type="button" class="mpl-btn ml-5 icon icon-select5" @click="addClickName(activeBtn)" />
      </FormItem>
      <FormItem label="显示/隐藏" :var="activeBtn.visibleName">
        <InputNode v-model="activeBtn.visibleName" disabled />
      </FormItem>
      <FormItem label="禁用变量" :var="activeBtn.disabledName">
        <InputNode v-model="activeBtn.disabledName" disabled />
      </FormItem>
      <FormItem label="按钮位置">
        <RadioBtnGroup v-model="activeBtn.pos" :option="textAlignPosition" />
      </FormItem>
    </div>

    <!-- 默认按钮 -->
    <div v-if="activeBtn?.type === 'c'" class="slot-btn-setting">
      <FormItem label="标题" :var="activeBtn.title">
        <InputNode v-model="activeBtn.title" />
      </FormItem>
      <FormItem label="按钮位置">
        <RadioBtnGroup v-model="activeBtn.pos" :option="textAlignPosition" />
      </FormItem>
      <FormItem label="按钮主题">
        <button type="button" class="mpl-btn mr-5 icon icon-select5" />
        <select v-model="activeBtn.theme" class="mpl-select">
          <optgroup label="常用按钮主题">
            <option value="default">
              默认
            </option>
            <option value="primary">
              主色
            </option>
            <option value="text">
              文本
            </option>
            <option value="link">
              链接
            </option>
          </optgroup>
          <optgroup label="其他按钮主题">
            <option value="btn1">
              基础色1
            </option>
            <option value="btn2">
              基础色2
            </option>
            <option value="btn3">
              基础色3
            </option>
          </optgroup>
        </select>
      </FormItem>
      <FormItem label="点击事件">
        <InputNode v-model="activeBtn.clickName" disabled />
        <button v-if="activeBtn.clickName" type="button" class="mpl-btn del-btn ml-5 icon icon-close1"
          @click="handleRemoveClickName" />
        <button type="button" class="mpl-btn ml-5 icon" :class="[activeBtn.clickName ? 'icon-select5' : 'icon-add']"
          @click="addClickName(activeBtn)" />
      </FormItem>
      <FormItem label="显示/隐藏" :var="activeBtn.visibleName">
        <InputNode v-model="activeBtn.visibleName" disabled />
      </FormItem>
      <FormItem label="禁用变量" :var="activeBtn.disabledName">
        <InputNode v-model="activeBtn.disabledName" disabled />
      </FormItem>
    </div>
  </div>
</template>
