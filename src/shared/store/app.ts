import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

interface AppState {
  drawer: boolean;
}

@Module({ namespaced: true, name: 'app' })
export class AppStore extends VuexModule {
  app: AppState = {
    drawer: true
  }

  // get app drawer state
  get drawerState () {
    return this.app.drawer
  }

  // commit changes to update the state
  @Mutation
  updateDrawer (drawer: boolean) {
    // save data to our user state
    this.app.drawer = drawer
  }

  // update drawer
  @Action({ rawError: true })
  toggleDrawer (state: boolean) {
    this.context.commit('updateDrawer', state)
  }
}
