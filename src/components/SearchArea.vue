<template>
  <div class="search--area">
    <input
      type="text"
      class="input"
      placeholder="Digite o nome do vinho que deseja"
      v-model="searchTerm"
      @input="searchItem"
    />
    <button class="button" @click="setOrderBy('grade')">
      <arrow-up v-if="!this.gradeDesc" />
      <arrow-down v-else />
      <span>Nota</span>
    </button>
    <button class="button" @click="setOrderBy('year')">
      <arrow-up v-if="!this.yearDesc" />
      <arrow-down v-else />
      Ano
    </button>
  </div>
</template>

<script>
import ArrowUp from 'vue-material-design-icons/ArrowUp';
import ArrowDown from 'vue-material-design-icons/ArrowDown';
import _ from 'lodash';

export default {
  components: {
    ArrowUp,
    ArrowDown,
  },
  data() {
    return {
      searchTerm: '',
      orderBy: '',
      desc: true,
      yearDesc: true,
      gradeDesc: true,
    };
  },
  methods: {
    searchItem: _.debounce(async function getList() {
      try {
        const searchTerm = this.searchTerm;
        const params = {
          searchTerm,
          direction: this.desc ? 'desc' : 'asc',
          orderBy: this.orderBy,
        };
        await this.$store.dispatch('getWineListByName', params);
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          this.$toasted.global.defaultError({
            msg: errorMessage,
          });
        }
      }
    }, 300),
    setOrderBy(param) {
      this.orderBy = param;
      const key = `${param}Desc`;
      this[key] = !this[key];
      this.desc = this[key];
      this.searchItem();
    },
  },
};
</script>

<style>
.search--area {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search--area .button,
.search--area .input {
  margin-right: 15px;
  height: 40px;
}
.search--area .button:last-child {
  margin-right: 0;
}
.search--area .button {
  border: 1px solid #69306d;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
