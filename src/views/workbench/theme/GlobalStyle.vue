<!-- eslint-disable max-len -->
<script lang="ts" setup>
const themeColorList = [
  { key: '--MPL-BA-01', color: '#fefcfd' },
  { key: '--MPL-BA-02', color: '#fdf5f7' },
  { key: '--MPL-BA-03', color: '#f9e6ea' },
  { key: '--MPL-BA-04', color: '#f1c2cd' },
  { key: '--MPL-BA-05', color: '#e591a6' },
  { key: '--MPL-BA-06', color: '#d95e7c' },
  { key: '--MPL-BA-07', color: '#ce2e54' },
  { key: '--MPL-BA-08', color: 'var(--color-4)' },
  { key: '--MPL-BA-09', color: '#a60028' },
  { key: '--MPL-BA-10', color: '#8a0021' },
  { key: '--MPL-BA-11', color: '#6f001b' },
  { key: '--MPL-BA-12', color: '#580015' },
  { key: '--MPL-BA-13', color: '#3b000e' },
  { key: '--MPL-BA-14', color: '#ffffff' },
  { key: '--MPL-BA-15', color: '#fcfcfc' },
  { key: '--MPL-BA-16', color: '#f5f5f5' },
  { key: '--MPL-BA-17', color: '#f0f0f0' },
  { key: '--MPL-BA-18', color: '#d9d9d9' },
  { key: '--MPL-BA-19', color: '#bfbfbf' },
  { key: '--MPL-BA-20', color: '#8c8c8c' },
  { key: '--MPL-BA-21', color: '#595959' },
  { key: '--MPL-BA-22', color: '#454545' },
  { key: '--MPL-BA-23', color: '#262626' },
  { key: '--MPL-BA-24', color: '#1f1f1f' },
  { key: '--MPL-BA-25', color: '#141414' },
  { key: '--MPL-BA-26', color: '#000000' }
]

const themeTextColorList = [
  { key: '--MPL-TC-01', color: '#000000' },
  { key: '--MPL-TC-02', color: '#0000005a' },
  { key: '--MPL-TC-03', color: '#0000003c' },
  { key: '--MPL-TC-04', color: '#00000028' },
  { key: '--MPL-TC-05', color: '#00000014' },
  { key: '--MPL-TC-06', color: '#ffffff' },
  { key: '--MPL-TC-07', color: '#ffffff46' },
  { key: '--MPL-TC-08', color: '#ffffff32' },
  { key: '--MPL-TC-09', color: '#ffffff1e' },
  { key: '--MPL-TC-10', color: 'var(--color-4)' },
  { key: '--MPL-TC-11', color: '#c3002f5a' },
  { key: '--MPL-TC-12', color: '#c3002f3c' },
  { key: '--MPL-TC-13', color: '#c3002f14' }
]

const themeTextChartColorList = [
  { key: '--MPL-CC-01', color: '#186F65' },
  { key: '--MPL-CC-02', color: '#B5CB99' },
  { key: '--MPL-CC-03', color: '#FCE09B' },
  { key: '--MPL-CC-04', color: '#B2533E' },
  { key: '--MPL-CC-05', color: '#B0578D' },
  { key: '--MPL-CC-06', color: '#D988B9' },
  { key: '--MPL-CC-07', color: '#FACBEA' },
  { key: '--MPL-CC-08', color: '#FFE4D6' },
  { key: '--MPL-CC-09', color: '#8EACCD' },
  { key: '--MPL-CC-10', color: '#D7E5CA' },
  { key: '--MPL-CC-11', color: '#F9F3CC' },
  { key: '--MPL-CC-12', color: '#D2E0FB' },
  { key: '--MPL-CC-13', color: '#BEFFF7' },
  { key: '--MPL-CC-14', color: '#A6F6FF' },
  { key: '--MPL-CC-15', color: '#9EDDFF' },
  { key: '--MPL-CC-16', color: '#6499E9' },
  { key: '--MPL-CC-17', color: '#141E46' },
  { key: '--MPL-CC-18', color: '#C3002F' },
  { key: '--MPL-CC-19', color: '#FF6969' },
  { key: '--MPL-CC-20', color: '#FFF5E0' }
]

const fontSizeList = [
  { key: '--MPL-FZ-01', value: 12 },
  { key: '--MPL-FZ-02', value: 14 },
  { key: '--MPL-FZ-03', value: 16 },
  { key: '--MPL-FZ-04', value: 18 },
  { key: '--MPL-FZ-05', value: 22 },
  { key: '--MPL-FZ-06', value: 26 }
]

