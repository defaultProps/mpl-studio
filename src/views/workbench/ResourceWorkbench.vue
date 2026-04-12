<template>
  <div class="service-container">
    <div class="http-breadcrumb">
      <div class="http-icon icon icon-icon-http" />
      <div class="breadcrumb">
        <span>MPL服务</span>
        <span class="divider">/</span>
        <span>原型服务</span>
        <span class="divider">/</span>
        <span>获取基础文章列表</span>
      </div>
    </div>
    <div class="http-header">
      <button title="send" class="send-btn" type="button">
        发送
      </button>
    </div>
    <div class="http-request" />
    <div class="http-response" />
    <div class="http-comment" />
  </div>
</template>

<style lang="less" scoped>
  .service-container {
    width: 100%;
    height: 100%;
    background: #111010;
    font-size: 12px;
    color: #cccccc;

    .http-breadcrumb {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 40px;
      width: 100%;

      .http-icon {
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: var(--primary-color);
        margin-left: 10px;
        font-size: 14px;
      }

      .breadcrumb {
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        span {
          margin: 0 3px;
          color: #cccccc;

          &:last-child {
            color: var(--primary-color);
          }

          &.divider {
            color: #535353;
          }
        }
      }
    }

    .http-header {
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #111010;
      padding-bottom: 15px;

      .send-btn {
        width: fit-content;
        height: 32px;
        padding: 0 10px;
        margin-left: 10px;
        background: var(--primary-color);
        color: #ffffff;
        outline: 0;
        border: 0;
        border-radius: var(--radius-4);
        font-weight: 600;
      }
    }
  }
</style>
