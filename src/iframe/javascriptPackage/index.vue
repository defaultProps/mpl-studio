<script setup lang='ts'>
</script>

<template>
  <div class="jsPackage-market--container">
    <h3>脚本javascript管理</h3>
    <h4>1、项目脚本 添加js文件、编辑、删除文件</h4>
    <h4>1.1 js文件编辑删除更新下载</h4>
    <h4>1.1 多人协同操作的编辑锁定状态 monaco-editor </h4>
    <h3>2、mpl Studio 平台脚本</h3>
    <h4>2.1 组件库：组件、主题文件</h4>
    <h4>2.2 前端API、服务端API</h4>
    <h4>2.3 资源库：图片、图标、mpl/const静态数据库</h4>
    <h3>3、外部资源库 npm包或 jquery.min.js 包编译文件</h3>
    <h4>默认内置多种库。mpl: jquery、sortablejs、echarts、lodash、day.js、qs、validator、crypto-js copy-to-clipboard excel-js、file-saver js-beautify</h4>
    <h4>内置库提供使用文档，可挂载/卸载。</h4>
    <h5>使用外部包时，使用WebContainers内置nodejs环境运行， 默认认为用户是具备coding开发能力</h5>
    <div>iframe 挂载。清除monaco-editor worker线程</div>
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
    width: 200px;
    height: 120px;
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    outline: 1px solid #f0f0f0;
    margin: 10px;
    text-align: center;
    font-size: 12px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    &:hover span {
      opacity: 1;
    }
    span {
      opacity: 0;
      width: 100px;
      height: 60px;
      background-color: #333232ad;
      position: absolute;
      justify-content: center;
      display: flex;
      align-items: center;
      z-index: 10;
      transition: opacity 0.3s;
      font-size: 24px;
      color: var(--color-7);
      &:hover {
        background-color: #333232;
        color: var(--primary-color);
        font-weight: 600;
      }
    }
    .copy {
      left: 0;
      top: 0;
    }
    .preview {
      right: 0;
      top: 0;
    }
    .download {
      right: 0;
      bottom: 0;
    }
    .delete {
      left: 0;
      bottom: 0;
    }
  }
}
</style>
