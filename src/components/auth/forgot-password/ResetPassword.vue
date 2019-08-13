<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">

      <v-card-text class="pt-3" v-if="success">
        {{ success }}
        <router-link :to="{ name: 'login', params: {} }"> Login.</router-link>
      </v-card-text>

      <!-- ResetPassword Form -->
      <v-flex class="login-form text-xs-center" v-else>
        <div class="display-1 mb-3">
          <v-icon class="mr-2" large="large">mdi-coin</v-icon> Personal Wallet App
        </div>
        <v-card light="light">
          <v-card-text>
            <div class="subheading">
              <template>Reset Password</template>
            </div>
            <v-form
              v-model="valid"
              ref="form"
              @submit="resetPassword"
              method="post"
              action="#"
            >
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
                prepend-icon="lock"
                type="password"
                :rules="confirmPasswordRules"
                required
                lazy
              ></v-text-field>

              <v-btn block="block"
              @click.prevent="resetPassword"
              :loading="loading" type="submit"
              :class="{ 'blue darken-5 white--text': valid }"
              :disabled="!valid">Reset Password</v-btn>

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
import { Inject } from 'inversify-props'

import { AuthFormData, FormDataRef } from '@/shared/core/mixins'
import { AuthServiceInterface } from '@/shared/service/user'

@Component({
  name: 'ResetPassword'
})
export default class ResetPassword extends Mixins(AuthFormData, FormDataRef) {
  loading: boolean = false;

  success: string = '';

  user: string = '';

  @Inject()
  private AuthService!: AuthServiceInterface

  async resetPassword (e: Event): Promise<any> {
    e.preventDefault()

    this.loading = true

    if (this.form.validate()) {
      // try to login user
      let { data } = await this.AuthService.resetPassword({
        token: this.$route.params.token,
        password: this.password,
        password_confirmation: this.confirmPassword
      })

      if (data.status === 'SUCCESS') {
        this.success = data.message
      }
    }
    this.loading = false
  }
}
</script>
<style scoped lang="css">
    .login-form {
        max-width: 500px;
        height: 490px !important;
    }
</style>
