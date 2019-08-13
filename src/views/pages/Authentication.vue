<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AuthModule } from '@/components/auth'

// make usre to load containers for login
AuthModule.container()

@Component({
  name: 'Authentication'
})
export default class Authentication extends Vue {}
</script>
