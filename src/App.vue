<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-snackbar
      class="rounded-xl"
      v-model="snackbar.showing"
      :timeout="2000"
      :color="snackbar.color"
      top
      content-class="text-center"
    >
      {{ snackbar.text }}
      <v-btn absolute right x-small icon @click="snackbar.showing = false"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState(['snackbar'])
  }
};
</script>
