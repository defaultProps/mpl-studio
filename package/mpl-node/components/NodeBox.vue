<script lang="ts" setup>
  import { inject } from 'vue'
  import { Node } from '@mpl/typings'
  import { workbenchStore } from '@mpl/store'

  const props = defineProps<{
    node: Node
    isDragging: boolean
    activeId: string
    isDraggingNode: boolean
    noPadding?: Boolean
    isMobile?: boolean
  }>()

  const nodeClick = inject('nodeClick') as any
  const nodeContextmenu = inject('nodeContextmenu') as any

  function componentWrapperClassName() {
    const _className = {
      target: props.isDraggingNode,
      dragging: props.isDragging,
      'no-padding': props.noPadding
    }

    return [
      props.isMobile ? 'w-24' : `w-${props.node.pos.pc.w}`,
      props.isMobile ? '' : `h-${props.node.pos.pc.h}`,
      _className
    ]
  }

  function handleDelete(cid: string) {
    workbenchStore().deleteNode(cid)
  }

</script>

<template>
  <div class="component-wrapper" :class="componentWrapperClassName()" :mpl-node-tag="props.node.tag"
       @click.stop="nodeClick(props.node.cid)" @contextmenu.prevent="nodeContextmenu($event, props.node)">
    <slot />
    <div class="tool-group-box" @click.prevent.stop>
      <button class="icon icon-connection">3</button>
      <button class="icon icon-copy-document" />
      <button class="icon del-btn icon-close1 ml-5" @click="handleDelete(props.node.cid)" />
    </div>
  </div>
</template>

<style lang="less">

  .component-wrapper>span,
  .component-wrapper>button {
    pointer-events: none;
  }

  .component-wrapper .el-form-item {
    pointer-events: none;
  }

  .mounted-workbench-box.callout .component-wrapper::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    z-index: 1000;
    border: 1px dashed var(--primary-color);
    pointer-events: none;
    user-select: none;
  }
</style>

<style lang="less" scoped>
  .component-wrapper {
    position: relative;
    // contain: layout;
    box-sizing: border-box;
    background-color: var(--color-7);
    display: inline-block;
    outline: 1px solid transparent;
    user-select: none;
    vertical-align: top;
    text-align: center;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    padding: 2px;

    &[mpl-node-tag="mpl-panel"] {
      padding: 0;
    }

    &.no-padding {
      padding: 0;
    }

    &.target {
      &::after {
        content: "";
        position: absolute;
        left: 1px;
        top: 1px;
        right: 1px;
        bottom: 1px;
        pointer-events: none;
        border: 2px solid var(--primary-color);
        z-index: 1000;
      }

      >.header-box {
        display: flex;
        user-select: none;
      }
    }

    .tool-group-box {
      position: absolute;
      z-index: 2000;
      right: 1px;
      bottom: -18px;
      height: 16px;
      font-size: 12px;
      display: none;

      button {
        width: 20px;
        min-width: fit-content;
        padding: 0;
        text-align: center;
        height: 20px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--color-2);

        +button {
          margin-left: 2px;
        }

        &.del-btn {
          color: #c3002f;
        }
      }
    }

    &.target>.tool-group-box {
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
    }

    &.dragging {
      outline: 1px solid var(--primary-color);

      &.target::before {
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 100;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg,
            #2f7f795c 0,
            #2f7f795c 25%,
            transparent 25%,
            transparent 50%,
            #2f7f795c 50%,
            #2f7f795c 75%,
            transparent 75%,
            transparent);
      }
    }

    &.active {
      z-index: 20;
    }
  }
</style>
