<template>
  <nav>
    <RouterLink to="/Random" class="navStyle">Random Card&nbsp;&nbsp;&nbsp;</RouterLink>
    <RouterLink to="/DeckBuilder" class="navStyle">Deck Builder&nbsp;&nbsp;&nbsp;</RouterLink>
    <RouterLink to="/CardSearch" class="navStyle">Card Search</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script>
import { createMemoryHistory, createRouter } from 'vue-router'

import RandomView from './components/Random.vue'
import DeckView from './components/DeckBuilder.vue'
import CardSearch from './components/CardSearch.vue'

const routes = [
  { path: '/Random', component: RandomView },
  { path: '/DeckBuilder', component: DeckView },
  { path: '/CardSearch', component: CardSearch },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
</script>

<style>
.navStyle {
  @apply text-2xl;
}
</style>
