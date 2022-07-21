<template>
<MainHeader />
  <div class="blog">
    <form method="POST" enctype="multipart/form-data" @submit.prevent="postCard">
      <textarea name="description" id="description" cols="30" rows="10" v-model="description"></textarea>
      <input type="file" name="image" id="image" ref="myImage" accept="image/jpeg, image/png" @change="previewFile"/>
      <Button text="Poster" color="blue"/>
    </form>
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
import Button from "@/components/Button.vue";
import axios from "axios";

export default {
  name: "Blog",
  components: { Card, Button, MainHeader },
  data() {
    return {
      listCards: [],
      description: "",
      imageUrl: "",
      error: ""
    };
  },

  async mounted() {
    const isadmin = document.cookie.split(";")[0].split("=")[1]
    if(isadmin !== "true" && isadmin !== "false"){
      this.$router.push("/login")
      return
    }
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
        .catch((err) => console.log(err));
    },

    postCard() {
      axios.post("http://localhost:3000/api/blogs",
          this.dataForm(),
          {withCredentials: true, headers: {"Content-Type": "multipart/form-data"}}
        )
        .then(() => {
          this.listCards = []
          return this.getCards()
        })
        .catch((err) => {
          this.error = err.response.data.message
          alert(this.error)
        });
    },

    previewFile() {
      return this.imageUrl = this.$refs.myImage.files[0]
    },

    dateFormat(date){
      const dateCreate = new Date(date)
      const options = {year: 'numeric', month: 'numeric', day:'numeric'}
      return dateCreate.toLocaleDateString('fr-FR', options)
    },

    timeFormat(time){
      return new Date(time).toLocaleTimeString('fr-FR', {hour: 'numeric', minute: 'numeric'})
    }
  },
};
</script>

<style>
.blog {
  width: 450px;
  margin: 15px auto;
}
</style>