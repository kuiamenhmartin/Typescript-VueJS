<template>
    <v-menu
      bottom
      left
      content-class="dropdown-menu"
      offset-y
      transition="slide-y-transition">
      <router-link
        v-ripple
        slot="activator"
        class="toolbar-items"
        to="/notifications"
      >
        <v-badge
          color="error"
          overlap
        >
          <template slot="badge">
            {{ notifications.length }}
          </template>
          <v-icon color="tertiary">mdi-bell</v-icon>
        </v-badge>
      </router-link>
      <v-card>
        <v-list dense>
          <v-list-tile
            v-for="notification in notifications"
            :key="notification"
            @click="onClick"
          >
            <v-list-tile-title
              v-text="notification"
            />
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'ToolBarItemNotification'
})
export default class ToolBarItemNotification extends Vue {
    notifications: string[] = [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ];

    onClick () {

    }
}
</script>
