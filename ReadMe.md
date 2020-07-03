### vue-admin 项目

### 启动项目

先`npm i`安装项目所需要的依赖,然后`npm run serve`启动项目

### 项目结构

```
|-- public
    |-- lib
        |-- env.js // 全局变量,包括各类接口的IP
|-- src
    |-- App.vue
    |-- main.js
    |-- api
    |   |-- base.js // axios配置,拦截器
    |   |-- user.js // 用户相关的接口
    |-- assets
    |   |-- css
    |   |   |-- reset.less // 样式重置reset
    |   |-- iconfont // iconfont
    |   |   |-- demo.css
    |   |   |-- demo_index.html
    |   |   |-- iconfont.css
    |   |   |-- iconfont.eot
    |   |   |-- iconfont.js
    |   |   |-- iconfont.json
    |   |   |-- iconfont.svg
    |   |   |-- iconfont.ttf
    |   |   |-- iconfont.woff
    |   |   |-- iconfont.woff2
    |   |-- images // 静态图片
    |       |-- del.png
    |       |-- lock.png
    |       |-- login_bg.png
    |       |-- logo_blue.png
    |       |-- pic_opps_nodata.png
    |       |-- user.png
    |       |-- youelogo_white.png
    |-- components
    |   |-- common
    |       |-- leftNav.vue // 侧边栏组件
    |       |-- pageination.vue // 分页组件
    |-- config
    |   |-- code.js // 接口状态码
    |-- router
    |   |-- index.js // 路由配置,拦截器
    |   |-- routes.js // 本地路由配置
    |   |-- _import_.js // 动态路由需要用到的import函数
    |-- theme // element-ui的主题
    |   |-- index.css
    |   |-- fonts
    |       |-- element-icons.ttf
    |       |-- element-icons.woff
    |-- utils
    |   |-- AES.js // 加密
    |   |-- auth.js // ls和cookie的封装
    |-- views
        |-- home
        |   |-- index.vue
        |   |-- index
        |   |   |-- index.vue
        |   |-- menu
        |       |-- index.vue
        |       |-- second
        |       |   |-- index.vue
        |       |-- second_2
        |           |-- index.vue
        |-- login
            |-- login.less
            |-- login.vue
```