import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'

// this is used by inversify
import 'reflect-metadata'

import App from './App.vue'
import { AxiosPlugin } from '@/shared/core/plugins'
import { containerBuilder } from './container'
import Notifications from 'vue-notification'

import store from './store'
import { router } from './router'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import '../node_modules/nprogress/nprogress.css'
import '@/assets/main.css'

export class AppModule {
  constructor () {
    // disable production error
    Vue.config.productionTip = false

    // load containers
    containerBuilder()

    // load snotify
    this.loadPlugins()

    // finally, load the App
    this.bootstrap()
  }

  private loadPlugins () {
    // load axios for http class
    Vue.use(AxiosPlugin, {
      baseUrl: 'http://127.0.0.1:8000/api',
      csrf: '',
      token: ''
    })

    Vue.prototype.$appName = 'coinsph'

    Vue.use(VeeValidate)

    // build UI
    Vue.use(Vuetify, {
      iconfont: 'mdi'
    })
    // load notification
    Vue.use(Notifications)
  }

  private async bootstrap (): Promise<Vue> {
    return new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }

  log () {
    /* eslint-disable no-console */
    console.log('app started')
    /* eslint-enable no-console */
  }
}

// create instance of the app
const CoinsApp = new AppModule()
CoinsApp.log()
