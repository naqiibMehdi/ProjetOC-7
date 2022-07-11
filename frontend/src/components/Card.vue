<template>
   <article class="card">
      <p>{{ name }} {{ firstname }}</p>
      <p>Le {{ createdAt }}</p>
      <a :href="`/blog/${id}`" class="card-link">
        <p>{{ description }}</p>
        <img :src="imageUrl" alt="image d'un blog" v-if="imageUrl"/>
      </a>
  </article> 
</template>

<script>
export default {
  name: "Card",
  props: ["id", "description", "imageUrl", "name", "firstname", "createdAt"]
}
</script>
  
<style>
.card img{
  width: 150px;
  height: 150px;
}
</style>