<template>
  <initial-page-template>
    <template v-slot:left>
      <img class="logo" src="../assets/grasp.png" alt="grasp" />
      <h2>UWine</h2>
      <form class="signup--form" @submit="doLogin">
        <input v-model="email" class="input" placeholder="Email" type="text" />
        <input
          v-model="password"
          class="input"
          placeholder="Senha"
          type="password"
        />
        <input
          v-model="passwordConfirmation"
          class="input"
          placeholder="Confirme a senha"
          type="password"
        />
        <button type="submit" class="button finish--button">Finalizar</button>
      </form>
    </template>
  </initial-page-template>
</template>

<script>
import InitialPageTemplate from '../components/InitialPageTemplate';

export default {
  components: { InitialPageTemplate },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  },
};
</script>

<style>
.signup--form {
    max-width: 400px;
    width: 100%;
}
.signup--form .input,.signup--form .button {
    margin-top:15px;
}
.signup--form .button {
    background-color:#69306d;
    color:#FFF;
    font-size: 18px;
    font-weight: bold;
}
</style>
