<script setup>
import { ref } from 'vue'
import { useCityStore } from '../store/cityStore'
import { useDebounceFn } from '@vueuse/core';

const displaySearchBox = ref(false)

function toggleSearchBox() {
    displaySearchBox.value = !displaySearchBox.value
}

const cityStore = useCityStore();
const searchQuery = ref('');
const filteredCities = ref(cityStore.cities);

const debouncedFilterCities = useDebounceFn(() => {
    filteredCities.value = cityStore.getCity(searchQuery.value);
}, 500); // Adjust debounce time as needed

const onInput = () => {
    debouncedFilterCities();
};

await cityStore.loadCities();

const city = cityStore.getCity("London");
console.log('city: ', city)
console.log('city: sample', cityStore.getFirstCity())
console.log('city: sample Name', cityStore.getFirstCity().name)

</script>

<template>
    <v-app-bar color="primary">
        <v-app-bar-title v-if="!displaySearchBox">Simple Weather</v-app-bar-title>

        <v-container v-if="displaySearchBox">
            <v-autocomplete v-model="searchQuery" item-text="name" item-value="name" :items="filteredCities.name"
                @input="onInput" return-object />
        </v-container>

        <template v-slot:append>
            <v-btn icon="mdi-refresh" v-if="!displaySearchBox"></v-btn>
            <v-btn icon="mdi-magnify" @click="toggleSearchBox"></v-btn>
        </template>
    </v-app-bar>

</template>


<style></style>