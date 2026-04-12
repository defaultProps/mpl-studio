<script lang="ts" setup>
import { ref } from 'vue'
import i18nInstance from '@mpl/i18n'
import type { FormInstance, FormRules } from 'element-plus'
import { projectList } from '@mpl/const'
import { projectStore } from '@mpl/store'

const project = projectStore()

function getProjectDetail(id: string) {
  project.initDemoProject(id)
  // 企业版项目需要用户登录才能查看使用
}
const dialogVisible = ref<boolean>(false)

function handleClose() {
  //
}

interface LoginForm {
  username: string
  password: string
}

const loginFormRef = ref<FormInstance>()
const loginForm = ref<LoginForm>({
  username: '张三',
  password: '123456',
})

const rules = ref<FormRules<LoginForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

function cancelDialog() {
  dialogVisible.value = false
  loginFormRef.value!.resetFields()
}

function login() {
  loginFormRef.value!.validate((valid: boolean) => {
    if (valid) {
      localStorage.setItem('mpl-login-info', JSON.stringify({
        username: loginForm.value.username,
        password: loginForm.value.password
      }))
      dialogVisible.value = false
    }
  })
}

</script>

<template>
  <div class="initial-page--container">
    <el-dialog v-if="dialogVisible" v-model="dialogVisible" top="350px" title="登录" width="700" :show-close="false"
      :destroy-on-close="false" :before-close="handleClose" :close-on-press-escape="false" :close-on-click-modal="false"
      class="dialog-login">
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
        <el-form-item label="账户" prop="username">
          <el-input v-model.trim="loginForm.username" disabled />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="loginForm.password" type="password" disabled show-password />
        </el-form-item>
        <div class="demo-account">
          <div class="demo-account-item">
            演示账号*企业版
            <span>张三/123456</span>
          </div>
          <div class="demo-account-item">
            演示账号*社区版
            <span>李四/123456</span>
          </div>
        </div>
      </el-form>
      <template #footer>
        <button class="dialog-btn mr-10" type="button" @click="cancelDialog">
          取消
        </button>
        <button class="dialog-btn primary-btn" type="button" @click="login">
          确认
        </button>
      </template>
    </el-dialog>
    <div class="header-logo">
      <h1>Middle Platform LowCode Studio</h1>
      <div style="margin: 10px 0">
        {{ i18nInstance.global.t('initPage.subTitle') }}
      </div>
      <strong>{{ i18nInstance.global.t('initPage.subTitleTag') }}</strong>
      <button type="button" class="register-btn" disabled @click="dialogVisible = true">
        注册
      </button>
      <button type="button" class="login-btn" @click="dialogVisible = true">
        登录
      </button>
    </div>
    <div class="mpl-pane-box">
      <div v-for="item in projectList" :key="item.id" class="demo-block">
        <div class="enterprise-logo">
          企业版
        </div>
        <img :src="item.logo" alt="logo">
        <div class="right-block">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <div class="technology-tag">
            <span v-for="p in item.platformList" class="tag is-select">{{ p.name }}</span>
            <span v-for="p in item.technology" class="tag">{{ p }}</span>
          </div>
          <button class="edit-btn mr-5 is-select" type="button" @click.stop="getProjectDetail(item.id)">
            编辑
          </button>
          <button class="view-btn" type="button">
            预览
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.initial-page--container {
  height: 100%;
  color: #1E1E1E;
  background: #ffffff;
  box-sizing: border-box;
  overflow: auto;

  .header-logo {
    text-align: center;
    margin-top: 100px;

    h1 {
      position: relative;
      display: inline-block;
      font-size: 42px;
      margin: 0;

      &::after {
        content: 'v14.12.18';
        user-select: none;
        pointer-events: none;
        font-size: 14px;
        position: absolute;
        top: 0px;
        right: -46px;
        font-style: italic;
        font-weight: 600;
        color: #1e1e1e;
      }
    }

    strong {
      display: block;
    }

    .register-btn {
      margin-right: 10px;
    }

    .register-btn,
    .login-btn {
      margin-top: 25px;
      padding: 4px 13px;
      font-size: 16px;
      cursor: pointer;
    }
  }

  .mpl-pane-box {
    display: flex;
    flex-wrap: wrap;
    width: 1600px;
    margin: 50px auto 0;

    .demo-block {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 523px;
      height: 172px;
      overflow: hidden;
      font-size: 13px;
      margin: 5px;
      padding: 3px;
      box-sizing: border-box;
      border-radius: 10px;
      color: #1E1E1E;
      background: #f6f8fa;
      position: relative;
      cursor: default;

      .edit-btn,
      .view-btn {
        display: none;
      }

      &:hover {

        .edit-btn,
        .view-btn {
          display: inline-block;
        }
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
          content: '';
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
        margin-top: 10px;
        margin-right: 10px;
      }

      .right-block {
        flex: 1;
        height: 100%;
        text-align: left;


        .technology-tag {
          margin-bottom: 10px;

          .tag {
            background: #cccccc;
            padding: 2px 4px;
            margin-right: 10px;
            border-radius: var(--radius-2);
            color: #1e1e1e;
            user-select: none;
            font-size: 12px;

            &.is-select {
              background: var(--primary-color);
              color: #fff;
            }
          }
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

.dialog-login {

  .demo-account {
    font-size: 12px;

    .demo-account-item span {
      font-weight: 600;
    }
  }
}
</style>
