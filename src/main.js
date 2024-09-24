import { createApp } from 'vue';
import App from './App.vue';
import router from './App.vue';
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import './style.css'
import './assets/fonts.css'
createApp(App)
  .use(router)
  .mount('#app')
  .use(VueVirtualScroller)