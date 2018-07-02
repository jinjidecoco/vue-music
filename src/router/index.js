import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Search from '@/page/search'
import Singer from '@/page/singer'
import Rank from '@/page/rank'
import MenuDetail from '@/page/menu-detail'
import SingDetail from '@/page/singer-detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: ':id',
          component: MenuDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/rank',
      component: Rank
    }
  ]
})
