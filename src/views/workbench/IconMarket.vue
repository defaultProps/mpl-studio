<script lang="ts" setup>
import { ref } from 'vue'
import { mplIframePostMessage } from '@mpl/const'

const withIconPackages = ref<string[]>([])
const activeIcon = ref<string>('f4gt456')
const activeProjectPackage = ref<string[]>(['projectIcon', 'systemIcon', 'othersIcon'])

interface IconProp {
  label: string
  value: string
  url: string
}

const usageIconList = ref<IconProp[]>([
  { label: 'MPL-MHS 标准移动端平台', value: 'f4gt456', url: 'https://at.alicdn.com/t/c/font_2784375_i4hi73a82t.js' }
])

const systemIconList = ref<IconProp[]>([
  { label: 'MPL Studio 标准图标库', value: '123er4', url: 'https://at.alicdn.com/t/c/font_2784375_i4hi73a82t.js' },
  { label: 'MPL 营销云平台图标库', value: 'fg90u', url: 'https://at.alicdn.com/t/c/font_2784375_i4hi73a82t.js' },
  { label: 'MPL 资产云平台图标库', value: 'K1K2K3K45', url: 'https://at.alicdn.com/t/c/font_2784375_i4hi73a82t.js' },
  { label: 'MPL 零售云平台图标库', value: 'L1L2L3L4', url: 'https://at.alicdn.com/t/c/font_2784375_i4hi73a82t.js' }
])

const marketIconList = ref<IconProp[]>([
  { label: '菜鸟平台图标库', value: '12g5', url: 'https://at.alicdn.com/t/c/font_4535955_mb4jzyvgvyk.js' },
  { label: '天猫图标库', value: '456t675', url: 'https://at.alicdn.com/t/c/font_4535882_m48vpinesa.js' },
  { label: '淘宝图标库', value: 'ret34g3', url: 'https://at.alicdn.com/t/c/font_4535902_saa44gtlo6.js' },
  { label: 'ant Design 图标库', value: 'jnh6773', url: 'https://at.alicdn.com/t/c/font_4535931_86pvn06npxf.js' },
  { label: '京东金融图标库', value: 'f23f5g', url: 'https://at.alicdn.com/t/c/font_4535969_n2k6rem2eb.js' },
  { label: 'office图标库', value: '3345y6', url: 'https://at.alicdn.com/t/c/font_4535979_9nyw8z7xz7q.js' }
])

function selectActiveIcon(obj: IconProp) {
  const index = withIconPackages.value.indexOf(obj.value)

  if (index >= 0) {
    // loading... 取消挂载组件库
    withIconPackages.value.splice(index, 1)
  }
  else {
    // 加载组件库 loading...
    withIconPackages.value.push(obj.value)
  }
}

function selectIcon(obj: IconProp) {
  activeIcon.value = obj.value
  mplIframePostMessage.iconIframe.updateIcon(obj.value, obj.url)
}

function handleVisibleIcon(icon: string) {
  const index = activeProjectPackage.value.indexOf(icon)
  if (index >= 0) {
    activeProjectPackage.value.splice(index, 1)
  } else {
    activeProjectPackage.value.push(icon)
  }
}
</script>

<template>
  <div class="icon-market--container">
    <div class="icon-sidebar-menu">
      <div class="title" @click="handleVisibleIcon('projectIcon')">
        应用平台图标库【已使用】
        <i class="icon mpl-icon"
          :class="activeProjectPackage.includes('projectIcon') ? 'icon-xiala-' : 'icon-right1'"></i>
      </div>
      <template v-if="activeProjectPackage.includes('projectIcon')">
        <div v-for="item in usageIconList" :key="item.value" class="icon-item"
          :class="{ 'is-active': activeIcon === item.value }" @click="selectIcon(item)">
          {{ item.label }}
        </div>
      </template>
      <div class="title" @click="handleVisibleIcon('systemIcon')">
        系统图标库
        <i class="icon mpl-icon"
          :class="activeProjectPackage.includes('systemIcon') ? 'icon-xiala-' : 'icon-right1'"></i>
      </div>
      <template v-if="activeProjectPackage.includes('systemIcon')">
        <div v-for="item in systemIconList" :key="item.value" class="icon-item"
          :class="{ 'is-active': activeIcon === item.value, 'is-used': withIconPackages.includes(item.value) }"
          @click="selectIcon(item)">
          {{ item.label }}
          <button v-show="activeIcon" class="icon-btn" @click.stop="selectActiveIcon(item)">使用</button>
        </div>
      </template>
      <div class="title" @click="handleVisibleIcon('othersIcon')">
        其他图标库
        <i class="icon mpl-icon"
          :class="activeProjectPackage.includes('othersIcon') ? 'icon-xiala-' : 'icon-right1'"></i>
      </div>
      <template v-if="activeProjectPackage.includes('othersIcon')">
        <div v-for="item in marketIconList" :key="item.value" class="icon-item"
          :class="{ 'is-active': activeIcon === item.value, 'is-used': withIconPackages.includes(item.value) }"
          @click="selectIcon(item)">
          {{ item.label }}
          <button v-show="activeIcon" class="icon-btn" @click.stop="selectActiveIcon(item)">
            {{ withIconPackages.includes(item.value) ? '卸载' : '使用' }}
          </button>
        </div>
      </template>
    </div>
    <iframe src="/src/iframe/icon/index.html" name="mplIconIframe" />
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
  color: var(--color-1);
  overflow: hidden;

  .icon-sidebar-menu {
    color: var(--color-3);
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
      color: #000;
      font-weight: 600;
      box-sizing: border-box;
      border: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;

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
      color: var(--color-3);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-indent: 5px;

      &.is-used,
      &.is-active {
        button {
          display: inline-block;
        }
      }

      &:hover {
        color: var(--primary-color);
      }

      &.is-active {
        background: var(--color-7);
        color: var(--primary-color);
        font-weight: 600;
      }

      button {
        display: none;
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
    background-color: var(--color-7);
  }
}
</style>
