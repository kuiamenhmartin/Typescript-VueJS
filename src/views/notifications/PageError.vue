<template>
  <div class="dashboard-container">
    <div class="row justify-center">
        Error Loading the page!
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'PageError'
})
export default class PageError extends Vue {}
</script>
