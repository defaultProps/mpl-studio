<script lang="ts" setup>
import { ref, provide } from 'vue'
import { Node } from '@mpl/typings'
import HeaderToolIconLine from './HeaderToolIconLine.vue'
import { workbenchStore, projectStore, viewStore } from '@mpl/store'
import { WorkbenchIframe } from '@mpl/platform'
import RightBarComponentSetting from './RightBarComponentSetting.vue'

const project = projectStore()
const workbench = workbenchStore()
const resizeNum = ref(3)
const view = viewStore()

function changeNode(newNode: Node) {
  workbench.updateActiveNodeAction(newNode)
}

function removeActiveNodeEvent(event: { cid: string, name: string }) {
  workbench.singleEventReduce(event.name)
}

function resizeBy(type: 'up' | 'down') {
  if (type === 'up') {
    resizeNum.value++
  } else {
    resizeNum.value--
  }
}

provide('removeActiveNodeEvent', removeActiveNodeEvent)
provide('changeNode', changeNode)
</script>

<template>
  <div class="component-iframe--box">
    <div class="workbench-box" :class="{ masking: view.subBoxSettingModelId }">
      <HeaderToolIconLine v-show="project.lockedFileList.includes(project.activeFileId)" />
      <!-- 显示器默认设置为：新建项目时选择的常用显示屏默认值，默认值可更改。 -->
      <!-- 评论注解历史记录并不会实时更新 -->
      <!-- 显示器、评论、注解、参与人、历史记录、所有图层。非解锁用户页[仅涉及到Page-dom类型] -->
      <header v-show="project.lockedFileList.includes(project.activeFileId)" class="level-component--box">
        <span v-for="(item, i) in workbench.breadcrumbList" :key="item.cid" class="breadcrumb-box">
          <span v-if="i !== 0" class="space-between icon icon-right1" />
          <span class="label" @click="workbench.selectNodeByCid(item.cid)">
            {{ item.label }}
          </span>
        </span>
        <span v-if="workbench.breadcrumbList.length === 0" class="breadcrumb-box">
          <span class="label" @click="workbench.selectNodeByCid('body')">
            画板节点
          </span>
        </span>
      </header>
      <div id="workbenchIframeScroll" class="workbench--container"
        :class="[workbench.activePlatform.join(' '), `resize-${resizeNum}`]">
        <div v-if="workbench.activePlatform.includes('MPL-MHS')" class="resize-btn-group-tool">
          <button type="button" class="mpl-btn icon icon-plus" title="放大" :disabled="resizeNum >= 6" @click="resizeBy('up')" />
          <button type="button" class="mpl-btn icon icon-shuaxin" title="默认大小" @click="resizeNum = 3" />
          <button type="button" class="mpl-btn icon icon-line" title="缩小" :disabled="resizeNum <= 0" @click="resizeBy('down')" />
          <button type="button" class="mpl-btn icon icon-d-arrow-left" title="推至画板重新排版" @click="resizeNum = 3" />
          <button type="button" class="mpl-btn icon icon-duixiangxuanzhong" title="事件可视化" />
        </div>
        <div id="mountedWorkbenchRef" />
        <!-- 未解锁的默认跳转到预览平台 -->
        <WorkbenchIframe />
        <!-- <PreviewIframe v-else /> -->
      </div>
    </div>
    <RightBarComponentSetting />
  </div>
</template>

<style lang="less">
.component-iframe--box {

  .iframe-box {
    iframe {
      background: #ffffff;
    }
  }
}
</style>

<style lang="less" scoped>
.component-iframe--box {
  width: 100%;
  display: flex;
  flex: 1;
  position: relative;
  height: 100%;

  .workbench-box {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;

    &.masking::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 10;
      background: #00000024;
    }

    .level-component--box {
      width: 100%;
      box-sizing: border-box;
      font-size: 12px;
      height: 26px;
      min-height: 26px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 10px;
      user-select: none;
      background: #e6e6e6;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

      .breadcrumb-box {
        color: #1E1E1E;
        display: inline-flex;
        align-items: center;

        &:last-child {
          color: var(--primary-color);
          font-weight: 600;

          .label {
            border-radius: 1px;
            cursor: pointer;
            display: inline-block;
            height: 18px;
            line-height: 18px;
            box-sizing: border-box;
            position: relative;
          }
        }

        i {
          font-size: 12px;
        }
      }

      .space-between {
        font-weight: 600;
        font-size: 12px;
        display: inline-block;
        color: #666;
      }

      .label {
        padding: 0px 3px;
        border-radius: 1px;
        cursor: pointer;

        &:hover {
          background: #ccc;
          outline: 1px solid #666;
        }
      }
    }

    .workbench--container {
      width: 100%;
      height: 100%;
      background: #fff;
      // background: #f6f8fa;
      // background-image: linear-gradient(90deg, rgb(180 180 180 / 18%) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgb(180 180 180 / 18%) 10%, rgba(0, 0, 0, 0) 10%);
      // background-size: 10px 10px;
      position: relative;
      overflow: auto;
      box-sizing: border-box;
      padding: 20px 100px 100px 20px;

      .resize-btn-group-tool {
        display: flex;
        flex-direction: column;
        margin-right: 5px;

        button+button {
          margin-top: 3px;
        }
      }

      &.MPL-MHS {
        padding: 20px;
        margin: 0 auto;
      }
    }

    .iframe-box {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .right-stash--container {
        width: 800px;
        height: 100%;
        color: #ffffff;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background: linear-gradient(45deg,
            #2f7f795c 0,
            #2f7f795c 25%,
            transparent 25%,
            transparent 50%,
            #2f7f795c 50%,
            #2f7f795c 75%,
            transparent 75%,
            transparent);
        background-size: 20px 20px;
      }
    }
  }
}
</style>
