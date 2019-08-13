import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import NProgress from 'nprogress'
import { AuthModule } from '@/components/auth'
import { ConnectionModule } from '@/components/connection'
import { Routing } from '@/shared/core/helpers'

// we need page loading and error vue templates to feed to our routes
const PageLoading = () => import('@/views/notifications/PageLoading.vue')
const PageError = () => import('@/views/notifications/PageError.vue')

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '*',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/layouts/404.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      // redirect to login page
      Routing.whenNotAuthenticated(to, next)
      // otherwise continue
      next()
    },
    component: () => import('@/views/pages/Home.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      // redirect to login page
      Routing.whenNotAuthenticated(to, next)
      // otherwise continue
      next()
    },
    component: () => import('@/views/pages/Home.vue')
  },
  {
    path: '/buy',
    name: 'buy',
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      // redirect to login page
      Routing.whenNotAuthenticated(to, next)
      // otherwise continue
      next()
    },
    component: () => import('@/views/pages/Home.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      // redirect to login page
      Routing.whenNotAuthenticated(to, next)
      // otherwise continue
      next()
    },
    component: () => import('@/views/pages/Home.vue')
  },
  {
    path: '/history',
    name: 'history',
    beforeEnter: (to, from, next) => {
      // redirect to login page
      Routing.whenNotAuthenticated(to, next)
      // otherwise continue
      next()
    },
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/pages/About.vue')
  },
  {
    path: '/notifications',
    name: 'notifications',
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      // redirect to login page
      Routing.whenNotAuthenticated(to, next)
      // otherwise continue
      next()
    },
    component: () => import('@/views/pages/Home.vue')
},
{
  path: '/user',
  name: 'users',
  meta: {
    requiresAuth: true
  },
  beforeEnter: (to, from, next) => {
    // redirect to login page
    Routing.whenNotAuthenticated(to, next)
    // otherwise continue
    next()
  },
  component: () => import('@/views/pages/Home.vue')
},
...AuthModule.routes(),
...ConnectionModule.routes()
];

const router = new Router({
  base: '/',
  mode: 'hash',
  scrollBehavior: (to, from, savedPosition) =>  {
    if (from.path === '/') {
      return { selector: '#app' }
    }

    if (to.path === '/') {
      return
    }

    if (savedPosition) {
      return savedPosition
    }

    return Promise.resolve({
      x: 0,
      y: 0
    })
  },
  routes: routes
});

router.beforeResolve((to, from, next) => {
  // lets add the progress bar
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.beforeEach((to, from, next) => {
  // if page requires authorization
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // but the user is not yet authenticated at the moment,
    Routing.whenNotAuthenticated(to, next)

    console.log('authenticated, update state if authenticated in coins')
  }
  // go on to the next page if everything above fails
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export { router, routes }
