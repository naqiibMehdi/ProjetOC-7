<template>
  <header class="mainHeader">
    <img src="../assets/icon-left-font.svg" alt="" class="header-logo">
    <nav class="listLinks">
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
.mainHeader{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 130px;
  background: white
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