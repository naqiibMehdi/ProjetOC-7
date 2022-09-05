<template>
  <Modal @fermerModal="handleModal" v-if="open">
    <form method="post" class="formModal-form" enctype="multipart/form-data" @submit.prevent="postCard">

          <Textarea 
            :autoResize="true" 
            rows="10" 
            cols="10" 
            class="formModal-textarea" 
            placeholder="Tapez votre post"
            name="description"
            id="description"
            v-model="description"
          />
          <span v-show="error" class="p-error">{{ error }}</span>

          <input type="file" name="image" id="image" ref="myImage" hidden @change="previewFile"/>

          <Button label="Joindre une image" class="p-button-raised formModal-button" @click="$refs.myImage.click()" />

          <div class="imagePreview" v-show="targetFile">
            <img :src="targetFile" alt="image de prévisualisation">
          </div>

          <Button @click="deleteImage" v-show="targetFile" label="Supprimer l'image" class="p-button-raised p-button-danger formModal-button"/>
          <Button type="submit" label="Poster" class="p-button-raised p-button-success formModal-button"/>
        </form>
  </Modal>
  
<MainHeader @open="handleModal"/>

  <p class="errorArticle" v-if="getCards <= 0">Aucun articles existant !</p>

  <div class="blog" v-else>
    <Card
      v-for="card in getCards"
      :key="card.id"
      :id="card.id"
      :description="card.description"
      :imageUrl="card.imageUrl"
      :name="card.user.name"
      :firstname="card.user.firstname"
      :imageProfile="card.user.imageProfile"
      :createdAtHour="dateFormat(card.createdAt)"
      :createdAtTime="timeFormat(card.createdAt)"
    />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import MainHeader from "@/components/MainHeader.vue";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import Modal from "@/components/Modal.vue"

export default {
  name: "Blog",
  components: { Card, Button, MainHeader, Modal , Textarea},
  data() {
    return {
      listCards: [],
      description: "",
      imageUrl: "",
      error: "",
      targetFile: "",
      open: false
    };
  },

  created() {
    this.$store.dispatch("setBlogs")
    .catch(err => {
      const code = [401, 403]
          if(code.includes(err.response.status)){
            this.$router.push("/")
          }
      })
    },

  computed: {
    getCards() {
      return this.$store.getters.getBlogs
    
    }
  },

  methods: {
    dataForm(){
      const form = new FormData()
      form.append("description", this.description)
      form.append("imageUrl", this.previewFile())
      return form
    },

      postCard() {
      this.$store.dispatch("createBlog", this.dataForm())
      .then(() => {
        this.error = ""
        this.description = ""
        this.targetFile = ""
        this.open = false
      })
      .catch((err) => {
        if(err.response.status === 400){
          this.error = this.$store.state.errorBlog
        }else{
          this.error = "Seule les extensions suivantes sont acceptées: jpg | gif | png"
        }
      })
      
    },

    previewFile() {
      if(this.$refs.myImage.files[0]){

        const currentImage = this.$refs.myImage.files[0]
        this.targetFile = URL.createObjectURL(currentImage)
        URL.revokeObjectURL(URL.createObjectURL(currentImage))
        return this.imageUrl = this.$refs.myImage.files[0]
        
      }
    },

    deleteImage(){
      this.targetFile = ""
      this.imageUrl = ""
    },

    dateFormat(date){
      const dateCreate = new Date(date)
      const options = {year: 'numeric', month: 'numeric', day:'numeric'}
      return dateCreate.toLocaleDateString('fr-FR', options)
    },

    timeFormat(time){
      return new Date(time).toLocaleTimeString('fr-FR', {hour: 'numeric', minute: 'numeric'})
    },

    handleModal() {
      this.open = !this.open
    }
  },
};
</script>

<style>
.errorArticle{
  width: 100%;
  margin-top: 135px;
  text-align: center;
  font-size: 20px;
}

.blog {
  width: 700px;
  margin: 25px auto;
}

@media all and (max-width: 768px){
  .blog{
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>