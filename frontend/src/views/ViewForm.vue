<template>
<Header />
  <div class="form">
    <form action="">
      <div class="fields">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          v-model="name"
          @input="handleErrorName"
        />
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
          @input="handleErrorEmail"
        />
        <span></span>

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          v-model="password"
          @input="handleErrorName"
        />
        <span></span>

        <button type="submit">Créer un compte</button>
      </div>
    </form>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"

export default {
  name: "Form",
  components: {Header},
  data() {
    return {
      name: "",
      firstname: "",
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    handleErrorName() {
      if (!/^[a-zA-Z]*$/.test(this.name)) {
        return (this.errors.name = "Nom saisie incorrecte !");
      } else {
        return (this.errors.name = "");
      }
    },

    handleErrorFirstName() {
      if (!/^[a-zA-Z]*$/.test(this.firstname)) {
        return (this.errors.firstname = "Prénom saisie incorrecte !");
      } else {
        return (this.errors.firstname = "");
      }
    },
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