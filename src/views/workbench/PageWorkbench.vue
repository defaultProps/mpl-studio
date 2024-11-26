<script lang="ts" setup>
import ComponentIframe from './ComponentIframe.vue'
import OperationBanner from './footer/OperationBanner.vue'
import mplStore from '@mpl/store'

const coreView = mplStore.viewStore()
const projectStore = mplStore.projectStore()
</script>

<template>
  <div class="page-workbench--container">
    <ComponentIframe />
    <div
      v-show="projectStore.lockedFileList.includes(projectStore.activeFileId)"
      :class="[coreView.workbenchFooterToolSize]"
      class="footer-workbench"
    >
      <OperationBanner />
    </div>
  </div>
</template>

<style scoped lang="less">
.page-workbench--container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .footer-workbench {
    height: 200px;
    width: 100%;
    background: var(--color-7);

    &.mini {
      height: 25px;
    }

    &.small {
      height: 350px;
    }

    &.medium {
      height: 600px;
    }
    &.large {
      height: 800px;
    }
  }
}
</style>
