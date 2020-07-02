<template>
  <div class="query">
    <div class="line">
      <div class="line-title">服务：</div>
      <div v-for="(item, index) in serviceList" :key="index">
        <div
          class="line-item"
          :class="{'active': serviceActive == item.status}"
          @click="change(1, item.status)"
        >{{item.name}}（{{item.countNum}}）</div>
      </div>
    </div>
    <div class="line">
      <div class="line-title">状态：</div>
      <div v-for="(item, index) in statusList" :key="index">
        <!-- status == '9' 的是新建的,不予显示 -->
        <!-- status == '8' 的是删除的,不予显示 -->
        <div
          v-if="item.countNum > 0 && item.status != '9' && item.status != '8'"
          class="line-item"
          :class="{'active': statusActive == item.status}"
          @click="change(2, item.status)"
        >{{item.name}}（{{item.countNum}}）</div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  listCountByStatus,
  getAllService,
  listCountByServiceStatus
} from "@/api/task";
export default {
  data() {
    return {
      service: [],
      serviceList: [],
      statusList: [],
      serviceActive: "",
      statusActive: "",
      serviceQuery: {
        status: "",
        key: ""
      },
      StatusQuery: {
        categoryService: "",
        key: ""
      }
    };
  },
  mounted() {
    // 获取全部服务配置信息
    getAllService()
      .then(res => {
        this.service = res.result;
        return res;
      })
      .then(res2 => {
        this.getServices();
        this.getStatus();
      });
  },
  methods: {
    changeKey(e) {
      this.serviceQuery.key = e
      this.StatusQuery.key = e
      // 重置选中
      this.serviceActive = ''
      this.statusActive = ''
      // 再去请求列表
      this.getServices()
      this.getStatus()
      this.$emit("queryChange", {
        categoryService: this.serviceActive,
        status: this.statusActive,
        key: this.serviceQuery.key
      });
    },
    // 查询服务列表
    getServices() {
      this.serviceList = [];
      listCountByServiceStatus(this.serviceQuery).then(res => {
        this.serviceList = res.result;
        let total = 0;
        // 开始和结束不予展示
        let start = null;
        let end = null;
        this.serviceList.forEach((item, index) => {
          if (item.status == "appStart") {
            start = index;
          }
          if (item.status == "appEnd") {
            end = index;
          }
          item.name = this.fromCodeToName(item.status);
          total += item.countNum;
        });
        if (start) {
          this.serviceList.splice(start, 1);
        }
        if (end) {
          this.serviceList.splice(end, 1);
        }
        this.serviceList.unshift({
          status: "",
          name: "全部",
          countNum: total
        });
      });
    },
    // 查询状态列表
    getStatus() {
      this.statusList = [];
      listCountByStatus(this.StatusQuery).then(res => {
        this.statusList = res.result;
        let total = 0;
        this.statusList.forEach(item => {
          item.name = this.fromStatusToName(item.status);
          if (item.status != '8' && item.status != '9') {
            total += item.countNum;
          }
        });
        this.statusList.unshift({
          status: "",
          name: "全部",
          countNum: total
        });
      });
    },
    // serviceStatus转name
    fromCodeToName(code) {
      let name = "";
      this.service.forEach(item => {
        if (item.code === code) {
          name = item.name;
        }
      });
      return name;
    },
    // status转name
    fromStatusToName(status) {
      let name = "";
      switch (status) {
        case "1":
          name = "未启动";
          break;
        case "2":
          name = "等待执行";
          break;
        case "3":
          name = "进行中";
          break;
        case "4":
          name = "暂停中";
          break;
        case "5":
          name = "已取消";
          break;
        case "6":
          name = "已完成";
          break;
        case "7":
          name = "失败";
          break;
        default:
          break;
      }
      return name;
    },
    // 服务或者状态被改变
    change(type, e) {
      if (type === 1) {
        this.serviceActive = e;
        this.StatusQuery.categoryService = e;
        this.getStatus();
      }
      if (type === 2) {
        this.statusActive = e;
        this.serviceQuery.status = e;
        this.getServices();
      }
      this.$emit("queryChange", {
        categoryService: this.serviceActive,
        status: this.statusActive,
        key: this.serviceQuery.key
      });
    }
  }
};
</script>
<style lang="less" scoped>
.query {
  background: #fff;
  padding: 27px 29px 30px 29px;
  border-radius: 4px;
}
.line {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  color: #2f3949;
}
.line:nth-child(2) {
  margin-top: 30px;
}
.active {
  color: #4d72e7;
}
.line-item {
  cursor: pointer;
  margin-right: 50px;
}
</style>