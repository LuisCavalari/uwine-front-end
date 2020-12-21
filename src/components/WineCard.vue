<template>
  <div class="wine--card">
    <header class="wine--card--header">
      <h3 class="wine--name">{{ data.name }}</h3>
    </header>
    <section class="wine--content">
      <strong class="wine--key"> Ano </strong>
      <span class="wine--value"> {{ data.year }} </span>
      <strong class="wine--key"> Descrição </strong>
      <span class="wine--value">
        {{ data.description }}
      </span>
      <strong class="wine--key"> Nota </strong>
      <span class="wine--value"> {{ data.grade }} </span>
    </section>
    <div class="button--group">
      <button class="button active" >Editar</button>
      <button class="button" @click="deleteWine(data.id)">Excluir</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WineCard',
  props: ['data'],
  methods: {
    async deleteWine(id) {
      try {
        const options = {
          okText: 'Excluir',
          cancelText: 'Cancelar',
          animation: 'zoom',
          customClass: 'dialog',
        };
        await this.$dialog.confirm(`Deseja mesmo excluir ${this.data.name}?`, options);
        const response = await this.$store.dispatch('deleteWine', id);
        this.$toasted.global.defaultSuccess({
          msg: response.data.message,
        });
        await this.$store.dispatch('getWineList');
      } catch (error) {
        if (error) {
          const errorMessage = error.response.data.message;
          this.$toasted.global.defaultError({
            msg: errorMessage,
          });
        }
      }
    },
  },
};
</script>

<style>
.wine--card {
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.wine--card .button--group {
  margin-top: auto;
  display: flex;
}
.wine--card .button--group .button {
  font-weight: bold;
}
header.wine--card--header {
  background-color: #69306d;
  text-align: center;
  padding: 5px 0;
}
header.wine--card--header .wine--name {
  color: #fff;
}
section.wine--content {
  padding: 15px;
}
.wine--key {
  font-weight: bold;
}
.wine--value {
  color: #666;
}
.wine--key,
.wine--value {
  display: block;
  margin-top: 10px;
}
.dialog .dg-btn--cancel {
  background-color:#69306d !important;
}
.dialog .dg-btn--ok {
  border-color: #69306d !important;
  color:#69306d !important;
}
</style>
