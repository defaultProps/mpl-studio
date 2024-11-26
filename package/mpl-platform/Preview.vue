<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mplIframePostMessage } from '@mpl/const'
import mplStore from '@mpl/store'
import type { File } from '@mpl/typings'

const projectStore = mplStore.projectStore()
const width = ref(390)
const height = ref(844)

window.addEventListener(
  'message',
  (e) => {
    const { type, payload } = e.data

    if (type === 'CLICK_MENU_ACTION') {
      let selectFile: File | null = null

      projectStore.projectTree.forEach((p) => {
        p.children?.forEach((file) => {
          if (file.id === payload.pageId)
            selectFile = file
        })
      })

      if (selectFile)
        projectStore.updateActiveFile(selectFile, true)

      window.parent.document.body.click()
    }
  },
  false
)

// 初始化预览页面： 挂载菜单、主题、脚本、样式、渲染组件NodeList
function loadIframe() {
  mplIframePostMessage.preview.initPlatformMenu(projectStore.projectTree)
}

onMounted(() => {
  const params = new URL(document.location.href).searchParams
  document.title = 'mpl studio 预览 - ' + params.get('name') || ''

})

// 想法一： 前端API & 事件流
// 在预览模式下，用户操作页面会呈现事件流的流向。 => 采用工作流动态的显示等方式更加个性化展示用户操作步骤流程。
</script>

<template>
  <div class="iframe--container mpl-scroll-none" :style="{ width: width + 'px', height: height + 'px' }">
    <iframe id="workbench" src="/src/platform/mpl-app/preview/index.html" name="mplPreviewIframe" @load="loadIframe" />
    <!-- <div class="event-flow">
      <div>1、可视化事件流。显示用户拖拉拽实现的事件流程</div>
      <div>
        2、用户操作页面页面，事件流也会同步更新流向[使用前端API内置实现]
      </div>
      <div>
        3、事件流向用户记录展示用户操作步骤，可视化查漏补缺，提高UI/UE的自测能力
      </div>
      <div>
        4、预览模式的事件流禁止编辑操作。只有编辑模式才可以保存[后续考虑放开部分操作保存能力]
      </div>
      <div>
        5、预览模式与正式环境存在部分较小差异，一切以部署后的[开发、测试、生产]环境为准
      </div>
      <div>
        6、此模式需要使用Echarts资源库，比较消耗性能，所以预览模式状态默认开启节省资源模式[60s内未执行操作，则弹窗提示是否继续预览，等待10s后关闭预览模式]
      </div>
      <div>
        7、可视化事件流需要用户使用前端API为主，任何的二次编辑前端API操作将无法正确的显示其页面的事件流
      </div>
      <div>
        8、已经解锁的页面为编辑模式，锁定的页面默认为预览模式。切换页面时显示不同的模式[编辑预览模式绑定页面文件]
      </div>
      <div>9、编辑页面可直接切换为预览模式，增加返回按钮，跳转为编辑模式</div>
      <div>
        10、与分享模式不同，分享模式禁止更改任何事件流，仅做预览观看，展示全屏模式
        + iframe站点模式 + 事件流只读
      </div>
    </div> -->
  </div>
</template>

<style lang="less" scoped>
.iframe--container {
  background-image: linear-gradient(90deg, rgba(180, 180, 180, 0.18) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(180, 180, 180, 0.18) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;
  background-color: #f6f8fa;
  width: 390px;
  height: 844px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: initial;
  min-height: initial;
  max-width: initial;
  max-height: initial;

  iframe {
    border: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    border: none;
    background-color: var(--color-7);
  }

  .event-flow {
    width: 100vw;
    height: 300px;
    background-color: #f0f0f0;
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>

<style lang="less">
.iframe--container {
  .el-select {
    margin-left: 10px;
    width: 120px;
    background-color: var(--color-3);

    .el-input__wrapper {
      background-color: #3d3e42;
      box-shadow: 0 0 0 1px #3d3e42 inset;

      input.el-input__inner {
        color: var(--color-1);
      }
    }
  }
}
</style>
