### vue-admin 项目

### 启动项目

先`npm i`安装项目所需要的依赖,然后`npm run serve`启动项目

### 项目结构

```
 |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- logo_login.png
    |   |-- logo_menu.png
    |   |-- lib
    |       |-- env.js
    |-- src
        |-- App.vue
        |-- main.js
        |-- api
        |   |-- base.js
        |   |-- user.js
        |-- assets
        |   |-- css
        |   |   |-- common.less
        |   |   |-- create_user.less
        |   |   |-- elementReset.less
        |   |   |-- elenentReset_card.less
        |   |   |-- elenentReset_dialog.less
        |   |   |-- elenentReset_pagination.less
        |   |   |-- user_managementr.less
        |   |-- iconfont
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
        |   |-- images
        |       |-- del.png
        |       |-- enter.png
        |       |-- enter2.png
        |       |-- lock.png
        |       |-- login_bg.png
        |       |-- logo_blue.png
        |       |-- pic_opps_nodata.png
        |       |-- user.png
        |       |-- youelogo_white.png
        |-- components
        |   |-- common
        |   |   |-- leftNav.vue
        |   |   |-- pageination.vue
        |   |   |-- topHeader.vue
        |   |-- css
        |   |   |-- MindMap.scss
        |   |-- icons
        |   |   |-- crosshairs-gps.png
        |   |   |-- download.png
        |   |   |-- fit-to-page-outline.png
        |   |   |-- redo.png
        |   |   |-- undo.png
        |   |-- js
        |   |   |-- d3.js
        |   |   |-- History.js
        |   |   |-- JSONData.js
        |   |-- task
        |       |-- flowItem.vue
        |       |-- operationBtns.vue
        |       |-- taskItem.vue
        |       |-- taskQuery.vue
        |-- config
        |   |-- code.js
        |-- router
        |   |-- index.js
        |   |-- routerTreeFilter.js
        |   |-- routes.js
        |   |-- _import_.js
        |-- theme
        |   |-- index.css
        |   |-- fonts
        |       |-- element-icons.ttf
        |       |-- element-icons.woff
        |-- utils
        |   |-- AES.js
        |   |-- auth.js
        |   |-- iframe.vue
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