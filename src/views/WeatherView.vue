<script setup>
import { ref, watch } from 'vue'
import WeatherCityView from './WeatherCityView.vue'

const cities = ref(["Rio de Janeiro", "Beijing", "Los Angeles", "Tokyo", "Paris", "London", "New York", "Sydney", "Berlin", "Moscow"])
const city = ref("Rio de Janeiro")

watch(city, (newVal, oldVal) => {
    console.log(newVal, oldVal)
})

</script>
<template>
    <v-tabs v-model="city" bg-color="white" class="tabs" fluid width="100%" slider-color="red">
        <v-tab v-for="city in cities" :key="city" :value="city">{{ city }}</v-tab>
    </v-tabs>

    <div class="fill-height"
        style="height: 100%; align-items: stretch; display: flex; background-image: url('src/assets/backgroud.jpg'), url('http://placehold.it/500x500');">
        <v-tabs-window v-model="city" class="fill-height">
            <v-tabs-window-item v-for="city in cities" :key="city" :value="city">
                <WeatherCityView city="city" />
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>
<style></style>