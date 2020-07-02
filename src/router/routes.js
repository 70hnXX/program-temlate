const fullRoute = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue"),
    meta: {
      title: "登录页",
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/index.vue"),
    redirect: '/index',
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../views/home/index/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/menu",
        name: "menu",
        component: () => import("../views/home/menu/index.vue"),
        meta: {
          title: "一级菜单",
        },
        children: [
          {
            path: "/second",
            name: "index",
            component: () => import("../views/home/menu/second/index.vue"),
            meta: {
              title: "二级菜单",
            },
          },
          {
            path: "/third",
            name: "index",
            component: () => import("../views/home/menu/second_2/index.vue"),
            meta: {
              title: "二级菜单_2",
            },
          }
        ]
      },
    ],
  },
];

export default fullRoute;
