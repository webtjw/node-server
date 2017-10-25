import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import ArticleDetail from '@/components/article/ArticleDetail'
import Archive from '@/components/Archive/Archive'
import Category from '@/components/category/Category'
import CategoryItem from '@/components/category/CategoryItem'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', name: 'index', component: Index},
    {path: '/article/detail/:id', name: 'article-detail', component: ArticleDetail},
    {path: '/archives', name: 'archive', component: Archive},
    {path: '/category', name: 'category', component: Category},
    {path: '/category/:name', name: 'category-item', component: CategoryItem}
  ]
})

export default router
