import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/Index';
// import ArticleDetail from '@/components/article/ArticleDetail'
// import Archive from '@/components/Archive/Archive'
// import Category from '@/components/category/Category'
// import CategoryList from '@/components/category/CategoryList'
// import Tag from '@/components/tag/Tag'
// import TagsList from '@/components/tag/TagsList'
// import About from '@/components/about/About'
// import Login from '@/components/about/Login'
// import Utils from '../toolkits/Utils'

const ArticleEdit = () => import(/* webpackChunkName: "article-edit" */ '@/components/article/ArticleEdit')

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', name: 'Index', component: Index},
    {path: '/article/edit', name: 'ArticleEdit', component: ArticleEdit}
  ]
})

/*eslint-disable*/
import '../assets/images/svg/tag.svg';
import '../assets/images/svg/index.svg';
import '../assets/images/svg/category.svg';
import '../assets/images/svg/tag.svg';
import '../assets/images/svg/archive.svg';
import '../assets/images/svg/about.svg';
import '../assets/images/svg/time.svg';
import '../assets/images/svg/delete.svg';
import '../assets/images/svg/down.svg';
import '../assets/images/svg/left.svg';
import '../assets/images/svg/right.svg';
import '../assets/images/svg/cry.svg';

export default router
