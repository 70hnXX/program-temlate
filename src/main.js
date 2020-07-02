import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './theme/index.css' //主体色调
import './assets/iconfont/iconfont.css' // 图标
import ElementUI from 'element-ui';
import './assets/css/common.less' //样式初始化
import code from './config/code.js'

Vue.prototype.$code = code

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
