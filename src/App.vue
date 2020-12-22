<template>
  <div id="app">
    <dashboard-template v-if="this.$route.meta.dashboardLayout" :title="this.$route.name">
      <router-view />
    </dashboard-template>
    <initial-page-template v-else>
       <router-view />
    </initial-page-template>
  </div>
</template>

<script>
import DashboardTemplate from './components/DashboardTemplate';
import InitialPageTemplate from './components/InitialPageTemplate';

export default {
  name: 'App',
  components: {
    DashboardTemplate,
    InitialPageTemplate,
  },
};
</script>


    InitialPageTemplate DashboardTemplate<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
* {
  font-family: "Montserrat", sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100vh;
}
.loading--button {
  max-width: 60px;
}
#app {
  height: 100%;
}
.link {
  width: 100%;
  text-decoration: none;
  color: inherit;
}
.input {
  height: 40px;
  width: 100%;
  padding: 10px;
  outline: none;
}
.button {
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 100%;
  background-color: #fff;
  outline: none;
  border: none;
  height: 50px;
  transition: all 0.2s linear;
}
.button:hover {
  opacity: 0.5;
}
</style>
