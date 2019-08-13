<template>
    <v-footer
      id="core-footer"
      absolute
      height="82"
    >
      <div class="footer-items">
      </div>
      <v-spacer/>
      <span class="font-weight-light copyright">
        &copy;
        {{ (new Date()).getFullYear() }}
        <a
          href="https://www.creative-tim.com/"
          target="_blank">Creative Tim</a>, made with
        <v-icon
          color="tertiary"
          size="17">mdi-heart</v-icon>
         &copy;2019 — <strong>teamtambay</strong>
      </span>
    </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'Footer'
})
export default class Footer extends Vue {
  links: string[] = [];
}
</script>
