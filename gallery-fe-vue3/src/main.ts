import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from './plugins/primevue'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(PrimeVue, { ripple: true })

app.mount('#app')
