<template>
  <header class="mainHeader">
    <img src="" alt="">
    <nav>
      <ul>
        <li><router-link to="/blog">Accueil</router-link></li>
        <li v-if="isAdmin"><router-link to="/admin">Admin</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/logout">Déconnexion</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import axios from "axios"

export default {
  name: "MainHeader",
  data() {
    return {
      isAdmin: false
    }
  },
  mounted(){
    this.getOneUser()
  },
  methods: {
    getOneUser() {
      axios.get("http://localhost:3000/api/auth/user/profile", {withCredentials: true})
      .then(res => {
        this.isAdmin = res.data.isadmin
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>