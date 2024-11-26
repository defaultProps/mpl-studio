<script lang="ts" setup></script>

<template>
  <div class="application-project--container">
    <div class="project-box" />
    <div class="project-box" />
    <div class="project-box" />
    <div class="project-box" />
    <div class="project-box" />
    <div class="project-box" />
    <div class="project-box" />
  </div>
</template>

<style lang="less" scoped>
.application-project--container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 0 0 10px;
  box-sizing: border-box;
  .project-box {
    width: 360px;
    height: 150px;
    background-size: cover;
    margin: 0 10px 10px 0;
    box-sizing: border-box;
    overflow: hidden;
    background-color: var(--color-7);
    background-image: url('./assets/avatar.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 3px;
    &:hover {
      outline: 2px solid var(--primary-color);
    }
  }
}
</style>
