import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ArticleDetail from '@/components/article/ArticleDetail'
// import ArticleDetail from '@/components/article/ArticleDetail'
// import Archive from '@/components/Archive/Archive'
// import Category from '@/components/category/Category'
// import CategoryList from '@/components/category/CategoryList'
// import Tag from '@/components/tag/Tag'
// import TagsList from '@/components/tag/TagsList'
// import About from '@/components/about/About'
// import Login from '@/components/about/Login'
// import Utils from '../toolkits/Utils'

const ArticleEdit = () => import(/* webpackChunkName: "ArticleEdit" */ '@/components/article/ArticleEdit')

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', name: 'Index', component: Index},
    {path: '/article/edit/:id?', name: 'ArticleEdit', component: ArticleEdit},
    {path: '/article/detail/:id', name: 'ArticleDetail', component: ArticleDetail}
  ]
})

export default router
