<template>
  <div :data-id="id" v-if="show" :data-userid="userid" class="singleComment">
    <p>{{ name }}_{{ firstname }}:</p>
    <p class="description">{{ description }}</p>
    <div class="listButtonsComment">
      <Button text="Modifier" bgdclr="transparent" color="rgba(78, 81, 102)" v-if="userid === userIdLocal() || isAdmin" @click="updateComment(id)"/>
      <Button text="Supprimer" bgdclr="transparent" color="rgba(78, 81, 102)" v-if="userid === userIdLocal() || isAdmin" @click="deleteComm(id)"/>
    </div>
  </div>
  <div :data-id="id" class="validateComment" v-else>
    <Textarea name="description" id="description" cols="30" rows="3" v-model="comment" />
    <ButtonPrime label="Valider" class="p-button-raised p-button-success" @click="validateComment(comment, id)"/>
    <span v-show="errorComment" class="p-error">{{ errorComment }}</span>
  </div>
</template>

<script>
import Button from "@/components/Button.vue"
import ButtonPrime from "primevue/button"
import Textarea from "primevue/textarea"
import axios from "axios"

export default {
  name: "Comment",
  props: ["name", "firstname", "description", "id", "userid"],
  components: { Button, Textarea, ButtonPrime },
  data(){
    return {
      show: true,
      isAdmin: null,
      comment: "",
      errorComment: ""
    }
  },
  mounted(){
    this.getUserData();
  },
  methods: {
    userIdLocal(){
      return parseInt(document.cookie.split("=")[1])
    },
    //get the status admin 
    getUserData() {
      axios.get(`http://localhost:3000/api/auth/user/profile`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          this.isAdmin = res.data.isadmin
        })
        .catch((err) => console.log(err))
    },

    deleteComm(id){
      this.$emit("deleted", id)
    },

    validateComment(comment, id){
      
      const data = {description: comment}

      this.$store.dispatch("updateComment", {id, data})
      .then(() => this.show = true)
      .catch(err => this.errorComment = err.response.data)
      
    },

    updateComment(id){
       this.show = false

       this.$store.dispatch("setOneComment", id)
       .then(() => this.comment = this.$store.state.oneComment.description)
      
    }
  }
}
</script>

<style>
.singleComment{
  background: rgba(78, 81, 102, 0.4);
  padding: 15px 20px;
  border: solid rgba(78, 81, 102) 1px;
  position: relative
}

.singleComment p:first-child{
  color: #fd2d01;
  font-weight: 700;
  margin-bottom: 5px;
}

.singleComment .description{
  padding-bottom: 10px;
}

.singleComment .listButtonsComment{
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.singleComment .listButtonsComment button:first-child{
  padding-right: 10px;
}

.singleComment .listButtonsComment button{
  cursor: pointer;
  font-weight: 700;
}

.validateComment{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 10px;
  width: 100%;
}

.validateComment textarea{
  width: 100%;
  margin-bottom: 10px;
}

</style>