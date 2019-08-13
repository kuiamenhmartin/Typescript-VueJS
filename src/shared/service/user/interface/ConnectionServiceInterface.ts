import { CoinsNewCredential, CoinsCredentialAsParams } from '@/shared/core/types'
import { AxiosResponse } from 'axios'

export interface ConnectionServiceInterface {
  addConfig<CoinsNewCredential> (data: CoinsNewCredential): Promise<AxiosResponse>;
  updateConfig<CoinsNewCredential> (appId: number, data: CoinsNewCredential): Promise<AxiosResponse>;
  removeConfig<T> (appId: T): Promise<AxiosResponse>;
  getConfig (): Promise<AxiosResponse>;
  generetaAccessToken (): Promise<AxiosResponse>;
  generateConfigAsParams (): Promise<AxiosResponse>;
}
