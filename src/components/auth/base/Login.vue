<template>
    <v-container fill-height="fill-height">
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="login-form text-xs-center">
            <div class="display-1 mb-3">
              <v-icon class="mr-2" large="large">mdi-coin</v-icon> Personal Wallet App sadsa s
            </div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  <template>Log in to your customer portal</template>
                </div>
                <v-form
                  v-model="valid"
                  ref="form"
                  @submit="login"
                  method="post"
                  action="#"
                >
                  <v-text-field
                    light="light"
                    prepend-icon="email"
                    label="Email"
                    v-model="email"
                    id="email"
                    name="email"
                    :rules="emailRules"
                    type="email"
                    required
                    lazy
                    ref="password"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    v-model="password"
                    min="8"
                    id="password"
                    name="password"
                    :prepend-icon="!e1 ? 'visibility' : 'visibility_off'"
                    @click:prepend="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :rules="passwordRules"
                    required
                    lazy
                  ></v-text-field>

                  <p class="text-lg-right">
                      <router-link :to="{ name: 'forgotPassword', params: {} }">Forgot Password</router-link>
                  </p>

                  <v-btn block="block"
                  @click.prevent="login"
                  :loading="loading" type="submit"
                  :class="{ 'blue darken-5 white--text': valid }"
                  :disabled="!valid">Login</v-btn>

                </v-form>
              </v-card-text>
            </v-card>

            <v-card-text class="pt-3">
              <p class="text-xs-center caption">DON'T HAVE AN ACCOUNT YET ? <router-link :to="{ name: 'signup', params: {} }">CLICK HERE TO SIGNUP</router-link> </p>
            </v-card-text>

          </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Inject } from 'inversify-props'
import { Routing, AxiosHttp } from '@/shared/core/helpers'
import { AuthServiceInterface } from '@/shared/service/user'
import { AuthFormData, FormDataRef } from '@/shared/core/mixins'
import { UserStore } from '@/shared/store'
import { User } from '@/shared/core/types'
import store from '@/store'

const UserStoreModule = getModule(UserStore, store)

@Component({
  name: 'Login'
})
export default class Login extends Mixins(AuthFormData, FormDataRef) {
  loading: boolean = false

  @Inject()
  private AuthService!: AuthServiceInterface

  async login (e: Event): Promise<any> {
    e.preventDefault()

    this.loading = true

    if (this.form.validate()) {
      // try to login user
      let { data } = await this.AuthService.login({
        email: this.email,
        password: this.password
      })

      if (data.status === 'SUCCESS') {
        // update user state
        await this.updateUserState(data.payload)
        // update http bearer token
        await AxiosHttp.updateTokenBearerInHttpHeaders(data.payload.token)
        // notify user
        this.notifyUser(data.status)

        // redirect to homepage or to previous page
        this.$router.push(Routing.createRedirectFromRouteQuery(this.$route.query, '/'))
      }
    }
    this.loading = false;
  }

  updateUserState (data: any): void {
    UserStoreModule.updateUserAction({
      email: this.email,
      name: data.name,
      token: data.token
    })
  }

  notifyUser (status: string): void {
    this.$notify({
      group: 'app',
      type: status.toLocaleLowerCase(),
      title: 'Succes!',
      text: 'Login successfull!'
    })
  }

  clear (): void {
      this.form.reset()
  }
}
</script>
<style scoped lang="css">
    .login-form {
        max-width: 500px;
        height: 490px !important;
    }
</style>
