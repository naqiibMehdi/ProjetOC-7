<template>
  <div class="comment" :data-id="id">
    <p>{{ name }}_{{ firstname }}</p>
    <p>{{ description }}</p>
    <Button text="supprimer" color="red" @click="deleteComment"/>
  </div>
</template>

<script>
import Button from "@/components/Button.vue"
import axios from "axios"

export default {
  name: "Comment",
  props: ["name", "firstname", "description", "id"],
  components: { Button },
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
    }
  }
}
</script>

<style>

</style>