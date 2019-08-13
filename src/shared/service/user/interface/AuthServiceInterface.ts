import { User, UserSignUp, UserResetPassword } from '@/shared/core/types'
import { AxiosResponse } from 'axios'

export interface AuthServiceInterface {
  login<User> (data: User): Promise<AxiosResponse>;
  signup<UserSignUp> (data: UserSignUp): Promise<AxiosResponse>;
  logout(): Promise<AxiosResponse>;
  resendConfirmationEmail(userId: string): Promise<AxiosResponse>;
  emailActivation(token: string): Promise<AxiosResponse>;
  resetPasswordRequest(email: string): Promise<AxiosResponse>;
  resetPassword<UserResetPassword> (data: UserResetPassword): Promise<AxiosResponse>;
}
