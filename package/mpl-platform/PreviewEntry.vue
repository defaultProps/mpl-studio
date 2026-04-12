<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MaskLoading from './components/MaskLoading.vue'
import { workbenchStore, projectStore } from '@mpl/store'

const loading = ref<boolean>(true)
const workbench = workbenchStore()

function loadIframe() {
  console.log('加载完成')
  loading.value = false
  document.title = 'MPL Studio - 显示与亮度【张丽】'
}

onMounted(() => {
  window.addEventListener('message', e => {
    const obj = e.data

    // 初始化左侧菜单目录
    if (obj.type === 'GET_MENU_LIST') {
      window.frames.dfnIframe?.postMessage('INIT_PROJECT_DIR', JSON.stringify(projectStore().projectTree))
    }
  })
})
</script>
<template>
  <MaskLoading v-if="loading" />
  <!-- v-if="workbench.activePlatform.includes('MPL-DFN')" -->
  <iframe name="dfnIframe" src="/package/mpl-platform/mpl-dfn/preview/index.html" @load="loadIframe" />

  <!-- mpl 标准移动端平台 -->
  <!-- <iframe v-if="workbench.activePlatform.includes('MPL-MHS')" id="mpl-app" name="mpl-app"
    src="/package/mpl-platform/mpl-app/preview/index.html" @load="loadIframe" /> -->
</template>

<style lang="less" scoped>
iframe[name='dfnIframe'] {
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;
  border: none;
  padding: 0;
}
</style>
