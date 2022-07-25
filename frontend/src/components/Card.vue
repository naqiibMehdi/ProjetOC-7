<template>
   <article class="card" :data-id="id">

      <div class="card-profile">
          <img :src="imageProfile" alt="image de profile" class="card-image">
        <div class="card-user">
          <h3>{{ name }} {{ firstname }}</h3>
          <span>Le {{ createdAtHour }} à {{ createdAtTime }}</span>
        </div>
      </div>

      <div class="card-middle">
        <router-link :to="{name: 'singleBlog', params: {id} }" class="card-link">
          <p>{{ description }}</p>
          <img :src="imageUrl" alt="image d'un blog" v-if="imageUrl"/>
        </router-link>
      </div>

      <div class="card-bottom">
        <p @click="addLikes" class="likes"><span>{{ totalLikes }}</span> J'aime</p>
        <p class="comments"><span>{{ totalComments }}</span> {{ totalComments > 1 ? 'Commentaires' : 'Commentaire' }}</p>
      </div>
      
  </article> 
</template>

<script>
import axios from "axios"

export default {
  name: "Card",
  props: ["id", "description", "imageUrl", "name", "firstname", "imageProfile", "createdAtHour", "createdAtTime"],
  data(){
    return{
      totalLikes: 0,
      totalComments: 0
    }
  },
  async mounted(){
    this.getLikes();
    this.getComment()
  },
  methods: {
    getLikes(){
      
      axios.get(`http://localhost:3000/api/blogs/${this.id}/like`,
          {
            withCredentials: true, 
            headers: {"Content-Type": "application/json"}
          }
        )
        .then((res) => this.totalLikes = res.data)
        .catch((err) => this.totalLikes = 0);
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
    },

    getComment() {
      axios.get(`http://localhost:3000/api/blogs/${this.id}/comment`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => this.totalComments = res.data.length)
        .catch((err) => console.log(err));
    }
  }
}
</script>
  
<style>
.card{
  width: 100%;
  background: rgba(255,255,255,0.8);
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border: #4E5166 2px solid;
  box-shadow: 2px 2px 3px #4E5166;
  padding: 20px;
}

.card-profile{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.card-profile .card-image{
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.card-profile h3{
  color: #fd2d01
}

.card-middle{
  width: 100%;
  margin-bottom: 15px;
}
.card-middle a {
  text-decoration: none;
}

.card-middle p{
  color: #4E5166;
  font-weight: 500;
  letter-spacing: 2px;
  margin-bottom: 18px;
  font-weight: 700;
}

.card-middle img{
  width: 100%;
  height: 450px;
  border-radius: 5px;
}

.card-bottom{
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.card-bottom .likes{
  cursor: pointer;
  color: #fd2d01;
  font-weight: 700;
}
.card-bottom .comments{
  color: #4E5166;
  font-weight: 700;
}
</style>