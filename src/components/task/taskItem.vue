<template>
  <div class="task-item">
    <!-- <img class="close-btn" src="../../assets/images/task/close.png" alt /> -->
    <div class="line">
      <div class="title">
        <el-checkbox v-model="checked" @change="isSelectChange"></el-checkbox>
        <span v-if="!showTitleInput" style="marginLeft:14px;"  @click="taskClick">{{localTaskInfo.taskName}}</span>
        <span v-else style="marginLeft:14px;">
          <el-input
            ref="titleInput"
            v-model="localTaskInfo.taskName"
            placeholder="请输入内容"
            :maxlength="40"
            @blur="toggleTitleInput"
          ></el-input>
        </span>
        <img
          @click.stop="toggleTitleInput"
          src="../../assets/images/task/edit_active.png"
          style="width:17px;height:17px;marginLeft:9px;"
          alt
        />
      </div>
      <div
        style="color:#B5B8BE;marginLeft:60px;"
      >{{loacalMoment(localTaskInfo.createDate).format("YYYY.MM.DD HH:mm")}}</div>
      <!-- <div style="marginLeft:39px;">
        表数量：
        <span style="color:#FBBB02;">{{localTaskInfo.tableCount}}</span> 张 数据总量：
        <span style="color:#FBBB02;">{{localTaskInfo.tableDataSize}}</span> MB
      </div> -->
      <div v-if="localTaskInfo.status == 1" class="status-btn success">暂存</div>
      <div v-if="localTaskInfo.status == 2" class="status-btn success">等待执行</div>
      <div v-if="localTaskInfo.status == 3" class="status-btn success">进行中</div>
      <div v-if="localTaskInfo.status == 4" class="status-btn pause">停止</div>
      <div v-if="localTaskInfo.status == 5" class="status-btn cancle">失败</div>
      <div v-if="localTaskInfo.status == 6" class="status-btn complate">已完成</div>
      <div v-if="localTaskInfo.status == 7" class="status-btn failed">删除</div>
      <div v-if="localTaskInfo.status == 8" class="status-btn failed">草稿</div>
    </div>
    <div class="divede"></div>
    <el-row>
      <div class="des-line">
        <div v-if="!showDesInput" class="des">{{localTaskInfo.taskDesc}}</div>
        <div v-else class="des">
          <el-input
            ref="desInput"
            v-model="localTaskInfo.taskDesc"
            type="textarea"
            syle="width:100%"
            :autosize="true"
            :maxlength="200"
            placeholder="请输入内容"
            @blur="toggleDesInput"
          ></el-input>
        </div>
        <!-- <div class="edit" @click="toggleDesInput">编辑</div> -->
      </div>
    </el-row>
    <el-row>
      <div class="flow">
        <flowItem
          v-for="(item, index) in localTaskInfo.processPoList"
          :key="index"
          :flowData="item"
          :isLast="index == (localTaskInfo.processPoList.length - 1)"
        />
      </div>
    </el-row>
    <div class="console" style="display:none">
      <div class="collesp-btn">
        <img
          v-if="showConsole && showConsole2"
          src="../../assets/images/task/up.png"
          style="width20px;height:12px"
          alt
          @click.stop="toggleShowConsole"
        />
        <img
          v-else
          class="rotateIcon"
          src="../../assets/images/task/up.png"
          style="width20px;height:12px"
          alt
          @click.stop="toggleShowConsole"
        />
      </div>
      <!-- 显示控制台的逻辑当前是,没有全局收起,且此任务的id不在父组件的hideConsoleList中 -->
      <div class="console-content" v-show="showConsole && showConsole2">
        <el-progress :percentage="60" :format="format"></el-progress>
        <div style="margin:22px 0;">正在进行： 黄金鸡</div>
        <div class="tips">
          <div class="tip">
            <img src="../../assets/images/task/fine.png" alt />
            <span>数据格式合规性</span>
            <span>查看</span>
          </div>
          <div class="tip">
            <img src="../../assets/images/task/task_error.png" alt />
            <span>XX任务执行异常</span>
            <span>处理</span>
          </div>
          <div class="tip">
            <img src="../../assets/images/task/share_error.png" alt />
            <span>数据共享异常</span>
            <span>处理</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import flowItem from "./flowItem";
