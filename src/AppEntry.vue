<script lang="ts" setup>
import { onMounted } from 'vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import { useThrottleFn } from '@vueuse/core'

onMounted(() => {
  const theme = localStorage.getItem('theme')
  if (theme === 'dark') {
    document.body.classList.add('dark-theme')
    document.body.classList.remove('light-theme')
  } else {
    document.body.classList.add('light-theme')
    document.body.classList.remove('dark-theme')
  }
})

function closeContextmenu() {
  ContextMenu.closeContextMenu()
}

const closeContextmenuThrottle = useThrottleFn(closeContextmenu, 300)

onMounted(() => {
  window.addEventListener('resize', closeContextmenuThrottle)
})
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>
<style lang="less" scoped>
.app-container {
  width: 100%;
  height: 100%;
}
</style>