import Vue from "vue";
import VueRouter from "vue-router";
import { getToken, setToken, setCookie, getCookie } from "../utils/auth";
import LocalRoutes from "./routes";

Vue.use(VueRouter);

let routes = LocalRoutes;

const createRouter = () =>
  new VueRouter({
    linkActiveClass: "active",
    mode: "hash",
    base: "./",
    routes,
  });
const router = createRouter();

// 拦截器
router.beforeEach((to, from, next) => {
  if (!getToken()) {
    console.log("没有token,可在此处做跳转处理");
  }
  // 如果需要获取动态路由
  // getMenu(to, next)
  next();
});

export default router;
