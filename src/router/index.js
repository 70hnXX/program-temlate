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
  // getMenu(to, next) // 获取路由并跳转
  next();
});

// 获取路由
function getMenu(to, next) {
  // 获取路由权限
  queryPermission({ id: getCookie("id"), type: 1 }).then(res => {
      if (res.code == 200) {
          // 前端自己处理了排序
          let menu = res.result.data.menuResourceList;
          // 获取成功后保存到本地ls
          localStorage.setItem(
              "menuPermission",
              JSON.stringify(menu)
          );
          initRoutes(to, next)
      }
  });
}

// 初始化路由
function initRoutes(to, next) {
  // 从ls中取路由的权限
  let menuPermission = JSON.parse(localStorage.getItem('menuPermission'))
  if (!menuPermission) {
      return
  }
  // 如果是后台返回的是全部路由，路由中有字段代表路由存在的花，需要用filterRouter过滤下
  function filterRouter(arr) {
      let newArr = []
      arr.forEach(item => {
          // 路由为checked表示具有此权限
          if (item.checked == '1' && item.type == 1) {
              try {
                  if (item.description && item.description.length > 0) {
                      // let str = item.description
                      item.path = JSON.parse(item.description).path
                      item.component = _import(JSON.parse(item.description).component)
                      if (JSON.parse(item.description).redirect) {
                          item.redirect = JSON.parse(item.description).redirect
                      }
                      item.meta = {
                          title: item.name
                      }
                      newArr.push(item)
                  }
                  if (item.children && item.children.length > 0) {
                      item.children = filterRouter(item.children)
                  }
              } catch (e) {
                  console.log('解析json发生错误:' + item.description)
                  console.log(e)
              }
          }
      })
      return newArr
  }
  fullRoute.children = filterRouter(menuPermission)
  if (fullRoute.children && fullRoute.children.length > 0) {
      fullRoute.redirect = fullRoute.children[0].path.slice(fullRoute.children[0].path.indexOf('/') + 1)
  }
  menu = fullRoute
  // 添加其他项目路由前，重置 matcher
  router.matcher = createRouter().matcher;
  let arr = []
  arr[0] = fullRoute
  localStorage.setItem('menu', JSON.stringify(fullRoute.children))
  let newRoutes = routes.concat(arr)
  router.addRoutes(newRoutes)
  next({...to, replace: true })
}
export default router;
