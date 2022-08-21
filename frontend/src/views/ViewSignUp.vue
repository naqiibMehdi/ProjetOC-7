<template>
  <Header />
  <div class="form">
    <form method="POST" @submit.prevent="fetchSignup()">

      <div class="fields">

        <div class="field">
          <InputText 
            type="text" 
            name="name" 
            placeholder="Nom" 
            v-model="name" 
            :class="errors.name ? 'p-invalid' : ''"
          />
          <span v-show="errors.name" class="p-error">{{ errors.name }}</span>
        </div>

        <div class="field">
          <InputText
            type="text"
            name="firstname"
            placeholder="Prénom"
            :class="errors.firstname ? 'p-invalid' : ''"
            v-model="firstname"
          />
          <span v-show="errors.firstname" class="p-error">{{ errors.firstname }}</span>
        </div>

        <div class="field">
          <InputText
          type="text"
          name="email"
          placeholder="ex: exemple@domaine.com"
          :class="errors.email ? 'p-invalid' : ''"
          v-model="email"
          />
          <span v-show="errors.email" class="p-error">{{ errors.email }}</span>
        </div>

        <div class="field">
          <InputText
          type="password"
          name="password"
          placeholder="Mot de passe"
          :class="errors.password ? 'p-invalid' : ''"
          v-model="password"
          />
          <span v-show="errors.password" class="p-error">{{ errors.password }}</span>
        </div>

        <Button label="Créer un compte" class="p-button-raised p-button-success" type="submit"/>
      </div>
    </form>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import InputText from "primevue/inputtext"
import Button from "primevue/button"

export default {
  name: "Signup",
  components: { Header, InputText, Button},
  data() {
    return {
      name: "",
      firstname: "",
      email: "",
      password: "",
      errors: {}
    };
  },
  methods: {

    fetchSignup() {
      axios.post("http://localhost:3000/api/auth/signup", {
        name: this.name,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
      })
      .then(response => this.$router.push("/login"))
      .catch(err => (this.errors = err.response.data))
    }
  },
};
</script>

<style>
.form{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin: 100px auto;
  padding: 50px;
  border-radius: 5px;
  background: rgba(187, 190, 208, 1)
}

.form form{
  width: 100%;
}

.fields{
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
}

.field{
  display: flex;
  flex-direction: column;
  gap:5px
}

@media all and (max-width: 992px){
  .form{
    width: 60%;
  }
}
@media all and (max-width: 768px){
  .form{
    width: 90%;
  }
}
</style>