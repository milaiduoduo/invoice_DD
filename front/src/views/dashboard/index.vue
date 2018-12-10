<template>
  <div class="dashboard-container">
    <div>
      <h3>临时公告栏</h3>
      <h4>系统更新日志</h4>
      <section>
        <p>2018-12-09. 后台PDF上传服务增加日志追踪功能。</p>
        <p>2018-12-10. 增加密码修改功能。</p>
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
