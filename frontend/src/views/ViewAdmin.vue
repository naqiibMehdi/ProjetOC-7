<template>
  <Dialog :deleteDialog="deleteUserAccount"/>
  <MainHeader />
  <h1>Liste des utilisateurs</h1>
    <div class="userList">
      <Card v-for="user in users" :key="user.id" :data-id="user.id">
        <template #header>
          <img :src="user.imageProfile" alt="image du profile">
        </template>
        <template #title>
          <p class="name">{{ user.name }} {{ user.firstname }}</p>
        </template>
        <template #content>
          <div class="dataUser">
          <p><span>Email:</span> <span class="emailUser">{{ user.email }}</span></p>
          <p><span>Status:</span> <span :style="{color: user.isadmin ? '#5e8f32' : '#fd2d01', fontWeight: 'bold'}">{{ user.isadmin ? "Administrateur" : "Utilisateur" }}</span></p>
        </div>
        </template>
        <template #footer>
          <div class="buttonsList">
          <Button label="Changer le status" class="p-button-raised p-button-success" @click="handleStatus"/>
          <Button label="Supprimer le compte" class="p-button-raised p-button-danger" @click="deleteUserAccount"/>
        </div>
        </template>
    </Card>
    </div>
</template>

<script>
import axios from "axios"
import MainHeader from "@/components/MainHeader.vue"
import Button from "primevue/button"
import Card from "primevue/card"
import Dialog from "@/components/Dialog.vue"

export default {
  name: "Admin",
  components: { MainHeader, Button, Dialog, Card },
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
      const userId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id

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
      const userId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id

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
  margin-top: 130px;
  margin-bottom: 40px
}

.userList{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.p-card{
  width: 30%;
  margin-bottom: 20px;
}



.p-card-header img{
  width: 150px;
  height: 150px;
  margin-top: 1rem;
  margin-left: 1rem
  
  
}

.emailUser{
  color: #495057;
  font-weight: 700;
  text-decoration: underline;
}

.buttonsList button:first-child{
  margin-right: 10px;
}
</style>