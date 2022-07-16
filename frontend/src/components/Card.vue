<template>
   <article class="card" :data-id="id">
      <h3>{{ name }} {{ firstname }}</h3>
      <p>Le {{ createdAtHour }} à {{ createdAtTime }}</p>
      <router-link :to="{name: 'singleBlog', params: {id} }" class="card-link">
        <p>{{ description }}</p>
        <img :src="imageUrl" alt="image d'un blog" v-if="imageUrl"/>
      </router-link>
      <div class="">
        <p @click="addLikes" :style="totalLikes > 0 ? {color: 'red'} : ''"><span>{{ totalLikes }}</span> J'aime</p>
        <p><span>total commentaires:</span> Commentaires</p>
      </div>
  </article> 
</template>

<script>
import axios from "axios"

export default {
  name: "Card",
  props: ["id", "description", "imageUrl", "name", "firstname", "createdAtHour", "createdAtTime"],
  data(){
    return{
      totalLikes: 0
    }
  },
  async mounted(){
    this.getLikes()
  },
  methods: {
    getLikes(){
      
      axios.get(`http://localhost:3000/api/blogs/${this.id}/like`,
          {
            withCredentials: true, 
            headers: {"Content-Type": "application/json"}
          }
        )
        .then((res) => this.totalLikes = res.data.length)
        .catch((err) => {
          console.log(err)
        });
    },

    addLikes(e){
      const idCard = e.target.parentElement.parentElement.dataset.id
      
      axios.post(`http://localhost:3000/api/blogs/${idCard}/like`,
          {},
          {
            withCredentials: true, 
            headers: {"Content-Type": "application/json"}
          }
        )
        .then((res) => this.getLikes())
        .catch((err) => {
          console.log(err)
        });

    }
  }
}
</script>
  
<style>
.card img{
  width: 150px;
  height: 150px;
}
</style>