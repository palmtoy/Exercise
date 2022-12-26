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
    <MyInput v-model="searchText" style="width: 168px" @handleMyInputChange="handleMyInputChange"/>
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
    <br />
    <my-table
      style="
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
      "
    />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import MultiButton from "./components/MultiButton.vue";
import MultiSelect from "./components/MultiSelect.vue";
import MyTable from "./components/MyTable.vue";
import MyInput from "./components/MyInput.vue";
import * as HtmlToImage from "html-to-image";
const G_SVG_LIST = require("./config/svgList.json");

export default {
  data() {
    return {
      multiSelectItemList: [],
      weatherIcon: 103,
      searchText: '',
    };
  },
  name: "App",
  components: {
    "hello-world": HelloWorld,
    "multi-button": MultiButton,
    "multi-select": MultiSelect,
    "my-table": MyTable,
    MyInput,
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
    handleMyInputChange: function (evtVal) {
      console.log(`App.vue A ~ _handleMyInputChange: searchText = ${this.searchText}`);
      console.log(`App.vue A ~ _handleMyInputChange:     evtVal = ${evtVal}`);
      setImmediate(() => {
        console.log(`App.vue B ~ _handleMyInputChange: searchText = ${this.searchText}`);
      });
    },
    handleBtnHappyClick: function () {
      this.multiSelectItemList.pop();
      console.log(
        `App.vue ~ _handleBtnHappyClick: multiSelectItemList = ${JSON.stringify(
          this.multiSelectItemList
        )}`
      );
    },
    handleGenerateImage: async function () {
      console.log(`G_SVG_LIST = ${JSON.stringify(G_SVG_LIST)}`);
      const len = G_SVG_LIST.length;
      for (let i = 0; i < len; i++) {
        this.weatherIcon = G_SVG_LIST[i];
        await new Promise((resolve) => {
          try {
            HtmlToImage.toPng(this.$refs.imgWeatherIcon).then((dataUrl) => {
              const linkObj = document.createElement("a");
              linkObj.download = this.weatherIcon + ".png";
              linkObj.href = dataUrl;
              linkObj.click();
              return resolve();
            });
          } catch (e) {
            console.error(
              `_handleGenerateImage error -- msg: "${e.message}"\n${e.stack}`
            );
          }
        });
      }
    },
  },
  mounted() {
    // this.$nextTick(this.handleGenerateImage);
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
