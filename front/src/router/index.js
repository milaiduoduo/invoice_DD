import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页概览',
        icon: 'form'
      }
    }]
  },
  {
    path: '/queryInvoice',
    component: Layout,
    children: [{
      path: '',
      name: 'queryInvoice',
      component: () => import('@/views/invoiceQuery'),
      meta: {
        title: '已上传票据查询',
        icon: 'link'
      }
    }]
  },
  {
    path: '/invoiceBlue',
    component: Layout,
    children: [{
      path: '',
      name: 'invoiceBlue',
      component: () => import('@/views/invoiceBlue/invoiceBlue'),
      meta: {
        title: '蓝票上传',
        icon: 'form'
      }
    }]
  },
  {
    path: '/invoiceRed',
    component: Layout,
    children: [{
      path: '',
      name: 'invoiceRed',
      component: () => import('@/views/invoiceRed'),
      meta: {
        title: '红票上传',
        icon: 'nested'
      }
    }]
  },
  {
    path: '/test',
    component: Layout,
    children: [{
      path: '',
      name: 'test',
      component: () => import('@/views/test'),
      meta: {
        title: 'test',
        icon: 'nested'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
