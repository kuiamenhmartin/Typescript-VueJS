import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { User } from '@/shared/core/types'
import { LocalPersistentStorage } from '@/shared/core/helpers'

const sforage = new LocalPersistentStorage({
  storeName: 'userStore'
})

@Module({ namespaced: true, name: 'user' })
export class UserStore extends VuexModule {
  user = new User()

  // get user info
  get userState () {
    return this.user
  }

  // commit changes to update the state
  @Mutation
  async userInfo (state: User) {
    // save data to our user state
    this.user = state
    // update user state
    await sforage.register('user', this.user)
  }

  // commit changes to update the state
  @Mutation
  async resetInfo (state: User) {
    // save data to our user state
    this.user = state
    // update user state
    await sforage.removeItem('user')
  }

  // update user action
  @Action({ rawError: true })
  async updateUserAction (state: User) {
    await this.context.commit('userInfo', state)
  }

  /**
   * we'll try to retrieve the user info from localSforage
   * and then well also try to save it again in state
   */
  @Action({ rawError: true })
  async resetUserInfoAction () {
    await this.context.commit('resetInfo', new User())
  }
}
