<script lang="ts" setup>
  import { ref } from "vue";
  import { FontFamilyOptions } from "@mpl/const";
  import { ElMessageBox } from "element-plus";
  import i18nInstance from '@mpl/i18n'
  import { themeOptions } from "@/utils/constant";
  import { resetContextmenu } from "@mpl/const";
  import { workbenchStore, projectStore } from '@mpl/store'

  const project = projectStore();
  const fontFamily = ref<string>("Yahei");
  const fontSize = ref<number>(14);
  const workbench = workbenchStore();
  const fontSizeOptions = Array(12)
    .fill(12)
    .map((v, i) => v + i);

  function cleanWorkbench() {
    ElMessageBox.prompt(
      "删除该页面所有数据，此操作无法撤销，是否确认？",
      "警告",
      {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        autofocus: true,
        inputPlaceholder: "请输入: mpl studio",
        inputValidator: (value = "") => {
          return value.trim() === "mpl studio"
            ? true
            : "校验错误，请输入页面名称";
        },
        appendTo: document.body,
      }
    ).then(() => {
      workbench.resetWorkbench();
    });
  }

  const previewPages: Array<{ target: any, pageId: string, params: string }> = JSON.parse(sessionStorage.getItem('previewWindowList') || '[]') || []

  function openPreview() {
    const obj = previewPages.find(v => v.pageId === project.activeFileId)

    if (obj && !obj.target.closed) {
      obj.target?.focus()
    } else {
      const windowFeatures = "left=200,top=300,width=390,height=844";
      const params = {
        id: project.activeFileId,
        name: project.activeFile?.title || '',
        width: 390,
        height: 844
      }
      const previewWindow = window.open(`/preview?page=${params.id}&name=${params.name}&width=${params.width}&height=${params.height}`, "_blank", windowFeatures)
      previewPages.push({
        target: previewWindow,
        pageId: project.activeFileId,
        params: ''
      })
      // sessionStorage.setItem('previewWindowList', JSON.stringify(previewPages))
    }
  }
</script>

