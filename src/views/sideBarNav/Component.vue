<script lang="ts" setup>
import BaseComponent from './BaseComponent.vue'
import ModuleComponent from './ModuleComponent.vue'
import PageComponent from './PageComponent.vue'
import ComponentOutline from './ComponentOutline.vue'
import mplStore from '@mpl/store'
import type { ActiveComponentBoxModel } from '@mpl/typings'

const coreView = mplStore.viewStore()
const componentHeaderModelList: {
  label: string
  value: ActiveComponentBoxModel
}[] = [
    { label: '基础控件', value: 'baseComponent' },
    { label: '高级控件', value: 'moduleComponent' },
    { label: '模板页面', value: 'pageComponent' }
  ]
</script>

<template>
  <div class="component--container">
    <div class="component-header-box">
      <div v-for="item in componentHeaderModelList" :key="item.value" class="tag"
        :class="{ select: coreView.activeComponentView === item.value }"
        @click="coreView.activeComponentView = item.value">
        {{ item.label }}
      </div>
    </div>

    <BaseComponent v-if="coreView.activeComponentView === 'baseComponent'" />
    <ModuleComponent v-if="coreView.activeComponentView === 'moduleComponent'" />
    <PageComponent v-if="coreView.activeComponentView === 'pageComponent'" />
    <ComponentOutline />
  </div>
</template>

<style lang="less">
.component--container {
  width: 200px;

  .group-title {
    width: 100%;
    text-align: center;
    line-height: 35px;
    color: var(--color-2);
    user-select: none;
    font-weight: 600;
  }

  .header-search {
    position: sticky;
    top: 0;
    z-index: 100;
    text-align: center;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f6f8fa;
    border-bottom: 1px solid #d0d7de;

    input {
      height: 24px;
      padding: 0 4px;
    }
  }


  .component-group {
    display: flex;
    flex-wrap: wrap;
    padding: 3px;
    box-sizing: border-box;

    .component {
      box-sizing: border-box;
      width: calc(50% - 6px);
      margin: 5px 3px;

      span.component-title {
        display: inline-flex;
        width: 100%;
        line-height: 32px;
        border: none;
        font-size: 12px;
        line-height: 32px;
        height: 32px;
        overflow: hidden;
        text-align: left;
        text-indent: 5px;
        cursor: default;
        user-select: none;
        box-sizing: border-box;
        position: relative;
        background-color: #f6f8fa;
        color: #000;
        outline: 1px solid var(--color-1);
        justify-content: flex-start;
        align-items: center;
        padding-left: 25px;
        border-radius: 2px;

        &.context-light,
        &:focus,
        &:hover {
          outline: 1px solid #227447;
        }

        &::before {
          display: inline-flex;
          width: 23px;
          height: 32px;
          left: 0;
          color: #227447;
          position: absolute;
          font-size: 20px;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.component--container {
  display: block;
  height: 100%;
  width: 100%;
  font-size: 12px;
  color: var(--color-1);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  .component-header-box {
    background-color: #e6e6e6;
    box-shadow: 0px -1px 0 0 var(--color-1) inset;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    box-sizing: border-box;
    height: 30px;
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
    color: #000;

    .tag {
      user-select: none;
      height: 100%;
      width: 100%;
      line-height: 32px;
      text-align: center;

      &:first-child {
        &.select {
          box-shadow: -1px 0 0 0 inset #ccc;
        }
      }
      &:last-child {
        &.select {
          box-shadow: 1px 0 0 0 inset #ccc;
        }
      }

      &.select {
        color: var(--primary-color);
        font-weight: 600;
        background-color: #f6f8fa;
        box-shadow: 1px 0 0 0 inset #ccc, -1px 0 0 0 inset #ccc;
      }
    }
  }

  main {
    overflow: hidden auto;
    width: 100%;
    flex: 1;
  }
}
</style>
