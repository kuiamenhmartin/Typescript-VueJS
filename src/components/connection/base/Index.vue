<template>
  <v-container fluid grid-list-md>
      <with-credential :coinsConfig="coinsConfig" :appId="appId" v-if="!noCredential"/>
      <no-credential :coinsConfig="coinsConfig" :appId="appId" v-else/>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Inject } from 'inversify-props'
import { ConnectionServiceInterface } from '@/shared/service/user'
import { CoinsNewCredential, CoinsNewCredentialValue } from '@/shared/core/types'

const NoCredential = () => import('@/components/connection/base/NoCredential.vue')
const WithCredential = () => import('@/components/connection/base/WithCredential.vue')

@Component({
  name: 'Index',
  components: {
    NoCredential,
    WithCredential
  }
})
export default class Index extends Vue {

  noCredential: boolean = false

  coinsConfig: CoinsNewCredential = new CoinsNewCredentialValue()

  appId: number = 0

  @Inject()
  private ConnectionService!: ConnectionServiceInterface

  async created (): Promise<any> {
    // try to login user
    let { data } = await this.ConnectionService.getConfig()

    if (data.status === 'SUCCESS') {
      this.coinsConfig = data.payload.columns
      this.appId = data.payload.appId
      this.noCredential = false
    } else {
      this.noCredential = true
    }
  }
}
</script>
