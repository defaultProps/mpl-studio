<template>
  <div class="right-bar-module--box">
    <div>
      - 点击模板。模板在画板显示。显示层级最高。点击取消则关闭。 点击使用则直接替换相关组件，替换前自动绑定之前绑定的API.
      存在相同API时提示是否替换或者兼容。
      <br>
      - 组件的样式、事件的替换、相关的前端API的新增。
      <br>
      - 组件之间的事件交互，存在多个组件之间的强绑定。一整套规则和样式。
      <br>
      - 组件源码的开放后，关联模板的二次开发需要另存、更新、替换。
    </div>
    <div>1、此功能仅对企业用户开放</div>
    <div>
      2、需要考虑功能无缝迁移问题，保证大部分以前的功能保留 =>
      设计一款适合于研发人员熟悉的方案设计
    </div>
    <div>3、推荐的模板绑定了大量的交互功能，且可选择的保留部分功能</div>
    <div>4、推荐模板加入AI搜索推荐</div>
  </div>
</template>

<style lang="less" scoped>
.right-bar-module--box {
  padding: 10px;
  box-sizing: border-box;
  color: #000;
  font-size: 12px;
  line-height: 25px;
}
</style>
