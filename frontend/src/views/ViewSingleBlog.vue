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
      <Button @click="deleteImage" v-show="targetFile" label="Supprimer l'image" class="p-button-raised p-button-danger formModal-button"/>
      <Button type="submit" label="Valider" class="p-button-raised p-button-success formModal-button"/>
    </form>
  </Modal>

  <MainHeader />
    <div class="singleCard">

      <p v-if="missingArticle" class="missingArticle">{{ missingArticle }} </p>

      <div class="singleCardComment" v-else>
        <SingleCard
          :name="oneCard.name"
          :firstname="oneCard.firstname"
          :description="oneCard.description"
          :imageUrl="oneCard.imageUrl"
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
        />

        <form method="POST">
          <Textarea name="description" id="description" placeholder="Ecrire un commentaire" cols="30" rows="1" v-model="comment" @keyup.alt="createComment" />
          <span v-show="errorComment" class="p-error">{{ errorComment.message }}</span>
          <div class="footerForm">
            <small>Appuyez sur touche <span class="alt">Alt + Entrée</span> pour valider</small>
            <Button class="p-button-raised" label="Commenter" @click="createComment"/>
          </div>
        </form>
    </div>
    <div class="buttonSingleCard" v-if="(isOwner === userIdLocal() || isAdmin) && !missingArticle">
      <Button class="p-button-raised" label="Modifier l'article" @click="handleModal"/>
      <Button class="p-button-raised p-button-danger" label="Supprimer l'article"  @click="deleteCard"/>
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

export default {
  name: "SingleBlog",
  components: {SingleCard, Button, Textarea, Comment, MainHeader, Modal, Dialog},
  data (){
    return {
      card: [],
      isOwner: null,
      isAdmin: null,
      comment: "",
      descriptionCard: "",
      targetFile: "",
      imageUrl: "",
      open: false,
      errorComment: "",
      error: "",
      missingArticle: ""
    }
  },

  created(){
    (this.getCard()); 
    (this.getOneUser());
    (this.getComments());
  },

  computed: {
    oneCard(){
      return this.$store.getters.getOneBlog
    },

    listComments(){
      return this.$store.getters.getComments
    }
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

    deleteImage(){
      this.targetFile = ""
      this.imageUrl = ""
    },

    //get one User
    getOneUser() {
      this.$store.dispatch("setUserProfile")
        .then(res => this.isAdmin = this.$store.state.user.isadmin)
        .catch(err => console.log(err))
    },

    //section about card data
    getCard() {
      this.$store.dispatch("setOneBlog", this.$route.params.id)
      .then(() => {
        this.isOwner = this.oneCard.userId
        this.descriptionCard = this.oneCard.description
        this.targetFile = this.oneCard.imageUrl
      })
      .catch(err => this.missingArticle = err.response.data)
    },

    updateCard() {

      const listData = new FormData();
      listData.append("description", this.descriptionCard);
      listData.append("imageUrl", this.previewFile());

      this.$store.dispatch("updateOneBlog", {id: this.$route.params.id, datas: listData})
      .then(() => this.$router.push("/blog"))
      .catch((err) => {
        if(err.response.status === 400){
          this.error = this.$store.state.errorBlog
        }else{
          this.error = "Seule les extensions suivantes sont acceptées: jpg | gif | png"
        }
      })
    },

    deleteCard() {
      this.$confirm.require({
        message: "Etes-vous sûr de vouloir supprimer cet article ?",
        header: "Suppression",
        acceptClass: "p-button-danger",
        accept: () => {

          this.$store.dispatch("deleteOneBlog", this.$route.params.id)
          .then(() => this.$router.push("/blog"))
        },
        reject: () => {
          return
        }
      })

    },

    //section about comments data
    getComments() {
      this.$store.dispatch("setComments", this.$route.params.id)
    },

    createComment(e) {

      const data = {description: this.comment}

      if((e.key === "Enter" && e.type === "keyup") || e.type === "click"){

        this.$store.dispatch("createComment", {idBlog: this.$route.params.id, description: data})
        .then(() => {
          this.errorComment = ""
          this.comment = ""
        })
        .catch(() => this.errorComment = this.$store.state.errorComment)
      }
    },

    commentDeleted(idComment) {
      //appel au composant
      this.$confirm.require({
        message: "Etes-vous sûr de vouloir supprimer ce commentaire ?",
        header: "Suppression",
        acceptClass: "p-button-danger",
        accept: () => {

          this.$store.dispatch("deleteComment", idComment)
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

.singleCard .missingArticle{
  width: 100%;
  text-align: center;
  font-size: 20px;
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

@media all and (max-width: 992px){
  .singleCard{
    flex-direction: column;
    gap: 50px
  }

  .singleCardComment{
    margin: 0
  }

 .buttonSingleCard{
    display: flex;
    flex-direction: row;
    width: 650px;
    justify-content: space-around;
  }
}

@media all and (max-width: 768px){
  .singleCardComment{
    width: 90%
  }

  .buttonSingleCard{
    width: 90%
  }
}
</style>