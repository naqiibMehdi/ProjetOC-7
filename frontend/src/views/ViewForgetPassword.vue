<template>
  <Header />
  <div class="form">
    <form method="POST" @submit.prevent="changePassword()">

      <div class="fields">

        <div class="field">
          <InputText
            type="text"
            name="name"
            placeholder="Nom"
            :class="errors.name ? 'p-invalid' : ''"
            v-model="name"
          />
          <span v-show="errors.name" class="p-error">{{ errors.name }}</span>
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

        <Button label="Valider" class="p-button-raised p-button-success" type="submit"/>
      </div>

      <div v-if="errors.message" class="errorMessage">
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
  name: "forgetPassword",
  components: {Header, InputText, Button},
  data(){
    return{
      name: "",
      email: "",
      password: "",
      errors: {}
    }
  },
  methods: {
    changePassword(){
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      this.$store.dispatch("errorsForgetPwd", data)
      .then(() => this.$router.push("/login"))
      .catch(() => this.errors = this.$store.state.errorsUpdatePwd)
    },
  }
}
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

.errorMessage{
  width: 100%;
  text-align: center;
  margin-top: 20px;
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