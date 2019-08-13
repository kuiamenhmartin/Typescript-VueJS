<template>
  <v-layout row justify-center>
    <v-form
      v-model="valid"
      ref="form"
      @submit="updateConfig"
      method="post"
      action="#"
      >
      <v-card>
        <v-card-title>
          <span class="headline">App Credentials</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

                <v-flex xs12>
                  <v-text-field
                  label="App Name*"
                  v-model="coinsConfig.app_name"
                  id="appName"
                  name="appName"
                  :rules="configRules"
                  required
                  lazy
                  ref="appName"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                  label="Client ID*"
                  v-model="coinsConfig.client_id"
                  id="clientId"
                  name="clientId"
                  :rules="configRules"
                  required
                  lazy
                  ref="clientId"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                  label="Client Secret*"
                  v-model="coinsConfig.client_secret"
                  id="clientSecret"
                  name="clientSecret"
                  :rules="configRules"
                  required
                  lazy
                  ref="clientSecret"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                  label="Scopes*"
                  v-model="coinsConfig.scopes"
                  placeholder="Multiple scopes are separated with +"
                  id="scopes"
                  name="scopes"
                  :rules="configRules"
                  required
                  lazy
                  ref="scopes"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                  label="Redirect URI*"
                  v-model="coinsConfig.redirect_uri"
                  id="redirectUri"
                  name="redirectUri"
                  :rules="configRules"
                  required
                  lazy
                  ref="redirectUri"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                  label="Authentication URI*"
                  v-model="coinsConfig.authentication_uri"
                  id="authenticationUri"
                  name="authenticationUri"
                  :rules="configRules"
                  required
                  lazy
                  ref="authenticationUri"
                  ></v-text-field>
                </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="syncedShowCredentialForm = false">Close</v-btn>
          <v-btn
            color="blue darken-1" flat
            :loading="loading"
            :class="{ 'white--text': valid }"
            :disabled="!valid"
            @click="updateConfig"
          >Save</v-btn>
        </v-card-actions>
    </v-card>
  </v-form>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Mixins, Prop } from 'vue-property-decorator'
import { Inject } from 'inversify-props'
import { ConnectionServiceInterface } from '@/shared/service/user'
import { FormDataRef, ConfigFormData } from '@/shared/core/mixins'
import { CoinsStore } from '@/shared/store'
import { CoinsNewCredential, CoinsNewCredentialValue } from '@/shared/core/types'

@Component({
  name: 'CredentialForm'
})
export default class CredentialForm extends Mixins(FormDataRef, ConfigFormData) {
  @PropSync('showCredentialForm', { type: Boolean }) syncedShowCredentialForm!: boolean
  @Prop({ default: new CoinsNewCredentialValue() }) coinsConfig!: CoinsNewCredential
  @Prop({ default: 0 }) appId!: number
  loading: boolean = false
  success: string = ''

  @Inject()
  private ConnectionService!: ConnectionServiceInterface

  async updateConfig (e: Event): Promise<any> {
    e.preventDefault()

    this.loading = true

    if (this.form.validate()) {
      // lets save the config now
      let response = null

      delete this.coinsConfig['isRefreshTokenExist']

      if (this.appId) {
        response = await this.ConnectionService.updateConfig(this.appId, this.coinsConfig)
      } else {
        response = await this.ConnectionService.addConfig(this.coinsConfig)
      }
      let { data } = response

      if (data.status === 'SUCCESS') {
        this.$notify({
          group: 'app',
          type: data.status.toLocaleLowerCase(),
          title: 'Succes!',
          text: data.message
        })

        this.syncedShowCredentialForm = false

        // reload page
        this.$router.go(1)
      }
    }
    this.loading = false
  }
}
</script>
