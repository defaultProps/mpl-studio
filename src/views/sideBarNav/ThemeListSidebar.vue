<script lang="ts" setup>
import { themeList } from '@/utils/constant'
import mplStore from '@mpl/store'

const projectStore = mplStore.projectStore()
const coreView = mplStore.viewStore()

const index = themeList.findIndex(v => v.locked)

if (index >= 0)
  themeList.unshift(themeList.splice(index, 1)[0])
</script>

<template>
  <div class="theme-sidebar--container">
    <div class="header-title">
      <div class="title">
        <i
          class="icon icon-theme3"
          style="color: #2f7f79"
        />主题列表
      </div>
    </div>
    <div class="theme-list--box mpl-scroll-none">
      <div
        v-for="item in themeList"
        :key="item.id"
        class="item"
        :class="{
          select: item.id === projectStore.activeFile?.id,
          used: item.locked
        }"
        @click="coreView.updateActiveTheme(item)"
      >
        <img
          :src="item.logo"
          alt="theme logo"
          class="square-btn"
        >
        <div
          v-if="item.locked"
          class="locked"
        >
          <i class="icon icon-lock-fill" />
        </div>
        <div
          class="theme-main"
          :title="`${item.title}&#10;${item.desc}`"
        >
          <div class="theme-title">
            {{ item.title }}
          </div>
          <div class="theme-desc">
            {{ item.desc }}
          </div>
          <div class="theme-author">
            <img
              v-if="item.author === 'LCSCode'"
              src="@/assets/logo.png"
              alt=""
            >
            <i
              v-else
              class="icon icon-user"
            />
            {{ item.author }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.theme-sidebar--container {
  height: 100%;
  overflow: hidden;
  color: #606266;
  position: relative;
  .header-title {
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    box-shadow: rgb(50 50 93 / 25%) 0px 7px 28px -8px,
      rgb(0 0 0 / 30%) 0px 8px 10px -8px;
    margin-bottom: 10px;
    user-select: none;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    background-color: #111010;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px 0 10px;
    border-bottom: 1px solid #47494a;
  }
  .theme-list--box {
    height: calc(100% - 61px);
    margin-top: 30px;
    overflow: hidden auto;
    width: 100%;
    .item {
      width: 100%;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      padding: 3px 0px;
      position: relative;
      user-select: none;
      border-bottom: 1px solid #303133;
      color: rgb(204, 204, 204);
      &.used {
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: #111010;
      }
      .locked {
        position: absolute;
        right: 0;
        bottom: 0;
        color: var(--primary-color);
      }
      &.select,
      &:hover {
        background-color: #303133;
        color: var(--color-7);
      }
      img {
        width: 30px;
        height: 30px;
        margin: 5px;
        background-size: cover;
        cursor: default;
      }
      .theme-main {
        width: 150px;
        height: 100%;
        padding: 0px 5px;
        box-sizing: border-box;
        .theme-title {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: default;
          line-height: 24px;
        }
        .theme-desc {
          font-size: 12px;
          cursor: default;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .theme-author {
          margin-top: 3px;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: default;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          i {
            margin-right: 3px;
          }
        }
      }
    }
  }
}
</style>
