import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})

export default router
