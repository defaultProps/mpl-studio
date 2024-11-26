<script lang="ts" setup>
import { reactive } from 'vue'
import type MPL from '@mpl/typings'

const noteList = reactive<MPL.NodeNote[]>([
  {
    index: 'P',
    description: '信息披露与停复牌页面的描述信息。'
  },
  {
    index: '1',
    description: '仅允许输入合法字符：英文数字、且不低于10个字符。'
  },
  {
    index: '2',
    description: '校验输入信息。并绑定enter快捷键 + tabIndent。非法输入时禁用此按钮。'
  }
])
</script>

<template>
  <div class="note-sidebar--container">
    <main class="note-list">
      <div class="header-tool-box">
        <div class="title">
          注解列表
        </div>
        <div class="right-btn-group">
          <div
            class="btn mpl mpl-setting"
            title="注解设置"
          />
          <div
            class="btn mpl mpl-download2"
            title="导出注解"
          />
        </div>
      </div>
      <div
        v-for="(note, index) in noteList"
        :key="index"
        class="note-item"
      >
        <div
          class="note-index mpl-note square-btn"
          mpl="note"
        >
          {{ note.index }}
        </div>
        <div
          class="description"
          v-html="note.description || '---'"
        />
      </div>
      <div class="note-item">
        <div
          class="note-index mpl-note square-btn"
          mpl="note"
        >
          +
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="less" scoped>
.note-sidebar--container {
  height: 100%;
  font-size: 12px;
  color: #000;
  overflow: hidden;
  min-width: fit-content;

  .note-list {
    height: 100%;
    background-color: var(--color-7);
    overflow: hidden auto;

    .header-tool-box {
      height: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid var(--primary-color);
      padding: 0 3px;
      box-sizing: border-box;
      background: var(--primary-color);
      color: var(--color-7);
      position: sticky;
      z-index: 3;
      top: 0;

      .title {
        font-size: 12px;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        user-select: none;
        text-indent: 5px;
        font-weight: 600;
      }

      .right-btn-group {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .btn {
          font-size: 12px;
          color: var(--color-7);
          margin: 0 0 0 10px;
          height: 20px;
          width: 23px;
          cursor: default;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            color: var(--color-7);
            background: #1e1e1e8f;
            border-radius: 3px;
          }
        }
      }
    }

    .note-item {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      min-height: 30px;
      padding: 5px;
      box-sizing: border-box;

      .note-index {
        min-width: fit-content;
        background: var(--primary-color);
        padding: 2px 3px;
        color: var(--color-7);
        text-align: center;
        position: sticky;
        top: 35px;
      }

      .description {
        padding: 0 0 5px 5px;
        box-sizing: border-box;
        flex: 1;
        height: fit-content;
      }
    }

    .empty-info {
      margin-top: 20px;
      text-align: center;
      font-size: 12px;
      color: #000;
    }
  }
}
</style>
