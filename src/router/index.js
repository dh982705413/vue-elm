import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Index'),
    redirect: '/home',
    children: [
      { path: '/home', name: 'home', component: () => import('@/views/Home') },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/Order')
      },
      { path: '/me', name: 'me', component: () => import('@/views/Me') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/AddressChange')
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('@/views/City')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
  },
  {
    path: '/shop',
    component: () => import('@/views/Shops/Shop'),
    redirect: '/goods',
    children: [
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/views/Shops/Goods.vue')
      },
      {
        path: '/comments',
        name: 'comments',
        component: () => import('@/views/Shops/Comments.vue')
      },
      {
        path: '/seller',
        name: 'seller',
        component: () => import('@/views/Shops/Seller.vue')
      }
    ]
  },
  {
    path: '/myAddress',
    name: 'myAddress',
    component: () => import('@/views/Orders/MyAddress')
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import('@/views/Orders/AddAddress')
  },
  {
    path: '/settlement',
    name: 'settlement',
    component: () => import('@/views/Orders/Settlement')
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import('@/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// ? 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.ele_login
  if (to.path === '/login' || to.path === '/me' || to.path === '/home') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
