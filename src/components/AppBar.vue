<script setup lang="ts">
import { ref } from 'vue'
import { useCityStore } from '@/stores/cityStore'
import { useDebounceFn } from '@vueuse/core';
import { useTabCitiesStore } from '@/stores/tabCitiesStore'
import { useStateStore } from '@/stores/stateStore';
import { watch } from 'vue';
import type { City } from '@/services/cityService';

const tabcitiesStore = useTabCitiesStore()
const stateStore = useStateStore()

const displaySearchBox = ref(false)
const searchFoucs = ref(false)

function toggleSearchBox() {
    displaySearchBox.value = !displaySearchBox.value
}

const cityStore = useCityStore();
const searchQuery = ref<City | null>(null);
const filteredCities = ref<City[]>(cityStore.cities);

const debouncedFilterCities = useDebounceFn((query: string) => {
    console.debug("OnInput searchQuery.value: ", query)
    filteredCities.value = cityStore.getCity(query);
}, 300); // Adjust debounce time as needed

const onAutoCompleteInput = (event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    console.debug("OnInput searchQuery.value: ", query)
    debouncedFilterCities(query);
};

function onCitySelect() {
    if (searchQuery.value === null) {
        console.debug("No city selected")
        return
    }
    console.debug("On Change searchQuery.value: ", searchQuery)
    tabcitiesStore.addTabCities(searchQuery.value!.name)
    searchFoucs.value = false
}

watch(searchQuery, (newVal, oldVal) => {
    console.debug('searchQuery changed from', oldVal, 'to', newVal)
});
</script>

<template>
    <v-app-bar color="primary">
        <v-app-bar-title v-if="!displaySearchBox">Simple Weather</v-app-bar-title>

        <v-container v-if="displaySearchBox">
            <v-autocomplete v-model="searchQuery" item-title="name" item-value="name" :items="filteredCities"
                @input="onAutoCompleteInput" @update:model-value="onCitySelect" :focused="searchFoucs" return-object
                no-filter />
        </v-container>

        <template v-slot:append>
            <v-btn icon="mdi-refresh" v-if="!displaySearchBox" @click="stateStore.refresh"></v-btn>
            <v-btn icon="mdi-magnify" @click="toggleSearchBox"></v-btn>
        </template>
    </v-app-bar>

</template>


<style></style>../stores/cityStore