<template>
  <Dialog :deleteDialog="deleteUser" />
  <MainHeader />
    <form method="POST" enctype="multipart/form-data">
      <input type="file" name="imageProfile" id="imageProfile" ref="myImage" accept="image/jpeg, image/png, image/gif" hidden @change="updateImageUser">
    </form>
    <div class="userProfile">
      <div class="picture">
        <img :src="user.imageProfile" alt="image du profile">
        <i class="pi pi-camera" @click="$refs.myImage.click()"></i>
      </div>
      <p class="name">{{ user.name }} {{ user.firstname }}</p>
      <p class="email"><span class="info">Email:</span> {{ user.email }}</p>
      <p class="createDate"><span class="info">Crée le:</span> {{ dateFormat(user.createdat) }}</p>
      <Button class="p-button-raised p-button-danger" label="Supprimer mon compte" @click="deleteUser"/>
      <span class="error" v-if="errorFile">{{ errorFile }}</span>
    </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue"
import Button from "primevue/button"
import Dialog from "@/components/Dialog.vue"
import axios from "axios"

export default {
  name: "Profile",
  components: { MainHeader, Button, Dialog},
  data() {
    return{
      name: "",
      firstname: "",
      imageProfile: "",
      email: "",
      createdat: "",
      errorFile: "",
      open: false
    }
  },
  mounted(){
    this.getOneUser()
  },
  computed:{
    user(){
      return this.$store.getters.getUser
    }
  },

  methods: {  
    getOneUser() {
      this.$store.dispatch("setUserProfile")
      .then((res) => res)
      .catch((err) => {
        const code = [401, 403]
          if(code.includes(err.response.status)){
          this.$router.push("/")
          }
      })

    },

    updateImageUser() {
      const imageUser = this.$refs.myImage.files[0]
      const form = new FormData()
      form.append("imageProfile", imageUser)

      this.$store.dispatch("updateImageProfile", form)
      .then(() => {
        this.errorFile = ""
      })
      .catch(() => this.errorFile = "Extensions acceptées: jpg | png")
    },

    deleteUser() {
      this.$confirm.require({
        message: "Etes-vous sûr de vouloir supprimer votre compte ?",
        header: "Suppression",
        acceptClass: 'p-button-danger',
        accept: () => {
            //callback to execute when user confirms the action
          this.$store.dispatch("deleteUserProfile")
          .then(() =>  this.$router.push("/"))
          },
          reject: () => {
            //callback to execute when user rejects the action
            return
          },
      });
    },

    dateFormat(date){
      const dateCreate = new Date(date)
      const options = {year: 'numeric', month: 'numeric', day:'numeric'}
      return dateCreate.toLocaleDateString('fr-FR', options)
    }
  }
}
</script>

<style>
.userProfile{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.picture{
  position: relative;
}

.userProfile .picture img{
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: solid 3px #fd2d01
}

.userProfile .picture i{
  position: absolute;
  bottom: 5px;
  right: 15px;
  color: white;
  background: rgba(0, 0, 255, 1);
  border-radius: 50%;
  border: 2px solid transparent;
  padding: 10px;
  font-size: 25px;
  cursor: pointer;
}

.userProfile .picture,
.userProfile p,
.userProfile button{
  margin-bottom: 20px;
}

.userProfile .picture i:hover{
  border: 2px solid white
}

.userProfile .name{
  color: #fd2d01;
  font-weight: 700;
}

.userProfile .info{
  text-decoration: underline;
  color: #4E5166;
  font-weight: 700;
}

.userProfile button{
  padding: 15px 10px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}

.userProfile .error{
  margin-top: 35px;
  padding: 15px 25px;
  color: red;
  border: solid 2px red;
  background-color: rgb(255, 192, 203, 0.7);
  border-radius: 5px;
  text-decoration: none;
}
</style>