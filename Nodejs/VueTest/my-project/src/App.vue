<template>
  <div id='app'>
    <img alt='Vue logo' src='./assets/logo.png' width='60px'>
    <hello-world msg='Welcome to My Vue.js App'/>
    <multi-button @handleBtnHappyClick='handleBtnHappyClick'/>
    <br/>
    <multi-select @handleMultiSelectChange='handleMultiSelectChange' />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MultiButton from './components/MultiButton.vue'
import MultiSelect from './components/MultiSelect.vue'

export default {
  data () {
    return {
      multiSelectItemList: []
    }
  },
  name: 'App',
  components: {
    'hello-world': HelloWorld,
    'multi-button': MultiButton,
    'multi-select': MultiSelect,
  },
  methods: {
    handleMultiSelectChange: function (itemList) {
      this.multiSelectItemList = itemList;
      console.log(`App.vue ~ _handleMultiSelectChange: itemList = ${JSON.stringify(itemList)}`);
    },
    handleBtnHappyClick: function () {
      this.multiSelectItemList.pop();
      console.log(`App.vue ~ _handleBtnHappyClick: multiSelectItemList = ${JSON.stringify(this.multiSelectItemList)}`);
    }
  }
}
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
