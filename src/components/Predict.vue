<template>
  <div class="email">
    <div class="area">
      <div class="area-title">填写区</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="180px"
        class="demo-ruleForm"
      >
        <el-form-item label="产品文档" prop="name">
          <div class="line-item">
            <el-input v-model="ruleForm.name" placeholder="项目名称"></el-input>
            <!-- <el-input
              v-model="ruleForm.productUrl"
              placeholder="项目产品文档链接"
            ></el-input> -->
          </div>
        </el-form-item>
        <el-form-item label="技术文档" prop="productUrl">
          <div class="line-item">
            <el-input
              v-model="ruleForm.devUrl"
              placeholder="技术文档链接"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="估时文档" prop="predicts">
          <div class="btn-item">
            <div>
              <div
                v-for="(item, index) in ruleForm.predicts"
                :key="index"
                class="input-area"
                style="margin-bottom: 10px"
              >
                <div class="three-item">
                  <el-input
                    v-model="item.name"
                    placeholder="开发人姓名"
                  ></el-input>
                  <el-input
                    v-model="item.time"
                    placeholder="估时(h)"
                  ></el-input>
                  <el-input
                    v-model="item.url"
                    placeholder="估时文档链接"
                  ></el-input>
                  <div class="btn-area center">
                    <el-button
                      type="danger"
                      circle
                      icon="el-icon-minus"
                      @click="delPredictItem(index)"
                    ></el-button>
                  </div>
                  <div class="task">
                    <el-input
                      v-model="item.items"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入分解任务,多个任务以逗号分隔"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="addPredictItem"
              >添加</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="开发时间" required>
          <div class="line-item">
            <el-date-picker
              type="datetimerange"
              :default-time="['09:30:00', '18:30:00']"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              v-model="ruleForm.devDateRange"
              style="width: 100%"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="等待时间" required>
          <div class="line-item">
            <el-input
              v-model="ruleForm.waitDate"
              placeholder="请输入预计协作方等待时间(PD)"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="自测完成时间" required>
          <div class="line-item">
            <el-date-picker
              type="datetime"
              default-time="18:30:00"
              placeholder="选择日期"
              v-model="ruleForm.testDate"
              style="width: 100%"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="提测时间" required>
          <div class="line-item">
            <el-date-picker
              type="datetime"
              default-time="09:30:00"
              placeholder="选择日期"
              v-model="ruleForm.deliveryDate"
              style="width: 100%"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制代码</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="area">
      <div class="area-title">内容预览区</div>
      <pre ref="pre">
```plantuml
@startmindmap
title {{ ruleForm.name }}
+ {{ ruleForm.name }}<span v-for="(item) in ruleForm.predicts" :key="item.id">
++ {{item.name}}<span v-for="el in toArray(item.items)" :key="el" >
+++ {{el}}</span>
</span>
@endmindmap
```

```plantuml
@startgantt
title {{ ruleForm.name }}
sunday are closed
project starts the {{ ruleForm.devDateRange[0] | formatDate }}
scale 3
-- 进入开发 --
[开发]  starts {{ ruleForm.devDateRange[0] | formatDate }} and ends {{ ruleForm.devDateRange[1] | formatDate }} and is 0% complete
[联调自测]   starts {{ ruleForm.devDateRange[1] | formatDate }} and ends {{ ruleForm.testDate| formatDate }} and is 0% complete
[开发]->[联调自测]
[提测] happens {{ ruleForm.deliveryDate | formatDate }}
-- 提测 --
[提测]->[测试]
[测试] starts {{ ruleForm.deliveryDate | formatDate }}
[测试] lasts 2 days and is 0% complete
today is colored in #AAF
@endgantt
```

技术文档:
{{ ruleForm.devUrl }}

估时文档<span v-for="(item,index) in ruleForm.predicts" :key="index">
{{item.name }} {{item.time}}h
{{item.url}}
</span>

开发开始时间
{{ ruleForm.devDateRange[0] | formatTime }}

开发结束时间
{{ ruleForm.devDateRange[1] | formatTime }}

预计协作方等待时间
{{ruleForm.waitDate}}PD

联调自测完成时间
{{ ruleForm.testDate | formatTime }}

提测时间
{{ ruleForm.deliveryDate | formatTime }}</pre>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        productUrl: "",
        devUrl: "",
        predicts: [
          {
            name: "",
            url: "",
            time: "",
            items: "",
          },
        ],
        devDateRange: ["2020-9--7", "2020-9-7"],
        testDate: "",
        waitDate: "",
        deliveryDate: "",
      },
      message: "asdasdasd",
      textarea: "",
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  created() {
    console.log(this.$refs.pre);
  },
  computed: {
    getInnerHtml() {
      if (!this.$refs.pre) return "";
      return this.$refs.pre.innerText;
    },
  },
  methods: {
    addPredictItem() {
      this.ruleForm.predicts.push({
        name: "",
        url: "",
        time: "",
        items: "",
      });
    },
    toArray(value) {
      if (!value) return [];
      return value.split(",");
    },
    delPredictItem(index) {
      if (this.ruleForm.predicts.length === 1) return;
      this.ruleForm.predicts.splice(index, 1);
    },
    submitForm() {
      // this.$refs.pre.innerHTML;
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    resetForm() {
      console.log(this.$refs.pre.innerText);
      this.message = this.$refs.pre.innerText;
      // this.$refs[formName].resetFields();
    },
    // 复制成功时的回调函数
    onCopy() {
      this.$message.success("内容已复制到剪切板！");
    },
    // 复制失败时的回调函数
    onError() {
      this.$message.error("抱歉，复制失败！");
    },
  },
  filters: {
    formatDate(val) {
      if (!val) return "";
      return dayjs(val).format("YYYY-MM-DD");
    },
    formatTime(val) {
      if (!val) return "";
      return dayjs(val).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// 自定义滚动条样式
$border: #d7bca4;
@mixin chatting-scroll-bar() {
  &::-webkit-scrollbar {
    width: 8px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #d4d5d6;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
    border: 0;
  }
}
* {
  color: #fff;
  box-sizing: border-box;
}
.email {
  width: 100%;
  display: grid;
  grid-template-columns: 60% 38%;
  grid-gap: 10px 30px;
  .el-form {
    width: 100%;
    height: calc(100vh - 150px);
    overflow-y: auto;
    padding-right: 20px;
    @include chatting-scroll-bar;
    .input-area {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid $border;
    }
    .btn-item {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 10px;
    }
    .line-item {
      display: grid;
      grid-template-columns: 50% 1fr;
      grid-gap: 10px;
    }
    .three-item {
      display: grid;
      grid-template-columns: 20% 20% 1fr auto;
      grid-gap: 10px;
    }
    .task {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 10px;
      grid-column-start: span 3;
    }
    .btn-area {
      grid-row-start: span 2;
    }
    .center {
      align-self: center;
    }
  }
  .area {
    &-title {
      text-align: center;
      margin-bottom: 20px;
      font-weight: bold;
    }
    .el-textarea {
      height: 100%;
    }
    pre {
      height: calc(100vh - 150px);
      overflow-y: auto;
      @include chatting-scroll-bar;
    }
    /deep/.el-textarea__inner {
      height: 100%;
    }
  }
  /deep/.el-form-item__label {
    color: #fff;
  }
}
/deep/.el-input__inner,
/deep/.el-textarea__inner,
/deep/.el-range-input {
  &::placeholder {
    color: #666;
  }
}
</style>
