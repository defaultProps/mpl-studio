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
import { projectStore } from '@mpl/store'
import CssCode from './CssCode.vue'
import ProjectDetail from './ProjectDetail.vue'
import I18nMarket from './I18nMarket.vue'

const project = projectStore()

</script>

<template>
  <main class="workbench-box">
    <section class="workbench-container">
      <PageWorkbench v-show="project.activeFile?.type === 'basePage'" />
      <ThemeWorkbench v-if="project.activeFile?.type === 'themeMarket'" />
      <GitCodeModel v-if="project.activeFile?.type === 'vue'" />
      <DocWorkbench v-if="project.activeFile?.type === 'doc'" />
      <ResourceWorkbench v-if="project.activeFile?.type === 'resource'" />
      <JavaScriptIDE v-if="project.activeFile?.type === 'javascript'" />
      <ImgPreview v-if="project.activeFile?.type === 'image'" />
      <CssCode v-if="project.activeFile?.type === 'css'" />
      <ModuleMarket v-if="project.activeFile?.type === 'moduleMarket'" />
      <IconMarket v-if="project.activeFile?.type === 'iconMarket'" />
      <ImageMarket v-if="project.activeFile?.type === 'imageMarket'" />
      <JsPackageMarket v-if="project.activeFile?.type === 'javascriptMarket'" />
      <ProjectDetail v-if="project.activeFile?.type === 'projectDetail'" />
      <I18nMarket v-if="project.activeFile?.type === 'i18nMarket'" />
      <!-- 命令面板 -->
      <!-- serviceMarket -->
    </section>
  </main>
</template>
<style lang="less" scoped>
main.workbench-box {
  width: 100%;
  flex: 1;
  overflow: hidden;

  section.workbench-container {
    height: 100%;
    overflow: hidden;
    width: 100%;
    position: relative;
  }
}
</style>
