<template>
    <SearchBar @card-selected="handleCardSelected" /> <!-- Listen for the event -->
    <CardShower :cardName="selectedCardName" /> <!-- Pass the card name as a prop -->
</template>

<script setup>
import { ref } from 'vue';
import CardShower from './CardShower.vue';
import SearchBar from './SearchBar.vue';

const selectedCardName = ref(''); // Reactive property to store the selected card name

const handleCardSelected = (cardName) => {
    selectedCardName.value = cardName; // Update the selected card name
};
</script>

<style></style>