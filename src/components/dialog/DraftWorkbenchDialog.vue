<script setup lang="ts">
import mplStore from '@mpl/store'

const coreView = mplStore.viewStore()
</script>

<template>
  <el-dialog
    v-model="coreView.visibleDraftDialog"
    title="草稿图层"
    width="600px"
    class="mpl-dialog"
    draggable
    :modal="false"
    :show-close="false"
    append-to-body
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer" />
    </template>
  </el-dialog>
</template>
