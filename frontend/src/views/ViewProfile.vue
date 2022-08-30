<template>
  <Dialog :deleteDialog="deleteUser" />
  <MainHeader />
  <form method="POST" enctype="multipart/form-data">
    <input
      type="file"
      name="imageProfile"
      id="imageProfile"
      ref="myImage"
      accept="image/jpeg, image/png, image/gif"
      hidden
      @change="updateImageUser"
    />
  </form>
  <div class="userProfile">
    <div class="picture">
      <img :src="user.imageProfile" alt="image du profile" />
      <div class="camera" @click="$refs.myImage.click()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z"
          />
        </svg>
      </div>
    </div>
    <p class="name">{{ user.name }} {{ user.firstname }}</p>
    <p class="email"><span class="info">Email:</span> {{ user.email }}</p>
    <p class="createDate">
      <span class="info">Crée le:</span> {{ dateFormat(user.createdat) }}
    </p>
    <Button
      class="p-button-raised p-button-danger"
      label="Supprimer mon compte"
      @click="deleteUser"
    />
    <span class="error" v-if="errorFile">{{ errorFile }}</span>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import Button from "primevue/button";
import Dialog from "@/components/Dialog.vue";

export default {
  name: "Profile",
  components: { MainHeader, Button, Dialog },
  data() {
    return {
      errorFile: "",
      open: false,
    };
  },
  mounted() {
    this.getOneUser();
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },

  methods: {
    getOneUser() {
      this.$store
        .dispatch("setUserProfile")
        .then((res) => res)
        .catch((err) => {
          const code = [401, 403];
          if (code.includes(err.response.status)) {
            this.$router.push("/");
          }
        });
    },

    updateImageUser() {
      const imageUser = this.$refs.myImage.files[0];
      const form = new FormData();
      form.append("imageProfile", imageUser);

      this.$store
        .dispatch("updateImageProfile", form)
        .then(() => {
          this.errorFile = "";
        })
        .catch(() => (this.errorFile = "Extensions acceptées: jpg | png"));
    },

    deleteUser() {
      this.$confirm.require({
        message: "Etes-vous sûr de vouloir supprimer votre compte ?",
        header: "Suppression",
        acceptClass: "p-button-danger",
        accept: () => {
          //callback to execute when user confirms the action
          this.$store
            .dispatch("deleteUserProfile")
            .then(() => this.$router.push("/"));
        },
        reject: () => {
          //callback to execute when user rejects the action
          return;
        },
      });
    },

    dateFormat(date) {
      const dateCreate = new Date(date);
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return dateCreate.toLocaleDateString("fr-FR", options);
    },
  },
};
</script>

<style>
.userProfile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.picture {
  position: relative;
}

.userProfile .picture img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: solid 3px #fd2d01;
}

.userProfile .picture .camera {
  position: absolute;
  bottom: 0px;
  right: 10px;
  color: white;
  background: rgba(0, 0, 255, 1);
  border-radius: 50%;
  border: 2px solid transparent;
  padding: 10px;
  cursor: pointer;
  width: 50px;
  height: 50px;
}

.camera svg{
  width: 100%;
  height: 100%;
  fill: white
}

.userProfile .picture,
.userProfile p,
.userProfile button {
  margin-bottom: 20px;
}

.userProfile .picture i:hover {
  border: 2px solid white;
}

.userProfile .name {
  color: #fd2d01;
  font-weight: 700;
}

.userProfile .info {
  text-decoration: underline;
  color: #4e5166;
  font-weight: 700;
}

.userProfile button {
  padding: 15px 10px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}

.userProfile .error {
  margin-top: 35px;
  padding: 15px 25px;
  color: red;
  border: solid 2px red;
  background-color: rgb(255, 192, 203, 0.7);
  border-radius: 5px;
  text-decoration: none;
}

@media all and (max-width: 768px) {
  .userProfile .name,
  .userProfile .email {
    text-align: center;
  }
}
</style>