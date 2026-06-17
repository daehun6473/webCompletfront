import { createApp } from 'vue'
import App from './App.vue'
import store from './components/PageView/store'

createApp(App)
    .use(store)
    .mount('#app')