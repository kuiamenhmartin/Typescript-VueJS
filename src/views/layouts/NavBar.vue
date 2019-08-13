<template>
        <v-navigation-drawer
    id="app-drawer"
    v-model="drawer"
    app
    dark
    absolute
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="background"
      :gradient="sidebarOverlayGradiant"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              src="https://pbs.twimg.com/profile_images/955592454/2_115603446l_400x400.jpg"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            Coins App
          </v-list-tile-title>
        </v-list-tile>

        <v-divider/>

        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          />
        </v-list-tile>

        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>

        <v-list-tile
          active-class="primary"
          class="v-list-item v-list__tile--buy"
        >
          <v-list-tile-action>
            <v-icon>thumb_up</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="font-weight-light">
            Personal App
          </v-list-tile-title>
        </v-list-tile>

      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { AppStore } from '@/shared/store'
import store from '@/store'

const AppStoreModule = getModule(AppStore, store)

interface Links {
  to: string;
  icon: string;
  text: string;
}

@Component({
  name: 'NavBar'
})
export default class NavBar extends Vue {
  logo: string = '@/assets/logo.png';
  background: string = 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg';
  color: string = 'info'
  links: Links[] = [
    {
      to: '/dashboard',
      icon: 'mdi-view-dashboard',
      text: 'Dashboard'
    },
    {
      to: '/connect',
      icon: 'mdi-account',
      text: 'Connect'
    },
    {
      to: '/pay',
      icon: 'mdi-account',
      text: 'Pay'
    },
    {
      to: '/history',
      icon: 'mdi-clipboard-outline',
      text: 'History'
    },
    {
      to: '/notifications',
      icon: 'mdi-bell',
      text: 'Notifications'
    }
  ]
  responsive: boolean = false

  sidebarOverlayGradiant: string ='rgba(27, 27, 27, 0.74), rgba(27, 27, 27, 0.74)'

  get drawer () {
    return AppStoreModule.drawerState
  }

  set drawer (val) {
    AppStoreModule.toggleDrawer(val)
  }

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  }

  onResponsiveInverted () {
    if (window.innerWidth < 991) {
      this.responsive = true
    } else {
      this.responsive = false
    }
  }
}
</script>

<style lang="scss" scoped>
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;
      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }
    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
    div.v-responsive.v-image > div.v-responsive__content {
      overflow-y: auto;
    }
  }
</style>
