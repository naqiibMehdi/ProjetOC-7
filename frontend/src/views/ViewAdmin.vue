<template>
  <MainHeader />
  <h1>Liste des utilisateurs</h1>
  <div class="users" v-for="user in users" :key="user.id" :data-id="user.id">
    <img :src="user.imageProfile" alt="image du profile">
    <p>{{ user.name }} {{ user.firstname }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Status: <span>{{ user.isadmin ? "Administrateur" : "Utilisateur" }}</span></p>
    <Button text="Changer le status" color="olive" @click="handleStatus"/>
    <Button text="Supprimer le compte" color="red" @click="deleteUserAccount"/>
  </div>
</template>

<script>
import axios from "axios"
import MainHeader from "@/components/MainHeader.vue"
import Button from "@/components/Button.vue"

export default {
  name: "Admin",
  components: { MainHeader, Button },
  data() {
    return {
      users: []
    }
  },
  mounted(){
    this.getAllUsersForAdmin()
  },
  methods: {

    getAllUsersForAdmin() {
      axios.get("http://localhost:3000/api/auth/admin/user", {withCredentials: true})
      .then(res => {
        for(let user of res.data){
          this.users.push(user)
        }
      })
      .catch(err => console.log(err))
    },

    handleStatus(e) {
      const userId = e.target.parentElement.dataset.id

      axios.put(`http://localhost:3000/api/auth/admin/user/${userId}`, {}, {withCredentials: true})
      .then(res => {
        this.users = []
        this.getAllUsersForAdmin()
      })
      .catch(err => console.log(err))
    },

    deleteUserAccount(e) {
      const userId = e.target.parentElement.dataset.id

      axios.delete(`http://localhost:3000/api/auth/admin/user/${userId}`, {withCredentials: true})
      .then(res => {
        this.users = []
        this.getAllUsersForAdmin()
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style>
.users img{
  width: 60px;
  height: 60px;
}
</style>