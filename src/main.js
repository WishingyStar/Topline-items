import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

import '@/common/iconfont.js';
import '@/components/vant';

import mixin from '@/common/mixins'
Vue.mixin(mixin)

Vue.prototype.$bus = new Vue()



import init from '@/common/init'

// 另一种写法
const app = new Vue({
  router,
  store,
  render: h => h(App)
})

init().then(res => {
  app.$mount('#app')
})
// 常规写法
// init().then(res => {
//   new Vue({
//     router,
//     store,
//     render: h => h(App)
//   }).$mount('#app')
// })