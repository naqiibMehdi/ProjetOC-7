<template>
  <Dialog :deleteDialog="deleteUserAccount"/>
  <MainHeader />
  <h1>Liste des utilisateurs</h1>
    <div class="userList">
      <Card v-for="user in getAllUsers" :key="user.id">
        <template #header>
          <img :src="user.imageProfile" alt="image du profile">
        </template>
        <template #title>
          <p class="name">{{ user.name }} {{ user.firstname }}</p>
        </template>
        <template #content>
          <div class="dataUser">
          <p><span>Email:</span> <span class="emailUser">{{ user.email }}</span></p>
          <p><span>Status:</span> <span :style="{color: user.isadmin ? '#5e8f32' : '#fd2d01', fontWeight: 'bold'}">{{ user.isadmin ? 'Administrateur' : 'Utilsateur' }}</span></p>
          </div>
        </template>
        <template #footer>
          <div class="buttonsList">
          <Button label="Changer le status" class="p-button-raised p-button-success" @click="handleStatus(user.id)"/>
          <Button label="Supprimer le compte" class="p-button-raised p-button-danger" @click="deleteUserAccount(user.id)"/>
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
      users: [],
    }
  },
  created(){
    this.AllUsersForAdmin()
  },

  computed: {
    getAllUsers(){
      return this.$store.getters.getUsersForAdmin
    }
  },
  methods: {

    AllUsersForAdmin() {
      this.$store.dispatch("setAllUserForAdmin")
      .then(res => res)
      .catch(err => {
        const code = [401, 403]
          if(code.includes(err.response.status)){
            this.$router.push("/")
          }
      })
    },

    handleStatus(id) {
      this.$confirm.require({
        message: "Voulez-vous changer le statut de cet utilisateur ?",
        header: "Gestion des comptes",
        acceptClass: "p-button-succes",
        accept: () => {
          this.$store.dispatch("updateStatusUser", id)
          .then(res => res)
          .catch(err => console.log(err))
        },
        reject: () => {
          return
        }
      })

    },

    deleteUserAccount(id) {
      this.$confirm.require({
        message: "Etes-vous sûr de vouloir supprimer le compte de cet utilsateur ?",
        header: "Gestion des comptes",
        acceptClass: "p-button-danger",
        accept: () => {
          this.$store.dispatch("deleteUserLIstAdmin", id)
          .then(res => res)
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
  gap: 10px
}

.p-card{
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