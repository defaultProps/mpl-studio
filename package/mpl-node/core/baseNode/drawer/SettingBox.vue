<script setup lang="ts">
import { ref } from 'vue'
import InputNode from '../../../components/InputNode.vue'
import FormItem from '../../../components/FormItem.vue'
import { DrawerProp, drawerPaddingOptions } from './define'
import { workbenchStore } from '@mpl/store'
import SlotBtnGroup from '../../../components/SlotBtnGroup.vue'

const activeNode = ref<DrawerProp>(workbenchStore().activeNode as DrawerProp)
</script>

<template>
  <div class="right-bar-drawer-setting--box">
    <div class="mpl-divider">抽屉设置</div>
    <FormItem label="宽度">
      <InputNode v-model="activeNode.pos.pc.w" />
    </FormItem>
    <div class="mpl-divider">抽屉顶部区域</div>
    <FormItem label="弹框顶部" var="mpl.drawer.df4gt5.showHeader">
      <input v-model="activeNode.header.visible" type="checkbox" class="mpl-input">
    </FormItem>
    <template v-if="activeNode.header.visible">
      <FormItem label="标题" var="mpl.drawer.df4gt5.title">
        <InputNode v-model="activeNode.header.title" />
      </FormItem>
      <FormItem label="关闭按钮">
        <input v-model="activeNode.header.showClose" type="checkbox" class="mpl-input">
      </FormItem>
      <SlotBtnGroup v-model="activeNode.header.btnGroup" :cid="activeNode.cid" />
    </template>
    <div class="mpl-divider">抽屉内容区域</div>
    <FormItem label="内间距">
      <select v-model="activeNode.body.padding" class="mpl-select">
        <option v-for="p in drawerPaddingOptions" :label="p.label + 'px'" :value="p.value" />
      </select>
    </FormItem>
    <div class="mpl-divider">抽屉底部区域</div>
    <FormItem label="抽屉底部">
      <input v-model="activeNode.footer.visible" type="checkbox" class="mpl-input">
    </FormItem>
    <template v-if="activeNode.footer.visible">
      <SlotBtnGroup v-model="activeNode.footer.btnGroup" :cid="activeNode.cid" />
    </template>
  </div>
</template>

<style lang="less" scoped>
.right-bar-drawer-setting--box {
  padding: 5px;
  box-sizing: border-box;

  .btn-setting-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    width: 100%;
  }

  .header-group {
    display: flex;
    height: 30px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
