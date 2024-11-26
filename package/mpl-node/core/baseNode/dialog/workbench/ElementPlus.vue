<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { DialogProp } from '../define'

const props = defineProps<{ node: DialogProp, activeCid: string }>()
const dialogVisible = ref<boolean>(props.node.cid === props.activeCid)
const nodeClick = inject('nodeClick') as any
watch(
  () => props.activeCid,
  () => {
    dialogVisible.value = props.activeCid === props.node.cid
  },
)

function handleCloseDialog() {
  nodeClick('mpl-body-cid')
  dialogVisible.value = false
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    append-to-body
    destroy-on-close
    class="mpl-dialog"
    :close-on-press-escape="false"
    width="1000"
    :show-close="false"
    :class="[props.node.cid]"
    top="40px"
    @close="nodeClick('mpl-body-cid')"
  >
    <template #header>
      <div class="drawer-title">
        {{ props.node.header.title }}
      </div>
      <div class="button-group">
        <el-button
          v-for="btn in props.node.header.btnGroup"
          :key="btn.cid"
        >
          {{ btn.title }}
        </el-button>
        <el-button v-if="props.node.header.showClose">
          <el-icon>
            <Close />
          </el-icon>
        </el-button>
      </div>
      <slot />
    </template>
    <div
      class="mpl-body-content"
      :style="{ height: `${props.node.body.height}px` }"
    >
      <div class="mpl-empty-text">
        请拖入控件
      </div>
    </div>
    <template #footer>
      <el-button
        class="icon icon-close"
        @click="handleCloseDialog"
      >
        取消
      </el-button>
      <el-button
        class="mpl-primary-btn icon icon-check"
        @click="handleCloseDialog"
      >
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="less">
.mpl-dialog {
  padding: 0;
  .el-dialog__header {
    padding: 0 10px;
    height: 50px;
    display: flex;
    margin: 0;
    color: #000;
    border-bottom: 1px solid var(--color-1);
    align-items: center;
    justify-content: space-between;

    .dialog-close-btn i {
      color: #666;
    }
  }

  .el-dialog__body {
    padding: 0;
  }

  .mpl-body-content {
    width: 100%;
    height: 100%;
    overflow: hidden auto;
    box-sizing: border-box;

    .mpl-empty-text {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
    }
  }

  .el-dialog__footer {
    padding: 0 10px;
    height: 50px;
    display: flex;
    margin: 0;
    color: #000;
    border-top: 1px solid var(--color-1);
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
