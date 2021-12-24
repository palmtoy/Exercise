<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="60px">
    <hello-world msg="Welcome to Your Vue.js App"/>
    <multi-button/>
    <br/>
    <multi-select/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MultiButton from './components/MultiButton.vue'
import MultiSelect from './components/MultiSelect.vue'

export default {
  name: 'App',
  components: {
    'hello-world': HelloWorld,
    'multi-button': MultiButton,
    'multi-select': MultiSelect,
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
