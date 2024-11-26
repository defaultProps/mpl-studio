<script setup lang="ts">
import { ref } from 'vue'

const visibleModuleDialog = ref<boolean>(false)

function handleSelectModule() {
  visibleModuleDialog.value = true
}

const activeModuleTab = ref<string>('communityModule')

const mobuleTabs = [
  { label: '社区模板', value: 'communityModule', icon: 'mpl-kuaicunchu' },
  { label: '企业模板', value: 'enterpriseModule', icon: 'mpl-shujuzhongjian' },
  { label: '帮助文档', value: 'helpDoc', icon: 'mpl-shujuzhongjian' }
]

</script>

<template>
  <div class="module-market-page">
    <div class="header-module">
      <h2>模板市场</h2>
      <div><strong>拥有完整的多组件集合的业务功能模块，提供快捷生成页面功能。</strong></div>
      <div class="module-tabs--box">
        <div v-for="item in mobuleTabs" :key="item.value" class="radio"
          :class="{ active: item.value === activeModuleTab }" @click="activeModuleTab = item.value">
          {{ item.label }}
        </div>
      </div>
    </div>

    <div class="module-content">
      <div><strong> 查询：类型、标题、业务功能、内置组件、应用平台</strong></div>
      <div v-for="item in Array(20)" :key="item" class="module-block">
        <div class="avatar" @click.stop="handleSelectModule()">
          <img src="../../../assets/avatar.jpg" alt="">
        </div>
        <div class="meta-info mpl-scroll-none">
          <div class="title">营销查询表格</div>
          <span class="tag">表格</span>
          <span class="tag">列表</span>
          <span class="tag">ElementPlus</span>
          <!-- <span class="tag">列表</span>
          <span class="tag">图表</span>
          <span class="tag">目录树</span>
          <span class="tag">展示</span> -->
          <span class="tag">MPL-MHS 标准移动端平台</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.module-market-page {
  width: 100%;
  overflow: hidden auto;
  height: 100%;
  background-color: var(--color-7);
  color: #000;
  font-size: 14px;

  .header-module {
    height: 150px;
    width: 100%;
    background-color: #111010;
    padding: 10px 20px 35px 4px;
    box-sizing: border-box;
    font-size: 12px;
    position: relative;
    background: #f6f8fa;
    color: #000;
    box-shadow: 0px -1px 0px 0 var(--color-1) inset;

    h2 {
      margin: 10px 0;
      padding: 0;
      margin-block: 0;
      margin-bottom: 10px;
      display: block;
    }

    .module-tabs--box {
      position: absolute;
      left: 5px;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      .radio {
        padding: 5px 8px 4px 8px;
        color: #000;
        user-select: none;
        font-weight: 600;
        font-size: 12px;
        cursor: pointer;

        &.active {
          color: var(--primary-color);
          background: var(--color-7);
          background-color: var(--color-7);
          border-bottom: none;
          border-radius: 3px 3px 0px 0px;
          overflow: hidden;
          box-shadow: 0px 1px 0px 0px inset var(--color-1), 1px 0px 0px 0px inset var(--color-1), -1px 0px 0px 0px inset var(--color-1);
        }

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }

  .module-content {
    padding: 10px;

    .module-block {
      width: 235px;
      font-size: 12px;
      border-radius: 3px;
      margin: 10px;
      overflow: hidden;
      display: inline-block;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

      .avatar {
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #f6f8fa;
        background-color: #f6f8fa;
        cursor: default;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          transition: all 0.1s;

          &:hover {
            transform: scale(1.1);
          }
        }
      }

      .meta-info {
        padding: 5px;
        box-sizing: border-box;
        height: 76px;
        overflow: auto;

        .title {
          display: flex;
          padding: 5px 0;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
        }
        .tag {
          background-color: #ccc;
          padding: 1px 4px;
          border-radius: 2px;
          font-size: 12px;
          display: inline-block;
          margin: 0 2px 2px 0;
        }

        .el-tag {
          padding: 0 4px;
          margin-right: 5px;
        }

        .author {
          margin: 3px 0;
        }
      }
    }
  }
}
</style>
