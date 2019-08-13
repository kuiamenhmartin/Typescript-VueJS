<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <Footer v-if="$route.meta.requiresAuth" />
  </v-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

const Footer = () => import('@/views/layouts/Footer.vue')

@Component({
  name: 'App',
  components: {
    Footer
  }
})
export default class Content extends Vue {
  metaInfo () {
    return {
      title: 'Vuetify Material Dashboard by CreativeTim'
    }
  }
}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
