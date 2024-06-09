<script setup lang="ts">
import NextDays from '@/views/NextDays.vue'
import nextHours from '@/views/NextHours.vue'
import { useCustomFetch } from '@/utils/useCustomFetch'
import { useCityStore } from '@/stores/cityStore'

const props = defineProps<{
    city: string
}>()

const accessToken = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

const cityStore = useCityStore()
const city = cityStore.getCity(props.city)[0];

const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${accessToken}&units=metric`

const { data } = await useCustomFetch(url)

const hourlyData = data.value.hourly
const dailyData = data.value.daily

import { watch } from 'vue';

watch(data, (newVal, oldVal) => {
    console.log("data changes: ", newVal, oldVal)
    console.log("hourly changes: ", newVal.hourly)
})

</script>
<template>

    <nextHours :data="hourlyData" />
    <NextDays :data="dailyData" />

</template>

<style scoped></style>