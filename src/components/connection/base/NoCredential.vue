<template>
  <v-layout row wrap>

    <v-flex>
      <v-card dark>
        <v-card-title class="title" secondary>Checkpoint!</v-card-title>
          <v-card-text>
            You are not authorized to make any transaction yet.
            Please provide your credentials.
          <v-btn class="ma-2" outlined color="orange" @click="showCredentialForm=true" :disabled="isAuthorized">Add your Credentials</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex v-if="showCredentialForm">
      <CredentialForm :showCredentialForm.sync="showCredentialForm" :coinsConfig="coinsConfig" :appId="0"/>
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
  name: 'NoCredential',
  components: {
    CredentialForm
  }
})
export default class NoCredential extends Vue {

  showCredentialForm = false
  @Prop({ default: new CoinsNewCredentialValue() }) readonly coinsConfig!: CoinsNewCredential
  @Prop({ default: 0 }) readonly appId!: number

  @Inject()
  private ConnectionService!: ConnectionServiceInterface

  get isAuthorized(): boolean {
    return CoinsStoreModule.coinsIsAuthorized
  }

  async created () {
    // try to login user
    // let { data } = await this.ConnectionService.getConfig(Vue.prototype.$appName)
    // console.log(data)
    // if (data.status === 'SUCCESS') {
    //
    // }
  }
}
</script>
