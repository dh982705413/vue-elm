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
    name: 'shop',
    component: () => import('@/views/Shops/Shop')
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
  if (to.path === '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
