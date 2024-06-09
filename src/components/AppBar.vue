<script setup lang="ts">
import { ref } from 'vue'
import { useCityStore } from '../stores/cityStore'
import { useDebounceFn } from '@vueuse/core';
import { useTabCitiesStore } from '@/stores/tabCitiesStore'
import { useStateStore } from '@/stores/stateStore';

const tabcitiesStore = useTabCitiesStore()
const stateStore = useStateStore()

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

function onCitySelect() {
    tabcitiesStore.addTabCities(searchQuery.value.name);
}

// const refreshPage = () => {
//     stateStore.refresh();
// };

</script>

<template>
    <v-app-bar color="primary">
        <v-app-bar-title v-if="!displaySearchBox">Simple Weather</v-app-bar-title>

        <v-container v-if="displaySearchBox">
            <v-autocomplete v-model="searchQuery" item-title="name" item-value="name" :items="filteredCities"
                @input="onInput" @change="onCitySelect" return-object />
        </v-container>

        <template v-slot:append>
            <v-btn icon="mdi-refresh" v-if="!displaySearchBox" @click="stateStore.refresh"></v-btn>
            <v-btn icon="mdi-magnify" @click="toggleSearchBox"></v-btn>
        </template>
    </v-app-bar>

</template>


<style></style>../stores/cityStore