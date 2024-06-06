<script setup>

const props = defineProps({
    temperatureMin: Number,
    temperatureMax: Number,
    date: Date,
    Description: String,
    icon: JSON
})

const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
};

var formattedDate = new Intl.DateTimeFormat('en-US', options).format(props.date);

</script>
<template>
    <v-container class="pa-2 pt-3">
        <v-row class="d-flex justify-center align-content-center">
            <v-col class="d-flex justify-center align-content-center" cols="3">
                <img :src="'http://openweathermap.org/img/wn/' + icon.icon + '.png'" alt="icon" />
            </v-col>
            <v-col cols="6">
                <div class="d-flex justify-center align-center">{{ formattedDate }}</div>
                <div class="text-caption font-weight-thin fill-width text-truncate">{{ Description }}</div>
            </v-col>
            <v-col cols="3">
                <p>{{ temperatureMin }}&deg; {{ temperatureMax }}&deg;</p>
            </v-col>
        </v-row>
        <v-divider class="ma-0 pa-0 ml-4 mr-4"></v-divider>
    </v-container>

</template>