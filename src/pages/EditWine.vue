<template>
  <form class="wine--form" @submit="updateWine">
    <input
      type="text"
      v-model="name"
      class="input"
      placeholder="Nome do vinho"
    />
    <input type="text" v-model="year" class="input" placeholder="Ano" />
    <input type="text" v-model="grade" placeholder="Nota" class="input" />
    <textarea placeholder="Descrição" v-model="description"></textarea>
    <button type="submit" :disabled="loading" class="button">Adicionar</button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import displayValidationErrors from '../helper/displayValidationErrors';

export default {
  name: 'EditWine',
  computed: mapState(['loading']),
  async mounted() {
    try {
      const id = this.$route.params.id;
      const response = await this.$store.dispatch('getWineById', id);
      this.fillFields(response.data.data);
    } catch (error) {
      let errorMessage = '';
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      this.$toasted.global.defaultError({
        msg: errorMessage,
      });
      this.$router.push('/dashboard');
    }
  },
  data() {
    return {
      name: '',
      year: '',
      grade: '',
      description: '',
    };
  },
  methods: {
    fillFields(fields) {
      this.name = fields.name;
      this.grade = fields.grade;
      this.year = fields.year;
      this.description = fields.description;
    },
    async updateWine(event) {
      event.preventDefault();
      try {
        const id = this.$route.params.id;
        const updatedWine = {
          name: this.name,
          year: this.year,
          grade: this.grade,
          description: this.description,
        };
        const data = {
          id,
          updatedWine,
        };
        const response = await this.$store.dispatch('updateWine', data);
        this.$toasted.global.defaultSuccess({
          msg: response.data.message,
        });
        this.$router.push('/dashboard');
      } catch (error) {
        this.$store.commit('setLoading', { isLoading: false });
        const status = error.response.status;
        if (status === 422) {
          const errors = error.response.data.errors;
          displayValidationErrors(errors, this.$toasted);
        } else {
          const errorMessage = error.response ? error.response.data.message : '';
          this.$toasted.global.defaultError({ msg: errorMessage });
        }
      }
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
