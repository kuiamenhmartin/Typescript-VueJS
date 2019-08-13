import Vue from 'vue'
import Axios from 'axios'
import { ErrorNotif } from '@/shared/core/helpers'

export interface NetworkResponse {
  data?: {
    status: string,
    message: string
  }
}

export class AxiosHttp {
  /**
   * Put the Authorization token as Bearer
   * @method updateTokenBearerInHttpHeaders
   * @param  token String
   * @return Promise
   */
  static async updateTokenBearerInHttpHeaders (token: string): Promise<any> {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    // do stuff with options
    Vue.prototype.$http = Axios
  }

  /**
   * Reset and remove Authorization in the Header
   * @method resetTokenBearerInHttpHeaders
   * @return void
   */
  static async resetTokenBearerInHttpHeaders (): Promise<void> {
    // remove Authorization entry
    delete Axios.defaults.headers.common['Authorization']
    // do stuff with options
    Vue.prototype.$http = Axios
  }

  static async errorResponse (error: any): Promise<NetworkResponse> {
    let message = error.response ? error.response.data.message : error.message
    await ErrorNotif(message)
    return {
      data: {
        status: 'ERROR',
        message: message
      }
    }
  }
}
