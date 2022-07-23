<template>
  <MainHeader />
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
        :userid="comment.userId"
      />
      <form method="POST">
        <textarea name="description" id="description" placeholder="Ecrire un commentaire" cols="30" rows="1" v-model="comment" @keyup.enter="createComment"></textarea>
      </form>
      <Button color="blue" text="Modifier l'article" v-if="isOwner === userIdLocal() || isAdmin" @click="$router.push({name: 'updateBlog'})"/>
      <Button color="red" text="Supprimer l 'article" v-if="isOwner === userIdLocal() || isAdmin" @click="deleteCard"/>
    </div>
</template>

<script>
import SingleCard from "@/components/SingleCard.vue"
import MainHeader from "@/components/MainHeader.vue"
import Comment from "@/components/Comment.vue"
import Button from "@/components/Button.vue"
import axios from "axios"

export default {
  name: "SingleBlog",
  components: {SingleCard, Button, Comment, MainHeader},
  data (){
    return {
      card: [],
      listComments: [],
      isOwner: null,
      isAdmin: null,
      comment: ""
    }
  },

  async mounted(){
    (this.getCard()); 
    (this.getComment());
    (this.getUserData())
  },

  methods: {
    userIdLocal(){
      return parseInt(document.cookie.split(";")[1].split("=")[1])
    },

    //get the status admin 
    getUserData() {
      axios.get(`http://localhost:3000/api/auth/user/profile`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          this.isAdmin = res.data.isadmin
        })
        .catch((err) => console.log(err));
    },
    //section about card data
    getCard() {
      axios.get(`http://localhost:3000/api/blogs/${this.$route.params.id}`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          this.card.push(res.data)
          this.isOwner = res.data.userId
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

    createComment(e) {
      console.log(e);
      if(e.key === "Enter"){
        axios.post(`http://localhost:3000/api/blogs/${this.$route.params.id}/comment`, {
          description: this.comment,
        }, {withCredentials: true})
        .then((res) => {
          this.listComments = []
          this.comment = ""
          this.getComment()
        })
        .catch(err => (this.errors = err.response.data))
      }
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