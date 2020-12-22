<template>
  <div class="content--area">
    <search-area />
    <div class="wine--list" v-if="!loading">
      <wine-card v-for="wine in wineList.data" :key="wine.id" :data="wine" />
      <span v-if="!verifyListLength(wineList.data)">Nenhum vinho encontrado</span>
    </div>
    <div v-else class="loading">
      <img src="../assets/loading-filled.gif" alt="loading">
    </div>
    <div class="pages--area" v-if="verifyListLength(wineList.data)">
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
  methods: {
    verifyListLength(list) {
      if(list)
        return list.length > 0
      return false
    }
  }
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
  padding: 15px 0;
}
.loading {
  margin-top:15px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading img {
  max-width: 120px;
}
@media only screen and (max-width: 970px) {
 .wine--list {
   grid-template-columns: repeat(2,1fr);
 }  
}
@media only screen and (max-width: 624px) {
 .wine--list {
   grid-template-columns: 1fr;
 }  
}
</style>
