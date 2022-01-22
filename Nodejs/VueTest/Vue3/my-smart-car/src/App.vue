<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/F1.jpg" width="160" height="76" />
    <CarController msg="Welcome to Car Controller :>" />
  </div>
</template>

<script>
import CarController from "./components/CarController.vue";

export default {
  name: "App",
  components: {
    CarController,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
