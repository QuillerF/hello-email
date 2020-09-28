<template>
  <div class="hello">
    <el-container>
      <el-header>
        <h3>邮件模板</h3>
      </el-header>
      <el-container class="container" direction="horizontal">
        <el-aside width="200px">
          <el-menu
            default-active="1"
            background-color="#465d4c"
            text-color="#ffffff"
            active-text-color="#d7bca4"
            class="el-menu-vertical-demo"
            @select="menuselect"
          >
            <el-menu-item index="predict">
              <i class="el-icon-document"></i>
              <span slot="title">估时模板</span>
            </el-menu-item>
            <el-menu-item index="submittest">
              <i class="el-icon-document"></i>
              <span slot="title">提测模板</span>
            </el-menu-item>
            <el-menu-item index="postpone">
              <i class="el-icon-document"></i>
              <span slot="title">延期申请</span>
            </el-menu-item>
          </el-menu></el-aside
        >
        <el-main>
          <Predict v-if="index === 'predict'"></Predict>
          <SubmitTest v-if="index === 'submittest'"></SubmitTest>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Predict from "./Predict";
import SubmitTest from "./SubmitTest";

export default {
  name: "HelloWorld",
  data() {
    return {
      index: "predict",
    };
  },
  methods: {
    menuselect(val) {
      this.index = val;
    },
  },
  components: {
    Predict,
    SubmitTest,
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
    .el-menu {
      border-right: none;
    }
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
