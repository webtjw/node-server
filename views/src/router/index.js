import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import ArticleDetail from '@/components/article/ArticleDetail'
import Archive from '@/components/Archive/Archive'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', name: 'Index', component: Index},
    {path: '/article/detail/:id', name: 'ArticleDetail', component: ArticleDetail},
    {path: '/archives', name: 'Archive', component: Archive}
  ]
})

export default router
