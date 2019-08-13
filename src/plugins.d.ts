import Vue from 'vue'
import { AxiosInstance } from 'axios'
import { User } from '@/shared/core/types'

declare module 'vue/types/vue' {
  export interface Vue {
    $http: AxiosInstance;
    $auth: User;
    $appName: string;
  }
}
