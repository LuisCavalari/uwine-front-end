<template>
  <initial-page-template>
    <template v-slot:left>
      <img class="logo" src="../assets/grasp.png" alt="grasp" />
      <h2>UWine</h2>
      <form class="login--form" @submit="doLogin">
        <input v-model="email" class="input" placeholder="Email" type="text" />
        <input
          v-model="password"
          class="input"
          placeholder="Senha"
          type="password"
        />
        <button type="submit" class="button login--button">Login</button>
        <router-link class="link" to="SignUp">
          <button class="button signup--button">Cadastro</button>
        </router-link>
      </form>
    </template>
  </initial-page-template>
</template>

<script>
import InitialPageTemplate from "@/components/InitialPageTemplate";
export default {
  components: { InitialPageTemplate },
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async doLogin($event) {
      $event.preventDefault();
      this.$store.commit('setLoading', true)
      try {
        const email = this.email;
        const password = this.password;
        const user = {
          email,
          password,
        };
        await this.$store.dispatch('login',user)
        this.$router.push('Dashboard')
      } catch (error) {
        const errorMessage = error.response.data.message
        this.$toasted.global.defaultError({msg:errorMessage})
      }
    },
  },
};
</script>

<style >
.login--form {
  max-width: 400px;
  width: 100%;
}
.login--form .input,
.login--form .button {
  margin-top: 15px;
}

.button.login--button {
  background-color: #69306d;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  margin: 15px 0;
  border: 1px solid #69306d;
}

.button.signup--button {
  max-width: 400px;
  width: 100%;
  font-size: 18px;
  color: #69306d;
  font-weight: bold;
}
.login--left .logo {
  margin-bottom: 15px;
}
</style>
