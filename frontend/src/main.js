import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config"
import ConfirmationService from "primevue/confirmationservice"
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import router from './router'
import Store from "@/store/index.js"

createApp(App)
.use(Store)
.use(router)
.use(PrimeVue, {locale: {accept: "oui", reject: "non"}})
.use(ConfirmationService)
.mount('#app')
