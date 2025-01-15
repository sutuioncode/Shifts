import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(PrimeVue);

createApp(App).mount('#app')
