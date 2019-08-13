<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h1 class="display-1">About Page</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
          obcaecati tempora sunt debitis, minima deleniti ex inventore
          laboriosam at animi praesentium, quaerat corrupti molestiae recusandae
          corporis necessitatibus vitae, nam saepe?
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  public name = 'App'
  @Prop() private propMessage!: string;
}
</script>
