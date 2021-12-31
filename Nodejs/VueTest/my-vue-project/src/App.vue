<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="60px" />
    <hello-world msg="Welcome to My Vue.js App" />
    <img
      ref="weatherIcon"
      src="./assets/icons/499.svg"
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
      iconsPath: "./assets/icons/",
      weatherIcon: "",
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
      HtmlToImage.toPng(this.$refs.weatherIcon).then(function (dataUrl) {
        console.log(`_handleGenerateImage ~ dataUrl = ${dataUrl}`);
        const linkObj = document.createElement("a");
        linkObj.download = "weatherIcon.png";
        linkObj.href = dataUrl;
        linkObj.click();
      });
    },
  },
  mounted() {
    this.weatherIcon = this.iconsPath + "100.svg";
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
