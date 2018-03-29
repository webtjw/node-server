import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ArticleDetail from '@/components/article/ArticleDetail'
import TagIndex from '../components/TagIndex'
import TagItem from '../components/TagItem'
import Archive from '../components/Archive'
import About from '../components/About'
import Login from '../components/Login'
import Utils from '../toolkits/Utils'

const ArticleEdit = () => import(/* webpackChunkName: "ArticleEdit" */ '@/components/article/ArticleEdit')

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', name: 'Index', component: Index},
    {
      path: '/article/edit/:id?',
      name: 'ArticleEdit',
      component: ArticleEdit,
      beforeEnter: (to, from, next) => {
        Utils.isLogin(isLogin => isLogin && next())
      }
    },
    {path: '/article/detail/:id', name: 'ArticleDetail', component: ArticleDetail},
    {path: '/tag', name: 'TagIndex', component: TagIndex},
    {path: '/tag/:type', name: 'TagItem', component: TagItem},
    {path: '/archive', name: 'Archive', component: Archive},
    {path: '/about', name: 'About', component: About},
    {path: '/login', name: 'Login', component: Login}
  ]
})

export default router
