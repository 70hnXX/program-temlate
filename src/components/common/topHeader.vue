<template>
  <div class="top-header">
    <div class="left">
      <div
        :class="{'current' : index == bread.length - 1}"
        v-for="(item, index) in bread"
        :key="index"
        @click="jump(item, index)"
      >
        <span v-if="index != 0" style="margin:0 5px;">></span>
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="right" v-if="showQuery">
      <div>高级查询</div>
      <div class="query-item">
        <input type="text" v-model="queryString" />
        <i class="el-icon-search" @click="query"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showQuery"],
  data() {
    return {
      bread: [],
      queryString: ""
    };
  },
  activated() {
    this.initBreadCrumb();
  },
  mounted() {
    this.initBreadCrumb();
  },
  methods: {
    initBreadCrumb() {
      let menu = JSON.parse(localStorage.getItem("menuPermission"))
        ? JSON.parse(localStorage.getItem("menuPermission"))
        : null;
      let currentRoute = this.$route;
      // 在menu中寻找到跟当前路由匹配的路由,并把它的父级找到
      if (!menu) {
        return;
      }
      let parrent = this.findParrent(menu, currentRoute.meta.title);
      // console.log(parrent);
      if (parrent) {
        let parrentRoute = {
          name: parrent.name,
          path: JSON.parse(parrent.description)
            ? JSON.parse(parrent.description).path
            : ""
        };

        // 当前只考虑两层路由
        this.bread = [];
        this.bread.push(parrentRoute);
      }

      this.bread.push(currentRoute);
      // console.log(this.bread)
      // this.$forceUpdate()
    },
    findParrent(arr, name) {
      let parrent = null;
      arr.forEach(item => {
        if (item.children && item.children.length > 0) {
          let isParrent = item.children.some(item2 => {
            return item2.name === name;
          });
          if (isParrent) {
            parrent = item;
          }
        }
      });
      return parrent;
    },
    jump(e, index) {
      if (index != 0) {
        this.$router.replace(e.path);
      }
    },
    reset() {
      this.queryString = "";
      // 父组件使用this.$refs.topHeader.reset()触发此方法
    },
    query() {
      this.$emit("query", this.queryString);
    }
  }
};
</script>
<style lang="less" scoped>
.top-header {
  // height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(244, 245, 247, 1);
  font-size: 16px;

  .left {
    display: flex;
    justify-content: flex-start;
    color: #2f3949;
    padding-left: 12px;
    border-left: solid 4px #4f8dff;
    font-weight: 600;
    .current {
      color: #4f8dff;
      cursor: pointer;
    }
  }

  .right {
    width: 470px;
    height: 38px;
    line-height: 38px;
    color: #8992a0;
    display: flex;
    justify-content: space-between;

    .query-item {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 380px;
      height: 38px;
      line-height: 38px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      padding: 0 13px;

      input {
        width: 300px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        border-width: 0;
        outline: none;
      }

      .el-icon-search {
        cursor: pointer;
      }
    }
  }
}
</style>