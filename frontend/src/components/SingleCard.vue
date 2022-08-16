<template>
    <h1 class="dataOneCard"><span>{{ name }} {{ firstname }}</span> a posté cet article</h1>
   <article class="singleBlog">
      <p>{{ description }}</p>
      <img :src="imageUrl" alt="image d'un blog" v-if="imageUrl"/>
  </article> 
</template>

<script>
export default {
  name: "SingleCard",
  props: ["id", "description", "imageUrl", "name", "firstname"]
}
</script>
  
<style>
.dataOneCard span{
  color:#fd2d01
}
.singleBlog{
  width: 100%;
  background: rgba(255,255,255,0.8);
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 30px;
  border: #4E5166 2px solid;
  box-shadow: 2px 2px 3px #4E5166;
  padding: 20px;
}

.singleBlog p{
  color: #4E5166;
  letter-spacing: 2px;
  margin-bottom: 18px;
  font-weight: 700;
}

.singleBlog img{
  width: 100%;
  height: 350px;
  border-radius: 5px;
  object-fit: cover;
}


</style>