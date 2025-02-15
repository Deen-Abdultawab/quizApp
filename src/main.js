import { createApp } from 'vue';
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue';
import router from './router'; // Import the router

import './style.css'


const app = createApp(App);

app.use(Toast, { position: POSITION.TOP_RIGHT })
app.use(router);

app.mount('#app');

document.title = 'Quiz App'

