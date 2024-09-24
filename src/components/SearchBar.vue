<template>
    <div class="search-bar relative">
        <!-- The input field -->
        <input type="text" v-model="query" placeholder="Search cards..." @input="handleInput"
            @focus="showDropdown = true" @blur="hideDropdown"
            class="border border-gray-300 p-2 w-[1200px] text-white" />

        <!-- Dropdown Menu with Virtual Scroller -->
        <RecycleScroller v-if="showDropdown && filteredCards.length" :items="filteredCards" :buffer-size="20"
            :item-size="80" key-field="id" class="dropdown">
            <template #default="{ item }">
                <li @click="addCard(item)" class="flex items-center space-x-2" key="">
                    <!-- Card Image -->
                    <img draggable="false" class="inline-block" :src="getCardImagePath(item)" alt="Card image"
                        loading="lazy" />
                    <!-- Card Name -->
                    <span>{{ item.name }}</span>
                </li>
            </template>
        </RecycleScroller>
    </div>
</template>
<script>
import { RecycleScroller } from 'vue-virtual-scroller';
export default {
    name: 'SearchBar',
    emits: ['cardSelected'], // Declare the emitted event
    components: {
        RecycleScroller, // Register the scroller component
    },
    data() {
        return {
            query: '',
            showDropdown: false,
            allCards: [], // This will store all card data from your database
            filteredCards: [], // This will store the filtered card names
            folders: [],
            timer: null,
            debounceDelay: 500, // delay in milliseconds
        };
    },
    created() {
        console.log('Component created, fetching all cards...');
        this.fetchAllCards();
    },
    methods: {
        handleInput() {
            clearTimeout(this.timer);  // Clear previous timer
            this.timer = setTimeout(() => {
                this.filterCards();  // Call the actual filter function after delay
            }, this.debounceDelay);
        },
        async fetchAllCards() {
            try {
                const response = await fetch(`/api/api/v7/cardinfo.php`);
                const data = await response.json();
                console.log('Fetched data:', data); // Log the fetched data
                if (Array.isArray(data.data)) {
                    this.allCards = data.data; // Store all cards for local filtering
                }
            } catch (error) {
                console.error('Failed to fetch all card data:', error);
            }
        },
        filterCards() {
            if (this.query.length > 0) {
                const normalizedQuery = this.query.toLowerCase().replace(/[^a-z0-9 ]/g, ''); // Normalize query
                this.filteredCards = this.allCards.filter(card => {
                    const normalizedCardName = card.name.toLowerCase().replace(/[^a-z0-9 ]/g, ''); // Normalize card names
                    console.log(`Filtered cards: ${this.filteredCards.length}`); // Debug log
                    return normalizedCardName.includes(normalizedQuery);
                });
            } else {
                this.filteredCards = []; // Clear filtered cards if query is empty
            }
        },

        getCardImagePath(card) {
            if (!card) return ''; // Return empty string if card is undefined
            const folder = card.type && card.type.includes("Monster") ? 'Monsters/' : 'Spells_Traps/';
            return `/public/Cards_Small/${folder}${card.name.replace(/[/\\?%*:|"<>]/g, '')}.jpg`; // Adjust based on your image structure
        },
        // Add card to the collection (implement this method based on your project)
        addCard(card) {
            this.$emit('card-selected', card.name); // Emit the card name
            this.showDropdown = false;
        },
        hideDropdown() {
            // Small delay to allow for click event
            setTimeout(() => {
                //   this.showDropdown = false;
            }, 100);
        }
    }
};
</script>

<style>
.dropdown {
    @apply text-black bg-white border border-gray-300 w-[1200px] max-h-60 overflow-y-auto absolute left-1/2 transform -translate-x-1/2;
    z-index: 100;
}

.dropdown li {
    @apply p-2 cursor-pointer flex items-center space-x-2;
    height: 80px;
    /* Ensure consistent height */
    line-height: 80px;
    /* Center text vertically */
}

.dropdown li:hover {
    @apply bg-gray-500;
}

img.inline-block {
    @apply w-10 h-16;
}
</style>