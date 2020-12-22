<template>
  <div class="content--area">
    <search-area />
    <div class="wine--list" v-if="!loading">
      <wine-card v-for="wine in wineList.data" :key="wine.id" :data="wine" />
      <span v-if="wineList.data.length <= 0">Parece que você ainda não registrou nenhum vinho</span>
    </div>
    <div v-else class="loading">
      <img src="../assets/loading.gif" alt="">
    </div>
    <div class="pages--area" v-if="wineList.data.length > 0">
      <page-link
        v-for="link in wineList.links"
        :link="link"
        :key="link.label"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DashboardTemplate from '../components/DashboardTemplate';
import WineCard from '../components/WineCard';
import PageLink from '../components/PageLink';
import SearchArea from '../components/SearchArea';

export default {
  components: { DashboardTemplate, WineCard, PageLink, SearchArea },
  computed: mapState(['wineList','loading']),
  async beforeCreate() {
    try {
      await this.$store.dispatch('getWineList');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : '';
      this.$toasted.global.defaultError({ msg: errorMessage });
    }
  },
};
</script>


<style>
.content--area {
  height: 80%;
}
.wine--list {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: minmax(350px, 400px);
  gap: 30px;
  justify-content: center;
}
.pages--area {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}
.loading {
  margin-top:15px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
