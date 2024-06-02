<script setup>
const props = defineProps({
    temparature: Number,
    time: Date,
    humdity: Number,
    icon: JSON
})

var time = props.time
const temparature = props.temparature
const humdity = props.humdity

// display time format 3:00 PM
const options = {
    hour: '2-digit', // Two-digit hour (e.g., "15")
    minute: '2-digit', // Two-digit minute (e.g., "25")
    hour12: true // Use 24-hour time format
};

var formattedTime = new Intl.DateTimeFormat('en-US', options).format(time);

</script>

<template>
    <v-col cols="3" class="box d-flex flex-column align-center pa-0 ma-0">
        <v-card-text class="align-center" style="text-align: center;">
            <p>{{ temparature }}&deg;</p>
            <p class="humdity">{{ humdity }}&percnt;</p>
            <img :src="'http://openweathermap.org/img/wn/' + icon.icon + '.png'" alt="icon" />
            <p style="font-size: small;"> {{ formattedTime }} </p>
        </v-card-text>
    </v-col>
    <v-divider class="mt-8 mb-8" vertical></v-divider>
</template>

<style scoped>
.humdity {
    color: skyblue;
    font-weight: bold;
}

.box::after {
    border: solid 1px;
    width: 1px;
    height: 100%;
    padding-top: 25%;
    padding-bottom: 25%;
}
</style>
