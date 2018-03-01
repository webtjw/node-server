import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import ArticleDetail from '@/components/article/ArticleDetail'
import Archive from '@/components/Archive/Archive'
import Category from '@/components/category/Category'
import CategoryList from '@/components/category/CategoryList'
import Tag from '@/components/tag/Tag'
import TagsList from '@/components/tag/TagsList'
import About from '@/components/about/About'
import Login from '@/components/about/Login'
import Utils from '../toolkits/Utils'

const ArticleEdit = () => import(/* webpackChunkName: "article-edit" */ '@/components/article/ArticleEdit')

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', name: 'index', component: Index},
    {
      path: '/article/edit/:id?',
      name: 'article-edit',
      component: ArticleEdit,
      beforeEnter: (to, from, next) => {
        const isLogin = Utils.isLogin()
        if (isLogin) next()
        else Vue.prototype.$toast.show('请输入您的开发者口令！')
      }
    },
    {path: '/article/:id', name: 'article-detail', component: ArticleDetail},
    {path: '/archives', name: 'archive', component: Archive},
    {path: '/category', name: 'category', component: Category},
    {path: '/category/:name', name: 'category-list', component: CategoryList},
    {path: '/tags', name: 'tag', component: Tag},
    {path: '/tags/:name', name: 'tag-list', component: TagsList},
    {path: '/login', name: 'login', component: Login},
    {path: '/about', name: 'about', component: About}
  ]
})

/*eslint-disable*/
import '../assets/images/svg/tag.svg'
import '../assets/images/svg/index.svg'
import '../assets/images/svg/category.svg'
import '../assets/images/svg/tag.svg'
import '../assets/images/svg/archive.svg'
import '../assets/images/svg/about.svg'
import '../assets/images/svg/time.svg'
import '../assets/images/svg/delete.svg'
import '../assets/images/svg/down.svg'
import '../assets/images/svg/left.svg'
import '../assets/images/svg/right.svg'
import '../assets/images/svg/cry.svg'

export default router
