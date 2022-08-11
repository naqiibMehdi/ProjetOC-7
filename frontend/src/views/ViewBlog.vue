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

          <Button type="submit" label="Poster" class="p-button-raised p-button-success formModal-button"/>
        </form>
  </Modal>
  
<MainHeader @open="handleModal"/>

  <div class="blog">
    <Card
      v-for="card in listCards"
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
import axios from "axios";

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

  async mounted() {
    this.getCards();
  },

  methods: {
    dataForm(){
      const form = new FormData()
      form.append("description", this.description)
      form.append("imageUrl", this.previewFile())
      return form
    },

    getCards() {
      axios.get("http://localhost:3000/api/blogs", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          for(let card of res.data){
            this.listCards.push(card)
          }
        })
        .catch((err) => {
          console.log(err)
          const code = [401, 403]
          if(code.includes(err.response.status)){
            this.$router.push("/")
          }
        });
    },

    postCard() {
      axios.post("http://localhost:3000/api/blogs",
          this.dataForm(),
          {withCredentials: true, headers: {"Content-Type": "multipart/form-data"}}
        )
        .then(() => {
          this.targetFile = ""
          this.error = ""
          this.description = ""
          this.open = false
          this.listCards = []
          return this.getCards()
          
        })
        .catch((err) => {
          this.error = err.response.data
        });
    },

    previewFile() {
      if(this.$refs.myImage.files[0]){

        const currentImage = this.$refs.myImage.files[0]
        this.targetFile = URL.createObjectURL(currentImage)
        URL.revokeObjectURL(URL.createObjectURL(currentImage))
        return this.imageUrl = this.$refs.myImage.files[0]
        
      }
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
.blog {
  width: 700px;
  margin: 25px auto;
}
</style>