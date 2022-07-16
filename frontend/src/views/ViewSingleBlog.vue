<template>
    <div v-if="card.length === 0">
      <p>Article inexistant !</p>
    </div>
    <div v-else>
      <SingleCard
        :description="card[0].description"
        :imageUrl="card[0].imageUrl"
        :createdAtHour="dateFormat(card[0].createdAt)"
        :createdAtTime="timeFormat(card[0].createdAt)"
      />
      <Comment
        v-for="comment in listComments" 
        :key="comment.id"
        :id="comment.id"
        :name="comment.user.name"
        :firstname="comment.user.firstname"
        :description="comment.description"
      />
      <div>
        <textarea name="description" id="description" cols="30" rows="1" v-model="comment" @keyup.enter="createComment"></textarea>
      </div>
      <Button color="blue" text="Modifier l'article" @click="$router.push({name: 'updateBlog'})"/>
      <Button color="red" text="Supprimer l'article" @click="deleteCard"/>
    </div>
</template>

<script>
import SingleCard from "@/components/SingleCard.vue"
import Comment from "@/components/Comment.vue"
import Button from "@/components/Button.vue"
import axios from "axios"

export default {
  name: "SingleBlog",
  components: {SingleCard, Button, Comment},
  data (){
    return {
      card: [],
      listComments: [],
      display: false,
      comment: ""
    }
  },

  async mounted(){
    (this.getCard()); 
    (this.getComment())
  },

  methods: {
    //section about card data
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

    //section about comments data
    getComment() {
      axios.get(`http://localhost:3000/api/blogs/${this.$route.params.id}/comment`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          for(let comment of res.data){
            this.listComments.push(comment)
          }
        })
        .catch((err) => console.log(err));
    },

    createComment() {
      axios.post(`http://localhost:3000/api/blogs/${this.$route.params.id}/comment`, {
        description: this.comment,
      }, {withCredentials: true})
      .then((res) => this.$router.go({name: "singleBlog"}))
      .catch(err => (this.errors = err.response.data))
    },

    dateFormat(date){
      const dateCreate = new Date(date)
      const options = {year: 'numeric', month: 'numeric', day:'numeric'}
      return dateCreate.toLocaleDateString('fr-FR', options)
    },

    timeFormat(time){
      return new Date(time).toLocaleTimeString('fr-FR', {hour: 'numeric', minute: 'numeric'})
    }
  }
}
</script>

<style>

</style>