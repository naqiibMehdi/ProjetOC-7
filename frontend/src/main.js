import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config"
import ConfirmationService from "primevue/confirmationservice"
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import router from './router'

createApp(App)
.use(router)
.use(PrimeVue)
.use(ConfirmationService)
.mount('#app')
