<template>
  <div class="sider_left">
    <div class="logo">
      <div class="logo-item" ref="logContainer"></div>
      <div>后台管理系统</div>
    </div>
    <div class="menu-side">
      <el-menu
        unique-opened
        :default-active="currentActive"
        class="el-menu-vertical-demo"
        :default-openeds="defaultOpeneds"
        @select="menuSelect"
        @close="handleClose"
        background-color="#354053"
        text-color="#fff"
        ref="leftMenu"
        active-text-color="#4F8DFF"
      >
        <template v-for="item in menuConfig">
          <el-submenu
            v-if="item.children && item.children.length"
            :index="item.path"
            :key="item.name"
            :class="{center: isCollapse}"
          >
            <template slot="title">
              <i :class="['iconfont',item.icon]"></i>
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <el-menu-item
              v-for="(subItem, subIndex) in item.children"
              :index="subItem.path"
              :class="{center: isCollapse, 'is-active': $route.path.indexOf(subItem.path) > -1}"
              :key="subIndex"
            >
              <template slot="title">
                <span slot="title">{{subItem.meta.title}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :class="{center: isCollapse}" :index="item.path" :key="item.id">
            <i :class="['iconfont',item.icon]"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { removeToken, getCookie } from "@/utils/auth";
import { Encryption, EncryptionWithoutEncode } from "@/utils/AES.js";
export default {
  name: "Index",
  data() {
    return {
      isCollapse: false,
      currentActive: this.$route.path,
      defaultOpeneds: ["/system", "/user"],
      menuConfig: []
    };
  },
  mounted() {
    this.initMenu();
  },
  methods: {
    initMenu() {
      // 根据路由信息生成菜单
      // 我们需要的菜单都在path = '/home'那一项的children里面,所以先过滤到我们想要的
      let router = null;
      try {
        router = this.$router.options.routes.filter(
          item => item.path === "/home"
        )[0].children;
      } catch (e) {
        this.$message({
          message: "菜单信息不完整,请重新登录",
          type: "warning"
        });
      }
      this.menuConfig = router;
    },
    menuSelect(e, e2) {
      // 选中当前路由,会触发刷新页面
      if (this.$route.path.indexOf(e) == -1) {
        this.$router.replace({
          path: "index" + e2.length == 2 ? e2[0] + e2[1] : e
        });
      } else {
        if (e == e2[e2.length - 1]) {
          window.location.reload();
          return;
        }
      }
    },
    handleClose() {}
  },
  watch: {
    "$route.path": {
      handler: function(val, oldVal) {
        this.currentActive = val;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sider_left {
  background: #354053;
  transition: width 0.3s;
  min-height: 100vh;
  min-width: 64px;
  position: relative;
  height: 100%;

  .logo {
    box-sizing: border-box;
    padding: 14px 34px;
    /*width: 200px;*/
    height: 86px;
    background-color: rgba(77, 114, 231, 1);
    text-align: center;
    font-size: 16px;
    color: white;

    .logo-item {
      width: 33px;
      height: 34px;
      margin: 0 auto 9px auto;

      img {
        width: 33px;
        height: 34px;
      }
    }
  }

  .menu-side {
    height: calc(100vh - 306px);
    overflow-y: auto;
    background-color: #354053;
  }

  .menu-side::-webkit-scrollbar {
    display: none;
  }
}

.iconfont {
  color: #fff;
  font-size: 16px;
  margin-right: 0.2rem;
}
</style>

