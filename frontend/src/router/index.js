import { createRouter, createWebHashHistory } from 'vue-router'
import Signup from "@/views/ViewSignUp.vue"
import Login from "@/views/ViewLogin.vue"
import Blog from "@/views/ViewBlog.vue"
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
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
