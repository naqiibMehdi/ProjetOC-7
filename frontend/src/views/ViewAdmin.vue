<template>
  <MainHeader />
  <h1>Liste des utilisateurs</h1>
  <div class="usersList" v-for="user in users" :key="user.id" :data-id="user.id">
    <img :src="user.imageProfile" alt="image du profile">
    <p class="name">{{ user.name }} {{ user.firstname }}</p>
    <div class="dataUser">
      <p><span>Email:</span> <span>{{ user.email }}</span></p>
      <p><span>Status:</span> <span :style="user.isadmin ? {color: 'green'} : ''">{{ user.isadmin ? "Administrateur" : "Utilisateur" }}</span></p>
    </div>
    <div class="buttonsList">
      <Button text="Changer le status" bgdclr="green" color="white" @click="handleStatus"/>
      <Button text="Supprimer le compte" bgdclr="red" color="white" @click="deleteUserAccount"/>
    </div>
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
      const userId = e.target.parentElement.parentElement.dataset.id

      axios.put(`http://localhost:3000/api/auth/admin/user/${userId}`, {}, {withCredentials: true})
      .then(res => {
        this.users = []
        this.getAllUsersForAdmin()
      })
      .catch(err => console.log(err))
    },

    deleteUserAccount(e) {
      const userId = e.target.parentElement.parentElement.dataset.id

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

<style scoped>
h1{
  text-align: center;
  margin-top: 35px
}

.usersList{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  margin: 50px auto;
  padding-top: 10px;
  background: rgba(255,255,255,0.8);
  border: #4E5166 2px solid;
  box-shadow: 5px 4px 2px #4E5166;
}

.usersList img,
.usersList .name,
.usersList .dataUser{
  margin-bottom: 20px;
}

.usersList img{
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.usersList .name{
  font-size: 20px;
  color: #fd2d01;
  font-weight: 700;
}

.usersList .dataUser{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  font-size: 18px;
}

.usersList .dataUser p span:first-child{
  color: #4E5166;
  font-weight: 700;
  text-decoration: underline;
}

.usersList .dataUser p span:last-child{
  font-weight: 700;
  color: #fd2d01
}

.usersList .buttonsList{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  
}

.usersList button{
  padding: 15px 10px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
}
</style>