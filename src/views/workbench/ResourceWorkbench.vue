<script lang="ts" setup>
import { ref } from "vue";

type RequestType =
  | "get"
  | "post"
  | "delete"
  | "options"
  | "put"
  | "patch"
  | "header";
const url = ref<string>("/mpl/prototype/getBaseArticleList");
const requestType = ref<RequestType>("get");
</script>

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
      <el-input v-model="url">
        <template #prepend>
          <select
            v-model="requestType"
            placeholder="Select"
            style="width: 115px"
          >
            <option label="GET" value="get" />
            <option label="POST" value="post" />
          </select>
        </template>
      </el-input>
      <button title="send" class="send-btn">发送</button>
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
  color: var(--color-1);
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
        color: var(--color-1);
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
    background-color: #111010;
    padding-bottom: 15px;
    .el-input {
      flex: 1;
    }
    .send-btn {
      width: fit-content;
      height: 32px;
      padding: 0 10px;
      margin-left: 10px;
      background-color: var(--primary-color);
      color: var(--color-7);
      outline: 0;
      border: 0;
      border-radius: 4px;
      font-weight: 600;
    }
  }
}
</style>
