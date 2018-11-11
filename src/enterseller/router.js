import Vue from 'vue'
import Router from 'vue-router'
import Home from '../viewseller/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: '/seller',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../viewseller/Orders.vue')
    },
    {
      path: '/orderDetail/:orderId',
      name: 'orderDetail',
      component: () => import('../viewseller/OrderDetail.vue')
    },
    {
      path: '/finance',
      name: 'finance',
      component: () => import('../viewseller/Finance.vue')
    }
  ]
})
