<template>
  <Dialog :deleteDialog="deleteCard" :deleteComment="commentDeleted" />
  <Modal v-if="open" @fermerModal="handleModal">
    <form method="post" class="formModal-form" enctype="multipart/form-data" @submit.prevent="updateCard">
      <Textarea 
        :autoResize="true" 
        rows="10" 
        cols="10" 
        class="formModal-textarea" 
        placeholder="Tapez votre post"
        name="description"
        id="description"
        v-model="descriptionCard"
      />
      <span v-show="error" class="p-error">{{ error }}</span>

      <input type="file" name="image" id="image" ref="myImage" hidden @change="previewFile"/>

      <Button label="Joindre une image" class="p-button-raised formModal-button" @click="$refs.myImage.click()" />

      <div class="imagePreview" v-show="targetFile">
        <img :src="targetFile" alt="image de prévisualisation">
      </div>

      <Button type="submit" label="Valider" class="p-button-raised p-button-success formModal-button"/>
    </form>
  </Modal>

  <MainHeader />
    <div v-if="card.length === 0">
      <p>Article inexistant !</p>
    </div>
    <div class="singleCard" v-else>
      <div class="singleCardComment">
        <SingleCard
          :name="card[0].user.name"
          :firstname="card[0].user.firstname"
          :description="card[0].description"
          :imageUrl="card[0].imageUrl"
        />
        <Comment
          v-for="comment in listComments" 
          :key="comment.id"
          :id="comment.id"
          :name="comment.user.name"
          :firstname="comment.user.firstname"
          :description="comment.description"
          :userid="comment.userId"
          @deleted="commentDeleted"
          @validated="commentValidated"
        />
        <form method="POST">
          <Textarea name="description" id="description" placeholder="Ecrire un commentaire" cols="30" rows="1" v-model="comment" @keyup.alt="createComment" />
          <span v-show="errorComment" class="p-error">{{ errorComment }}</span>
          <div class="footerForm">
            <small>Appuyez sur touche <span class="alt">Alt + Entrée</span> pour valider</small>
            <Button class="p-button-raised" label="Commenter" @click="createComment"/>
          </div>
        </form>
    </div>
    <div class="buttonSingleCard">
      <Button class="p-button-raised" label="Modifier l'article" v-if="isOwner === userIdLocal() || isAdmin" @click="handleModal"/>
      <Button class="p-button-raised p-button-danger" label="Supprimer l'article" v-if="isOwner === userIdLocal() || isAdmin" @click="deleteCard"/>
    </div>
  </div>
</template>

<script>
import SingleCard from "@/components/SingleCard.vue"
import MainHeader from "@/components/MainHeader.vue"
import Comment from "@/components/Comment.vue"
import Button from "primevue/button"
import Textarea from "primevue/textarea"
import Modal from "@/components/Modal.vue"
import Dialog from "@/components/Dialog.vue"
import axios from "axios"

export default {
  name: "SingleBlog",
  components: {SingleCard, Button, Textarea, Comment, MainHeader, Modal, Dialog},
  data (){
    return {
      card: [],
      listComments: [],
      isOwner: null,
      isAdmin: null,
      comment: "",
      descriptionCard: "",
      targetFile: "",
      imageUrl: "",
      open: false,
      errorComment: "",
      error: ""
      
    }
  },

  async mounted(){
    (this.getOneUser());
    (this.getCard()); 
    (this.getComment());
  },

  methods: {
    userIdLocal(){
      return parseInt(document.cookie.split("=")[1])
    },

    handleModal(){
    this.open = !this.open
    },

    previewFile() {
      if(this.$refs.myImage.files[0]){

        const currentImage = this.$refs.myImage.files[0]
        this.targetFile = URL.createObjectURL(currentImage)
        URL.revokeObjectURL(URL.createObjectURL(currentImage))
        return this.imageUrl = this.$refs.myImage.files[0]
        
      }
    },

    //get one User
    getOneUser() {
      axios.get(`http://localhost:3000/api/auth/user/profile`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(res => this.isAdmin = res.data.isadmin)
        .catch(err => console.log(err))
    },

    //section about card data
    getCard() {
      axios.get(`http://localhost:3000/api/blogs/${this.$route.params.id}`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          this.card.push(res.data)
          this.isOwner = res.data.userId
          this.descriptionCard = res.data.description
          this.targetFile = res.data.imageUrl
        })
        .catch((err) => console.log(err));
    },

    updateCard() {
      const listData = new FormData();
      listData.append("description", this.descriptionCard);
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
        .catch((err) => this.error = err.response.data);
    },

    deleteCard() {
      this.$confirm.require({
        message: "Etes-vous sûr de vouloir supprimer cet article ?",
        header: "Suppression",
        acceptClass: "p-button-danger",
        accept: () => {

          axios.delete(`http://localhost:3000/api/blogs/${this.$route.params.id}`, 
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            })
            .then(() => {
              this.$router.push("/blog")
            })
            .catch((err) => console.log(err));
        },
        reject: () => {
          return
        }
      })

    },

    //section about comments data
    getComment() {
      axios.get(`http://localhost:3000/api/blogs/${this.$route.params.id}/comment`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          for(let comment of res.data){
            this.listComments.push(comment)
          }
        })
        .catch((err) => console.log(err));
    },

    createComment(e) {
      if((e.key === "Enter" && e.type === "keyup") || e.type === "click"){

        axios.post(`http://localhost:3000/api/blogs/${this.$route.params.id}/comment`, 
        {
          description: this.comment,
        }
        , {withCredentials: true})

        .then((res) => {
          this.listComments = []
          this.comment = ""
          this.getComment()
        })
        .catch(err => this.errorComment = err.response.data.message)

      }
    },

    commentValidated(target) {
    const comment = target.parentElement.previousSibling.value
    const idComment = target.parentElement.parentElement.dataset.id

      axios.put(`http://localhost:3000/api/comment/${idComment}`,
        {description: comment},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          this.listComments = []
          this.comment = ""
          this.getComment()
        })
        .catch((err) => console.log(err));
    },

    commentDeleted(idComment) {
      //appel au composant
      this.$confirm.require({
        message: "Etes-vous sûr de vouloir supprimer ce commentaire ?",
        header: "Suppression",
        acceptClass: "p-button-danger",
        accept: () => {
          axios.delete(`http://localhost:3000/api/comment/${idComment}`, 
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            })
            .then((res) => {
              this.listComments = []
              this.comment = ""
              this.getComment()
            })
            .catch((err) => console.log(err));
        },
        reject: () => {
          return
        }
      })

    }
  }
}
</script>

<style>
.singleCard{
  display: flex;
  align-items: center;
  margin-top: 110px
}

.singleCardComment{
  width: 650px;
  margin: 25px 10% 25px 20%;
}

.singleCardComment textarea{
  width: 100%;
  height: 60px;
  margin-top: 15px;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
}

.singleCardComment .alt{
  color: #fd2d01
}
.footerForm{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.buttonSingleCard{
  display: flex;
  flex-direction: column;
  font-size: 50px;
  width: 200px;
}

.buttonSingleCard button{
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}

</style>