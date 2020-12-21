<template>
  <dashboard-template title="Dashboard">
    <div class="wine--list">
      <wine-card v-for="wine in wineList.data" :key="wine.id" :data="wine" />
    </div>
    <div class="pages--area">
      <span v-for="link in wineList.links" :key="link.label" v-html="link.label" >
        
      </span>
    </div>
  </dashboard-template>
</template>

<script>
import DashboardTemplate from "../components/DashboardTemplate.vue";
import WineCard from "../components/WineCard";
import { mapState } from "vuex";

export default {
  components: { DashboardTemplate, WineCard },
  computed: mapState(["wineList"]),
  mounted() {
    try {
      this.$store.dispatch("getWineList");
    } catch (error) {
      const errorMessage = error.response.data.message;
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
  grid-template-rows: 340px;
  gap: 30px;
  justify-content: center;
}
</style>