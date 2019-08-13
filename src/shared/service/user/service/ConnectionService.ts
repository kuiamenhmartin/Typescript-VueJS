import { injectable } from 'inversify-props'
import Vue from 'vue'
import Axios, { AxiosResponse } from 'axios'
import { ConnectionServiceInterface } from '@/shared/service/user'
import { AxiosHttp } from '@/shared/core/helpers'
import { CoinsNewCredential, CoinsCredentialAsParams } from '@/shared/core/types'

@injectable()
export class ConnectionService implements ConnectionServiceInterface {
  protected AxiosHttpHelper: any

  constructor () {
    this.AxiosHttpHelper = AxiosHttp
  }

  public async addConfig<CoinsNewCredential> (data: CoinsNewCredential): Promise<AxiosResponse> {
    try {
      return await Axios.post<AxiosResponse>('profile/credential', data)
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }

  public async updateConfig<CoinsNewCredential> (appId: number, data: CoinsNewCredential): Promise<AxiosResponse> {
    try {
      return await Axios.patch<AxiosResponse>(`profile/credential/${appId}`, data)
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }

  public async removeConfig<T> (appId: T): Promise<AxiosResponse> {
    try {
      return await Axios.delete<AxiosResponse>(`profile/credential/${appId}`)
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }

  public async getConfig (): Promise<AxiosResponse> {
    try {
      return await Axios.get<AxiosResponse>(`profile/credential`)
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }

  public async generetaAccessToken (): Promise<AxiosResponse> {
    try {
      return await Axios.get<AxiosResponse>('generate/access-token')
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }
  public async generateConfigAsParams (): Promise<AxiosResponse> {
    try {
      return await Axios.get<AxiosResponse>('generate/config-as-params')
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }
}
