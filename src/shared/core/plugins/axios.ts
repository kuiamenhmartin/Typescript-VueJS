import _Vue from 'vue'
import Axios from 'axios'
import { LocalPersistentStorage } from '@/shared/core/helpers'

export async function AxiosPlugin<AxiosPlugOptions> (Vue: typeof _Vue, options?: AxiosPluginOptions): Promise<any> {
  const sforage = new LocalPersistentStorage({
    storeName: 'userStore'
  })

  let cachedUser = await sforage.isSForageExists('user')

  // use Axios for all Http Requests
  Axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (cachedUser) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${cachedUser.token}`
  }

  Axios.defaults.baseURL = options!.baseUrl

  // do stuff with options
  Vue.prototype.$http = Axios
}

export class AxiosPluginOptions {
  baseUrl: string ='';
  csrf?: string = '';
  token?: string = '';
}
