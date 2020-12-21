<template>
  <dashboard-template title="Dashboard">
    <div class="wine--list">
      <wine-card v-for="wine in wineList" :key="wine.id" :data="wine" />
    </div>
  </dashboard-template>
</template>

<script>
import DashboardTemplate from "../components/DashboardTemplate.vue";
import WineCard from "../components/WineCard";
import { mapState } from "vuex";

export default {
  components: { DashboardTemplate, WineCard },
  computed: mapState(['wineList']),
  mounted() {
    this.$store.dispatch('getWineList')
  }
};
</script>
    

<style>
.wine--list {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 340px;
  gap: 30px;
  justify-content: center;
}
</style>