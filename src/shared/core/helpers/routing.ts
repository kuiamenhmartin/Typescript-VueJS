import Router, { Route } from 'vue-router'
import { Inject } from 'inversify-props'
import { LocalPersistentStorage } from '@/shared/core/helpers'
import { ConnectionServiceInterface } from '@/shared/service/user'

const sforage = new LocalPersistentStorage({
  storeName: 'userStore'
})

export class Routing {

  @Inject()
  private ConnectionService!: ConnectionServiceInterface

  static async whenNotAuthenticated (to: any, next: any) {
    if (!await sforage.isAuthenticated('user')) {
      // we'll redirect the user to login page
      next({
          path: '/login',
          query: { redirect: to.fullPath }
      })
    }
  }

  static async whenAuthenticated (from:any, next:any) {
    if(await sforage.isAuthenticated('user')){
      next({path: from.fullPath})
    }
    next()
  }

  static createRedirectFromRouteQuery (query: any, path: string): any {
    return query.hasOwnProperty('redirect') ? query.redirect : path
  }

  // static async 
}
