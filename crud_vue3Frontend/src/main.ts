import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useUserStore } from './stores/userStore'; // Import the user store

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Initialize the user store
const userStore = useUserStore(); // Create an instance of the user store
userStore.initializeStore(); // Call the method to load user data from localStorage

app.mount('#app');
