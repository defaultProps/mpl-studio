<script lang="ts" setup>
import { ref } from 'vue'
import { mplIframePostMessage } from '@mpl/const'
import type { FormInstance, FormRules } from 'element-plus'

interface NewIconPackageForm {
  name: string
  url: string
}

const withIconPackages = ref<string[]>(['f4gt456', 'bb5kk8'])
const activeIcon = ref<string>('f4gt456')
const activeProjectPackage = ref<string[]>(['projectIcon', 'systemIcon', 'othersIcon'])
const dialogVisible = ref<boolean>(false)
const newIconPackageForm = ref<NewIconPackageForm>({
  name: '',
  url: ''
})
const formRef = ref<FormInstance>()

const rules = ref<FormRules<NewIconPackageForm>>({
  name: [
    { required: true, message: '请输入图标库名称', trigger: ['blur', 'change' ]}
  ],
  url: [
    { required: true, message: '请输入图标库地址,仅支持iconfont地址', trigger: ['blur', 'change' ]}
  ]
})

interface IconProp {
  label: string
  value: string
  url: string
}

const usageIconList = ref<IconProp[]>([
  { label: '项目图标库', value: 'f4gt456', url: 'https://at.alicdn.com/t/c/font_2784375_i4hi73a82t.js' },
  { label: 'MPL Studio 标准图标库', value: 'bb5kk8', url: 'https://at.alicdn.com/t/c/font_2784375_i4hi73a82t.js' }
])

const marketIconList = ref<IconProp[]>([
  { label: '菜鸟平台图标库', value: 'll9pp0', url: 'https://at.alicdn.com/t/c/font_4535955_mb4jzyvgvyk.js' },
  { label: '天猫图标库', value: '456t675', url: 'https://at.alicdn.com/t/c/font_4535882_m48vpinesa.js' },
  { label: 'ant Design 图标库', value: 'jnh6773', url: 'https://at.alicdn.com/t/c/font_4535931_86pvn06npxf.js' },
  { label: '京东金融图标库', value: 'f23f5g', url: 'https://at.alicdn.com/t/c/font_4535969_n2k6rem2eb.js' },
  { label: '天气图标库', value: 'd8f8g8', url: 'https://at.alicdn.com/t/c/font_4988217_d123if581em.js' },
  { label: '智慧城市', value: 'oo2vv5', url: 'https://at.alicdn.com/t/c/font_4988222_gi2avdhgxlf.js' },
  { label: 'office图标库', value: '3345y6', url: 'https://at.alicdn.com/t/c/font_4535979_9nyw8z7xz7q.js' }
])

function selectActiveIcon(obj: IconProp) {
  const index = withIconPackages.value.indexOf(obj.value)

  if (index >= 0) {
    // loading... 取消挂载组件库
    withIconPackages.value.splice(index, 1)
  } else {
    // 加载组件库 loading...
    withIconPackages.value.push(obj.value)
  }
}

function selectIcon(obj: IconProp) {
  activeIcon.value = obj.value
  mplIframePostMessage.iconIframe.updateIcon(obj.value, obj.url, withIconPackages.value)
}

function handleVisibleIcon(icon: string) {
  const index = activeProjectPackage.value.indexOf(icon)
  if (index >= 0) {
    activeProjectPackage.value.splice(index, 1)
  } else {
    activeProjectPackage.value.push(icon)
  }
}

function handleClose() {
  dialogVisible.value = false
}

function cancelDialog() {
  dialogVisible.value = false
}

function submit() {
  formRef.value!.validate((valid: boolean) => {
    if (valid) {
      dialogVisible.value = false
    }
  })
}
</script>

<template>
  <div class="icon-market--container">
    <div class="icon-sidebar-menu">
      <div class="title" @click="handleVisibleIcon('projectIcon')">
        当前项目图标库
        <i class="icon mpl-icon"
          :class="activeProjectPackage.includes('projectIcon') ? 'icon-xiala-' : 'icon-right1'" />
      </div>
      <template v-if="activeProjectPackage.includes('projectIcon')">
        <div v-for="item in usageIconList" :key="item.value" class="icon-item"
          :class="{ 'is-active': activeIcon === item.value }" @click="selectIcon(item)">
          {{ item.label }}
          <button class="icon-btn" type="button" disabled>
            已使用
          </button>
        </div>
      </template>
      <div class="title" @click="handleVisibleIcon('othersIcon')">
        其他图标库
        <i class="icon mpl-icon" :class="activeProjectPackage.includes('othersIcon') ? 'icon-xiala-' : 'icon-right1'" />
      </div>
      <template v-if="activeProjectPackage.includes('othersIcon')">
        <div v-for="item in marketIconList" :key="item.value" class="icon-item"
          :class="{ 'is-active': activeIcon === item.value }" @click="selectIcon(item)">
          {{ item.label }}
          <button v-show="activeIcon === item.value || withIconPackages.includes(item.value)" class="icon-btn" type="button"
            :class="{ 'is-used': withIconPackages.includes(item.value) }" @click.stop="selectActiveIcon(item)">
            {{ withIconPackages.includes(item.value) ? '已使用' : '使用' }}
          </button>
        </div>
      </template>
      <button class="mpl-btn icon icon-plus mt-5" type="button" @click="dialogVisible = true">
        新增图标库
      </button>
    </div>
    <iframe src="/src/iframe/icon/index.html" name="mplIconIframe" />

    <el-dialog v-if="dialogVisible" v-model="dialogVisible" draggable title="新增图标库" :width="700" :show-close="false"
      :before-close="handleClose" class="dialog-login">
      <el-form ref="formRef" :model="newIconPackageForm" :rules="rules" label-width="120px">
        <el-form-item label="图标库名称" prop="name">
          <el-input v-model.trim="newIconPackageForm.name" />
        </el-form-item>
        <el-form-item label="图标库地址" prop="url">
          <el-input v-model.trim="newIconPackageForm.url" placeholder="请输入图标库地址，仅支持iconfont symbol地址" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <button class="dialog-btn mr-10" type="button" @click="cancelDialog">
          取消
        </button>
        <button class="dialog-btn primary-btn" type="button" @click="submit">
          确认
        </button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.icon-market--container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background: #f6f8fa;
  box-sizing: border-box;
  font-size: 12px;
  padding: 20px;
  color: #cccccc;
  overflow: hidden;

  .icon-sidebar-menu {
    color: #323233;
    width: 230px;
    padding-right: 10px;
    box-sizing: border-box;

    .title {
      display: inline-block;
      width: 100%;
      user-select: none;
      font-size: 12px;
      position: relative;
      line-height: 30px;
      height: 30px;
      text-indent: 5px;
      background: #e6e6e6;
      border-radius: 1px;
      padding-right: 5px;
      color: #1E1E1E;
      font-weight: 600;
      box-sizing: border-box;
      border: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & +.title {
        border-top: none;
      }

      i {
        color: #666;
      }
    }

    .icon-item {
      font-size: 12px;
      line-height: 30px;
      height: 30px;
      user-select: none;
      margin: 3px 0;
      color: #323233;
      cursor: default;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-indent: 5px;

      &:hover {
        color: var(--primary-color);
      }

      &.is-active {
        background: #ffffff;
        color: var(--primary-color);
        font-weight: 600;
      }

      &.is-used {
        display: inline-block;
      }

      button.icon-btn {
        display: inline-block;
        padding: 0 2px;
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }

  iframe {
    height: 100%;
    flex: 1;
    border: none;
    background: #ffffff;
  }
}
</style>