<template>
  <header class="header-tool-btn--container mpl-scroll-x">
    <div class="workbench-tool-container">
      <div class="line-box">
        <button class="mpl-btn mr-5" disabled>{{ workbench.activePlatform.join(', ') }} 标准移动端平台</button>
        <select name="theme" class="mpl-select">
          <optgroup v-for="group in themeOptions" :key="group.label" :label="group.label">
            <option v-for="item in group.children" :key="item.value" :label="item.label" :value="item.value" />
          </optgroup>
        </select>
        <button class="mpl-btn mr-5 icon icon-run1" :title="i18nInstance.global.t('workbenchHeaderTool.preview')"
                @click="openPreview" />
        <button class="mpl-btn mr-5">
          {{ i18nInstance.global.t("workbenchHeaderTool.autoSave") }}
        </button>
        <button class="mpl-btn del-btn mr-5 icon icon-qingkongshanchu" title="清空，无法撤销回滚. &#10; ctrl + shift + backspace"
                @click="cleanWorkbench" />
      </div>
      <div class="line-box">
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleGuildLine }"
                @click="workbench.triggerVisibleGuild">
          {{ i18nInstance.global.t("workbenchHeaderTool.guildLine") }}
        </button>
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleNodeCalloutLine }"
                @click="workbench.triggerVisibleNodeCalloutLine">
          {{ i18nInstance.global.t("workbenchHeaderTool.nodeCalloutLine") }}
        </button>
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleNote }"
                @click="workbench.triggerVisibleNote">
          {{ i18nInstance.global.t("workbenchHeaderTool.note") }}
        </button>
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleComment }"
                @click="workbench.triggerVisibleComment">
          {{ i18nInstance.global.t("workbenchHeaderTool.comment") }}
        </button>
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleEventFlow }"
                @click="workbench.triggerVisibleEventFlow">
          事件流
        </button>
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleEventFlow }"
                @click="workbench.triggerVisibleEventFlow">
          工作流
        </button>
        <button class="mpl mpl-btn mr-5" :class="{ 'is-active': workbench.visibleDraft }"
                @click="workbench.triggerVisibleDraft">
          草稿
        </button>

        <button class="mpl-btn mr-5 icon icon-tiaozhuan-zhuanqu"
                :title="i18nInstance.global.t('workbenchHeaderTool.save')" />
        <button class="mpl-btn mr-5 icon icon-jurassic_import-data"
                :title="i18nInstance.global.t('workbenchHeaderTool.codePush')" />
        <button class="mpl-btn mr-5 icon icon-link4" :title="i18nInstance.global.t('workbenchHeaderTool.shear')" />
        <button class="mpl-btn mr-5 icon icon-xiazaidaoru"
                :title="i18nInstance.global.t('workbenchHeaderTool.download')" />
        <button class="mpl-btn mr-5 icon icon-jurassic_laststep"
                :title="i18nInstance.global.t('workbenchHeaderTool.redo')" />
        <button class="mpl-btn mr-5 icon icon-jurassic_nextstep"
                :title="i18nInstance.global.t('workbenchHeaderTool.undo')" />
      </div>
      <div class="footer-box">
        {{ i18nInstance.global.t("workbenchHeaderTool.workbenchWithPage") }}
        <img src="@/assets/headerToolSvg/more.svg" alt="" />
      </div>
    </div>
    <div class="workbench-tool-container">
      <div class="line-box">
        <select v-model="fontFamily" class="mpl-select" @visible-change="resetContextmenu" style="width: 94px">
          <option v-for="item in FontFamilyOptions" :key="item.value" :label="item.label" :value="item.value" />
        </select>
        <select v-model="fontSize" style="width: 50px" class="mpl-select" @visible-change="resetContextmenu">
          <option v-for="fz in fontSizeOptions" :key="fz" :label="fz" :value="fz" />
        </select>
        <button class="mpl-btn mr-5 icon icon-font_size_up"
                :title="i18nInstance.global.t('workbenchHeaderTool.increaseFZ')" />
        <button class="mpl-btn mr-5 icon icon-font_size_down"
                :title="i18nInstance.global.t('workbenchHeaderTool.reduceFZ')" />
      </div>
      <div class="line-box">
        <button class="mpl-btn mr-5 icon icon-jurassic_font-bold"
                :title="i18nInstance.global.t('workbenchHeaderTool.bold')" />
        <button class="mpl-btn mr-5 icon icon-jurassic_font-tilt"
                :title="i18nInstance.global.t('workbenchHeaderTool.italic')" />
        <button class="mpl-btn mr-5 icon icon-zitixiahuaxian"
                :title="i18nInstance.global.t('workbenchHeaderTool.underline')" />
        <button class="mpl-btn mr-5 icon icon-beijingse1"
                :title="i18nInstance.global.t('workbenchHeaderTool.fillBG')" />
        <button class="mpl-btn mr-5 icon icon-jurassic_border-outside"
                :title="i18nInstance.global.t('workbenchHeaderTool.borderStyle')" />
        <button class="mpl-btn mr-5 icon icon-jurassic_font-color"
                :title="i18nInstance.global.t('workbenchHeaderTool.color')" />
        <button class="mpl-btn mr-5 icon icon-xiaolian" :title="i18nInstance.global.t('workbenchHeaderTool.icon')" />
      </div>
      <div class="footer-box">
        {{ i18nInstance.global.t("workbenchHeaderTool.fontWithIcon") }}
        <img src="@/assets/headerToolSvg/more.svg" alt="" />
      </div>
    </div>
    <div class="workbench-tool-container">
      <div class="line-box">
        <button class="mpl-btn mr-5 icon icon-zuoduiqi1"
                :title="i18nInstance.global.t('workbenchHeaderTool.textAlignLeft')" />
        <button class="mpl-btn mr-5 icon icon-juzhongduiqi"
                :title="i18nInstance.global.t('workbenchHeaderTool.textAlginCenter')" />
        <button class="mpl-btn mr-5 icon icon-youduiqi2"
                :title="i18nInstance.global.t('workbenchHeaderTool.textAlignRight')" />
        <button class="mpl-btn mr-5 icon icon-zuosuojin"
                :title="i18nInstance.global.t('workbenchHeaderTool.textIndentLeft')" />
        <button class="mpl-btn mr-5 icon icon-zengjiasuojinliang"
                :title="i18nInstance.global.t('workbenchHeaderTool.textIndentRight')" />
        <button class="mpl-btn mr-5" :title="i18nInstance.global.t('workbenchHeaderTool.icon')">
          <img src="@/assets/headerToolSvg/painter.svg" alt="" style="width: 13px" />
          {{ i18nInstance.global.t("workbenchHeaderTool.painter") }}
        </button>
      </div>
      <div class="line-box">
        <button class="mpl-btn mr-5">
          {{ i18nInstance.global.t("workbenchHeaderTool.autoWrap") }}
        </button>
        <button class="mpl-btn mr-5" :title="i18nInstance.global.t('workbenchHeaderTool.htmlInsertTooltip')">
          {{ i18nInstance.global.t("workbenchHeaderTool.htmlInsert") }}
        </button>
      </div>
      <div class="footer-box">
        {{ i18nInstance.global.t("workbenchHeaderTool.textAlign") }}
        <img src="@/assets/headerToolSvg/more.svg" alt="" />
      </div>
    </div>
    <div class="workbench-tool-container" style="width: 400px">
      <div class="footer-box">
        插图
        <img src="@/assets/headerToolSvg/more.svg" alt="" />
      </div>
    </div>
    <div class="workbench-tool-container">
      <div class="line-box">
        <button class="mpl-btn mr-5 icon icon-zuhe">3D图层</button>
        <button class="mpl-btn mr-5 icon icon-moban">草稿图层</button>
        <button class="mpl-btn mr-5 icon icon-xiayiyiceng">所有图层</button>
      </div>
      <div class="footer-box">图层/暂存列表</div>
    </div>
  </header>
