<script setup lang="ts">
  import { clientAPIList } from '@mpl/const'

  const treeData = clientAPIList.map(v => ({ ...v, open: false }))
  const emit = defineEmits(['nodeClick'])
  const querySelectorStr = '.model-api--box .mpl-tree-node .tree-node--line'

  function clickTreeNode(api: any) {
    if (api.children) {
      api.open = !api.open
    } else {
      emit('nodeClick', api)
      document.querySelector(`${querySelectorStr}.target`)?.classList.remove('target')
      document.querySelector(`${querySelectorStr}[p-id="${api.value}"]`)?.classList.add('target')
      emit('nodeClick', api)
    }
  }

</script>

<template>
  <div v-for="api in treeData" class="mpl-tree-node">
    <div class="tree-node--line" :class="{ open: api.open }" :p-id="api.value">
      <i v-if="api.children" class="icon icon-arrow-right" />
      <img v-if="api.children" src="@/assets/file.png" alt="logo">
      <img v-else src="@/assets/logo.png" alt="logo">
      <div class="mpl-tree-label" @click.stop="clickTreeNode(api)">
        {{ api.label }}
      </div>
    </div>
    <tree-category v-if="Array.isArray(api.children) && api.open" :data="api.children" />
  </div>
</template>
<style lang="less" scoped>
  .mpl-tree-node {
    width: 100%;
    box-sizing: border-box;

    .mpl-tree-node {
      padding-left: 20px;
    }

    .tree-node--line {
      display: flex;
      align-items: center;
      height: 26px;

      &:hover {
        background: #e6e6e6;

        >.mpl-tree-node {
          background: #fff;
        }
      }

      &.target {
        background: #e6e6e6;
        position: relative;

        &::after {
          position: absolute;
          content: '';
          top: 0;
          right: 0;
          width: 2px;
          height: 100%;
          bottom: 0;
          background: var(--primary-color);
        }
      }

      &.open>i.icon {
        transform: rotate(90deg);
      }

      >i.icon {
        font-size: 12px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
      }


      img {
        height: 18px;
        margin-right: 3px;
        width: fit-content;
      }

      .mpl-tree-label {
        font-size: 12px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        cursor: default;
        display: inline-flex;
        align-items: center;
        user-select: none;
        height: 100%;
      }
    }
  }
</style>