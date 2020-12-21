<template>
  <span class="page--link" @click="loadPage"  :class="[{active: link.active}]" v-html="link.label" >
  </span>
</template>

<script>
export default {
  props: ['link'],
  methods: {
    loadPage() {
      this.$store.dispatch('getWineList', this.link.url);
    },
  },
};
</script>

<style>
.page--link {
    border-radius: 2px;
    padding: 5px;
    color:#69306d;
    border:1px solid #69306d;
    margin-right: 10px;
    cursor: pointer;
    transition: all 0.15s linear;
}
.page--link:hover,.active {
    background-color:#69306d;
    color:#FFF;
}
</style>
