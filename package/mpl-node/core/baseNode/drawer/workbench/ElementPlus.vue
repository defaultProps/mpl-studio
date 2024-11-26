<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { DrawerProp } from '../define'

  const props = defineProps<{ node: DrawerProp, activeCid: string }>()
  const drawerVisible = ref<boolean>(props.node.cid === props.activeCid)

  watch(
    () => props.activeCid,
    () => {
      drawerVisible.value = props.activeCid === props.node.cid
    },
  )
</script>

<template>
  <el-drawer v-model="drawerVisible" append-to-body :size="props.node.width" class="mpl-drawer" direction="ltr"
             :show-close="false">
    <template #header>
      <div class="drawer-title">
        {{ props.node.header.title }}
      </div>
      <div class="button-group">
        <el-button v-for="btn in props.node.header.btnGroup" :key="btn.cid">
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
    <div class="mpl-body-content">
      <div class="mpl-empty-text">
        请拖入控件或<a href="https://www.baidu.com" target="_blank">选择模板</a>
      </div>
    </div>
    <template #footer>
      <div class="button-group">
        <el-button v-for="btn in props.node.footer.btnGroup" :key="btn.cid">
          {{ btn.title }}
        </el-button>
      </div>
      <slot />
    </template>
  </el-drawer>
</template>

<style lang="less">
  .mpl-drawer {
    .el-drawer__header {
      padding: 0 10px;
      height: 50px;
      display: flex;
      margin: 0;
      color: #000;
      border-bottom: 1px solid var(--color-1);

      .drawer-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        flex: 1;
        margin-right: 20px;
      }
    }

    .el-drawer__body {
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

    .el-drawer__footer {
      padding: 0 10px;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 0;
      color: #000;
      border-top: 1px solid var(--color-1);
    }
  }
</style>
