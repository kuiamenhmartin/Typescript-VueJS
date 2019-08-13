<template>
  <v-layout row wrap>

    <v-flex>
      <v-card dark>
        <v-card-title class="title" secondary>Let's go!</v-card-title>
          <v-card-text>
            Hey! Seems you're ready to connect
          <v-btn class="ma-2" outlined color="orange" @click="showCredentialForm=true" :disabled="isAuthorized">Update</v-btn>
          <v-btn class="ma-2" outlined color="orange" @click="removeConfig" :disabled="isAuthorized">Remove</v-btn>
          <v-btn class="ma-2" outlined color="orange" @click="connectOrReconnect" :disabled="isAuthorized">Connect/Reconnect</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex v-if="showCredentialForm">
      <CredentialForm :showCredentialForm.sync="showCredentialForm" :coinsConfig="coinsConfig" :appId="appId"/>
    </v-flex>

  </v-layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Inject } from 'inversify-props'
import { Routing, AxiosHttp } from '@/shared/core/helpers'
import { ConnectionServiceInterface } from '@/shared/service/user'
import { getModule } from 'vuex-module-decorators'
import { CoinsStore } from '@/shared/store'
import store from '@/store'
import { CoinsNewCredential, CoinsNewCredentialValue } from '@/shared/core/types'

const CredentialForm = () => import('@/components/connection/base/CredentialForm.vue')

const CoinsStoreModule = getModule(CoinsStore, store)

@Component({
  name: 'WithCredential',
  components: {
    CredentialForm
  }
})
export default class WithCredential extends Vue {
  showCredentialForm: boolean = false

  @Prop({ default: new CoinsNewCredentialValue() }) readonly coinsConfig!: CoinsNewCredential

  @Prop({ default: 0 }) readonly appId!: number

  @Inject()
  private ConnectionService!: ConnectionServiceInterface

  get isAuthorized (): boolean {
    return CoinsStoreModule.coinsIsAuthorized
  }

  async removeConfig (): Promise<any> {
    let { data } = await this.ConnectionService.removeConfig(this.appId)

    if (data.status === 'SUCCESS') {
      this.showCredentialForm = true
      this.$router.go(1)
    }
  }

  async connectOrReconnect (): Promise<any> {
    if (this.coinsConfig.isRefreshTokenExist) {
      await this.generetaAccessToken()
    } else {
      await this.generateConfigAsParams()
    }
  }

  async generetaAccessToken (): Promise<any> {
    let { data } = await this.ConnectionService.generetaAccessToken()

    if (data.status === 'SUCCESS') {
      CoinsStoreModule.updateCoinsToken(data.payload.atoken)
      this.$router.go(1)
    }
  }

  async generateConfigAsParams (): Promise<any> {
    // try to login user
    let { data } = await this.ConnectionService.generateConfigAsParams()

    if (data.status === 'SUCCESS') {
      window.location.href=`https://site.coins.ph/user/api/authorize?client_id=${data.payload.client_id}&response_type=code&redirect_uri=${data.payload.redirect_uri}&scope=${data.payload.scopes}&state=${data.payload.state}`
    }
  }

}
</script>
