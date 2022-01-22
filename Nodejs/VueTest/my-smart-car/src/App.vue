<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/F1.jpg" width="160" height="76" />
    <CarController
      id="carController"
      msg="Welcome to Car Controller :>"
      @handleBtnForward="handleBtnForward"
      @handleBtnBack="handleBtnBack"
      @handleBtnLeft="handleBtnLeft"
      @handleBtnRight="handleBtnRight"
    />
    <br />
  </div>
</template>

<script>
import CarController from './components/CarController.vue';
const G_SVG_LIST = require('./config/svgList.json');

export default {
  data() {
    return {};
  },
  name: 'App',
  components: {
    CarController,
  },
  methods: {
    handleBtnForward: function () {
      console.log(`${new Date().toString()} ~ _handleBtnForward is running ...`);
    },
    handleBtnBack: function () {
      console.log(`${new Date().toString()} ~ _handleBtnBack is running ...`);
    },
    handleBtnLeft: function () {
      console.log(`${new Date().toString()} ~ _handleBtnLeft is running ...`);
    },
    handleBtnRight: function () {
      console.log(`${new Date().toString()} ~ _handleBtnRight is running ...`);
    },   
  },
  mounted() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
#carController {
  margin-top: 10px;
}
</style>
