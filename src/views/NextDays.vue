<script setup>
import WeatherDay from '../components/WeatherDay.vue'

const props = defineProps({
    data: Object
})

const data = props.data

console.log("data - daily ", data)

</script>
<template>

    <v-Container>
        <v-card class="bg-white fill-height overflow-auto">
            <v-card-title class="font-weight-medium pa-2 pt-5"> Next 5 Days </v-card-title>
            <v-divider :thickness="1" />
            <v-row>
                <v-col class="fill-height overflow-auto">
                    <WeatherDay v-for="day in data.slice(0, 5)" :key="day.dt" :temperatureMin="day.temp.min"
                        :temperatureMax="day.temp.max" :date="new Date(day.dt * 1000)" :Description="day.summary"
                        :icon="day.weather[0]" />
                </v-col>
            </v-row>
        </v-card>
    </v-Container>
</template>