import moment from "moment";
import { updateTaskNameOrDesc } from "@/api/task";
export default {
  props: ["taskInfo", "showConsole", "showConsole2", "operationList"], // 任务的信息,是否全局显示任务栏,是否本地显示任务栏
  data() {
    return {
      checked: false,
      showTitleInput: false,
      showDesInput: false,
      title: "样例库治理任务",
      title2: "样例库治理任务2",
      loacalMoment: moment,
      localTaskInfo: {}
    };
  },
  components: {
    flowItem
  },
  mounted() {
    this.init();
    this.initChecked();
  },
  methods: {
    taskClick(){
      // if (this.taskInfo.status == 1 || this.taskInfo.status == 2 || this.taskInfo.status == 4 || this.taskInfo.status == 5 || this.taskInfo.status == 8) {
        this.$emit('editeTask',this.localTaskInfo.id)
      // }
    },
    initChecked() {
      // console.log(this.operationList)
      // console.log(this.localTaskInfo.id)
      if (this.operationList.length == 0) {
        this.checked = false;
      } else {
        let isExist = this.operationList.some(item => {
          return item.id == this.localTaskInfo.id;
        });
        this.checked = isExist ? true : false;
      }
    },
    init() {
      this.localTaskInfo = Object.assign({}, this.taskInfo);
      this.initChecked()
      if (
        this.localTaskInfo &&
        this.localTaskInfo.processPoList &&
        this.localTaskInfo.processPoList.length > 0
      ) {
        // 开始和结束不予展示
        let start = null;
        let end = null;
        this.localTaskInfo.processPoList.forEach((item, index) => {
          if (item.code == "appStart") {
            start = index;
          }
          if (item.code == "appEnd") {
            end = index;
          }
        });
        if (start) {
          this.localTaskInfo.processPoList.splice(start, 1);
        }
        if (end) {
          this.localTaskInfo.processPoList.splice(end, 1);
        }
      }
    },
    format(percentage) {
      return "";
    },
    toggleShowConsole() {
      this.$emit("toggleConsole", this.localTaskInfo.id);
    },
    // 修改标题
    toggleTitleInput() {
      if (this.showTitleInput) {
        this.showTitleInput = false;
        // 判断是否被修改过
        if (this.localTaskInfo.taskName != this.taskInfo.taskName) {
          // console.log(this.localTaskInfo.taskName)
          this.changeTaskNameOrDesc(1, this.localTaskInfo.taskName);
        }
      } else {
        this.showTitleInput = true;
        this.$nextTick(e => {
          this.$refs.titleInput.focus();
        });
      }
    },
    // 修改描述
    toggleDesInput() {
      if (this.showDesInput) {
        // 判断是否被修改过
        if (this.localTaskInfo.taskDesc != this.taskInfo.taskDesc) {
          // console.log(this.localTaskInfo.taskDesc)
          this.changeTaskNameOrDesc(2, this.localTaskInfo.taskDesc);
        }
        this.showDesInput = false;
      } else {
        this.showDesInput = true;
        this.$nextTick(e => {
          this.$refs.desInput.focus();
        });
      }
    },
    // 修改任务名称或者描述
    changeTaskNameOrDesc(flag, name) {
      updateTaskNameOrDesc({
        flag,
        name,
        id: this.localTaskInfo.id
      }).then(res => {
        this.$emit("taskChange");
      });
    },
    // 点击左上角复选框
    isSelectChange(e) {
      this.$emit("operationChange", {
        isSelect: e,
        id: this.localTaskInfo.id,
        status: this.localTaskInfo.status,
        taskName: this.localTaskInfo.taskName
      });
    }
  },
  watch: {
    taskInfo: {
      handler: function(val, oldVal) {
        // console.log(val);
        this.init();
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.task-item {
  position: relative;
  font-size: 12px;
  background: #fff;
  margin-top: 20px;
  border: 4px;
  padding: 20px 30px 32px 20px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.status-btn {
  width: 70px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 12px;
  margin-left: 37px;
  cursor: pointer;
}
.success {
  color: #fff;
  background: rgba(75, 189, 187, 1);
}
.pause {
  color: #fff;
  background: #cdd2e6;
}
.cancle {
  color: #fff;
  background: #fbbb02;
}
.complate {
  color: #fff;
  background: #4d72e7;
}
.failed {
  color: #fff;
  background: #4d72e7;
}
.line {
  height: 20px;
  line-height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #2f3949;
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 20px;
  }
}
.divede {
  height: 0px;
  border: 1px solid rgba(227, 232, 240, 1);
  margin: 20px auto;
}
.des-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  color: #2f3949;
  .des {
    width: 90%;
  }
  .edit {
    width: 29px;
    height: 16px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    text-decoration: underline;
    color: rgba(77, 114, 231, 1);
    line-height: 26px;
    cursor: pointer;
  }
}
.flow {
  display: flex;
  justify-content: flex-start;
}
.console {
  margin-top: 10px;
  .collesp-btn {
    text-align: right;
    cursor: pointer;
    margin-bottom: 8px;
  }
  .console-content {
    padding: 27px 17px 18px;
    background: rgba(244, 245, 247, 1);
    border-radius: 4px;
  }
}
.tips {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .tip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 185px;
    height: 20px;
    font-size: 14px;
    color: #2f3949;
    line-height: 20px;
    margin-right: 123px;
    span:nth-child(3) {
      color: #4d72e7;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.rotateIcon{
 -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>