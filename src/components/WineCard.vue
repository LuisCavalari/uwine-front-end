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
      <span class="wine--value"> {{data.grade}} </span>
    </section>
  </div>
</template>

<script>
export default {
  name: "WineCard",
  props: ["data"],
};
</script>

<style>
.wine--card {
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  height: 100%;
  overflow: hidden;
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
</style>