<template>
  <div class="blog">
    <form method="POST" enctype="multipart/form-data" @submit.prevent="postCard">
      <textarea name="description" id="description" cols="30" rows="10" v-model="description"></textarea>
      <input type="file" name="image" id="image" ref="myImage" accept="image/jpeg, image/png" @change="previewFile"/>
      <button type="submit">Poster</button>
    </form>
    <Card
      v-for="card in listCards"
      :key="card.id"
      :id="card.id"
      :description="decodeURIComponent(card.description)"
      :imageUrl="card.imageUrl"
      :name="card.user.name"
      :firstname="card.user.firstname"
      :createdAt="dateFormat(card.createdAt)"
    />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import axios from "axios";
export default {
  name: "Blog",
  components: { Card },
  data() {
    return {
      listCards: [],
      description: "",
      imageUrl: "",
      error: ""
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
        .catch((err) => console.log(err));
    },

    postCard() {
      axios.post("http://localhost:3000/api/blogs",
          this.dataForm(),
          {withCredentials: true, headers: {"Content-Type": "multipart/form-data"}}
        )
        .then(() => document.location.reload())
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
    }
  },
};
</script>

<style>
.blog {
  width: 450px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
}
</style>