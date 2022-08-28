<template>
  
  <header class="mainHeader">

    <img src="../assets/icon-left-font-monochrome-black.svg" alt="" class="header-logo">
    
    <nav class="listLinks">
      <ul class="labelMenu">
        <li><router-link to="/blog">Accueil</router-link></li>
        <li @click="handleModal" v-if="$route.name === 'Blog' ? true : false"><a>Poster un article</a></li>
        <li v-show="isAdmin"><router-link to="/admin">Admin</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/logout">Déconnexion</router-link></li>
      </ul>
      <IconMenu width="30px" height="30px" fill="#FD2D01" :isAdmin="isAdmin" :handleModal="handleModal" />
    </nav>
  </header>
</template>

<script>
import axios from "axios"
import Button from "primevue/button"
import Modal from "@/components/Modal.vue"
import IconMenu from "@/components/IconMenu.vue"

export default {
  name: "MainHeader",
  components: {Button, Modal, IconMenu},
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

      this.$store
        .dispatch("setUserProfile")
        .then(() => this.isAdmin = this.$store.state.user.isadmin)
        .catch((err) => {
          const code = [401, 403];
          if (code.includes(err.response.status)) {
            this.$router.push("/");
          }
        });
    },

    handleModal() {
      this.$emit("open")
    },
  }
}
</script>

<style>
.mainHeader .iconMenu{
  display: none
}

.mainHeader{
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 90px;
  background: rgb(255, 255, 255)
}
.mainHeader .listLinks{
  width: 550px;
}

.mainHeader ul{
  display: flex;
  justify-content: space-around;
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

.mainHeader a:hover{
  cursor: pointer;
}

.mainHeader a:hover::before{
  transform: scaleX(1);
}

@media all and (max-width: 768px){

  .mainHeader .iconMenu{
     display: flex
  }

  .mainHeader .labelMenu{
     display: none
  }

  .mainHeader img{
    display: none;
  }

  .mainHeader ul{
    flex-wrap: wrap;
    gap: 10px
  }
}
</style>