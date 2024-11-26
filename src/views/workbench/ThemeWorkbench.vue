<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import GlobalStyle from './theme/GlobalStyle.vue'
import NodeCase from './theme/NodeCase.vue'
import ApplicationProject from './theme/ApplicationProject.vue'

const activeThemeTab = ref<string>('style')

const themeTabs = [
  { label: '主题定义', value: 'style', icon: 'mpl-kuaicunchu' },
  { label: '控件演示', value: 'case', icon: 'mpl-shujuzhongjian' },
  { label: '模块演示', value: 'module', icon: 'mpl-shujuzhongjian' }
]

const currentTheme = ref<string>('FNT')
const themeList = [
  { label: 'MPL Studio 常规主题', value: 'FNT' },
  { label: 'MPL Studio PQC主题', value: 'PQC' },
  { label: 'MPL Studio 政府平台标准主题', value: 'StandardGOV' }

]

onMounted(() => {
  const canvas = document.getElementById('mplThemeDownloadEcharts')

  if (canvas) {
    const charts = echarts.init(canvas, 'light', {
      width: 250,
      height: 120,
      renderer: 'canvas'
    })

    charts.setOption({
      grid: {
        x: 0,
        y: 0,
        x2: 0,
        y2: 0
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        },
        backgroundColor: 'rgba(50,50,50,0.7)',
        borderColor: 'var(--color-2)',
        borderWidth: 0,
        padding: 5,
        textStyle: {
          color: 'var(--color-7)',
          fontSize: 11
        },
        formatter(arg: any) {
          return `<div>月份 ${arg[0].name}<br/>下载量 ${arg[0].data}</div>`
        }
      },
      xAxis: {
        type: 'category',
        show: false,
        boundaryGap: false,
        data: [
          '2023-01',
          '2023-02',
          '2023-03',
          '2023-04',
          '2023-05',
          '2023-06',
          '2023-07',
          '2023-08',
          '2023-09',
          '2023-10',
          '2023-11',
          '2023-12'
        ]
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
          symbol: 'none',
          data: [150, 141, 157, 168, 180, 174, 166, 178, 160, 183, 194, 186],
          type: 'line',
          itemStyle: {
            color: '#2f7f79'
          },
          areaStyle: {
            color: '#2f7f79',
            opacity: 0.2
          }
        }
      ]
    })
  }
})
</script>

<template>
  <div class="workbench-theme--box">
    <div class="theme-box">
      <div class="header-box">
        <!-- <img src="https://xyz-t-1257225282.cos.ap-nanjing.myqcloud.com/%E4%BA%AC%E4%B8%9C.svg" alt="logo theme" /> -->
        <img
          src="https://cn.vitejs.dev/logo-with-shadow.png"
          alt=""
        >
        <div class="main-center-box">
          <select
            :value="currentTheme"
            name="theme"
          >
            <option
              v-for="theme in themeList"
              :key="theme.value"
              :value="theme.value"
            >
              {{ theme.label }}
            </option>
          </select>
          <div class="desc">
            MPL云服务平台的默认主题，专注于政府企业级应用中台打造的一款高亮色主题皮肤；基于饿了么官方组件库element-plus亮色主题的二次UI优化，提供良好的视觉用户体验、稳定迭代升级的主题库。
          </div>
          <div class="desc">
            文件: 2.4k
            <span class="btn"><i class="icon icon-xiazaidaoru" />下载</span>
            <span class="btn"><i class="icon icon-edit4" />编辑</span>
          </div>
          <button style="margin-top: 4px" class="mpl-btn">已使用</button>
        </div>
        <div class="statistics-theme">
          <div>
            日期： 2023-01-03 ~ 2024-01-12
          </div>
          <div>
            总下载量： 6,351
          </div>
        </div>
        <div class="download-canvas">
          <div
            id="mplThemeDownloadEcharts"
            style="width: 250px; height: 120px"
          />
        </div>

        <div class="theme-tabs--box">
          <div
            v-for="item in themeTabs"
            :key="item.value"
            class="radio"
            :class="{ active: item.value === activeThemeTab }"
            @click="activeThemeTab = item.value"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div class="theme-content-tabs">
        <GlobalStyle v-show="activeThemeTab === 'style'" />
        <NodeCase v-show="activeThemeTab === 'case'" />
        <ApplicationProject v-show="activeThemeTab === 'module'" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .workbench-theme--box {
    height: 100%;
    .theme-box {
      width: 100%;
      height: 100%;
      background-color: var(--color-7);
      box-sizing: border-box;
      overflow: hidden;
      color: rgb(204, 204, 204);
      display: flex;
      flex-direction: column;

      .header-box {
        height: 150px;
        width: 100%;
        background-color: #111010;
        display: flex;
        align-items: center;
        padding: 10px 20px 35px 4px;
        box-sizing: border-box;
        font-size: 12px;
        position: relative;
        align-items: flex-start;
        background: #f6f8fa;
        color: #000;
        box-shadow: 0px -1px 0px 0 var(--color-1) inset;

        img {
          width: 110px;
          margin-right: 15px;
          background-size: cover;
          cursor: default;
          border-radius: 10px;
        }

        .theme-tabs--box {
          position: absolute;
          left: 5px;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;

          .radio {
            padding: 5px 8px 4px 8px;
            color: #000;
            user-select: none;
            font-weight: 600;
            font-size: 12px;
            cursor: pointer;
            &.active {
              color: var(--primary-color);
              background: var(--color-7);
              background-color: var(--color-7);
              border-bottom: none;
              border-radius: 3px 3px 0px 0px;
              overflow: hidden;
              box-shadow: 0px 1px 0px 0px inset var(--color-1), 1px 0px 0px 0px inset var(--color-1), -1px 0px 0px 0px inset var(--color-1);
            }

            &:hover {
              color: var(--primary-color);
            }
          }
        }

        .main-center-box {
          flex: 1;
          overflow: hidden;
          color: #000;
          .btn {
            font-size: 12px;
            display: inline-block;
            padding: 0 4px;
            color: var(--primary-color);
            font-size: 600;
            cursor: pointer;
            padding: 1px 5px;
            border-radius: 2px;
            user-select: none;
            &:hover {
              text-decoration: underline;
            }
          }
          select {
            color: #000;
            font-size: 16px;
            font-weight: 600;
            background: transparent;
            &:active,
            &:focus {
              outline: none;
              border-color: var(--primary-color);
            }
          }

          .version {
            margin: 4px 0px;
            font-size: 12px;
            font-weight: 600;
          }

          .desc {
            margin: 7px 0;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .statistics-theme {
          width: 215px;
          font-weight: 600;
          color: #000;
          div {
            margin-top: 10px;
          }
        }
        .download-canvas {
          // box-shadow: 0 0px 1px 0 var(--color-6);
        }
      }
    }

    .theme-content-tabs {
      height: calc(100vh - 150px);
      overflow: hidden auto;
    }
  }
</style>
