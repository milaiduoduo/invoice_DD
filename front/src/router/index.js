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
    path: '/invoiceBlue',
    component: Layout,
    name: 'invoiceBlue',
    children: [{
      path: 'queryOrder',
      name: 'queryOrder',
      component: () => import('@/views/invoiceQuery/queryOrder'),
      meta: {
        title: '蓝票上传',
        icon: 'form',
        // keepAlive: true
      }
    }, {
      path: 'invoiceBlueFrom/:orderId',
      name: 'invoiceBlueFrom',
      component: () => import('@/views/invoiceBlue/invoiceBlue'),
      hidden: true,
      meta: {
        title: '蓝票上传 / 蓝票录入',
        icon: 'form'
      }
    }]
  },
  {
    path: '/invoiceRed',
    component: Layout,
    name: 'invoiceRed',
    children: [{
      path: 'queryBlueInvoice',
      name: 'queryBlueInvoice',
      component: () => import('@/views/invoiceQuery/queryBlueInvoice'),
      meta: {
        title: '红票上传',
        icon: 'nested',
        // keepAlive: true
      }
    }, {
      path: 'invoiceRedForm/:orderId/:invoiceCode/:invoiceNo',
      name: 'invoiceRedForm',
      component: () => import('@/views/invoiceRed/invoiceRedForm'),
      hidden: true,
      meta: {
        title: '红票上传 / 红票录入',
        icon: 'nested'
      }
    }]
  },
  {
    path: '/queryAllInvoice',
    component: Layout,
    name: 'queryAllInvoiceWrap',
    children: [{
      path: '',
      name: 'queryAllInvoice',
      component: () => import('@/views/invoiceQuery/queryAllInvoice'),
      meta: {
        title: '已上传发票查询',
        icon: 'link',
        // keepAlive: true
      }
    }]
  },
  {
    path: '/blueIvcDetail',
    component: Layout,
    name: 'blueIvcDetailWrap',
    hidden: true,
    children: [{
      path: '/blueIvcDetail/:orderId/:invoiceCode/:invoiceNo',
      name: 'blueIvcDetail',
      component: () => import('@/views/invoiceBlue/blueIvcDetail'),
      meta: {
        title: '蓝票详情',
        icon: 'link'
      }
    }]
  },
  {
    path: '/redIvcDetail',
    component: Layout,
    name: 'redIvcDetailWrap',
    hidden: true,
    children: [{
      path: '/redIvcDetail/:orderId/:blueInvoiceCode/:blueInvoiceNo/:invoiceCode/:invoiceNo',
      name: 'redIvcDetail',
      component: () => import('@/views/invoiceRed/redIvcDetail'),
      meta: {
        title: '红票详情',
        icon: 'link'
      }
    }]
  },
  {
    path: '/sysConfig',
    component: Layout,
    name: 'sysConfigWrap',
    children: [{
      path: '',
      name: 'sysConfig',
      component: () => import('@/views/setting/sysConfig'),
      meta: {
        title: "参数设置",
        icon: 'link'
      }
    }]
  },
  // {
  //   path: '/test',
  //   component: Layout,
  //   children: [{
  //     path: '',
  //     name: 'test',
  //     component: () => import('@/views/test'),
  //     meta: {
  //       title: 'test',
  //       icon: 'nested'
  //     }
  //   }]
  // },
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
