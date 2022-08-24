<template>
  <Header />
  <div class="form">
    <form method="POST" @submit.prevent="fetchLogin()">
      <div class="fields">
        <div class="field">
          <InputText
            type="text"
            name="email"
            placeholder="ex: exemple@domaine.com"
            v-model="email"
            :class="errors.message ? 'p-invalid' : ''"
          />
        </div>

        <div class="field">
          <InputText
            type="password"
            name="password"
            placeholder="Mot de passe"
            v-model="password"
            :class="errors.message ? 'p-invalid' : ''"
          />
        </div>

        <Button label="Se connecter" class="p-button-raised" type="submit"/>
      </div>

        <div v-if="errors.message" class="errorConnexion">
          <span class="p-error">{{ errors.message }}</span>
        </div>
    </form>
  </div>

</template>

<script>
import Header from "@/components/Header.vue";
import InputText from "primevue/inputtext"
import Button from "primevue/button"

export default {
  name: "Login",
  components: { Header, InputText, Button},
  data() {
    return {
      email: "",
      password: "",
      errors: {}
    };
  },
  methods: {

    fetchLogin() {

      const data = {
       email: this.email,
       password: this.password,
     }

      this.$store.dispatch("login", data)
      .then(() => this.$router.push("/blog"))
      .catch(() => this.errors = this.$store.state.errorLogin)
    }
  },
};
</script>

<style>

.errorConnexion{
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>