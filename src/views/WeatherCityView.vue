<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import NextDays from './NextDays.vue'
import nextHours from './NextHours.vue'
import { useCustomFetch } from '@/utils/useCustomFetch';

const props = defineProps({
    city: String
})

const accessToken = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
console.log(accessToken)

const ApiKey = "482944e26d320a80bd5e4f23b3de7d1f";
var city = props.city
city = "London"

const url = `https://api.openweathermap.org/data/3.0/onecall?lat=33.42&lon=-94.04&appid=6f8fecfeabb9be37fe7e085131b9d17f&units=metric`

const { data } = await useCustomFetch(url)

console.log(typeof data)

console.log("API response", data)


const dataJson = JSON.stringify(data.value)
console.log("API response json", dataJson)
// console.log("API response", data.value.hourly)
const hourlyData = data.value.hourly
const dailyData = data.value.daily

import { watch } from 'vue';

watch(data, (newVal, oldVal) => {
    console.log("data changes: ", newVal, oldVal)
    console.log("hourly changes: ", newVal.hourly)
})

</script>
<template>

    <nextHours style="flex: 1;" city="city" :data="hourlyData" />
    <NextDays style="flex: 1;" city="city" :data="dailyData" />

</template>

<style scoped></style>