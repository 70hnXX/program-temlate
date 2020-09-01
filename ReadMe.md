# react-taro模板
taro的官方文档请访问[官方文档](https://taro-docs.jd.com/taro/docs/GETTING-STARTED)

## 前置条件
npm 10.0+

## 项目taro版本
Taro v3.0.8

## 运行项目
具体命令请查看项目目录下`package.json`
`yarn dev:h5`

## 目录介绍
- assets // 静态资源
- components // 不包含状态或方法的纯UI组件
- container // 包含状态或方法的组件
- const // 常量文件
- pages // 视图文件
- http // 存放请求类
  |-api // 存放请求路径
    |-member.js // 存放用户相关接口的请求路径
    |-index.js // 将此目录下的接口全部暴露出去
  |-index.js // http的拦截器,统一挂载全局请求
- utils // 存放工具类
  |-patterns.js // 存放正则表达式
  |-date.js // 日期相关

## 改动的地方
1. taro的所有组件,全都在src/global.js引入了,并对View/Text/Image/Button这三个常用组件做了扩展
2. 修改了config/index.js,开启css Module,以及alias