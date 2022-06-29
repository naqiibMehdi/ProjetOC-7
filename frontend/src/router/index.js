import { createRouter, createWebHashHistory } from 'vue-router'
import Form from "@/views/ViewForm.vue"
const routes = [
  {
    path: '/',
    name: 'form',
    component: Form
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
