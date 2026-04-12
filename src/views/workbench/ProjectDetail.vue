<script lang="ts" setup>
import { ref } from 'vue'

const projectInfo = ref({
  projectName: '',
  detail: '',
  createTime: '2025-09-12 10:00:00',
  createBy: '17712345670@gmail.com',
  // 相关所有相关成员
  members: [
    {
      name: '张三',
      email: '17712345670@gmail.com',
      authority: 'manager'
    },
    {
      name: '李四',
      email: '17734565434@gmail.com',
      authority: 'manager'
    },
    {
      name: '王五',
      email: '18045937485@gmail.com',
      authority: 'developer'
    },
    {
      name: '赵六',
      email: '18045937486@gmail.com',
      authority: 'developer' // 开发者， 可以编辑项目代码。包括新建页面，针对页面编辑. 不允许删除项目，更改项目名称，删除项目成员， 删除项目服务，删除项目绑定的图标库
    },
    {
      name: '钱七',
      email: '18045937487@gmail.com',
      authority: 'viewer' // 访客， 只有查看权限
    },
    {
      name: '孙八',
      email: '18045937488@gmail.com',
      authority: 'viewer'
    },
    {
      name: '吴九',
      email: '18045937489@gmail.com',
      authority: 'viewer'
    }
  ],
  pageCounter: 100, // 项目页面数量
  serviceList: [], // 项目绑定的服务列表
  frontEndURL: '', // 项目前端URL
  frontEndBranch: 'develop', // 项目前端分支
  backEndURL: '', // 项目后端URL
  backEndBranch: 'develop', // 项目后端分支
  previewLocation: '', // 项目语言站点
  clientAPI: [], // 项目使用的客户端API列表
  applicationPlatform: 'vue3-sfc-loader', // 项目应用平台
  i18nOpen: true, // 是否开启多语言
  i18nDefaultLanguage: 'sc', // 项目默认语言
  i18nLanguageList: ['sc', 'tc', 'en', 'ja'], // 项目可切换的多语言
  iconList: [], // 当前已经绑定的图标库
  javascriptList: ['jquery', 'copy-to-clipboard', 'ag-grid-vue3', 'jquery', 'mpl'], // 当前绑定的npm仓库
  imgList: [ // 图片仓库列表
    {
      name: 'mpl studio图片库',
      type: 'url',
      path: ''
    }
  ],
})

</script>
<template>
  <div class="project-detail--box">
    <h3>项目详情</h3>
    <div class="label-line">
      <div class="label">
        项目名称
      </div>
      <input v-model="projectInfo.projectName" class="mpl-input input-medium">
    </div>
    <div class="label-line">
      <div class="label">
        项目详情
      </div>
      <textarea v-model="projectInfo.detail" rows="4" maxlength="250" class="mpl-textarea" placeholder="请输入项目详情..." />
    </div>
    <div class="label-line">
      <div class="label">
        创建时间
      </div>
      <input v-model="projectInfo.createTime" class="mpl-input input-medium" readonly>
    </div>
    <div class="label-line">
      <div class="label">
        创建人
      </div>
      <input v-model="projectInfo.createBy" class="mpl-input input-medium">
    </div>
    <div class="label-line">
      <div class="label">
        当前页面数量
      </div>
      <input v-model="projectInfo.pageCounter" class="mpl-input input-medium">
    </div>
    <div class="label-line">
      <div class="label">
        项目成员
      </div>
      <table border cellspacing="0">
        <thead>
          <tr>
            <th>姓名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in projectInfo.members" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.authority }}</td>
            <td>
              <button v-if="item.authority !== 'manager'" type="button">
                编辑
              </button>
              <button v-if="item.authority !== 'manager'" class="ml-5 del-btn" type="button">
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="mt-5" type="button">
        添加成员
      </button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.project-detail--box {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden auto;

  .label-line {
    position: relative;
    padding-bottom: 15px;

    .label {
      text-align: left;
      user-select: auto;
      font-size: 14px;
    }

    .line-item {
      display: flex;
      margin-bottom: 10px;
      margin-right: 10px;
    }

    input,
    select {
      width: 250px;
      max-width: 250px;
    }

    textarea {
      width: 800px;
      min-width: 800px;
      max-width: 800px;
      min-height: 100px;
      max-height: 100px;
      height: 100px;
      font-size: 14px;
    }

    table {
      width: 100%;

      thead th {
        text-align: left;
        text-indent: 10px;
      }

      tr {
        height: 40px;
        text-indent: 10px;
      }

      tbody tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>