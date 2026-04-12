<template>
  <div class="intelligent-detection--pane">
    <div class="line warning">
      交互列表的
      <span class="link">开启弹窗</span>失效
    </div>
    <div class="line error">
      发现按钮组件<span class="link">qw8th6</span><span class="link">点击事件</span>丢失，请检测IDE中点击事件是否存在。
    </div>
    <div class="line warning">
      发现图片组件<span class="link">fb3ht7</span>引入图片avatar.png无法访问，请检查URL地址是否正常。
    </div>
    <div class="line warning">
      发现输入框组件<span class="link">bq4uk7</span>引入的图标库<span class="link">ftjg5sg43.css</span>未找到此图标，请检测是否输入正确。
    </div>
    <div class="line attention">
      发现弹窗组件<span class="link">sd2jt7</span>底部按钮未绑定常规事件【点击】，请检测是否遗漏。
    </div>
    <div class="line info">
      MPL3.5正式上线，最新功能点击查看<span class="link">>>></span>
    </div>
    <div class="line">
      消息更新时间设置为用户未操作后10s触发检测。
    </div>
    <div class="line">
      消息类型过滤、一键清空、查询消息、消息内容点击跳转到具体位置
    </div>
    <div class="line">
      1、社区版、企业版功能。
    </div>
    <div class="line">
      2、监控到错误信息时，必须处理完成后才可保存。
    </div>
    <div class="line">
      3、提供：删除【仅允许删除注意、消息类型，禁止删除错误类型】、点击跳转具体位置、
    </div>
    <div class="line">
      4、企业版提供自定义功能：开启关闭、自定义判定信息类型、关闭此类提示、增加提示【系统提供严格校验版本、宽松版本】。
    </div>
    <div class="line">
      消息列表
    </div>
  </div>
</template>

<style lang="less">
.intelligent-detection--pane {
  overflow: hidden;
  height: 100%;
  width: 100%;
  font-size: 12px;
  box-sizing: border-box;
  padding: 5px;

  >.line {
    padding: 5px 10px 10px 45px;
    position: relative;
    margin: 5px 0;

    &:hover {
      outline: 1px solid #cccccc;
      background: #f0f0f0;
    }

    &::before {
      color: #ffffff;
      padding: 0 5px;
      border-radius: var(--radius-2);
      margin-right: 5px;
      height: 20px;
      font-weight: 600;
      user-select: none;
      left: 5px;
      display: inline-block;
      position: absolute;
    }

    &.warning {
      &::before {
        content: '警告';
        background: #e6a23c;
      }
    }

    &.error {
      &::before {
        content: '错误';
        background: #c3002f;
      }
    }

    &.attention {
      &::before {
        content: '错误';
        background: #c3002f;
      }
    }

    &.info {
      &::before {
        content: '消息';
        background: var(--primary-color);
      }
    }

    .link {
      text-decoration: underline;
      color: var(--primary-color);
      margin: 0 3px;
      cursor: default;
      font-weight: 600;
      font-size: 13px;
    }

    .bold {
      color: #1E1E1E;
      font-weight: 600;
      font-size: 12px;
    }
  }
}
</style>
