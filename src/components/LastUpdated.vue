<script setup lang="ts">
import { useLastUpdatedStore } from '../stores/LastUpdatedStore'

const lastUpdated = useLastUpdatedStore().lastUpdatedAt

const options = {
    month: 'short', // Short month name (e.g., "Oct")
    day: '2-digit', // Two-digit day (e.g., "31")
    hour: '2-digit', // Two-digit hour (e.g., "15")
    minute: '2-digit', // Two-digit minute (e.g., "25")
    hour12: false // Use 24-hour time format
};

var formattedDate = new Intl.DateTimeFormat('en-US', options).format(lastUpdated ?? null);
formattedDate = formattedDate.replace(',', ' ');

</script>
<template>
    <div>
        <h5 class="lastUpdated">Last updated on {{ formattedDate }}</h5>
    </div>
</template>
<style scoped>
.lastUpdated {
    text-align: right;
    color: white;
    font-size: 12px;
    background-color: #3f51b5;
}
</style>