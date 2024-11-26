<template>
  <div class="third-pkg-pane--container">
    + 提供通用的第三方库。
    <br>
    - 为了适配已经上线的项目组pkg的版本，系统预设的通用库版本之间通常差别不大（不同版本内部的API逻辑相同，避免需要安装同一个库的俩个版本）
    <br>
    - mpl升级必须的版本库: mpl-core mpl-view mpl-render mpl-util. 这些库统一存入mpl中。应用平台只需且必须导入唯一库 npm i mpl -S.
    <br>
    - mpl升级后，应用平台只需要重新 npm i mpl -S 即可.
    <br>
    - 内置常规的 vue-draggable + vue-template-compiler + sortableJS + jQuery + file-saver + lodash + echarts + crypto-js + qs + crypto-js
    <br>
    - 可选择性的导入系统库。也可以导入其他库（建议使用 npm i [your pkg] -S）
    <br>
  </div>
</template>

<style lang="less" scoped>
  .third-pkg-pane--container {
    box-sizing: border-box;
    padding: 0 5px;
    overflow: hidden auto;
    width: 100%;
    height: 100%;
  }
</style>
