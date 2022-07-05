import { createRouter, createWebHashHistory } from 'vue-router'
import Signup from "@/views/ViewSignUp.vue"
import Login from "@/views/ViewLogin.vue"
const routes = [
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
