<script lang="ts" setup>
import BaseComponent from './BaseComponent.vue'
import ModuleComponent from './ModuleComponent.vue'
import PageComponent from './PageComponent.vue'
import ComponentOutline from './ComponentOutline.vue'
import BussinessComponent from './BussinessComponent.vue'
import { viewStore, userStore } from '@mpl/store'
import type { ActiveComponentBoxModel, ActiveComponentGroupView, Authority } from '@mpl/typings'
import { ref } from 'vue'

const coreView = viewStore()
const user = userStore()
const componentHeaderModelList: { label: string, value: ActiveComponentBoxModel, authority: Authority }[] = [
  { label: '基础控件', value: 'baseComponent', authority: 'community' },
  { label: '高级控件', value: 'moduleComponent', authority: 'community' },
  { label: '引用控件', value: 'bussComponent', authority: 'enterprise' }
]
const componentGroupOptions: { label: string, value: ActiveComponentGroupView, authority: Authority }[] = [
  { label: '系统控件', value: 'systemComponent', authority: 'community' },
  { label: '业务模板', value: 'bussComponent', authority: 'community' },
]
const searchNode = ref<string>('')

function handleSelectTag(value: ActiveComponentBoxModel, authority: Authority) {
  if (authority === 'enterprise' && user.authority !== 'enterprise') {
    return
  }

  coreView.activeComponentView = value
}

</script>

<template>
  <div class="component--container">
    <div class="component-group-box">
      <div v-for="item in componentGroupOptions" :key="item.value" class="tag"
        :class="{ select: coreView.activeComponentGroupView === item.value, disabled: item.authority === 'enterprise' && user.authority !== 'enterprise' }"
        @click="coreView.activeComponentGroupView = item.value">
        {{ item.label }}
      </div>
    </div>
    <el-splitter layout="vertical" lazy>
      <el-splitter-panel :min="200">
        <div v-if="coreView.activeComponentGroupView === 'systemComponent'" class="system-component-box">
          <div class="component-sub-box">
            <div v-for="item in componentHeaderModelList" :key="item.value" class="tag"
              :class="{ select: coreView.activeComponentView === item.value, disabled: item.authority === 'enterprise' && user.authority !== 'enterprise' }"
              @click="handleSelectTag(item.value, item.authority)">
              {{ item.label }}
            </div>
          </div>
          <div class="input-group">
            <input v-model="searchNode" placeholder="控件搜索" maxLength="20">
            <button type="button" class="search-btn icon-search1 icon" />
          </div>

          <BaseComponent v-if="coreView.activeComponentView === 'baseComponent'" />
          <ModuleComponent v-if="coreView.activeComponentView === 'moduleComponent'" />
          <PageComponent v-if="coreView.activeComponentView === 'bussComponent'" />
        </div>
        <template v-else>
          <div class="input-group">
            <input v-model="searchNode" placeholder="控件搜索" maxlength="20">
            <button type="button" class="search-btn icon-search1 icon" />
          </div>
          <BussinessComponent />
        </template>
      </el-splitter-panel>
      <el-splitter-panel :min="200" :max="600" :size="350" collapsible>
        <ComponentOutline />
      </el-splitter-panel>
    </el-splitter>
  </div>
</template>

<style lang="less">
.component--container {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100%;

  .group-title {
    width: 100%;
    text-align: center;
    line-height: 35px;
    color: #1E1E1E;
    user-select: none;
    font-size: 12px;
    font-weight: 600;
  }



  .input-group {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 10px 0;
    padding: 0 5px;
    box-sizing: border-box;

    .search-btn {
      height: 30px;
      margin-left: 3px;
      min-width: 32px;
      font-size: 12px;
      color: #000;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      position: relative;
      width: auto;
      cursor: default;
      background: buttonface;
      border: 1px solid #ccc;
      border-radius: var(--radius-2);
      padding: 0 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        border: 1px solid var(--primary-color);
        outline: 1px solid var(--primary-color);
      }
    }

    i.icon-search1.icon {
      position: absolute;
      z-index: 100;
      top: 50%;
      transform: translateY(-50%);
      left: 16px;
      color: #252526;
    }

    input {
      background: #f6f8fa;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: var(--radius-2);
      font-size: 12px;
      background: #efefef;
      height: 30px;
      text-indent: 5px;
      flex: 1;
      width: 155px;

      &:hover,
      &:focus,
      &:focus-visible {
        border: 1px solid var(--primary-color);
        border-radius: var(--radius-2);
        animation: gradientInput 0.3s forwards;
        outline: 1px solid var(--primary-color)
      }
    }
  }

  .component {
    box-sizing: border-box;
    width: calc(50% - 10px);
    margin: 5px;
    position: relative;
    background: #f6f8fa;
    color: #1E1E1E;
    display: inline-flex;
    line-height: 32px;
    border: 1px solid #cccccc;
    font-size: 12px;
    line-height: 32px;
    height: 32px;
    overflow: hidden;
    text-align: left;
    cursor: default;
    user-select: none;
    box-sizing: border-box;
    position: relative;
    background: #f6f8fa;
    color: #1E1E1E;
    justify-content: flex-start;
    align-items: center;
    padding-left: 27px;
    border-radius: var(--radius-2);

    svg {
      position: absolute;
      left: 3px;
    }

    &:not(.disabled):focus,
    &:not(.disabled):hover {
      outline: 1px solid var(--primary-color);
      border: 1px solid var(--primary-color);
    }

    &.disabled {
      color: #b1b3b8;
      cursor: not-allowed;
      border: 1px solid #cccccc;
      background: #f6f8fa;
    }

    &::before {
      width: 23px;
      height: 32px;
      left: 0;
      background: #e6e6e687;
      position: absolute;
      border-right: 1px solid #cccccc;
      content: '';
      z-index: 0;
    }

    &::after {
      content: attr(label);
      z-index: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

<style lang="less" scoped>
.component--container {
  height: 100%;
  overflow: hidden;
  width: 100%;

  .component-group-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    width: 100%;

    .el-splitter {
      flex: 1;
      height: 100%;
    }

    .tag {
      user-select: none;
      height: 32px;
      width: 100%;
      line-height: 32px;
      text-align: center;
      border-bottom: 1px solid #ccc;
      background-color: #e6e6e6;
      color: #1E1E1E;
      font-size: 12px;
      cursor: default;

      &.disabled {
        color: #b1b3b8;
        cursor: not-allowed;
      }

      &:first-child {
        &.select {
          border-bottom: 1px solid transparent;
        }
      }

      &:last-child {
        border-left: 1px solid #ccc;

        &.select {
          border-bottom: 1px solid transparent;
        }
      }

      &:hover {
        font-weight: 600;
        color: var(--primary-color)
      }

      &.select {
        font-weight: 600;
        background: #fff;
        color: var(--primary-color)
      }
    }
  }

  .system-component-box {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: auto;
  }

  .component-sub-box {
    background: #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    z-index: 1;
    color: #1E1E1E;
    width: 190px;
    margin: 10px auto 0;
    background: #f6f8fa;
    border: 1px solid #ccc;
    border-radius: 1px;

    .tag {
      user-select: none;
      height: 32px;
      width: 100%;
      line-height: 32px;
      text-align: center;
      font-size: 12px;
      color: #1E1E1E;
      cursor: default;

      &.disabled {
        color: #b1b3b8;
        cursor: not-allowed;
      }

      &.select,
      &:not(.disabled):hover {
        font-weight: 600;
        color: var(--primary-color)
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
