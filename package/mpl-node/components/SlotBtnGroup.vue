<script setup lang="ts">
import { ref } from 'vue'
import { newCid } from "@mpl/const";
import { BaseBtn } from "@mpl/typings";
import { workbenchStore } from '@mpl/store';
import { VueDraggable } from "vue-draggable-plus";
import FormItem from './FormItem.vue'
import InputNode from './InputNode.vue'

const slotBtnGroup = defineModel<BaseBtn[]>({ default: [] })
const { cid } = defineProps<{ cid: string }>()
const store = workbenchStore();
const selectBtn = ref<BaseBtn | null>(null);

function newSlotBtn(btnCid: string): BaseBtn {
  return {
    title: '标题',
    icon: '',
    visibleName: `visible_${cid}_${btnCid}`,
    disabledName: `disabled_${cid}_${btnCid}`,
    clickName: `onclick_${cid}_${btnCid}`,
    theme: '',
    cid: btnCid,
    className: ''
  }
}

// 添加辅助按钮
function addSlotBtn() {
  selectBtn.value = newSlotBtn(newCid())
  slotBtnGroup.value.push(selectBtn.value)
}

function handleRemoveClickName() {
  if (!selectBtn.value) return;

  store.singleEventReduce(selectBtn.value.clickName);
  selectBtn.value.clickName = "";
}

function removeBtn(pos: number, btn: BaseBtn) {
  if (btn.cid === selectBtn.value?.cid) {
    const { disabledName, visibleName, clickName } = selectBtn.value;

    disabledName && store.singleEventReduce(disabledName);
    visibleName && store.singleEventReduce(visibleName);
    clickName && store.singleEventReduce(clickName);
    selectBtn.value = null;
  }

  slotBtnGroup.value.splice(pos, 1);
}

function addClickName(btn: BaseBtn) {
  if (btn.clickName) {
    // todo
    // 画板底部显示当前组件的事件IDE可视化
  } else {
    const clickName = `mplBaseInputSlotBtnClick_${newCid()}`;
    btn.clickName = clickName;
    store.singleEventPlus({
      name: clickName,
      code: "",
      type: "code",
      desc: "基础输入 - 辅助按钮 - 点击事件",
    });
  }
}

function selectActiveSlotBtn(btn: BaseBtn) {
  selectBtn.value = btn
}

</script>
<template>
  <VueDraggable ref="el" v-if="slotBtnGroup" v-model="slotBtnGroup" handle=".mpl-baseInput-slotBtn-sort-handler">
    <div v-for="(btn, i) in slotBtnGroup" :key="btn.cid" class="slot-btn-line">
      <button class="mpl-btn mr-5 icon icon-edit5" :class="{ 'is-active': selectBtn?.cid === btn.cid }"
        @click="selectActiveSlotBtn(btn)" />
      <button class="mpl-btn mr-5 icon icon-drag mpl-baseInput-slotBtn-sort-handler" />
      <InputNode v-model="btn.title" />
      <button class="mpl-btn del-btn ml-5 icon icon-close1" @click="removeBtn(i, btn)" />
    </div>
  </VueDraggable>
  <button class="mpl-btn plus-btn icon icon-plus" @click="addSlotBtn">添加按钮</button>
  <div v-if="selectBtn" class="slot-btn-setting">
    <FormItem v-model="selectBtn.icon" label="图标" icon />
    <FormItem label="点击事件">
      <InputNode v-model="selectBtn.clickName" disabled />
      <button v-if="selectBtn.clickName" class="mpl-btn del-btn ml-5 icon icon-close1" @click="handleRemoveClickName" />
      <button class="mpl-btn ml-5 icon" :class="[selectBtn.clickName ? 'icon-select5' : 'icon-add']"
        @click="addClickName(selectBtn)" />
    </FormItem>
    <FormItem label="显示/隐藏" :var="selectBtn.visibleName">
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
  outline: 1px solid var(--color-1);
  margin: 10px 0;
  border-radius: 3px;
}
</style>