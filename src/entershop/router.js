import Vue from 'vue'
import Router from 'vue-router'
import Home from '../viewshop/Home.vue'

Vue.use(Router)
//process.env.BASE_URL
export default new Router({
  mode: 'hash',
  base: '/shop',
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
      path: '/login',
      name: 'login',
      component: () => import('../viewshop/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../viewshop/Register.vue')
    },
    {
      path: '/findpwd',
      name: 'findpwd',
      component: () => import('../viewshop/FindPwd.vue')
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import('../viewshop/Aboutus.vue')
    },
    {
      path: '/addAddr',
      name: 'addAddr',
      component: () => import('../viewshop/AddAddress.vue')
    },
    {
      path: '/goodDetail/:goodId',
      name: 'goodDetail',
      component: () => import('../viewshop/GoodDetail.vue')
    },
    {
      path: '/shopCart',
      name: 'shopCart',
      component: () => import('../viewshop/ShopCart.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../viewshop/Mine.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../viewshop/Orders.vue')
    },
    {
      path: '/orderDetail/:orderId',
      name: 'orderDetail',
      component: () => import('../viewshop/OrderDetail.vue')
    },
    {
      path: '/moneyOrderDetail/:orderId',
      name: 'moneyOrderDetail',
      component: () => import('../viewshop/MoneyOrderDetail.vue')
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: () => import('../viewshop/Suggest.vue')
    },
    {
      path: '/addressSetting',
      name: 'addressSetting',
      component: () => import('../viewshop/AddressSetting.vue')
    },
    {
      path: '/agentHome',
      name: 'agentHome',
      component: () => import('../viewshop/AgentHome.vue')
    },
    {
      path: '/agentFinance',
      name: 'agentFinance',
      component: () => import('../viewshop/AgentFinance.vue')
    },
    {
      path: '/agentOrders',
      name: 'agentOrders',
      component: () => import('../viewshop/AgentOrders.vue')
    },
    {
      path: '/agentOrderDetail/:orderId',
      name: 'agentOrderDetail',
      component: () => import('../viewshop/AgentOrderDetail.vue')
    }
  ]
})
