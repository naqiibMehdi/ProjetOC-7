<template>
   <article class="card">
      <!-- <h3>{{ name }} {{ firstname }}</h3> -->
      <p>Le {{ createdAtHour }} à {{ createdAtTime }}</p>
      <p>{{ description }}</p>
      <img :src="imageUrl" alt="image d'un blog" v-if="imageUrl"/>
  </article> 
</template>

<script>
export default {
  name: "SingleCard",
  props: ["id", "description", "imageUrl", "name", "firstname", "createdAtHour", "createdAtTime"]
}
</script>
  
<style>
.card img{
  width: 150px;
  height: 150px;
}
</style>