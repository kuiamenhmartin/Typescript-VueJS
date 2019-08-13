import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Coins } from '@/shared/core/types'

@Module({ namespaced: true, name: 'coins' })
export class CoinsStore extends VuexModule {
  token: string = ''

  // get app drawer state
  get coinsToken () {
    return this.token
  }

  get coinsIsAuthorized (): boolean {
    return !!this.token
  }

  // commit changes to update the state
  @Mutation
  saveCoinsToken (newToken: string) {
    // save data to our user state
    this.token = newToken
  }

  // update drawer
  @Action({ rawError: true })
  updateCoinsToken (newToken: string) {
    this.context.commit('saveCoinsConfig', newToken)
  }
}
