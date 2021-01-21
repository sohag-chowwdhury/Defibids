import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import create from '@/components/create'
import account from '@/components/account'
import imprint from '@/components/imprint'
import detail from '@/components/detail'
import info from '@/components/info'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: imprint
    },
    {
      path: '/:id/:type?',
      name: 'detail',
      component: detail
    }
  ]
})
