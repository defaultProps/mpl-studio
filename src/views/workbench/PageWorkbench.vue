<script lang="ts" setup>
import ComponentIframe from './ComponentIframe.vue'
import OperationBanner from './footer/OperationBanner.vue'
import { projectStore, workbenchStore } from '@mpl/store'

const workbench = workbenchStore()
const project = projectStore()

</script>

<template>
  <el-splitter layout="vertical" lazy>
    <el-splitter-panel>
      <ComponentIframe />
    </el-splitter-panel>
    <el-splitter-panel v-model:size="workbench.footerOperation.size" :min="workbench.footerOperation.visible ? 300 : 0"
      :max="700" :collapsible="workbench.footerOperation.visible">
      <OperationBanner v-if="project.lockedFileList.includes(project.activeFileId)" />
    </el-splitter-panel>
  </el-splitter>
</template>