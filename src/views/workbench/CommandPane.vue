<script setup lang="ts">
import { ref } from 'vue'
import { projectStore } from '@mpl/store'

</script>

<template>
  <div class="mpl-command-pane--container">
    <table>
      <thead>
        <tr>
          <th>命令</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ctrl + S</td>
          <td>保存当前画板文档</td>
        </tr>
        <tr>
          <td>Ctrl + P</td>
          <td>搜索画板页面内容</td>
        </tr>
        <tr>
          <td>Ctrl + S</td>
          <td>保存当前文档</td>
        </tr>
        <tr>
          <td>Ctrl + S</td>
          <td>保存当前文档</td>
        </tr>
        <tr>
          <td>Ctrl + S</td>
          <td>保存当前文档</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="less">
.mpl-command-pane--container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
