<template>
  <div :data-id="id" v-if="show">
    <p>{{ name }}_{{ firstname }}</p>
    <p>{{ description }}</p>
    <Button text="modifier" color="blue" @click="updateComment"/>
    <Button text="supprimer" color="red" @click="deleteComment"/>
  </div>
  <div :data-id="id" v-else>
    <textarea name="description" id="description" cols="30" rows="1" v-model="comment" @keyup.enter="validateComment"></textarea>
  </div>
</template>

<script>
import Button from "@/components/Button.vue"
import axios from "axios"

export default {
  name: "Comment",
  props: ["name", "firstname", "description", "id"],
  components: { Button },
  data(){
    return {
      show: true,
      comment: ""
    }
  },
  methods: {
    deleteComment(e){
      const idComment = e.target.parentElement.dataset.id

      axios.delete(`http://localhost:3000/api/comment/${idComment}`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          this.$router.go({name: 'singleBlog'})
        })
        .catch((err) => console.log(err));
    },

    validateComment(e){
      const idComment = e.target.parentElement.dataset.id

      axios.put(`http://localhost:3000/api/comment/${idComment}`,
        {description: this.comment},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          this.$router.go({name: 'singleBlog'})
        })
        .catch((err) => console.log(err));
    },

    updateComment(e){
      this.show = false
      const idComment = e.target.parentElement.dataset.id

      axios.get(`http://localhost:3000/api/comment/${idComment}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          this.comment = res.data.description
        })
        .catch((err) => console.log(err));
    }
  }
}
</script>

<style>

</style>