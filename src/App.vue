<script setup lang="ts">
import AppBar from './components/AppBar.vue'
import WeatherView from './views/WeatherView.vue';
import LastUpdated from './components/LastUpdated.vue'
import { useStateStore } from './stores/stateStore'
import { storeToRefs } from 'pinia';
import { onUpdated } from 'vue'
import { watch } from 'vue'

const stateStore = useStateStore()

const { appState } = storeToRefs(stateStore.appState)

onUpdated(() => {
  console.debug("App.vue updated")
})

watch(appState, (newVal, oldVal) => {
  console.debug("appSate changes: ", newVal, oldVal)
})

</script>

<template>
  <v-app>
    <AppBar />
    <v-main>
      <WeatherView :key="appState" />
    </v-main>
    <lastUpdated style="width: 100vw;" />
  </v-app>
</template>

<style scoped></style>
