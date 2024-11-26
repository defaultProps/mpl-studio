<template>
  <div class="service-config-page--box">
    当前页面绑定的服务配置（以及所有页面绑定的服务列表）
    <br>
    - mpl平台自带绑定一个基础服务。该服务400+个Mock基础服务列表 +
    100个外部生产服务接口（网易、阿里免费服务接口，此接口需要连接外网且增加节流请求次数） +
    50个mpl生产服务接口。（非常适用于演示、测试、调研、原型设计非研发场景的需求）
    <br>
    - 显示当前页面的服务。包括Mock服务、真实服务列表（开发环境绑定的服务都是Mock状态接口）
    <br>
    - 通过中间Mock服务。后台服务遵循mock接口规则。前端直接调用Mock接口。前后端只需要遵循Mock规则即可。
    <br>
    - mock接口增加开关，前端可使用Mock接口或者直接调用服务接口。
    <br>
    - mock接口字段改变（前后端可直接更改），调用mock模块时会直接提示已经更改。并提示该接口在哪些页面更改，提示用户去更改。
    <br>
    - 所有的mock请求统一执行一套入口规则。（该规则用户可以自定义替换jdk，不同应用平台的规则不一致。）
    <br>
    - 已经上线的项目使用mpl平台时，通常调用的都是真实服务接口。mock开启自动转发nginx服务
    <br>
    - 显示所有页面绑定的服务列表。
    <br>
    - 自定义接口。托拉拽或postman的形式生成前端接口。
    <br>
    - 后台接口服务：通过托拉拽 antG 绘图 + sql生成后台接口服务列表。// 后台执行js语言生成接口服务。
  </div>
</template>

<style lang="less" scoped>
  .service-config-page--box {
    box-sizing: border-box;
    padding: 0 5px;
    overflow: hidden auto;
    width: 100%;
    height: 100%;
    color: #000;
  }
</style>
