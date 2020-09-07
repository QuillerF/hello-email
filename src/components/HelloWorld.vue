<template>
  <div class="hello">
    <el-container>
      <el-header>
        <h3>邮件模板</h3>
      </el-header>
      <el-container class="container" direction="horizontal">
        <el-aside width="200px">
          <el-menu  default-active="1" background-color="#465d4c" text-color="#ffffff" class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">估时模板</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">提测模板</span>
            </el-menu-item>
          </el-menu></el-aside
        >
        <el-main>
          <Predict></Predict>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Predict from "./Predict";

export default {
  name: "HelloWorld",
  components: {
    Predict,
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$border: #d7bca4;
.hello {
  height: 100vh;
  padding: 0 20px;
  color: #fff;
  background: #465d4c;
  .el-header {
    border-bottom: 1px solid $border;
  }
  .el-aside {
    text-align: center;
    padding: 10px;
    border-right: 1px solid $border;
  }
  .container {
    height: calc(100vh - 60px);
    border-bottom: 1px solid $border;
    .el-main {
      height: 100%;
      overflow: hidden;
    }
  }
}
h3 {
  text-align: center;
}
</style>
