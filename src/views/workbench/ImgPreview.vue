<script lang="ts" setup>
import { ref } from 'vue'

const isZoomOut = ref(false)

// 展示同目录下的所有图片列表。点击图片触发选中图片的文件。
</script>

<template>
  <div class="img-preview--container">
    <img :class="{'zoom-out': isZoomOut}" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.K3cTgobU7RMbGpMgs634uwHaFa?w=237&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="">
    <div class="btn-group">
      <button class="edit-btn" @click="isZoomOut = !isZoomOut">缩放</button>
      <button class="edit-btn">替换</button>
      <button class="edit-btn">重命名</button>
      <button class="edit-btn del-btn">删除</button>
    </div>
  </div>
</template>

<style scoped lang="less">
  .img-preview--container {
    width: 100%;
    height: 100%;
    background-color: var(--color-7);
    font-size: 16px;
    color: #000;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    .btn-group {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 10;
      
      button + button {
        margin-left: 5px;
      }
    }
    img {
      transition: all 0.3s;
      max-height: calc(100% - 200px);
      user-select: none;
      -webkit-user-drag: none;
      pointer-events: none;
      transform-origin: center;
      &.zoom-out {
        transform: scale(2);
      }
    }
  }
</style>
