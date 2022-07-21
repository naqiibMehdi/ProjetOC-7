<template>
  <MainHeader />
  <form method="POST">
    <input type="file" name="imageProfile" id="imageProfile" ref="myImage" hidden @change="updateImageUser">
  </form>
  <div class="userInfo">
    <img :src="imageProfile" alt="image du profile" @click="$refs.myImage.click()">
    <span v-if="errorFile">{{ errorFile }}</span>
    <p>{{ name }} {{ firstname }}</p>
    <p>Email: {{ email }}</p>
    <p>Crée le: {{ dateFormat(createdat) }}</p>
    <Button text="Supprimer mon compte" color="red" @click="deleteUser"/>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue"
import Button from "@/components/Button.vue"
import axios from "axios"

export default {
  name: "Profile",
  components: { MainHeader, Button},
  data() {
    return{
      name: "",
      firstname: "",
      imageProfile: "",
      email: "",
      createdat: "",
      errorFile: ""
    }
  },
  mounted(){
    const isadmin = document.cookie.split(";")[0].split("=")[1]
    if(isadmin !== "true" && isadmin !== "false"){
      this.$router.push("/login")
      return
    }
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
      .catch(err => console.log(err))
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
      .catch(err => this.errorFile = "Extensions acceptées: jpg|png")
    },

    deleteUser() {
      const test = confirm("etes-vous sur de vouloir supprimer votre profile ?")
      if(test){
          axios.delete("http://localhost:3000/api/auth/user/profile", {withCredentials: true}
        )
        .then(() =>  this.$router.push("/"))
        .catch(err => console.log(err))
      }else{
        return
      }
      
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
.userInfo img{
  width: 150px;
  height: 150px;
  cursor:pointer
}
</style>