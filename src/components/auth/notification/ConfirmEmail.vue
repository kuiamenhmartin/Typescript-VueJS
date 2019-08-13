<template>
  <v-card-text class="pt-3" v-if="success">
    {{ success }}
    <router-link :to="{ name: 'login', params: {} }">Go back to Login.</router-link>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Inject } from 'inversify-props'
import { AuthServiceInterface } from '@/shared/service/user'

@Component({
  name: 'ConfirmEmail'
})
export default class ConfirmEmail extends Vue {
  @Inject()
  private AuthService!: AuthServiceInterface

  success: string = ''

  async emailActivation (toekn: string): Promise<any> {
    let { data } = await this.AuthService.emailActivation(this.$route.params.token)
    this.success = data.message ? data.message : 'This activation token is invalid.'
  }

  async mounted () {

    await this.emailActivation(this.$route.params.token)
    console.log(this.$route.params.token)
  }
}
</script>
