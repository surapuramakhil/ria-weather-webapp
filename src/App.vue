<script setup lang="ts">
import AppBar from './components/AppBar.vue'
import WeatherView from './views/WeatherView.vue';
import LastUpdated from './components/LastUpdated.vue'

</script>

<template>
  <v-app>
    <AppBar />
    <v-main>
      <WeatherView class="fill-height" />
    </v-main>
    <lastUpdated style="width: 100vw;" />
  </v-app>
</template>

<style scoped></style>