const boxShadowList = [
  {
    key: '--MPL-BS-01',
    value: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
  },
  {
    key: '--MPL-BS-02',
    value: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
  },
  {
    key: '--MPL-BS-03',
    value: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
  },
  {
    key: '--MPL-BS-04',
    value: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
  },
  {
    key: '--MPL-BS-05',
    value: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
  },
  {
    key: '--MPL-BS-06',
    value: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  },
  {
    key: '--MPL-BS-07',
    value: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
  },
  {
    key: '--MPL-BS-08',
    value:
      'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
  },
  {
    key: '--MPL-BS-09',
    value:
      'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
  },
  { key: '--MPL-BS-10', value: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' },
  {
    key: '--MPL-BS-11',
    value:
      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'
  },
  {
    key: '--MPL-BS-12',
    value:
      'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
  },
  {
    key: '--MPL-BS-13',
    value: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px'
  },
  {
    key: '--MPL-BS-14',
    value:
      'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset'
  },
  {
    key: '--MPL-BS-15',
    value:
      'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px'
  },
  {
    key: '--MPL-BS-16',
    value:
      'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px'
  },
  {
    key: '--MPL-BS-17',
    value:
      'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px'
  },
  {
    key: '--MPL-BS-18',
    value:
      'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
  },
  {
    key: '--MPL-BS-19',
    value: `
      rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px,
      rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px,
      rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px`
  }
]
</script>

<template>
  <div class="theme-global-style--container">
    <div class="title">
      <i class="icon icon-youduiqi2" />
      基础颜色
    </div>
    <div class="color-content">
      <div
        v-for="item in themeColorList"
        :key="item.key"
        class="color-block"
      >
        <div class="label">
          <span>{{ item.key }}</span>
          <span>{{ item.color.toUpperCase() }}</span>
        </div>
        <div
          class="block"
          :style="{ background: item.color }"
        />
      </div>
    </div>
    <div class="title">
      <i class="icon icon-youduiqi2" />
      文本颜色
    </div>
    <div class="color-content">
      <div
        v-for="item in themeTextColorList"
        :key="item.key"
        class="color-block"
      >
        <div class="label">
          <span>{{ item.key }}</span>
          <span>{{ item.color.toUpperCase() }}</span>
        </div>
        <div
          class="block"
          :style="{ background: item.color }"
        />
      </div>
    </div>
    <div class="title">
      <i class="icon icon-youduiqi2" />
      图表颜色
    </div>
    <div class="color-content">
      <div
        v-for="item in themeTextChartColorList"
        :key="item.key"
        class="color-block"
      >
        <div class="label">
          <span>{{ item.key }}</span>
          <span class="copy-btn">{{ item.color.toUpperCase() }}</span>
        </div>
        <div
          class="block"
          :style="{ background: item.color }"
        />
      </div>
    </div>
    <div class="title">
      <i class="icon icon-youduiqi2" />
      字体大小
    </div>
    <div class="color-content">
      <div
        v-for="item in fontSizeList"
        :key="item.key"
        class="color-block"
      >
        <div class="label">
          <span>{{ item.key }}</span>
          <span>{{ item.value }}px</span>
        </div>
        <div
          class="block"
          :style="{ fontSize: `${item.value}px` }"
        >
          字体大小
        </div>
      </div>
    </div>
    <div class="title">
      <i class="icon icon-youduiqi2" />
      阴影
    </div>
    <div class="color-content">
      <div
        v-for="item in boxShadowList"
        :key="item.key"
        class="color-block"
        style="color: var(--primary-color); font-weight: 600"
      >
        <div
          class="block border-0"
          :style="{ boxShadow: item.value }"
        >
          {{ item.key }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.theme-global-style--container {
  box-sizing: border-box;
  padding: 10px;
  background-color: var(--color-7);
  .title {
    margin: 20px 0;
    font-size: 16px;
    font-weight: 600;
    color: #000;
    i {
      font-size: 16px;
    }
  }
  .color-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    .color-block {
      margin: 15px 5px 5px 4px;
      font-size: 12px;
      .label {
        font-size: 12px;
        color: #606266;
        text-align: center;
        padding: 3px;
        background: #e4e7ed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 3px;
        font-weight: 600;
        box-sizing: border-box;
      }
      .block {
        width: 180px;
        height: 70px;
        border: 1px solid #e4e7ed;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
        color: #000;
        &.border-0 {
          border: 0;
        }
      }
    }
  }
}
</style>
