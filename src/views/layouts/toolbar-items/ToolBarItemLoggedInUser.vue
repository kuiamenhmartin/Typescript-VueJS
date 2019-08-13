<template>
    <v-menu
      bottom
      left
      content-class="dropdown-menu"
      offset-y
      transition="slide-y-transition">

      <router-link
        slot="activator"
        class="toolbar-items"
        to="/user"
      >
        <v-badge
          color="error"
          overlap
        >
          <template slot="badge">
          </template>
          <v-icon>mdi-account</v-icon>
        </v-badge>
      </router-link>

      <v-card light>
        <v-list light>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://pbs.twimg.com/profile_images/955592454/2_115603446l_400x400.jpg" :alt="userInfo.name">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ userInfo.name }}</v-list-tile-title>
              <v-list-tile-sub-title>Senior Web Developer</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-tile>
            <v-list-tile-action>
            </v-list-tile-action>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click.prevent="logout">
            <v-list-tile-action>
            </v-list-tile-action>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Inject } from 'inversify-props'

import { getModule } from 'vuex-module-decorators'
import { UserStore } from '@/shared/store'
import { AxiosHttp } from '@/shared/core/helpers'
import { AuthServiceInterface } from '@/shared/service/user'
import store from '@/store'

@Component({
  name: 'ToolBarItemLoggedInUser'
})
export default class ToolBarItemLoggedInUser extends Vue {
  protected UserStoreModule: UserStore
  protected AxiosHttpHelper: any

  constructor() {
    super()
    this.UserStoreModule = getModule(UserStore, store)
    this.AxiosHttpHelper = AxiosHttp
  }

  @Inject()
  private AuthService!: AuthServiceInterface

  fav: boolean = true;
  menu: boolean = false;
  message: boolean = false;
  hints: boolean = true;

  get userInfo () {
    return this.UserStoreModule.userState
  }

  async logout (): Promise<any> {
    // will try to logout the user
    let { data } =  await this.AuthService.logout()

    // if (data.status == 'SUCCESS') {
      // reset store
      await this.UserStoreModule.resetUserInfoAction()
      // remove Authorization in Http
      await this.AxiosHttpHelper.resetTokenBearerInHttpHeaders()

      // redirect to login page
      // this.$router.push('/login')
      window.location.href = '/'
    // }
  }
}
</script>
