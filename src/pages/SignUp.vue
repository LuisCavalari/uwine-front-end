<template>
  <form class="signup--form" @submit="registerUser">
    <img class="logo" src="../assets/grasp.png" alt="grasp" />
    <h2>UWine</h2>
    <input
      v-model="name"
      class="input"
      placeholder="Nome"
      type="text"
    />
    <input
      v-model="email"
      class="input"
      placeholder="Email"
      type="text"
      @keydown.space.prevent
    />
    <input
      v-model="password"
      class="input"
      placeholder="Senha"
      type="password"
      @keydown.space.prevent
    />
    <input
      v-model="passwordConfirmation"
      class="input"
      placeholder="Confirme a senha"
      type="password"
      @keydown.space.prevent
    />
    <button type="submit" class="button finish--button">Finalizar</button>
  </form>
</template>

<script>
import displayValidationErrors from '../helper/displayValidationErrors';
import InitialPageTemplate from '../components/InitialPageTemplate';

export default {
  components: { InitialPageTemplate },
  data() {
    return {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    };
  },
  methods: {
    async registerUser(event) {
      event.preventDefault();
      let user;
      if (this.validatePassword(this.password, this.passwordConfirmation)) {
        user = {
          email: this.email,
          password: this.password,
          name: this.name,
          passwordConfirmation: this.passwordConfirmation,
        };
      } else {
        this.$toasted.global.defaultError({
          msg: 'As duas senhas não são iguais',
        });
        return;
      }
      try {
        await this.$store.dispatch('registerUser', user);
        this.$router.push('/dashboard');
      } catch (error) {
        this.$store.commit('setLoading', { isLoading: false });
        const status = error.response ? error.response.status : null;
        if (status === 422) {
          const errors = error.response.data.errors;
          displayValidationErrors(errors, this.$toasted);
        } else {
          const errorMessage = error.response ? error.response.data.message : '';
          this.$toasted.global.defaultError({ msg: errorMessage });
        }
      }
    },
    validatePassword(password, passwordConfirmation) {
      return password === passwordConfirmation;
    },
  },
};
</script>

<style>
.signup--form {
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.signup--form .input,
.signup--form .button {
  margin-top: 15px;
}
.signup--form .button {
  background-color: #69306d;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
</style>
