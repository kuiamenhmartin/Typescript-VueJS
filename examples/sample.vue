<template>
    <v-container fill-height="fill-height">
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="login-form text-xs-center">
            <div class="display-1 mb-3">
              <v-icon class="mr-2" large="large">mdi-coin</v-icon> Personal Wallet App
            </div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  <template>Crate a new account</template>
                </div>
                <v-form
                  v-model="valid"
                  ref="form"
                  @submit="signup"
                  method="post"
                  action="#"
                >
                  <v-text-field
                    light="light"
                    prepend-icon="person"
                    label="Name"
                    v-model="name"
                    id="name"
                    name="name"
                    :rules="nameRules"
                    type="text"
                    required
                    lazy
                  ></v-text-field>

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

                  <v-text-field
                    label="Confirm Password"
                    v-model="confirmPassword"
                    min="8"
                    id="confirm-password"
                    name="confirm-password"
                    :prepend-icon="!e1 ? 'visibility' : 'visibility_off'"
                    @click:prepend="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :rules="confirmPasswordRules"
                    required
                    lazy
                  ></v-text-field>

                  <validation-provider name="email" rules="required|email">
                    <template #default="{ errors }">
                      <v-text-field
                        label="Confirm Password"
                        v-model="email"
                        min="8"
                        id="e"
                        name="email"
                        :prepend-icon="!e1 ? 'visibility' : 'visibility_off'"
                        @click:prepend="() => (e1 = !e1)"
                        :type="e1 ? 'password' : 'text'"
                        :error="(errors.length)?true:false"
                        lazy
                      ></v-text-field>
                      <small v-if="errors" class="field-text is-danger error-text">{{ errors[0] }}</small>
                    </template>
                  </validation-provider>

                  <v-btn block="block"
                  @click.prevent="signup"
                  :loading="loading" type="submit"
                  :class="{ 'blue darken-5 white--text': valid }"
                  :disabled="!valid">Sign up</v-btn>

                </v-form>
              </v-card-text>
            </v-card>
            <v-card-text class="pt-3">
              <p class="text-xs-center caption">ALREADY HAVE AN ACCOUNT ? <router-link :to="{ name: 'login', params: {} }">CLICK HERE TO LOGIN</router-link> </p>
            </v-card-text>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'
import { ValidationProvider } from "vee-validate";
import { getModule } from 'vuex-module-decorators'
import { Inject } from 'inversify-props'

import { User, StoreModule, CoreModule, LoginServiceInterface } from '@/shared'
import store from '@/store'

const UserStoreModule = getModule(StoreModule.UserStore, store)
const RoutingHelper = CoreModule.helpers.Routing
// const v = new Validator()

// console.log(v)

@Component({
  name: 'Signup',
  components: {
    ValidationProvider : ValidationProvider
  }
})
export default class Signup extends Mixins(CoreModule.mixins.AuthFormData, CoreModule.mixins.FormDataRef) {

  constructor(){
    super()
  }
  loading: boolean = false;

  @Inject()
  private LoginService!: LoginServiceInterface

  async signup (e: Event): Promise<any> {
    e.preventDefault()

    this.loading=true;

    if (this.form.validate()) {
      // try to login user
      let { data } = await this.LoginService.login({
        email: this.email,
        password: this.password
      })

      if (data.status === 'SUCCESS') {
        // update user state
        await this.updateUserState(data.payload)
        // notify user
        this.notifyUser(data.status)

        // redirect to homepage or to previous page
        this.$router.push(RoutingHelper.createRedirectFromRouteQuery(this.$route.query, '/'))
      }
    }
    this.loading=false;
  }

  get checkPassword () {
    return this.password === this.confirmPassword
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
