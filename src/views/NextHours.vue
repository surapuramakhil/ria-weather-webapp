<script setup>
import { useCustomFetch } from '../utils/useCustomFetch';
import WeatherHour from '../components/WeatherHour.vue'

const props = defineProps({
    city: String,
    data: JSON
})

const data = props.data
console.log("data passed: ", data)


</script>
<template>
    <v-container>
        <v-card>
            <h3 class="pa-2 pt-5 font-weight-medium">Next Hours</h3>
            <v-divider class="pa-0 ma-0"></v-divider>
            <v-container fluid>
                <v-row class="overflow-auto fill-width">
                    <weather-hour v-for="hour in data" :key="hour.dt" :time="new Date(hour.dt * 1000)"
                        :temparature="hour.temp" :humdity="hour.humidity" :icon="hour.weather[0]" />
                </v-row>
            </v-container>
        </v-card>
    </v-container>


</template>
<style scoped>
.fill-width {
    display: flex;
    overflow-x: auto;
    flex-wrap: nowrap;
}
</style>
