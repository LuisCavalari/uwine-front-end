<template>
  <div class="notfound">
      <h2>Página não encontrada</h2>
      <router-link class="link" to="/">
          <button class="button">
              Voltar para o login
          </button>
      </router-link>
  </div>
</template>

<script>
export default {
  name: '404NotFound',
};
</script>

<style>
.notfound {
    height: 100vh;
    width: 100%;
    background-color:#69306d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.notfound .link {
    margin-top:15px;
}
.notfound .button {
    margin-top:15px;
    margin:0 auto;
    max-width: 400px;
    font-weight: bold;
}
.notfound h2 {
    color:#FFF;
    font-weight: bold;
}
</style>
