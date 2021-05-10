import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from './plugins/primevue'
import store from './store'

import ToastService from 'primevue/toastservice'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

app.mount('#app')
