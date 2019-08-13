<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { ConnectionModule } from '@/components/connection'

// make usre to load containers for login
ConnectionModule.container()

@Component({
    name: 'Connection'
})
export default class Connection extends Vue {
  @Prop() private propMessage!: string;
}
</script>
