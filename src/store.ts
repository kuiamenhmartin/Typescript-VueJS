import Vue from 'vue'
import Vuex, { Module } from 'vuex'

import { UserStore, AppStore, CoinsStore } from '@/shared/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: UserStore,
    app: AppStore,
    coins: CoinsStore
  }
})
