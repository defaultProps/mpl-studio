<script lang="ts" setup>
import { ref } from "vue";
import { projectList } from "@mpl/const";
import LoginDialog from './dialog/LoginDialog.vue'
import i18nInstance from '@mpl/i18n'
import mplStore from '@mpl/store'
import { ElMessageBox } from 'element-plus'

const projectStore = mplStore.projectStore()
const dialogVisible = ref<boolean>(false)

function handleInitDemoProject(id: string) {
  console.log(projectStore.activeProject)
  if (projectStore.activeProject) {
    ElMessageBox.confirm('已存在演示项目，切换演示项目数据将全部重置，是否确认？', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      projectStore.initDemoProject(id)
    })
  } else {
    projectStore.initDemoProject(id)
  }
}
</script>

<template>
  <div class="initial-page--container">
    <LoginDialog v-if="dialogVisible" />
    <div class="header-logo">
      <div class="left-title">
        <h1>
          Middle Platform LowCode Studio
          <span>v14.12.18</span>
        </h1>
        <h2>{{ i18nInstance.global.t("initPage.subTitle") }}</h2>
        <h2>{{ i18nInstance.global.t("initPage.subTitleTag") }}</h2>
        <template v-if="!projectStore.userRole">
          <button class="register-btn">注册</button>
          <button class="login-btn" @click="dialogVisible = true">登录</button>
        </template>
      </div>
      <div class="home-img">
        <video width="40vw" height="40vh" style="width: 40vw; height: 40vh" loop controls muted
          controlslist="nofullscreen nodownload noremoteplayback">
          <source src="" type="video/mp4" />
        </video>
      </div>
    </div>
    <h3 class="title">
      {{ i18nInstance.global.t("initPage.projectDemo") }}
    </h3>
    <div class="demo-list">
      <div v-for="item in projectList" :key="item.id" class="demo-block" @click="handleInitDemoProject(item.id)">
        <div class="enterprise-logo">企业版</div>
        <img src="@/assets/logo.png" alt="logo" />
        <div class="right-block">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="technology-tag">
            <span v-for="tag in item.technology" class="tag">{{ tag }}</span>
          </div>
          <span class="platform" v-for="tag in item.platform">{{ tag.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.initial-page--container {
  height: 100%;
  color: #000;
  background-color: var(--color-7);
  box-sizing: border-box;
  padding: 5px 15px 20px;
  overflow: auto;

  .header-logo {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    margin-bottom: 10px;
    padding: 0 40px 0;
    box-sizing: border-box;

    .left-title {
      font-size: 16px;
      height: 100%;
      color: #000;

      .register-btn {
        padding: 6px 14px;
        color: #000;
        font-family: Microsoft YaHei;
        border: 1px solid transparent;
        outline: none;
        border-radius: 2px;
        font-size: 14px;
        cursor: pointer;

        &:hover,
        &:focus {
          outline: 1px solid var(--color-1);
        }
      }

      .login-btn {
        padding: 6px 14px;
        background: var(--primary-color);
        color: var(--color-7);
        font-family: Microsoft YaHei;
        outline: none;
        border-radius: 2px;
        font-size: 14px;
        margin-left: 10px;
        cursor: pointer;
        border: 1px solid var(--primary-color);
        outline: none;

        &:hover,
        &:focus {
          outline: 1px solid var(--color-1);
        }
      }

      .el-button--primary.is-disabled {
        color: #000;
        background: var(--primary-color);
        border-color: var(--primary-color);
        opacity: 0.8;

        &.is-loading:before {
          background-color: transparent;
          cursor: not-allowed;
        }
      }

      h1 {
        line-height: 45px;
        font-size: 30px;
        font-style: italic;
        position: relative;

        span {
          border: none;
          padding: 0 4px;
          height: 16px;
          font-size: 12px;
          color: #535353;
          background: transparent;
          font-weight: 600;
          position: absolute;
          top: -15px;
          user-select: none;
          pointer-events: none;
        }
      }

      .el-tag {
        position: relative;
        top: -20px;
      }

      h2 {
        line-height: 18px;
        font-size: 18px;
        font-weight: 400;
      }
    }

    .home-img {
      margin-top: 30px;
      height: 40vh;
      max-width: 40vw;
      background-color: var(--color-2);
    }
  }

  .tooltip {
    position: relative;
    color: red;
    display: inline-block;
    border-bottom: 1px dotted black;
    /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: var(--color-7);
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  h3.title {
    text-align: center;
    font-size: 24px;
    margin: 50px 0 30px;
    color: var(--color-2);
  }

  .demo-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .demo-block {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 480px;
      height: 220px;
      overflow: hidden;
      font-size: 13px;
      margin: 10px;
      padding: 3px;
      box-sizing: border-box;
      outline: 1px solid #d0d7deb3;
      border-radius: 10px;
      color: #000;
      background-color: #f6f8fa;
      position: relative;
      cursor: pointer;

      &:hover {
        outline: 1px dashed var(--primary-color);
      }

      .enterprise-logo {
        position: absolute;
        top: 12px;
        right: 2px;
        text-align: center;
        transform: rotate(45deg);
        font-size: 12px;
        color: var(--primary-color);
        pointer-events: none;
        transform-origin: center center;
        pointer-events: none;

        &::after {
          content: "";
          width: 110px;
          left: -20px;
          top: -30px;
          height: 50px;
          background: #cccccc;
          position: absolute;
          z-index: -1;
        }
      }

      img {
        width: 50px;
        margin-right: 10px;
      }

      .right-block {
        flex: 1;
        height: 100%;
        text-align: left;

        .technology-tag {
          margin-bottom: 10px;

          .tag {
            background: var(--color-1);
            padding: 2px 4px;
            margin-right: 10px;
            border-radius: 2px;
            color: var(--color-5);
            user-select: none;
            font-size: 12px;
          }
        }

        .platform {
          background: var(--primary-color);
          padding: 2px 4px;
          margin-right: 10px;
          border-radius: 2px;
          color: var(--color-7);
          user-select: none;
          font-size: 12px;
        }

        h3 {
          margin-block: 0;
          margin: 10px 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>