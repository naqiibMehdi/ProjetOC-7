<template>
    <div v-if="card.length === 0">
      <p>Article inexistant !</p>
    </div>
      <div v-else>
        <div v-if="!display">
        <SingleCard
          :description="card[0].description"
          :imageUrl="card[0].imageUrl"
          :createdAtHour="dateFormat(card[0].createdAt)"
          :createdAtTime="timeFormat(card[0].createdAt)"
        />
        <Button color="blue" text="Modifier" @click="displayComponent"/>
        <Button color="red" text="Supprimer" @click="deleteCard"/>
      </div>
      <div v-else>
          <form method="POST" enctype="multipart/form-data" @submit.prevent="postCard">
          <textarea name="description" id="description" cols="30" rows="10" v-model="description"></textarea>
          <input type="file" name="image" id="image" ref="myImage" accept="image/jpeg, image/png" @change="previewFile"/>
          <Button text="Annuler" color="grey" @click="displayComponent"/>
          <Button text="Valider" color="green"/>
        </form>
      </div>
    </div>
</template>

<script>
import SingleCard from "@/components/SingleCard.vue"
import Button from "@/components/Button.vue"
import axios from "axios"

export default {
  name: "SingleBlog",
  components: {SingleCard, Button},
  data (){
    return {
      card: [],
      display: false,
      description: "",
      imageUrl: ""
    }
  },

  async mounted(){
    this.getCard()
  },

  methods: {
    getCard() {
      axios.get(`http://localhost:3000/api/blogs/${this.$route.params.id}`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          this.card.push(res.data)
        })
        .catch((err) => console.log(err));
    },

    deleteCard() {
      axios.delete(`http://localhost:3000/api/blogs/${this.$route.params.id}`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(() => {
          this.$router.push("/blog")
        })
        .catch((err) => console.log(err));
    },

    dateFormat(date){
      const dateCreate = new Date(date)
      const options = {year: 'numeric', month: 'numeric', day:'numeric'}
      return dateCreate.toLocaleDateString('fr-FR', options)
    },

    timeFormat(time){
      return new Date(time).toLocaleTimeString('fr-FR', {hour: 'numeric', minute: 'numeric'})
    },

    displayComponent(){
      return this.display = !this.display
    }
  }
}
</script>

<style>

</style>