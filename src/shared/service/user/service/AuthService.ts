import { injectable } from 'inversify-props'
import Vue from 'vue'
import Axios, { AxiosResponse } from 'axios'
import { AuthServiceInterface } from '@/shared/service/user'
import { AxiosHttp } from '@/shared/core/helpers'
import { User, UserSignUp, UserResetPassword } from '@/shared/core/types'

@injectable()
export class AuthService implements AuthServiceInterface {
  protected AxiosHttpHelper: any

  constructor () {
    this.AxiosHttpHelper = AxiosHttp
  }

  public async login<User> (data: User): Promise<AxiosResponse> {
    try {
      return await Axios.post<AxiosResponse>('auth/login', data)
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }

  public async logout (): Promise<AxiosResponse> {
    try {
      return await Axios.get<AxiosResponse>('auth/logout')
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }

  public async signup<UserSignUp> (data: UserSignUp): Promise<AxiosResponse> {
    try {
      return await Axios.post<AxiosResponse>('auth/register', data)
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }

  public async resendConfirmationEmail (userId: string): Promise<AxiosResponse> {
    try {
      return await Axios.get<AxiosResponse>(`auth/signup/resend-confirmation-email/${userId}`)
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }

  public async emailActivation (token: string): Promise<AxiosResponse> {
    try {
      return await Axios.get<AxiosResponse>(`auth/signup/activate/${token}`)
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }

  public async resetPasswordRequest (email: string): Promise<AxiosResponse> {
    try {
      return await Axios.post<AxiosResponse>('auth/password/create', { 'email' : email })
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }

  public async resetPassword<UserResetPassword> (data: UserResetPassword): Promise<AxiosResponse> {
    try {
      return await Axios.post<AxiosResponse>('auth/password/reset', data)
    } catch (error) {
      return this.AxiosHttpHelper.errorResponse(error)
    }
  }
}
