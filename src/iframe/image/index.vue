<script setup lang='ts'>
import { ref } from 'vue'
import { mplImg } from '@mpl/const'

interface ImgProp {
  label: string
  value: string
  url: string
}

const projectImgList = ref<ImgProp[]>(mplImg)
const systemImgList = ref<ImgProp[]>(mplImg)
</script>

<template>
  <div class="image-market--container">
    <div class="title-line">
      项目图片【已使用】
    </div>
    <img v-for="img in projectImgList" :key="img.value" class="img-box" :src="img.url" />
    <div class="title-line">
      系统图片
    </div>
    <img v-for="img in systemImgList" :key="img.value" class="img-box" :src="img.url" />
    <!-- 使用iframe挂载、销毁时无需考虑window对象内存溢出问题 -->
    <h4>图片操作： 上传、剪辑、下载、删除、批量操作、图片预览</h4>
    <h4>图片项目：项目图片、系统图片</h4>
    <h4>图片访问：copy-url</h4>

    <h4>系统图片列表：空状态、上传、下载、email发送等等</h4>
  </div>
</template>

<style lang='less' scoped>
.image-market--container {
  padding: 0 10px;
  box-sizing: border-box;

  .title-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    text-indent: 8px;
    box-shadow: 2px 0 0px 0px inset var(--primary-color);
    margin: 20px 0;
    height: 15px;
    font-size: 16px;
  }

  .img-box {
    height: 120px;
    outline: 1px solid #f0f0f0;
    margin: 10px;
    border-radius: 5px;
  }
}
</style>
