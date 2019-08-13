import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import { Routing } from '@/shared/core/helpers'

// we need page loading and error vue templates to feed to our routes
const PageLoading = () => import('@/views/notifications/PageLoading.vue')
const PageError = () => import('@/views/notifications/PageError.vue')

export default (): RouteConfig[] => {
  return [
    {
      path: '',
      meta: {
        requiresAuth: false
      },
      beforeEnter: (to, from, next) => {
        // redirect to homepage or to previous page
        Routing.whenAuthenticated(from, next)
        // continue
        next()
      },
      component: (): any => ({
        component: import(/* webpackChunkName: "member" */'@/views/pages/Authentication.vue'),
        // show this component during load
        loading: PageLoading,
        // show this component if it fails to load
        error: PageError,
        // delay before showing the loading component
        delay: 200,
        // error if the component failed to loadin is allotted time in milliseconds default in Infinity
        timeout: 3000
      }),
      children: [
        {
          name: 'index',
          path: '',
          redirect: { name: 'login' }
        },
        {
          name: 'login',
          path: 'login',
          meta: {
            requiresAuth: false
          },
          component: () => import(/* webpackChunkName: "member" */'@/components/auth/base/Login.vue')
        },
        {
          name: 'signup',
          path: 'signup',
          meta: {
            requiresAuth: false
          },
          component: () => import(/* webpackChunkName: "member" */'@/components/auth/base/Signup.vue')
        },
        {
          name: 'confirm',
          path: 'confirm-email/:token',
          meta: {
            requiresAuth: false
          },
          component: () => import(/* webpackChunkName: "member" */'@/components/auth/notification/ConfirmEmail.vue')
        },
        {
          name: 'forgotPassword',
          path: 'forgot-password',
          meta: {
            requiresAuth: false
          },
          component: () => import(/* webpackChunkName: "member" */'@/components/auth/forgot-password/ForgotPassword.vue')
        },
        {
          name: 'resetPassword',
          path: 'reset-password/:token',
          meta: {
            requiresAuth: false
          },
          component: () => import(/* webpackChunkName: "member" */'@/components/auth/forgot-password/ResetPassword.vue')
        }
      ]
    }
  ]
}
