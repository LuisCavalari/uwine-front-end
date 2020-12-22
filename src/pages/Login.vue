<template>
  <form class="login--form" @submit="doLogin">
    <img class="logo" src="../assets/grasp.png" alt="grasp" />
    <h2>UWine</h2>
    <input v-model="email" class="input" placeholder="Email" type="text" />
    <input
      v-model="password"
      class="input"
      placeholder="Senha"
      type="password"
    />
    <button type="submit" :disabled="this.loading" class="button login--button">
       <img v-if="loading" class="loading--button" src="../assets/loading.gif" alt="">
       <span v-else>Login</span>
    </button>
    <router-link class="link" to="SignUp">
      <button class="button signup--button">
        Cadastro
      </button>
    </router-link>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import InitialPageTemplate from '@/components/InitialPageTemplate';

export default {
  components: { InitialPageTemplate },
  computed: mapState(['loading']),
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async doLogin($event) {
      $event.preventDefault();
      try {
        const email = this.email.trim();
        const password = this.password.trim();
        const user = {
          email,
          password,
        };
        await this.$store.dispatch('login', user);
        this.$router.push('dashboard');
      } catch (error) {
        this.$store.commit('setLoading', { isLoading: false });
        let errorMessage;
        if (error.response) {
          errorMessage = error.response.data.message;
        }
        this.$toasted.global.defaultError({ msg: errorMessage || '' });
      }
    },
  },
};
</script>

<style >
.login--form {
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  display: flex;
  justify-content: center;
  align-items: center;
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
