import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';


createApp(App).use(router).use(BootstrapIconsPlugin).mount('#app')