</template>

<style lang="less">
  .header-tool-btn--container {
    .el-select {
      width: 120px;
      border: 1px solid #323232;
      line-height: 20px;

      .el-select__wrapper {
        border-radius: 0;
        background: transparent;
        box-shadow: none;

        &.is-focused {
          box-shadow: 0 0 0 1px #2f7f79 inset;
        }
      }

      .el-select__placeholder {
        color: #000;
      }

      .el-input.el-input--small {
        height: 20px;
        line-height: 20px;

        .el-input__wrapper {
          padding: 1px 2px;

          input.el-input__inner {
            height: 20px !important;
            line-height: 20px;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .header-tool-btn--container {
    width: 100%;
    font-size: 12px;
    height: 80px;
    min-height: 80px;
    box-sizing: border-box;
    border-top: 0;
    white-space: nowrap;
    background-color: var(--color-7);

    .footer-box {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      color: #000;

      img {
        position: absolute;
        right: 2px;
        bottom: 2px;
        width: 8px;
        height: 8px;
      }
    }

    .workbench-tool-container {
      position: relative;
      height: 100%;
      overflow: hidden;
      display: inline-block;
      padding: 2px;
      box-sizing: border-box;
      color: #000;
      user-select: none;

      box-shadow: inset -1px 0 0 #d0d7deb3;

      &:last-child {
        border-right: 0;
      }

      .bold-btn {
        margin-right: 6px;
      }

      i.mpl {
        font-size: 14px;
      }

      .line-box {
        height: 25px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .note-btn {
          font-size: 12px;
          color: #000;
          margin-right: 5px;
          border: 1px solid #414141;
          height: 20px;
          line-height: 20px;
          padding: 0 4px;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background: var(--color-5);
          }

          &.is-active,
          &.is-active:hover {
            color: var(--primary-color);
            background: var(--color-5);
          }
        }

        .fz-up,
        .fz-down,
        .bold-btn,
        .italic-btn,
        .outline-btn,
        .bg-select-box,
        .color-select-box,
        .logo-select-box,
        .border-select-box,
        .node-btn,
        .underline-select-box {
          width: 20px;
          min-width: fit-content;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          line-height: 20px;
          font-size: 12px;
          cursor: default;

          &:hover {
            background-color: var(--color-5);
            outline: 1px solid var(--color-5);
            color: var(--primary-color);
          }

          img {
            width: 8px;
          }
        }

        .border-select-box,
        .underline-select-box,
        .bg-select-box,
        .color-select-box,
        .logo-select-box {
          margin-left: 7px;
          padding: 0 2px;
        }

        .node-btn {
          margin-left: 3px;
          margin-right: 5px;
        }
      }
    }

    .right-tool {
      float: right;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
