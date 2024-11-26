<script lang="ts" setup>
  import EventTool from "@/views/eventEdit/index.vue";
  import { workbenchFooterEventModOptions } from "@mpl/const";
  import { ActiveNodeEvent } from "@mpl/typings";
  import { workbenchStore } from '@mpl/store'

  const props = defineProps<{ activeCollapse: boolean }>()
  const store = workbenchStore();

  function changeCheckEvent(event: ActiveNodeEvent, bol: boolean) {
    if (bol) {
      const index = store.eventList.findIndex((e) => e.name === event.name);
      index === -1 && store.eventList.splice(index, 1);
    } else {
      if (store.activeEvent && store.activeNode) {
        store.activeEvent.checked = false;
        const index = store.activeNode.events.indexOf(event.name);
        index >= 0 && store.activeNode.events.splice(index, 1);
      }
    }
  }
</script>

<template>
  <div class="quick-config-interactive--panel">
    <div v-if="props.activeCollapse" class="nodes-select--box mpl-scroll-none">
      <template v-if="store.activeNode">
        <div v-for="item in store.activeNodeEventList" :key="item.name" class="event-item"
             :class="{ active: store.activeEvent?.name === item.name }">
          <input type="checkbox" class="mpl-input" v-model="item.checked"
                 @change="changeCheckEvent(item, item.checked)" />
          <div class="title" @click="store.activeEvent = item">
            {{ item.desc }}
          </div>
          <template v-if="item.checked">
            <button v-for="pane in workbenchFooterEventModOptions" :key="pane.value" class="mpl-btn"
                    @click="store.updateActiveEvent(item.name, pane.value)"
                    :class="{ 'is-active': item.type === pane.value }">
              {{ pane.label }}
            </button>
          </template>
        </div>
      </template>
    </div>
    <EventTool v-if="store.activeEvent" />
    <!-- <div v-else class="statistics-body">
      <div>
        统计页面组件数量、绑定了多少事件数量、前端API、服务API、静态资源-图标、图片、脚本、样式。点击每个统计点，画板切换为统计页面iframe
      </div>
      <div>统计页面智能检测结果信息</div>
      <div>统计页面多少人参与保存、保存次数、保存顺序时间线</div>
      <div>
        统计页面iframe展示使用3D渲染、实时监控，由于高功耗设置为不能实时统计。通常晚一个小时
      </div>
      <div>统计值不能修改、仅做展示和跳转功能。实时监控页面各个区域资源</div>
    </div> -->
  </div>
</template>

<style lang="less">
  .el-checkbox {
    height: 30px;

    .el-checkbox__input.is-disabled .el-checkbox__inner {
      background-color: #606266;
      border-color: #606266;
    }
  }

  .quick-config-interactive--panel .nodes-select--box {
    .el-cascader {
      position: sticky;
      top: 0;
      z-index: 3;
      background-color: var(--color-5);
      margin: 10px 0;

      .el-input {
        width: 180px;
        background-color: #535353;

        .el-input__wrapper {
          background: #535353;
          outline: none;
          box-shadow: none;
          border-radius: 0;
          padding: 2px 6px;

          input {
            color: var(--color-7);
          }
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  .quick-config-interactive--panel {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden;
    position: relative;
    color: #000;

    .event-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px 0 2px;
      box-sizing: border-box;
      height: 26px;
      line-height: 26px;
      border: 1px solid transparent;
      position: relative;
      width: 100%;

      &:hover {
        background-color: #cccccc5e;
      }

      .title {
        flex: 1;
        margin: 0 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        user-select: none;
      }

      &.active {
        color: var(--primary-color);
        background-color: var(--color-1);
        font-weight: 600;
      }

      &.disabled {
        color: #606266;
        cursor: not-allowed;
      }
    }

    .btn {
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
        background-color: #414141;
        color: var(--primary-color);
      }
    }

    .statistics-body {
      width: 100%;
      height: 100%;
      overflow: hidden auto;
      padding: 10px;
      box-sizing: border-box;
    }

    .nodes-select--box {
      width: 250px;
      min-width: 250px;
      max-width: 250px;
      height: 100%;
      overflow: hidden auto;
      text-align: center;
      background-color: #f6f8fa;
      box-shadow: -1px 0 0 var(--color-1) inset;

      button+button {
        margin-left: 2px;
      }
    }
  }
</style>
