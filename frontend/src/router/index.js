import { createRouter, createWebHistory } from 'vue-router'
import Signup from "@/views/ViewSignUp.vue"
import Login from "@/views/ViewLogin.vue"
import Blog from "@/views/ViewBlog.vue"
import SingleBlog from "@/views/ViewSingleBlog.vue"
import UpdateBlog from "@/views/ViewUpdateBlog.vue"

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
  },
  {
    path: "/blog/:id",
    name: "singleBlog",
    component: SingleBlog
  },
  {
    path: "/blog/:id/update",
    name: "updateBlog",
    component: UpdateBlog
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
