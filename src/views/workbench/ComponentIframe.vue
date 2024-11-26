<script lang="ts" setup>
  import { ref } from 'vue'
  import { Node } from '@mpl/typings'
  import HeaderToolIconLine from './HeaderToolIconLine.vue'
  import { componentToolOptions } from '@/utils/constant'
  import i18nInstance from '@mpl/i18n'
  import { workbenchStore, projectStore, viewStore } from '@mpl/store'
  import { mplIframe } from '@mpl/platform'

  const coreView = viewStore()
  const project = projectStore()
  const workbench = workbenchStore()
  const rightBarRef = ref<HTMLElement | null>(null)
  const resizeNum = ref(3)

  function changeActiveNode(newNode: Node) {
    workbench.updateActiveNodeAction(newNode)
  }

  function resizeBy(type: 'up' | 'down') {
    type === 'up' ? resizeNum.value++ : resizeNum.value--
  }

</script>

<template>
  <div class="component-iframe--box">
    <div class="workbench-box">
      <HeaderToolIconLine v-show="project.lockedFileList.includes(project.activeFileId)" />
      <!-- 显示器默认设置为：新建项目时选择的常用显示屏默认值，默认值可更改。 -->
      <!-- 评论注解历史记录并不会实时更新 -->
      <!-- 显示器、评论、注解、参与人、历史记录、所有图层。非解锁用户页[仅涉及到Page-dom类型] -->
      <header v-show="project.lockedFileList.includes(project.activeFileId)" class="level-component--box">
        <div class="breadcrumb-nox">
          {{ i18nInstance.global.t('workbenchHeaderTool.workbench') }}
          <span v-for="item in workbench.breadcrumbList" :key="item.cid" class="breadcrumb-box">
            <span class="space-between icon icon-right1" />
            <span class="label">{{ item.label }}</span>
          </span>
        </div>
      </header>
      <div id="workbenchIframeScroll" class="workbench--container" :class="[
        workbench.activePlatform.join(' '),
        `resize-${resizeNum}`
      ]">
        <div class="resize-btn-group-tool" v-if="workbench.activePlatform.includes('MPL-MHS')">
          <button class="mpl-btn icon icon-plus" title="放大" :disabled="resizeNum >= 6" @click="resizeBy('up')" />
          <button class="mpl-btn icon icon-shuaxin" title="默认大小" @click="resizeNum = 3" />
          <button class="mpl-btn icon icon-line" title="缩小" :disabled="resizeNum <= 0" @click="resizeBy('down')" />
          <button class="mpl-btn icon icon-d-arrow-left" title="推至画板重新排版" @click="resizeNum = 3" />
          <button class="mpl-btn icon icon-duixiangxuanzhong" title="事件可视化" />
        </div>
        <div id="mountedWorkbenchRef"></div>
        <mplIframe />
      </div>
    </div>
    <nav v-show="project.lockedFileList.includes(project.activeFileId)" ref="rightBarRef"
         class="sidebar-component-setting">
      <div class="content">
        <div class="tool-box">
          <div v-for="item in componentToolOptions" :key="item.value" class="tool-btn"
               @click.stop="workbench.updateShallComponentSettingRef(item.value)" :class="{
                active:
                  item.value === workbench.activeComponentSettingModel
                  && coreView.visibleRightBarComponentSetting
              }" :title="item.label">
            {{ item.label }}
          </div>
          <div class="tool-btn icon trigger-right-btn" :class="[
            coreView.visibleRightBarComponentSetting
              ? 'icon-arrow-up-filling'
              : 'icon-arrow-down-filling'
          ]" @click.stop="coreView.triggerVisibleRightBarComponentSetting()" />
        </div>
        <div v-if="coreView.visibleRightBarComponentSetting" class="component-setting-sidebar mpl-scroll-none">
          <component :is="workbench.shallComponentSettingRef" :value="workbench.activeNode"
                     :is-mobile="!project.activeProject?.platform.find(v => v.value.includes('MPL-DFN'))"
                     @change-node="changeActiveNode" />
          <!-- <textarea style="width: 250px;margin:10px;"> {{ workbench.activeNode }}</textarea> -->
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="less">
  .component-iframe--box {
    height: 1px;

    .workbench-tool-container {

      div.el-select .el-input__wrapper,
      div.el-select:hover:not(.el-select--disabled) .el-input__wrapper,
      div.el-select .el-input__wrapper.is-focus,
      div.el-select:hover:not(.el-select--disabled) .el-input__wrapper.is-focus {
        background: transparent;
      }
    }

    .iframe-box {
      iframe {
        background-color: var(--color-7);
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
    // overflow: hidden;

    .workbench-box {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;

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
        box-shadow: inset 0 -1px 0 #d0d7deb3, inset 0 1px 0 #d0d7deb3;

        .breadcrumb-nox {
          color: #000;
          display: flex;
          align-items: center;

          .breadcrumb-box {
            color: #000;
            display: inline-flex;
            align-items: center;

            i {
              font-size: 12px;
            }
          }

          .space-between {
            margin: 0 5px;
            color: var(--color-2);
            font-weight: 600;
          }

          .label {
            padding: 0px 3px;
            border-radius: 1px;

            &:hover {
              outline: 1px solid var(--color-2);
              background: #eee;
            }
          }
        }
      }

      .workbench--container {
        width: 100%;
        height: 100%;
        background-color: #fff;
        // background-color: #f6f8fa;
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
          color: var(--color-7);
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

    .sidebar-component-setting {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        height: 100%;
        position: relative;

        .tool-box {
          width: 20px;
          height: 100%;
          font-size: 12px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #e6e6e6;
          box-shadow: -1px 0 0 0 var(--color-1) inset, 1px 0 0 0 var(--color-1) inset;

          .tool-btn {
            text-orientation: sideways-right;
            writing-mode: tb-rl;
            user-select: none;
            width: 100%;
            line-height: 20px;
            padding: 8px 0;
            font-size: 12px;
            text-align: center;
            color: #000;

            &:hover {
              color: var(--primary-color);
            }

            &.trigger-right-btn {
              position: absolute;
              bottom: 0;
            }

            &.active {
              color: var(--primary-color);
              position: relative;
              font-weight: 600;

              &::before {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 2px;
                background-color: var(--primary-color);
              }
            }
          }
        }
      }
    }
  }
</style>
