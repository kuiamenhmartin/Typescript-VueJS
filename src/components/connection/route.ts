import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import { Routing } from '@/shared/core/helpers'

//we need page loading and error vue templates to feed to our routes
const PageLoading = () => import('@/views/notifications/PageLoading.vue')
const PageError = () => import('@/views/notifications/PageError.vue')

export default (): RouteConfig[] => {
  return [
    {
      path: '/connect',
      name: 'Connection',
      meta: {
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => {
        // redirect to login page
        Routing.whenNotAuthenticated(to, next)
        // otherwise continue
        next()
      },
      component: (): any => ({
        component: import(/* webpackChunkName: "member" */'@/views/pages/Connection.vue'),
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
          name: 'baseConnection',
          path: '',
          meta: {
            requiresAuth: true
          },
          component: () => import(/* webpackChunkName: "member" */'@/components/connection/base/Index.vue')
        },
        {
          name: 'baseConnection',
          path: '',
          meta: {
            requiresAuth: true
          },
          component: () => import(/* webpackChunkName: "member" */'@/components/connection/base/Index.vue')
        }
      ]
    }
  ]
}
