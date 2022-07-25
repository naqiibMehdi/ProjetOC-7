<template>
   <article class="card">
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
  
<style scoped>
img{
  width: 40px;
  height: 40px;
}

</style>