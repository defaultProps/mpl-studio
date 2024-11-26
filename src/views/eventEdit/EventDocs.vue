<template>
  <div class="event-docs">
    <h3>事件交互文档</h3>
    <div class="svg-demo">
      gif交互图
    </div>
    <div class="svg-demo">
      gif交互图
    </div>
    <div class="svg-demo">
      gif交互图
    </div>
    <div class="svg-demo">
      gif交互图
    </div><div class="svg-demo">
      gif交互图
    </div>

    <div>1、选中状态触发事件的gif动态图展示</div>
    <div>2、事件的参数、名称、调用、返回值描述信息</div>
    <div>3、跳转到事件文档库</div>
    <div>4、列举出已经绑定了该同类型事件的列表及组件</div>
  </div>
</template>
<style lang="less" scoped>
.event-docs {
  padding: 5px 10px;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  h3 {
    margin: 0;
    font-weight: 600;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  .svg-demo {
    width: 350px;
    height: 180px;
    outline: 1px solid var(--color-1);
    border-radius: 3px;
    margin: 10px;
    background: #f6f8fa;
    font-size: 12px;
    color: var(--color-2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
}

</style>