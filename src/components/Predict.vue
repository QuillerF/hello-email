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
        <el-form-item label="项目名称" prop="name">
          <div class="line-item">
            <el-input v-model="ruleForm.name" placeholder="项目名称"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="任务分解" prop="predicts">
          <div class="btn-item">
            <div>
              <div
                v-for="(item, index) in ruleForm.predicts"
                :key="index + 1"
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
                    v-model="item.devUrl"
                    placeholder="技术文档链接"
                  ></el-input>
                  <el-input
                    v-model="item.timeUrl"
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
        <el-form-item label="开发时间">
          <div class="line-item">
            <el-date-picker
              type="datetimerange"
              :default-time="['09:30:00', '18:30:00']"
              :picker-options="pickOptions"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              v-model="ruleForm.devDateRange"
              style="width: 100%"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="自测时间">
          <div class="line-item">
            <el-date-picker
              type="datetimerange"
              :picker-options="pickOptions"
              :default-time="['09:30:00', '18:30:00']"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="ruleForm.testDate"
              style="width: 100%"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="提测时间">
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
          <el-button type="primary" @click="doCopy">复制showDoc代码</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="area">
      <div class="area-title">内容预览区</div>
      <pre ref="pre">

###技术文档:<span v-for="(item,index) in ruleForm.predicts" :key="index">
{{item.name }}
{{item.devUrl}}
</span>
###估时文档:<span v-for="(item,index) in ruleForm.predicts" :key="index">
{{item.name }} {{item.time}}<span v-if="item.time">h</span>
{{item.timeUrl}}
</span>

开发时间: {{ ruleForm.devDateRange&&ruleForm.devDateRange[0] | formatTime }} - {{ ruleForm.devDateRange&&ruleForm.devDateRange[1] | formatTime }}

联调自测: {{ ruleForm.testDate&&ruleForm.testDate[0] | formatTime }} - {{ ruleForm.testDate&&ruleForm.testDate[1] | formatTime }}

###预计提测: {{ ruleForm.deliveryDate | formatTime }}

```plantuml
@startmindmap
+ {{ ruleForm.name }}<span v-for="(item) in ruleForm.predicts" :key="item.id">
++ {{item.name}}<span v-for="el in toArray(item.items)" :key="el" >
+++ {{el}}</span>
</span>
@endmindmap
```

```plantuml
@startgantt
sunday are closed
project starts the {{ ruleForm.devDateRange&&ruleForm.devDateRange[0] | formatDate }}
scale 2
-- 进入开发 --
[开发]  starts {{ ruleForm.devDateRange&&ruleForm.devDateRange[0] | formatDate }} and ends {{ ruleForm.devDateRange&&ruleForm.devDateRange[1] | formatDate }} and is 0% complete
[联调自测]   starts {{ ruleForm.testDate&&ruleForm.testDate[0] | formatDate }} and ends {{ ruleForm.testDate&&ruleForm.testDate[1] | formatDate }} and is 0% complete
[开发]->[联调自测]
[提测] happens {{ ruleForm.deliveryDate | formatDate }}
-- 提测 --
[提测]->[测试]
[测试] starts {{ ruleForm.deliveryDate | formatDate }}
[测试] lasts 2 days and is 0% complete
today is colored in #AAF
@endgantt
```
      </pre>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        devUrl: "",
        predicts: [
          {
            name: "",
            timeUrl: "",
            devUrl: "",
            time: "",
            items: "",
          },
        ],
        devDateRange: [],
        testDate: [],
        waitDate: "",
        deliveryDate: "",
      },
      pickOptions: {
        shortcuts: [
          {
            text: "开始9:30",
            onClick(vm) {
              console.log(vm);
              const [today = new Date(), nextday] = vm.value || [];
              const newDay = dayjs(today)
                .set("hour", 9)
                .set("minute", 30)
                .set("second", 0)
                .toDate();
              vm.value = [newDay, nextday];
            },
          },
          {
            text: "开始14:00",
            onClick(vm) {
              console.log(vm);
              const [today = new Date(), nextday] = vm.value || [];
              const newDay = dayjs(today)
                .set("hour", 14)
                .set("minute", 0)
                .set("second", 0)
                .toDate();
              vm.value = [newDay, nextday];
            },
          },
          {
            text: "结束12:00",
            onClick(vm) {
              console.log(vm);
              const [today, nextday = new Date()] = vm.value || [];
              const newDay = dayjs(nextday)
                .set("hour", 12)
                .set("minute", 0)
                .set("second", 0)
                .toDate();
              vm.value = [today, newDay];
            },
          },
          {
            text: "结束18:30",
            onClick(vm) {
              console.log(vm);
              const [today, nextday = new Date()] = vm.value || [];
              const newDay = dayjs(nextday)
                .set("hour", 18)
                .set("minute", 30)
                .set("second", 0)
                .toDate();
              vm.value = [today, newDay];
            },
          },
        ],
      },
      copyForm: {},
      message: "asdasdasd",
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        devUrl: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.copyForm = cloneDeep(this.ruleForm);
    const today = dayjs()
      .set("hour", 9)
      .set("minute", 30)
      .set("second", 0)
      .toDate();
    const nextday = dayjs(today)
      .add(3, "day")
      .set("hour", 18)
      .set("minute", 30)
      .set("second", 0)
      .toDate();
    this.ruleForm.devDateRange = [today, nextday];
  },
  computed: {},
  methods: {
    doCopy() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        console.log(this.$refs.pre.innerText);
        this.message = this.$refs.pre.innerText;
        this.$copyText(this.message).then(
          (e) => {
            this.onCopy();
            console.log(e);
          },
          (e) => {
            this.onError;
            console.log(e);
          }
        );
      });
    },
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

    resetForm() {
      this.ruleForm = cloneDeep(this.copyForm);
      this.$refs.ruleForm.resetFields();
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
    background: #d7bca4;
  }
  &::-webkit-scrollbar-track {
    background: #465d4c;
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
  grid-template-columns: 57% 38%;
  grid-gap: 10px 30px;
  .el-form {
    width: 100%;
    height: calc(100vh - 150px);
    overflow-y: scroll;
    padding-right: 20px;
    @include chatting-scroll-bar;
    .el-form-item {
      width: 100%;
    }
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
      grid-template-columns: 55% 1fr;
      grid-gap: 10px;
    }
    .three-item {
      display: grid;
      grid-template-columns: 100px 80px 1fr 1fr auto;
      grid-gap: 10px;
    }
    .task {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 10px;
      grid-column-start: span 4;
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
    color: #999;
  }
}
</style>
