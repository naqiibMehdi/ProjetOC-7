<template>
  <Header />
  <div class="form">
    <form method="POST" @submit.prevent="fetchSignup()">

      <div class="fields">
        <input type="text" name="name" placeholder="Nom" v-model="name" />
        <span v-show="errors.name">{{ errors.name }}</span>

        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          v-model="firstname"
          @input="handleErrorFirstName"
        />
        <span v-show="errors.firstname">{{ errors.firstname }}</span>

        <input
          type="text"
          name="email"
          placeholder="ex:exemple@domaine.com"
          v-model="email"
        />
        <span v-show="errors.email">{{ errors.email }}</span>

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          v-model="password"
          @input="checkPassword"
        />
        <span v-show="errors.password">{{ checkPassword() }}</span>

        <button type="submit">Créer un compte</button>
      </div>
    </form>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios"

export default {
  name: "Signup",
  components: { Header },
  data() {
    return {
      name: "",
      firstname: "",
      email: "",
      password: "",
      errors: {password: null}
    };
  },
  methods: {
    checkPassword() {
      if(!/^[\w\d-_*$/\\*]{8,}$/.test(this.password)){
        return this.errors.password = "Votre mot de passe doit comporter au moins 8 caractères"
      }else{
        return ""
      }
    },

    fetchSignup() {
      axios.post("http://localhost:3000/api/auth/signup", {
        name: this.name,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
        isadmin: 0
      })
      .then(response => this.$router.push("/login"))
      .catch(err => (this.errors = err.response.data))
    }
  },
};
</script>

<style>
.form {
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>