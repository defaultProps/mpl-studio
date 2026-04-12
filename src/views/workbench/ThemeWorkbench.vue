<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import GlobalStyle from './theme/GlobalStyle.vue'
import ApplicationProject from './theme/ApplicationProject.vue'

const activeThemeTab = ref<string>('style')

const themeTabs = [
  { label: '主题定义', value: 'style' },
  { label: '控件演示', value: 'case' },
  { label: '模块演示', value: 'module' }
]

const currentTheme = ref<string>('FNT')
const themeList = [
  { label: 'MPL Studio 常规主题', value: 'FNT' }, // #196eff 主色。四边线框
  { label: 'MPL Studio PQC主题', value: 'PQC' }, // #c3002f 主色。底边框
  { label: 'MPL Studio 政府平台标准主题', value: 'StandardGOV' } //   #c3002f 主色。四边线框
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
        borderColor: '#333',
        borderWidth: 0,
        padding: 5,
        textStyle: {
          color: '#ffffff',
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
        data: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12']
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
        <img src="https://cn.vitejs.dev/logo-with-shadow.png" alt="">
        <div class="main-center-box">
          <select :value="currentTheme" name="theme">
            <optgroup label="系统主题">
              <option v-for="theme in themeList" :key="theme.value" :value="theme.value">
                {{ theme.label }}
              </option>
            </optgroup>
            <optgroup label="其他主题">
              <option value="location">
                汽车金融资产沉淀平台-自定义v1.0
              </option>
              <option value="location">
                汽车金融资产沉淀平台-MPQ版本
              </option>
              <option value="custom">
                HarmonyOS设置-自定义v2.1
              </option>
            </optgroup>
          </select>
          <div class="desc">
            MPL云服务平台的默认主题，基于 Element-Plus
            亮色主题的二次UI优化，专注于政府企业级应用中台打造的一款高亮色主题皮肤；提供良好的视觉用户体验、稳定迭代升级的主题库。
          </div>
          <button style="margin-top: 4px; margin-right: 10px" class="mpl-btn" type="button">
            已使用
          </button>
          文件: 2.4k
          <span class="btn">编辑</span>
          <span class="btn">下载</span>
        </div>
        <div class="statistics-theme">
          <div>日期： 2023-01-03 ~ 2024-01-12</div>
          <div>总下载量： 6,351</div>
        </div>
        <div class="download-canvas" />
        <div id="mplThemeDownloadEcharts" style="width: 250px; height: 120px" />

        <div class="theme-tabs--box">
          <div v-for="item in themeTabs" :key="item.value" class="radio"
            :class="{ active: item.value === activeThemeTab }" @click="activeThemeTab = item.value">
            {{ item.label }}
          </div>
        </div>
      </div>
      <div class="theme-content-tabs">
        <GlobalStyle v-if="activeThemeTab === 'style'" />
        <iframe v-else-if="activeThemeTab === 'case'"
          sandbox="allow-same-origin allow-forms allow-downloads-without-user-activation allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts"
          seamless src="/package/mpl-theme/index.html"
          style="width: 100%;height: 100%;overflow: hidden;margin:0;border:0;padding: 0;" />
        <ApplicationProject v-else />
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
    background: #ffffff;
    box-sizing: border-box;
    overflow: hidden;
    color: rgb(204, 204, 204);
    display: flex;
    flex-direction: column;

    .header-box {
      height: 150px;
      width: 100%;
      background: #111010;
      display: flex;
      align-items: center;
      padding: 10px 20px 35px 4px;
      box-sizing: border-box;
      font-size: 12px;
      position: relative;
      align-items: flex-start;
      background: #f6f8fa;
      color: #1E1E1E;
      box-shadow: 0px -1px 0px 0 #ccc inset;

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
          color: #1E1E1E;
          user-select: none;
          font-weight: 600;
          font-size: 12px;
          cursor: default;

          &.active {
            color: var(--primary-color);
            background: #ffffff;
            background: #ffffff;
            border-bottom: none;
            border-radius: 3px 3px 0px 0px;
            overflow: hidden;
            box-shadow:
              0px 1px 0px 0px inset #ccc,
              1px 0px 0px 0px inset #ccc,
              -1px 0px 0px 0px inset #cccccc;
          }

          &:hover {
            color: var(--primary-color);
          }
        }
      }

      .main-center-box {
        flex: 1;
        overflow: hidden;
        color: #1E1E1E;

        .btn {
          font-size: 12px;
          display: inline-block;
          padding: 0 4px;
          color: var(--primary-color);
          font-size: 600;
          cursor: default;
          padding: 1px 5px;
          border-radius: var(--radius-2);
          user-select: none;

          &:hover {
            text-decoration: underline;
          }
        }

        select {
          color: #1E1E1E;
          font-size: 16px;
          font-weight: 600;
          background: transparent;
          border-radius: var(--radius-3);
          height: 28px;

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
          font-size: 14px;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #333;
        }
      }

      .statistics-theme {
        width: 215px;
        font-weight: 600;
        color: #1E1E1E;

        div {
          margin-top: 10px;
        }
      }

    }
  }

  .theme-content-tabs {
    flex: 1;
    overflow: hidden;
  }
}
</style>
