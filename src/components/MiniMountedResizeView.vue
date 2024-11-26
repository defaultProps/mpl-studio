<template>
  <div class="mpl-mini-map--container">
    <div class="mpl-sidebar" />
    <div class="content-box">
      <div class="header-box" />
      <div class="breadcrumb-box" />
      <div class="main-box" />
      <div class="footer-box" />
    </div>
  </div>
  <div id="lcsWorkbenchMiniBox" />
</template>

<style lang="less" scoped>
#lcsWorkbenchMiniBox {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 130px;
  height: 80px;
  outline: 1px solid #2f7f795c;
  border-left: 0;
  border-top: 0;
  z-index: 5;
  cursor: move;
  background-size: 10px 10px;
  background-image: linear-gradient(
    135deg,
    #2f7f795c 0,
    #2f7f795c 25%,
    transparent 25%,
    transparent 50%,
    #2f7f795c 50%,
    #2f7f795c 75%,
    transparent 75%,
    transparent
  );
}
.mpl-mini-map--container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .mpl-sidebar {
    width: 30px;
    height: 100%;
    background-color: #b1b3b8;
  }
  .content-box {
    flex: 1;
    height: 100%;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .header-box {
      height: 10px;
      width: 100%;
      background-color: #b1b3b8;
      margin-bottom: 3px;
    }
    .breadcrumb-box {
      height: 5px;
      width: 100%;
      background-color: #b1b3b8;
      margin-bottom: 3px;
    }
    .main-box {
      flex: 1;
      width: 100%;
      background-color: #b1b3b8;
      margin-bottom: 3px;
    }
    .footer-box {
      height: 10px;
      width: 100%;
      background-color: #b1b3b8;
    }
  }
}
</style>
