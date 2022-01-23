<template>
  <div id="app">
    <CarController
      id="carController"
      msg="Welcome to Car Controller :>"
      @handleBtnForward="handleBtnForward"
      @handleBtnBack="handleBtnBack"
      @handleBtnLeft="handleBtnLeft"
      @handleBtnRight="handleBtnRight"
      @handleBtnStop="handleBtnStop"
    />
    <br />
  </div>
</template>

<script>
import CarController from './components/CarController.vue';
const G_SRV_BASE_URL = 'http://192.168.0.116:9527/';

export default {
  data() {
    return {
      isMotorReady: false,
    };
  },

  name: 'Car-Controller',

  components: {
    CarController,
  },
  methods: {
    handleBtnForward: function () {
      console.log(`${new Date().toString()} ~ _handleBtnForward is running ...`);
      const url = G_SRV_BASE_URL + 'carGoForward';
      this.$http.post(url).then((res) => {
        console.log(`${new Date().toString()} ~ _handleBtnForward: ${res.data}`);
      });
    },

    handleBtnBack: function () {
      console.log(`${new Date().toString()} ~ _handleBtnBack is running ...`);
      const url = G_SRV_BASE_URL + 'carGoBack';
      this.$http.post(url).then((res) => {
        console.log(`${new Date().toString()} ~ _handleBtnBack: ${res.data}`);
      });
    },

    handleBtnLeft: function () {
      console.log(`${new Date().toString()} ~ _handleBtnLeft is running ...`);
      const url = G_SRV_BASE_URL + 'carTurnLeft';
      this.$http.post(url).then((res) => {
        console.log(`${new Date().toString()} ~ _handleBtnLeft: ${res.data}`);
      });
    },

    handleBtnRight: function () {
      console.log(`${new Date().toString()} ~ _handleBtnRight is running ...`);
      const url = G_SRV_BASE_URL + 'carTurnRight';
      this.$http.post(url).then((res) => {
        console.log(`${new Date().toString()} ~ _handleBtnRight: ${res.data}`);
      });
    },

    handleBtnStop: function () {
      console.log(`${new Date().toString()} ~ _handleBtnStop is running ...`);
      const url = G_SRV_BASE_URL + 'carStop';
      this.$http.post(url).then((res) => {
        console.log(`${new Date().toString()} ~ _handleBtnStop: ${res.data}`);
      });
    },
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
  margin-top: 20px;
}
#carController {
  margin-top: 80px;
}
</style>
