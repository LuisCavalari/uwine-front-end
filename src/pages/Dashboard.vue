<template>
  <dashboard-template title="Dashboard">
    <div class="wine--list">
      
    </div>
  </dashboard-template>
</template>

<script>
import DashboardTemplate from "../components/DashboardTemplate.vue";
import WineCard from "../components/WineCard";
export default {
  components: { DashboardTemplate, WineCard },
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