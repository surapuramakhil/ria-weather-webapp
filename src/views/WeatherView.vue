<script setup lang="ts">
import { ref } from 'vue'
import WeatherCityView from '@/views/WeatherCityView.vue'
import { useTabCitiesStore } from '@/stores/tabCitiesStore'
import { useCityStore } from '../stores/cityStore';

const cityStore = useCityStore();

await cityStore.loadCities();

const tabcitiesStore = useTabCitiesStore()
const cities = tabcitiesStore.getTabCities()

console.log("cities: ", cities.value)

const city = ref("Rio de Janeiro")

</script>
<template>
    <v-tabs v-model="city" bg-color="white" class="tabs" fluid width="100%" slider-color="red">
        <v-tab v-for="city in cities" :key="city" :value="city">{{ city }}</v-tab>
    </v-tabs>

    <div class="fill-height"
        style="height: 100%; align-items: stretch; display: flex; background-image: url('src/assets/backgroud.jpg'), url('http://placehold.it/500x500');">
        <v-tabs-window v-model="city" class="fill-height">
            <v-tabs-window-item v-for="city in cities" :key="city" :value="city">
                <WeatherCityView :city="city" />
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>
<style></style>