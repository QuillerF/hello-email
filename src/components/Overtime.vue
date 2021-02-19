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
        <el-form-item label="申请人" prop="name">
          <div class="line-item">
            <el-input v-model="ruleForm.name" placeholder="输入名字"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <div class="line-item">
            <el-input
              v-model="ruleForm.itemName"
              placeholder="输入项目名称"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="加班时间">
          <div class="line-item">
            <el-date-picker
              v-model="daterange"
              format="yyyy-MM-DD HH:mm"
              type="datetimerange"
              placeholder="选择日期"
              style="width: 100%"
              @change="daterangeChange"
            ></el-date-picker>
            <el-input-number
              v-model="ruleForm.days"
              label="天数"
              :min="0.5"
              :max="10"
              :step="0.5"
              :controls="true"
              controls-position="both"
            >
            </el-input-number>
          </div>
        </el-form-item>
        <el-form-item label="加班原因" prop="predicts">
          <div class="btn-item">
            <div>
              <div
                v-for="(item, index) in ruleForm.reasons"
                :key="index + 1"
                class="input-area"
                style="margin-bottom: 10px"
              >
                <div class="btn-item">
                  <el-input
                    v-model="item.content"
                    placeholder="填写"
                  ></el-input>
                  <div class="btn-area center">
                    <el-button
                      type="danger"
                      circle
                      icon="el-icon-minus"
                      @click="delPredictItem(index)"
                    ></el-button>
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
        <el-form-item>
          <el-button type="primary" @click="doCopy">复制showDoc代码</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="area">
      <div class="area-title">内容预览区</div>
      <pre ref="pre">
#### 尊敬的领导:

​    您好!
​    我因为{{ ruleForm.itemName }}项目,需申请加班{{ ruleForm.days }}天.加班时间: {{ ruleForm.startTime | formatTime }} 到 {{ruleForm.endTime | formatTime}}
​    望领导批准。

##### 加班原因:
<div v-for="(item,index) in ruleForm.reasons" :key="index" >
  {{ index+1 }}.{{item.content}}
</div>

​                                               申请人: {{ruleForm.name}}
​                                               {{ruleForm.nowTime | formatDate}}


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
        itemName: "",
        reason: "",
        type: "",
        reasons: [
          {
            content: "",
          },
        ],
        startTime: "",
        endTime: "",
        nowTime: dayjs().toDate(),
      },
      types: ["年假", "病假", "婚假", "产假"],
      daterange: [],
      copyForm: {},
      message: "asdasdasd",
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
    this.daterange = [today, nextday];
    this.ruleForm.startTime = today;
    this.ruleForm.endTime = nextday;
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
      this.ruleForm.reasons.push({
        content: "",
      });
    },
    toArray(value) {
      if (!value) return [];
      return value.split(",");
    },
    delPredictItem(index) {
      if (this.ruleForm.reasons.length === 1) return;
      this.ruleForm.reasons.splice(index, 1);
    },
    daterangeChange(val = []) {
      const [start, end] = val || [];
      this.ruleForm.startTime = start;
      this.ruleForm.endTime = end;
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
