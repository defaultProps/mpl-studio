<script setup lang="ts">
import HeaderBox from '@/components/HeaderBox.vue'
import NavBox from '@/views/NavBox.vue'
import PageOpenList from '@/views/PageOpenList.vue'
import DisplayNodeList from '@/views/nodeView/DisplayNodeList.vue'
import WorkbenchBox from '@/views/workbench/WorkbenchBox.vue'
import { projectStore, viewStore, workbenchStore } from '@mpl/store'
import InitialPage from '@/components/InitialPage.vue'
import LayoutDialog from '@/components/dialog/LayoutDialog.vue'
import { onMounted, ref } from 'vue'

const workbench = workbenchStore()
const coreView = viewStore()
const project = projectStore()
const annotationSettingDialog = ref(false)

onMounted(() => {
  window.addEventListener('message', (event) => {
    // 开启注解编辑弹框
    if (event.data.type === 'openAnnotationSetting') {
      annotationSettingDialog.value = true
    }
    // 关闭注解编辑弹框
    if (event.data.type === 'closeAnnotation') {
      workbench.triggerVisibleNote(false)
    }
  })
})

</script>

<template>
  <!-- 注解弹框 -->
  <el-dialog v-if="annotationSettingDialog" v-model="annotationSettingDialog" append-to-body title="注解设置" width="800">
    <div>1, 悬浮框或者画板右侧</div>
    <div>2, 注解内容支持哪些格式， 文本，图片，链接，视频，音频，文件等</div>
    <div>3, 注解支持评论模式</div>
    <div>4, 导出注解word文档。增加签名和日期</div>
    <div>5, 导出生成图片</div>
  </el-dialog>

  <!-- 顶部栏 -->
  <HeaderBox />
  <section class="mpl-container">
    <!-- 左侧菜单 -->
    <NavBox v-if="project.userRole" />
    <!-- 左侧菜单内容 -->
    <DisplayNodeList v-if="coreView.visibleDisplayNodeBox" />
    <!-- 主要操作区域 -->
    <main class="drawing-board--container">
      <!-- 已打开的文件列表 -->
      <PageOpenList />
      <!-- 初始化页面 -->
      <InitialPage v-if="coreView.activeMainModel === 'initialPage'" />
      <!-- 内容区域 -->
      <WorkbenchBox v-else-if="coreView.activeMainModel === 'workbench'" />
    </main>
  </section>
  <LayoutDialog v-if="coreView.visibleLayoutDialog" />
  <!-- <div class="website-community">社区版</div> -->
</template>

<style scoped lang="less">
.website-community {
  position: fixed;
  top: 40px;
  right: 0;
  pointer-events: none;
  z-index: 10000000;
  font-size: 40px;
  color: #196eff;
  opacity: 0.5;
  padding: 0 20px 20px 0;
  transform: rotate(45deg);
}

section.mpl-container {
  position: relative;
  width: 100%;
  bottom: 0;
  height: calc(100% - 30px);
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;

  main.drawing-board--container {
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
