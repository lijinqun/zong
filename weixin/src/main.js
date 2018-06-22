// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' //微信路由
import router2 from './router2' //app路由

import config from './config'

// 兼容ie9以上的浏览器，包括就浏览器
import 'babel-polyfill'

// 全局引用vant组件
import Vant from 'vant'
import VueLazyload from 'vue-lazyload'
import { Lazyload } from 'vant'
// 全局Echarts组件

// import VCharts from 'v-charts'
// Vue.use(VCharts)

import { MP } from './api/map.js'

import 'vant/lib/vant-css/index.css'
// import VueQr from 'vue-qr'//生成二维码
// Vue.component(VueQr)
// 全局组件
import topHeader from './components/topHeader.vue'
Vue.component('topHeader', topHeader)

import { gpsPositioning } from "./api";//引入api
// gpsPositioning()//调用api中的GPS定位获取经度纬度

// sessionStorage.setItem('longitude', '113.59047810255386')
// sessionStorage.setItem('latitude', '22.256645467709323')
// sessionStorage.setItem('cityname', '珠海市')


// 移动端控制台调试
import vConsole from 'vconsole'
Vue.component(vConsole)


Vue.prototype.payWechat = true //判断是否支持微信支付

// Vue.prototype.dirpath = '/cccec/order' //微信目录

Vue.prototype.dirpath = '/zouwei/order' //微信目录

// 懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/385.png'),
  loading: require('./assets/385.png'),
  attempt: 1
})
Vue.use(Vant)

// Vue.use(Lazyload);

// Vue.config.productionTip = false

/* eslint-disable no-new */
// 判断是走app 还是走微信
if (config.payWechat == false ){
console.log('config')
console.log(config)
  new Vue({
    el: '#app',
    router: router2,
    components: { App },
    template: '<App/>'
  })
}else{
  new Vue({
    el: '#app',
    router: router,
    components: { App },
    template: '<App/>'
  })
}



