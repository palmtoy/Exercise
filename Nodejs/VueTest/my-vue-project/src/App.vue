<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="60px" />
    <hello-world msg="Welcome to My Vue.js App" />
    <img
      ref="imgWeatherIcon"
      :src="require(`@/assets/icons/${weatherIcon}.svg`)"
      alt="QWeather"
      width="32"
      height="32"
    />
    <br />
    <br />
    <multi-button
      @handleBtnHappyClick="handleBtnHappyClick"
      @handleBtnPrimaryClick="handleBtnPrimaryClick"
      @handleGenerateImage="handleGenerateImage"
    />
    <br />
    <multi-select
      ref="multiSelectComp"
      @handleMultiSelectChange="handleMultiSelectChange"
    />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import MultiButton from "./components/MultiButton.vue";
import MultiSelect from "./components/MultiSelect.vue";
import * as HtmlToImage from "html-to-image";

export default {
  data() {
    return {
      multiSelectItemList: [],
      weatherIcon: 100,
    };
  },
  name: "App",
  components: {
    "hello-world": HelloWorld,
    "multi-button": MultiButton,
    "multi-select": MultiSelect,
  },
  methods: {
    handleMultiSelectChange: function (itemList) {
      this.multiSelectItemList = itemList;
      console.log(
        `App.vue ~ _handleMultiSelectChange: itemList = ${JSON.stringify(
          itemList
        )}`
      );
    },
    handleBtnPrimaryClick: function () {
      this.$refs.multiSelectComp.delItemFromSelectedField();
      console.log(
        `App.vue ~ _handleBtnPrimaryClick: multiSelectItemList = ${JSON.stringify(
          this.multiSelectItemList
        )}`
      );
    },
    handleBtnHappyClick: function () {
      this.multiSelectItemList.pop();
      console.log(
        `App.vue ~ _handleBtnHappyClick: multiSelectItemList = ${JSON.stringify(
          this.multiSelectItemList
        )}`
      );
    },
    handleGenerateImage: function () {
      this.weatherIcon = 102;
      HtmlToImage.toPng(this.$refs.imgWeatherIcon).then(function (dataUrl) {
        const linkObj = document.createElement("a");
        linkObj.download = "myWeatherIcon.png";
        linkObj.href = dataUrl;
        linkObj.click();
      });
    },
  },
  mounted() {
    this.weatherIcon = 101;
    // setTimeout(this.handleGenerateImage, 6000);
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
