<template>
  
  <header class="mainHeader">

    <img src="../assets/icon-left-font-monochrome-black.svg" alt="" class="header-logo">
    
    <Button class="p-button-danger" label="Postez un article" @click="handleModal" :disabled="$route.name === 'Blog' ? false : true"/>

    <nav class="listLinks">
      <ul>
        <li><router-link to="/blog">Accueil</router-link></li>
        <li v-show="isAdmin"><router-link to="/admin">Admin</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/logout">Déconnexion</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import axios from "axios"
import Button from "primevue/button"
import Modal from "@/components/Modal.vue"

export default {
  name: "MainHeader",
  components: {Button, Modal},
  data() {
    return {
      isAdmin: false,
    }
  },
  mounted(){
    this.getOneUser();
  },
  methods: {
    getOneUser() {
      axios.get("http://localhost:3000/api/auth/user/profile", {withCredentials: true})
      .then(res => {
        this.isAdmin = res.data.isadmin
      })
      .catch(err => console.log(err))
    },

    handleModal() {
      this.$emit("open")
    },
  }
}
</script>

<style>
.mainHeader{
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 90px;
  background: rgba(255, 255, 255, 0.8)
}
.mainHeader .listLinks{
  width: 400px;
}

.mainHeader ul{
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mainHeader ul li{
  list-style: none;
}

.mainHeader a{
  text-decoration: none;
  color: #FD2D01;
  position: relative;
  padding-bottom: 10px;
  font-size: 18px;
}

.mainHeader a::before{
  content: "";
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #FD2D01;
  height: 3px;
  transform: scaleX(0);
  transition: transform 300ms ease-in-out;
}

.mainHeader a:hover::before{
  transform: scaleX(1);
}
</style>