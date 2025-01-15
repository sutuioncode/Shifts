import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';


const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

createApp(App).mount('#app')
