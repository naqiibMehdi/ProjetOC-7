<template>
  <MainHeader />
  <form
    method="POST"
    enctype="multipart/form-data"
    @submit.prevent="updateCard"
  >
    <textarea
      name="description"
      id="description"
      cols="30"
      rows="10"
      v-model="description"
    ></textarea>
    <input
      type="file"
      name="image"
      id="image"
      ref="myImage"
      accept="image/jpeg, image/png"
      @change="previewFile"
    />
    <Button text="Annuler" color="grey"/>
    <Button text="Valider" color="green" type="submit" />
  </form>
</template>

<script>
import Button from "@/components/Button.vue";
import MainHeader from "@/components/MainHeader.vue";
import axios from "axios";

export default {
  name: "UpdateBlog",
  components: { Button, MainHeader },
  data() {
    return {
      description: "",
      imageUrl: "",
    };
  },
  async mounted(){
    this.getCard()
  },

  methods: {
    getCard() {
      axios.get(`http://localhost:3000/api/blogs/${this.$route.params.id}`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          this.description = res.data.description
        })
        .catch((err) => console.log(err));
    },

    updateCard() {
      const listData = new FormData();
      listData.append("description", this.description);
      listData.append("imageUrl", this.previewFile());

      axios
        .put(
          `http://localhost:3000/api/blogs/${this.$route.params.id}`,
          listData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(() => {
          this.$router.push("/blog");
        })
        .catch((err) => console.log(err));
    },

    previewFile() {
      return (this.imageUrl = this.$refs.myImage.files[0]);
    },
  },
};
</script>

<style>
</style>