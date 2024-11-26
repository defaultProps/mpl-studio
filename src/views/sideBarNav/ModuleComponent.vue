<script lang="ts" setup>
import { ref } from "vue";
import { getSeniorComponentList } from "@/utils/constant";
import { complexContextmenu, dragNewCompStart } from "@/utils/dom";
import mplStore from '@mpl/store'

const coreView = mplStore.viewStore();
let searchComponentList = getSeniorComponentList();
const searchNode = ref<string>("");

function handleContextmenu(e: MouseEvent, key: string) {
  e.preventDefault();

  const contextmenu = [
    {
      label: "复制",
      icon: "",
      divider: true,
      value: "copy",
      onclick: () => {},
    },
    {
      label: "文档",
      value: "docs",
      icon: "",
      divider: false,
      onclick: () => {},
    },
    {
      label: "主题",
      value: "docs",
      icon: "",
      divider: false,
      onclick: () => {},
    },
    {
      label: "历史版本",
      value: "docs",
      icon: "",
      divider: false,
      onclick: () => {},
    },
  ];

  complexContextmenu(e, contextmenu, key);
}

function dragover(el: any) {
  el.dataTransfer.effectAllowed = "move";
  el.dataTransfer.dropEffect = "move";
}

function formatTitle() {
  const version = `🔰 控件版本：3.1.12\n`;
  const moduleTotal = `🔰 模板数量：42\n`;
  const useTotal = `🔰 总下载量：2697`;

  return `${version}${moduleTotal}${useTotal}`;
}

function handleSearchNode() {
  if (searchNode.value) {
    searchComponentList = getSeniorComponentList()
      .map((p) => {
        p.children = p.children.filter(
          (t) =>
            t.value.includes(searchNode.value) ||
            t.label.includes(searchNode.value)
        );

        return p;
      })
      .filter((v) => v.children.length);
  } else {
    searchComponentList = getSeniorComponentList();
  }
}
</script>

<template>
  <div class="senior-node-list mpl-scroll-none">
    <div class="header-search">
      <input
      name="search-node" class="mpl-input"
        v-model.trim="searchNode"
        placeholder="控件搜索"
        @input="handleSearchNode"
        style="width: 176px;font-size: 12px"
      />
    </div>
    <div
      v-for="group in searchComponentList"
      :key="group.label"
      class="component-group"
    >
      <div class="group-title">
        {{ group.label }}
      </div>
      <div v-for="item in group.children" :key="item.label" class="component">
        <span
          class="component-title"
          draggable="true"
          :mpl-c-id="item.value"
          :title="formatTitle()"
          @dblclick="coreView.visibleDisplayNodeBox = true"
          @dragstart="dragNewCompStart($event, item.value)"
          @dragover="dragover"
          @contextmenu="handleContextmenu($event, item.value)"
        >
          <i class="mpl icon" :class="[item.icon || 'mpl-yulan']" />
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.senior-node-list {
  overflow: hidden auto;
  flex: 1;
  width: 100%;
}
</style>
