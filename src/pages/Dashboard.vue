<template>
  <div>
    <search-area />
    <div class="wine--list">
      <wine-card v-for="wine in wineList.data" :key="wine.id" :data="wine" />
    </div>
    <div class="pages--area">
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
  computed: mapState(['wineList']),
  async created() {
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
</style>
