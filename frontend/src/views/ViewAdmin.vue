<template>
  <Dialog :deleteDialog="deleteUserAccount"/>
  <MainHeader />
  <h1>Liste des utilisateurs</h1>
  <div class="usersList" v-for="user in users" :key="user.id" :data-id="user.id">
    <img :src="user.imageProfile" alt="image du profile">
    <p class="name">{{ user.name }} {{ user.firstname }}</p>
    <div class="dataUser">
      <p><span>Email:</span> <span>{{ user.email }}</span></p>
      <p><span>Status:</span> <span :style="{color: user.isadmin ? '#5e8f32' : '#fd2d01'}">{{ user.isadmin ? "Administrateur" : "Utilisateur" }}</span></p>
    </div>
    <div class="buttonsList">
      <Button label="Changer le status" class="p-button-raised p-button-success" @click="handleStatus"/>
      <Button label="Supprimer le compte" class="p-button-raised p-button-danger" @click="deleteUserAccount"/>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import MainHeader from "@/components/MainHeader.vue"
import Button from "primevue/button"
import Dialog from "@/components/Dialog.vue"

export default {
  name: "Admin",
  components: { MainHeader, Button, Dialog },
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
      .catch(err => {
        const code = [401, 403]
          if(code.includes(err.response.status)){
            this.$router.push("/")
          }
      })
    },

    handleStatus(e) {
      const userId = e.target.parentElement.parentElement.parentElement.dataset.id

      this.$confirm.require({
        message: "Voulez-vous changer le statut de cet utilsateur ?",
        header: "Gestion des comptes",
        acceptClass: "p-button-succes",
        accept: () => {
          axios.put(`http://localhost:3000/api/auth/admin/user/${userId}`, {}, {withCredentials: true})
          .then(res => {
            this.users = []
            this.getAllUsersForAdmin()
          })
          .catch(err => console.log(err))
        },
        reject: () => {
          return
        }
      })

    },

    deleteUserAccount(e) {
      const userId = e.target.parentElement.parentElement.parentElement.dataset.id

      this.$confirm.require({
        message: "Etes-vous sûr de vouloir supprimer le compte de cet utilsateur ?",
        header: "Gestion des comptes",
        acceptClass: "p-button-danger",
        accept: () => {
          axios.delete(`http://localhost:3000/api/auth/admin/user/${userId}`, {withCredentials: true})
          .then(res => {
            this.users = []
            this.getAllUsersForAdmin()
          })
          .catch(err => console.log(err))
        },
        reject: () => {
          return
        }
      })

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
  border-radius: 0;
}
</style>