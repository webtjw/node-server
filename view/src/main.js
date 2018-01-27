// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// lib
import Vue from 'vue'
import App from './App'
import router from './router'
import Toast from '@/toolkits/Toast'

// project initialize
import Initialize from './toolkits/Initialize'
Initialize.init()

Vue.config.productionTip = false
Vue.prototype.$toast = Toast

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
