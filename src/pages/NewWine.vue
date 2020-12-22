<template>
  <form class="wine--form" @submit="addNewWine">
    <input
      type="text"
      v-model="name"
      class="input"
      placeholder="Nome do vinho"
    />
    <input type="text" v-model="year" class="input" placeholder="Ano" />
    <input type="text" v-model="grade" placeholder="Nota" class="input" />
    <textarea placeholder="Descrição" v-model="description"></textarea>
    <button type="submit" :disabled="this.loading" class="button">
      <img
        v-if="loading"
        class="loading--button"
        src="../assets/loading.gif"
        alt=""
      />
      <span v-else>Adicionar</span>
    </button>
  </form>
</template>

<script>
import { mapState } from "vuex";
import DashboardTemplate from "../components/DashboardTemplate";
import displayValidationErrors from "../helper/displayValidationErrors";

export default {
  name: "NewWine",
  computed: mapState(["loading"]),
  components: { DashboardTemplate },
  data() {
    return {
      name: "",
      year: "",
      grade: "",
      description: "",
    };
  },
  methods: {
    async addNewWine(event) {
      event.preventDefault();
      const wineData = {
        name: this.name,
        year: this.year,
        description: this.description,
        grade: this.grade,
      };
      try {
        const response = await this.$store.dispatch("addNewWine", wineData);
        this.$toasted.global.defaultSuccess({
          msg: response.data.message,
        });
        this.clearField();
      } catch (error) {
        this.$store.commit("setLoading", { isLoading: false });
        const status = error.response.status;
        if (status === 422) {
          const errors = error.response.data.errors;
          displayValidationErrors(errors, this.$toasted);
        }
      }
    },
    clearField() {
      this.name = "";
      this.year = "";
      this.grade = "";
      this.description = "";
    },
  },
};
</script>

<style>
.wine--form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
}
.wine--form .input {
  margin-top: 15px;
}
.wine--form textarea {
  resize: none;
  width: 100%;
  margin-top: 15px;
  height: 80px;
  padding: 10px;
}
.wine--form .button {
  margin-top: 15px;
  max-width: 500px;
  background-color: #69306d;
  color: #fff;
  font-weight: bold;
}
</style>
