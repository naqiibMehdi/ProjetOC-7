<template>
  <Dialog :deleteDialog="deleteUser" />
  <MainHeader />
    <form method="POST">
      <input type="file" name="imageProfile" id="imageProfile" ref="myImage" accept="image/jpeg, image/png, image/gif" hidden @change="updateImageUser">
    </form>
    <div class="userProfile">
      <div class="picture">
        <img :src="imageProfile" alt="image du profile">
        <i class="pi pi-camera" @click="$refs.myImage.click()"></i>
      </div>
      <p class="name">{{ name }} {{ firstname }}</p>
      <p class="email"><span class="info">Email:</span> {{ email }}</p>
      <p class="createDate"><span class="info">Crée le:</span> {{ dateFormat(createdat) }}</p>
      <Button icon="pi pi-times" class="p-button-raised p-button-danger" label="Supprimer mon compte" @click="deleteUser"/>
      <span class="error" v-if="errorFile">{{ errorFile }}</span>
    </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue"
import Button from "primevue/button"
import Dialog from "@/components/Dialog.vue"
import "primeicons/primeicons.css"
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

  methods: {
    getOneUser() {
      axios.get("http://localhost:3000/api/auth/user/profile",
        {withCredentials: true}
      )
      .then((res) => {
        this.name = res.data.name
        this.firstname = res.data.firstname
        this.imageProfile = res.data.imageProfile
        this.email = res.data.email
        this.createdat = res.data.createdat
      })
      .catch(err => {
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

      axios.put("http://localhost:3000/api/auth/user/profile/image", form,
        {
          withCredentials: true,
          headers: {"Content-Type": "multipart/form-data"}
        })
      .then((res) => {
        this.errorFile = ""
        this.getOneUser()
      })
      .catch(err => this.errorFile = "Extensions acceptées: jpg | png")
    },

    deleteUser() {
      this.$confirm.require({
        message: "Etes-vous sûr de vouloir supprimer votre compte ?",
        header: "Suppression",
        acceptClass: 'p-button-danger',
        icon: "pi pi-info-circle",
        accept: () => {
            //callback to execute when user confirms the action
          axios.delete("http://localhost:3000/api/auth/user/profile", {withCredentials: true})
          .then(() =>  this.$router.push("/"))
          .catch(err => console.log(err))
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