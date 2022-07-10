<template>
  <div class="card">
    <p>{{ description }}</p>
    <img :src="imageUrl" alt="image d'un blog" v-if="imageUrl"/>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["id", "description", "imageUrl"]
}
</script>
  
<style>
.card{
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 250px;
}

.card img{
  width: 100%;
  height: 100%;
}

</style>