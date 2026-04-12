<script lang="ts" setup>

function openAnnotationSetting() {
  window.parent.postMessage({
    type: 'openAnnotationSetting',
  }, '*')
}

function closeAnnotation() {
  window.parent.postMessage({
    type: 'closeAnnotation',
  }, '*')
}



</script>

<template>
  <header>
    <button type="button" class="mpl-btn mr-5 icon icon-setting1" @click="openAnnotationSetting" />
    <h4>评论/注解</h4>
    <button type="button" class="mpl-btn mr-5 plaintext-btn icon icon-close1" @click="closeAnnotation" />
  </header>
  <div class="annotation--container">
    评论注解窗口/富文本编辑器，
    <br>
    支持图片、图片编辑、链接、emoji、表格。
    <br>
    开启评论/注解时，选中组件会显示UI右上角高亮注解标识，并且支持注解立即滚动到可视区域。
  </div>
</template>

<style lang="less" scoped>
.annotation--container {
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
  color: #333;
}

header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
  box-sizing: border-box;

  h4 {
    margin: 0;
    padding: 0;
    flex: 1
  }
  button:hover {
    font-weight: 600;
  }
}
</style>
