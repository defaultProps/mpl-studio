<script setup lang="ts">
import { ref } from 'vue'
import { newCid } from '@mpl/libs'
import { BaseBtn } from '@mpl/typings'
import { workbenchStore } from '@mpl/store'
import { VueDraggable } from 'vue-draggable-plus'
import FormItem from './FormItem.vue'
import InputNode from './InputNode.vue'
import FormIconItem from './FormIconItem.vue'

const slotBtnGroup = defineModel<BaseBtn[]>({ default: [] })
const { cid } = defineProps<{ cid: string }>()
const store = workbenchStore()
const selectBtn = ref<BaseBtn | null>(null)

function newSlotBtn(btnCid: string): BaseBtn {
  return {
    title: '标题',
    icon: '',
    visibleName: `visible_${cid}_${btnCid}`,
    disabledName: `disabled_${cid}_${btnCid}`,
    clickName: ``,
    theme: '',
    type: '',
    cid: btnCid,
    className: ''
  }
}

// 添加辅助按钮
function addSlotBtn() {
  const newBtn = newSlotBtn(newCid('slotBtn'))
  slotBtnGroup.value.push(newBtn)
}

function handleRemoveClickName() {
  if (!selectBtn.value) return

  store.singleEventReduce(selectBtn.value.clickName)
  selectBtn.value.clickName = ''
}

function removeBtn(pos: number, btn: BaseBtn) {
  if (btn.cid === selectBtn.value?.cid) {
    const { disabledName, visibleName, clickName } = selectBtn.value

    disabledName && store.singleEventReduce(disabledName)
    visibleName && store.singleEventReduce(visibleName)
    clickName && store.singleEventReduce(clickName)
    selectBtn.value = null
  }

  slotBtnGroup.value.splice(pos, 1)
}

function addClickName(btn: BaseBtn) {
  if (btn.clickName) {
    // todo
    // 画板底部显示当前组件的事件IDE可视化
  } else {
    const clickName = `mpl_baseInput_slotBtn_click_${newCid('slotBtn')}`
    btn.clickName = clickName
    store.singleNodeEventPlus({
      name: clickName,
      code: '',
      desc: '基础输入 - 辅助按钮 - 点击事件',
      cid,
      type: 'baseComponent',
      flowType: 'ide',
      tag: 'mpl-btn',
      open: true
    })
  }
}

function selectActiveSlotBtn(btn: BaseBtn) {
  selectBtn.value = btn
}
</script>
<template>
  <VueDraggable v-if="slotBtnGroup.length" v-model="slotBtnGroup" :animation="300"
    handle=".mpl-baseInput-slotBtn-sort-handler">
    <div v-for="(btn, i) in slotBtnGroup" :key="btn.cid" class="slot-btn-line">
      <button type="button" class="mpl-btn mr-5 icon icon-edit5" :class="{ 'is-active': selectBtn?.cid === btn.cid }"
        @click="selectActiveSlotBtn(btn)" />
      <button type="button" class="mpl-btn mr-5 icon icon-drag mpl-baseInput-slotBtn-sort-handler" />
      <InputNode v-model="btn.title" class="flex-1" />
      <select v-model="btn.theme" class="mpl-select ml-5">
        <option value="">
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
      </select>
      <button type="button" class="mpl-btn del-btn ml-5 icon icon-close1" @click="removeBtn(i, btn)" />
    </div>
  </VueDraggable>
  <button type="button" class="mpl-btn plus-btn icon icon-plus" @click="addSlotBtn">
    添加按钮
  </button>
  <!-- <button type="button" class="mpl-btn icon icon-jurassic_setup" style="float: right" title="批量设置" /> -->

  <div v-if="selectBtn" class="slot-btn-setting">
    <FormItem label="标题">
      <InputNode v-model="selectBtn.title" />
    </FormItem>
    <FormIconItem v-model="selectBtn.icon" label="图标" />
    <FormItem label="按钮主题">
      <button type="button" class="mpl-btn mr-5 icon icon-select5" />
      <select v-model="selectBtn.theme" class="mpl-select">
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
    <FormItem label="事件类型">
      <button type="button" class="mpl-btn mr-5 icon icon-select5" />
      <select v-model="selectBtn.type" class="mpl-select">
        <optgroup label="其他事件">
          <option value="">
            无事件
          </option>
          <option value="location">
            跳转
          </option>
          <option value="custom">
            自定义
          </option>
        </optgroup>
        <optgroup label="系统事件">
          <option value="import">
            表格导入
          </option>
          <option value="export">
            表格导出
          </option>
          <option value="download">
            下载文件
          </option>
          <option value="copy">
            复制内容
          </option>
          <option value="paste">
            粘贴内容
          </option>
          <option value="disabled">
            禁用输入选择
          </option>
          <option value="viewPassword">
            查看密码
          </option>
        </optgroup>
      </select>
    </FormItem>
    <FormItem v-if="selectBtn.type === 'c'" label="点击事件">
      <InputNode v-model="selectBtn.clickName" disabled />
      <button v-if="selectBtn.clickName" type="button" class="mpl-btn del-btn ml-5 icon icon-close1" @click="handleRemoveClickName" />
      <button type="button" class="mpl-btn ml-5 icon" :class="[selectBtn.clickName ? 'icon-select5' : 'icon-add']"
        @click="addClickName(selectBtn)" />
    </FormItem>
    <FormItem label=" 隐藏" :var="selectBtn.visibleName">
      <InputNode v-model="selectBtn.visibleName" disabled />
    </FormItem>
    <FormItem label="禁用变量" :var="selectBtn.disabledName">
      <InputNode v-model="selectBtn.disabledName" disabled />
    </FormItem>
    <FormItem label="唯一标识" :var="selectBtn.cid">
      <InputNode v-model="selectBtn.cid" disabled />
    </FormItem>
  </div>
</template>
<style lang="less" scoped>
.slot-btn-line {
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-around;
}

.slot-btn-setting {
  padding: 5px;
  box-sizing: border-box;
  outline: 1px solid #ccc;
  margin: 10px 0;
  border-radius: 3px;
  background-color: #f6f8fa;
}
</style>
