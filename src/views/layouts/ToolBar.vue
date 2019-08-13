<template>
  <v-toolbar
    id="core-toolbar"
    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />

    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          label="Search..."
          hide-details
          color="purple"
        />

        <router-link
          v-ripple
          class="toolbar-items"
          to="/"
        >
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </router-link>

        <ToolBarItemNotification/>

        <ToolBarItemLoggedInUser/>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { Vue, Watch, Component } from 'vue-property-decorator'
import RouteConfig from 'vue-router'
import { getModule } from 'vuex-module-decorators'
import { AppStore } from '@/shared/store'
import store from '@/store'

const ToolBarItemNotification = () => import('@/views/layouts/toolbar-items/ToolBarItemNotification.vue')
const ToolBarItemLoggedInUser = () => import('@/views/layouts/toolbar-items/ToolBarItemLoggedInUser.vue')

const AppStoreModule = getModule(AppStore, store)

@Component({
  name: 'ToolBar',
  components: {
    ToolBarItemNotification,
    ToolBarItemLoggedInUser
  }
})
export default class ToolBar extends Vue {
  title: string = ''
  responsive: boolean = false
  responsiveInput: boolean = false

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: any): void {
    let pageName = newVal.name
    this.title = pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  }

  onClickBtn () {
    AppStoreModule.toggleDrawer(!AppStoreModule.drawerState)
  }

  onResponsiveInverted () {
    if (window.innerWidth < 991) {
      this.responsive = true
      this.responsiveInput = false
    } else {
      this.responsive = false
      this.responsiveInput = true
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
