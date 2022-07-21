<template>
  
</template>

<script>
import axios from "axios"

export default {
  name: "Logout",
  mounted(){
    this.logout()
  },
  methods: {
    logout(){
      axios.post("http://localhost:3000/api/auth/logout", {}, {withCredentials: true})
      .then(() => this.$router.push("/login"))
      .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>