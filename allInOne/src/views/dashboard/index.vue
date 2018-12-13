<template>
  <div class="dashboard-container">
    <div>
      <h3>临时公告栏</h3>
      <h4>系统更新日志</h4>
      <section>
        <p>2018-12-09. 后台PDF上传服务增加日志追踪功能。</p>
        <p>2018-12-10. 增加密码修改功能。</p>
        <p>2018-12-13.</p>
        <ul>
          <li>1.为方便用户访问，让系统url地址不再使用ip+端口的形式，仅使用ip就可以访问。</li>
          <li>2.整合网站系统到node服务中，不再单独使用iis服务，网站和文件服务同用node端提供的web服务。</li>
          <li>3.增强安全性，关闭其它应用端口，只暴露80端口。</li>
        </ul>
      </section>
    </div>
    <!-- 做一些数据统计，需要数据支持。。。 -->
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
