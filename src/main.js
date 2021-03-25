// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from "axios"
axios.defaults.baseURL = "http://localhost:8086/";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false;
Vue.prototype.$addr = axios;
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts; //挂载在全局
Vue.config.productionTip = false;
import AFTableColumn from 'af-table-column'

Vue.use(AFTableColumn)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
