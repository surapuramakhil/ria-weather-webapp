<script setup>
import { useFetch } from '@vueuse/core'
import NextDays from './NextDays.vue'
import nextHours from './NextHours.vue'


const props = defineProps({
    city: String
})

const accessToken = import.meta.env.VUE_APP_OPENWEATHERMAP_API_KEY;
console.log(accessToken)

const ApiKey = "482944e26d320a80bd5e4f23b3de7d1f";
var city = props.city
city = "London"

try {
    const { isFetching, error, data } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`)
} catch (error) {
    console.error(error)
}

</script>
<template>

    <nextHours style="flex: 1;" city="city" />
    <NextDays style="flex: 1;" city="city" />

</template>

<style scoped></style>