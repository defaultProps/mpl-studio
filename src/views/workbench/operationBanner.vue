<script lang="ts" setup>
import PageWorkbench from './PageWorkbench.vue'
import ThemeWorkbench from './ThemeWorkbench.vue'
import DocWorkbench from './DocWorkbench.vue'
import IconMarket from './IconMarket.vue'
import ResourceWorkbench from './ResourceWorkbench.vue'
import GitCodeModel from './gitCodeModel/index.vue'
import JavaScriptIDE from './JavaScriptIDE.vue'
import ImgPreview from './ImgPreview.vue'
import ModuleMarket from './ModuleMarket/index.vue'
import ImageMarket from './ImageMarket.vue'
import JsPackageMarket from './JsPackageMarket.vue'
import mplStore from '@mpl/store'
import CssCode from './CssCode.vue'

const projectStore = mplStore.projectStore()
</script>

<template>
  <div class="operation-banner--container">
    <PageWorkbench v-show="projectStore.activeFile?.type === 'page'" />
    <ThemeWorkbench v-if="projectStore.activeFile?.type === 'themeMarket'" />
    <GitCodeModel v-if="projectStore.activeFile?.type === 'vue'" />
    <DocWorkbench v-if="projectStore.activeFile?.type === 'doc'" />
    <ResourceWorkbench v-if="projectStore.activeFile?.type === 'resource'" />
    <JavaScriptIDE v-if="projectStore.activeFile?.type === 'javascript'" />
    <ImgPreview v-if="projectStore.activeFile?.type === 'image'" />
    <CssCode v-if="projectStore.activeFile?.type === 'css'" />
    <ModuleMarket v-if="projectStore.activeFile?.type === 'moduleMarket'" />
    <IconMarket v-if="projectStore.activeFile?.type === 'iconMarket'" />
    <ImageMarket v-if="projectStore.activeFile?.type === 'imageMarket'" />
    <JsPackageMarket v-if="projectStore.activeFile?.type === 'javascriptMarket'" />
    <!-- serviceMarket -->
  </div>
</template>

<style scoped lang="less">
.operation-banner--container {
  overflow: hidden;
  flex: 1;
  height: 100%;
  position: relative;
}
</style>
