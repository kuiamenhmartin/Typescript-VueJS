<template>
  <v-app>
    <!-- Start of Navigation -->

    <ToolBar v-if="$route.meta.requiresAuth"></ToolBar>

    <NavBar v-if="$route.meta.requiresAuth"></NavBar>

    <Content/>

    <notifications group="app" position="bottom right"/>

  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

const NavBar = () => import('@/views/layouts/NavBar.vue')
const ToolBar = () => import('@/views/layouts/ToolBar.vue')
const Content = () => import('@/views/layouts/Content.vue')

@Component({
  name: 'App',
  components: {
    NavBar,
    ToolBar,
    Content
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
  @import '@/assets/styles/index.scss';
</style>
